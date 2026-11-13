import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  analyzeNormalBaseline,
  getTodayLocalDateISO,
  upsertNormalDailyRecord,
} from '@/src/data/normal/normalBaseline';
import {
  createInitialPresentationInteractions,
  PRESENTATION_PAIRING_CODE,
} from '@/src/data/presentation/presentationConstants';
import {
  getCachedPresentationBundle,
  loadPresentationBundle,
} from '@/src/data/presentation/presentationSelectors';
import { TRANSLATIONS, TranslationDictionary } from '@/src/i18n/translations';
import {
  AppEntryMode,
  AppPage,
  AvoidTagKey,
  CareActivityItem,
  CareNotification,
  CareSuggestion,
  CheckInOption,
  DailyCheckInState,
  LanguageCode,
  NormalBaselineAnalysis,
  NormalCareActivityItem,
  NormalCareNotification,
  NormalCareSuggestion,
  NormalDailyRecord,
  NormalInteractionsState,
  NormalPairingState,
  NormalPreferencesState,
  NormalUserProfile,
  NotificationStatus,
  OnboardingDraft,
  PartnerId,
  PreferenceTagItem,
  PreferredCareTagKey,
  PresentationBundle,
  PresentationInteractionsState,
  SharingPreferences,
} from '@/src/types/dualcharge';

export const STORAGE_KEYS = {
  MODE: 'dualcharge:mode:v2',
  NORMAL_USER: 'dualcharge:normalUser:v1',
  NORMAL_RECORDS: 'dualcharge:normalRecords:v1',
  NORMAL_PAIRING: 'dualcharge:normalPairing:v1',
  NORMAL_PREFERENCES: 'dualcharge:normalPreferences:v1',
  NORMAL_INTERACTIONS: 'dualcharge:normalInteractions:v1',
  PRESENTATION_INTERACTIONS: 'dualcharge:presentationInteractions:v1',
  LANGUAGE: 'dualcharge:language:v1',
} as const;

const LEGACY_STORAGE_KEYS = {
  DEMO_STATE: 'dualcharge_demo_state_v2',
  ONBOARDING: 'dualcharge_onboarding_v1',
  ENTRY_MODE: 'dualcharge_entry_mode_v1',
  LANGUAGE: 'dualcharge_language_v1',
} as const;

export const NORMAL_LOCAL_INVITE_CODE = 'DC-7315';

function createInitialNormalUserProfile(): NormalUserProfile {
  return {
    completed: false,
    completedAtISO: null,
    nickname: '',
    avatarId: 'coral-glow',
    baselineStartDate: getTodayLocalDateISO(),
    baselineStatus: 'building',
    validCheckInDays: 0,
    sharingConsent: {
      energy: false,
      sleep: false,
      activity: false,
      cycleReserved: false,
    },
    premiumDemoConfirmed: false,
  };
}

function createInitialNormalPairingState(): NormalPairingState {
  return {
    status: 'unpaired',
    method: 'later',
    inviteCode: NORMAL_LOCAL_INVITE_CODE,
    partnerHasRecords: false,
  };
}

function createInitialNormalPreferencesState(): NormalPreferencesState {
  return {
    preferredCare: [],
    avoidTags: [],
    communicationStyle: null,
    customTags: [],
  };
}

function createInitialNormalInteractionsState(): NormalInteractionsState {
  return {
    savedSuggestionIds: [],
    notifications: [],
    careActivity: [],
  };
}

/**
 * Migrate legacy storage keys cleanly without ever leaking old Alex/Jamie demo records
 * into Normal User Mode storage.
 */
function runSafeStorageMigration(): void {
  try {
    // 1. Preserve language preference
    if (!window.localStorage.getItem(STORAGE_KEYS.LANGUAGE)) {
      const legacyLang = window.localStorage.getItem(LEGACY_STORAGE_KEYS.LANGUAGE);
      if (legacyLang === 'en' || legacyLang === 'zh-CN' || legacyLang === 'zh-TW') {
        window.localStorage.setItem(STORAGE_KEYS.LANGUAGE, legacyLang);
      }
    }

    // 2. Migrate legacy presentation demo state ONLY into presentationInteractions
    if (!window.localStorage.getItem(STORAGE_KEYS.PRESENTATION_INTERACTIONS)) {
      const legacyDemo = window.localStorage.getItem(LEGACY_STORAGE_KEYS.DEMO_STATE);
      if (legacyDemo) {
        const parsed = JSON.parse(legacyDemo) as Partial<PresentationInteractionsState>;
        const defaults = createInitialPresentationInteractions();
        const migratedPresentation: PresentationInteractionsState = {
          dailyCheckIns: parsed.dailyCheckIns ?? defaults.dailyCheckIns,
          sharingPrefs: parsed.sharingPrefs ?? defaults.sharingPrefs,
          carePreferences: parsed.carePreferences ?? defaults.carePreferences,
          savedSuggestionIds: parsed.savedSuggestionIds ?? defaults.savedSuggestionIds,
          notifications: Array.isArray(parsed.notifications)
            ? parsed.notifications
            : defaults.notifications,
          careActivity: Array.isArray(parsed.careActivity)
            ? parsed.careActivity
            : defaults.careActivity,
          premiumDemoConfirmed: Boolean(parsed.premiumDemoConfirmed),
        };
        window.localStorage.setItem(
          STORAGE_KEYS.PRESENTATION_INTERACTIONS,
          JSON.stringify(migratedPresentation)
        );
      }
    }

    // 3. Remove legacy keys so no prior mixed onboarding/demo schema can contaminate normal mode
    window.localStorage.removeItem(LEGACY_STORAGE_KEYS.DEMO_STATE);
    window.localStorage.removeItem(LEGACY_STORAGE_KEYS.ONBOARDING);
    window.localStorage.removeItem(LEGACY_STORAGE_KEYS.ENTRY_MODE);
    window.localStorage.removeItem(LEGACY_STORAGE_KEYS.LANGUAGE);
  } catch {
    // Ignore storage access errors in restricted environments
  }
}

function readJsonStorage<T>(key: string, fallback: () => T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback();
    return JSON.parse(raw) as T;
  } catch {
    return fallback();
  }
}

function loadPersistedLanguage(): LanguageCode {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (raw === 'en' || raw === 'zh-CN' || raw === 'zh-TW') {
      return raw;
    }
    return 'en';
  } catch {
    return 'en';
  }
}

function loadPersistedNormalUser(): NormalUserProfile {
  const defaults = createInitialNormalUserProfile();
  const parsed = readJsonStorage<Partial<NormalUserProfile>>(
    STORAGE_KEYS.NORMAL_USER,
    () => defaults
  );
  return {
    ...defaults,
    ...parsed,
    sharingConsent: {
      energy: Boolean(parsed.sharingConsent?.energy),
      sleep: Boolean(parsed.sharingConsent?.sleep),
      activity: Boolean(parsed.sharingConsent?.activity),
      cycleReserved: false,
    },
    baselineStatus: parsed.baselineStatus === 'preliminary' ? 'preliminary' : 'building',
    validCheckInDays: typeof parsed.validCheckInDays === 'number' ? parsed.validCheckInDays : 0,
  };
}

function loadPersistedNormalRecords(): NormalDailyRecord[] {
  const raw = readJsonStorage<unknown>(STORAGE_KEYS.NORMAL_RECORDS, () => []);
  if (!Array.isArray(raw)) return [];
  // Filter valid normal daily records and deduplicate by date
  const byDate = new Map<string, NormalDailyRecord>();
  for (const item of raw) {
    if (
      item &&
      typeof item === 'object' &&
      typeof (item as NormalDailyRecord).date === 'string' &&
      typeof (item as NormalDailyRecord).checkInStatus === 'string' &&
      typeof (item as NormalDailyRecord).selfReportedScore1To5 === 'number'
    ) {
      const rec = item as NormalDailyRecord;
      byDate.set(rec.date, rec);
    }
  }
  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

function loadPersistedNormalPairing(): NormalPairingState {
  const defaults = createInitialNormalPairingState();
  const parsed = readJsonStorage<Partial<NormalPairingState>>(
    STORAGE_KEYS.NORMAL_PAIRING,
    () => defaults
  );
  return {
    status: parsed.status === 'paired_simulated' ? 'paired_simulated' : 'unpaired',
    method:
      parsed.method === 'create' || parsed.method === 'join' || parsed.method === 'later'
        ? parsed.method
        : 'later',
    inviteCode:
      typeof parsed.inviteCode === 'string' && parsed.inviteCode.trim()
        ? parsed.inviteCode.trim().toUpperCase()
        : NORMAL_LOCAL_INVITE_CODE,
    partnerHasRecords: false, // Single-device prototype never fabricates remote partner records
  };
}

function loadPersistedNormalPreferences(): NormalPreferencesState {
  const defaults = createInitialNormalPreferencesState();
  const parsed = readJsonStorage<Partial<NormalPreferencesState>>(
    STORAGE_KEYS.NORMAL_PREFERENCES,
    () => defaults
  );
  return {
    preferredCare: Array.isArray(parsed.preferredCare) ? parsed.preferredCare : [],
    avoidTags: Array.isArray(parsed.avoidTags) ? parsed.avoidTags : [],
    communicationStyle: parsed.communicationStyle ?? null,
    customTags: Array.isArray(parsed.customTags) ? parsed.customTags : [],
  };
}

function loadPersistedNormalInteractions(): NormalInteractionsState {
  const defaults = createInitialNormalInteractionsState();
  const parsed = readJsonStorage<Partial<NormalInteractionsState>>(
    STORAGE_KEYS.NORMAL_INTERACTIONS,
    () => defaults
  );
  return {
    savedSuggestionIds: Array.isArray(parsed.savedSuggestionIds) ? parsed.savedSuggestionIds : [],
    notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
    careActivity: Array.isArray(parsed.careActivity) ? parsed.careActivity : [],
  };
}

function loadPersistedPresentationInteractions(): PresentationInteractionsState {
  const defaults = createInitialPresentationInteractions();
  const parsed = readJsonStorage<Partial<PresentationInteractionsState>>(
    STORAGE_KEYS.PRESENTATION_INTERACTIONS,
    () => defaults
  );
  return {
    dailyCheckIns: parsed.dailyCheckIns ?? defaults.dailyCheckIns,
    sharingPrefs: parsed.sharingPrefs ?? defaults.sharingPrefs,
    carePreferences: parsed.carePreferences ?? defaults.carePreferences,
    savedSuggestionIds: parsed.savedSuggestionIds ?? defaults.savedSuggestionIds,
    notifications: Array.isArray(parsed.notifications)
      ? parsed.notifications
      : defaults.notifications,
    careActivity: Array.isArray(parsed.careActivity)
      ? parsed.careActivity
      : defaults.careActivity,
    premiumDemoConfirmed: Boolean(parsed.premiumDemoConfirmed),
  };
}

function loadInitialEntryMode(normalCompleted: boolean): AppEntryMode {
  try {
    const storedMode = window.localStorage.getItem(STORAGE_KEYS.MODE);
    if (storedMode === 'presentation') {
      return 'presentation';
    }
    if (storedMode === 'normal' && normalCompleted) {
      return 'normal';
    }
    if (normalCompleted) {
      return 'normal';
    }
    return 'welcome';
  } catch {
    return normalCompleted ? 'normal' : 'welcome';
  }
}

type PresentationAction =
  | { type: 'RECORD_CHECK_IN'; partner: PartnerId; option: CheckInOption; timeLabel: string }
  | { type: 'TOGGLE_SHARING'; partner: PartnerId; key: 'energy' | 'sleep' | 'activity' }
  | { type: 'ADD_PREFERENCE'; partner: PartnerId; label: string }
  | { type: 'REMOVE_PREFERENCE'; partner: PartnerId; tagId: string }
  | { type: 'SAVE_SUGGESTION'; partner: PartnerId; suggestion: CareSuggestion; timeLabel: string }
  | {
      type: 'SEND_CARE';
      sender: PartnerId;
      suggestion: CareSuggestion;
      customMessage?: string;
      timeLabel: string;
    }
  | {
      type: 'UPDATE_NOTIFICATION_STATUS';
      notificationId: string;
      status: NotificationStatus;
      responder: PartnerId;
      timeLabel: string;
    }
  | { type: 'CONFIRM_PREMIUM_DEMO' }
  | { type: 'RESET_DEMO' };

function presentationReducer(
  state: PresentationInteractionsState,
  action: PresentationAction
): PresentationInteractionsState {
  switch (action.type) {
    case 'RECORD_CHECK_IN':
      return {
        ...state,
        dailyCheckIns: {
          ...state.dailyCheckIns,
          [action.partner]: {
            status: action.option,
            updatedAtTime: action.timeLabel,
            historyCount: state.dailyCheckIns[action.partner].historyCount,
          },
        },
      };

    case 'TOGGLE_SHARING':
      return {
        ...state,
        sharingPrefs: {
          ...state.sharingPrefs,
          [action.partner]: {
            ...state.sharingPrefs[action.partner],
            [action.key]: !state.sharingPrefs[action.partner][action.key],
          },
        },
      };

    case 'ADD_PREFERENCE': {
      const trimmed = action.label.trim();
      if (!trimmed) return state;
      const existing = state.carePreferences[action.partner];
      const hasDuplicate = existing.some(
        (item) => (item.customLabel ?? '').toLowerCase() === trimmed.toLowerCase()
      );
      if (hasDuplicate) return state;
      return {
        ...state,
        carePreferences: {
          ...state.carePreferences,
          [action.partner]: [
            ...existing,
            {
              id: `pref-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              customLabel: trimmed,
            },
          ],
        },
      };
    }

    case 'REMOVE_PREFERENCE':
      return {
        ...state,
        carePreferences: {
          ...state.carePreferences,
          [action.partner]: state.carePreferences[action.partner].filter(
            (item) => item.id !== action.tagId
          ),
        },
      };

    case 'SAVE_SUGGESTION': {
      const currentSaved = state.savedSuggestionIds[action.partner];
      if (currentSaved.includes(action.suggestion.id)) {
        return state;
      }
      const newActivity: CareActivityItem = {
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        kind: 'saved_care',
        actor: action.partner,
        suggestionId: action.suggestion.id,
        timeLabel: action.timeLabel,
        dayKind: 'today',
      };
      return {
        ...state,
        savedSuggestionIds: {
          ...state.savedSuggestionIds,
          [action.partner]: [...currentSaved, action.suggestion.id],
        },
        careActivity: [newActivity, ...state.careActivity].slice(0, 8),
      };
    }

    case 'SEND_CARE': {
      const recipient: PartnerId = action.sender === 'alex' ? 'jamie' : 'alex';
      const newNotification: CareNotification = {
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: action.sender,
        recipient,
        suggestionId: action.suggestion.id,
        customMessage: action.customMessage?.trim() || undefined,
        timeLabel: action.timeLabel,
        isToday: true,
        status: 'Sent',
      };
      const newActivity: CareActivityItem = {
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        kind: 'sent_care',
        actor: action.sender,
        target: recipient,
        suggestionId: action.suggestion.id,
        timeLabel: action.timeLabel,
        dayKind: 'today',
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        careActivity: [newActivity, ...state.careActivity].slice(0, 8),
      };
    }

    case 'UPDATE_NOTIFICATION_STATUS': {
      const targetNotif = state.notifications.find((n) => n.id === action.notificationId);
      const updatedNotifications = state.notifications.map((item) =>
        item.id === action.notificationId ? { ...item, status: action.status } : item
      );

      let updatedActivity = state.careActivity;
      if (targetNotif && action.status === 'Completed') {
        const completionActivity: CareActivityItem = {
          id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          kind: 'completed_care',
          actor: action.responder,
          suggestionId: targetNotif.suggestionId,
          timeLabel: action.timeLabel,
          dayKind: 'today',
        };
        updatedActivity = [completionActivity, ...state.careActivity].slice(0, 8);
      }

      return {
        ...state,
        notifications: updatedNotifications,
        careActivity: updatedActivity,
      };
    }

    case 'CONFIRM_PREMIUM_DEMO':
      return {
        ...state,
        premiumDemoConfirmed: true,
      };

    case 'RESET_DEMO':
      return createInitialPresentationInteractions();

    default:
      return state;
  }
}

interface DualChargeContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;

  // Explicit Application Mode Routing
  entryMode: AppEntryMode;
  enterOnboarding: () => void;
  enterPresentationDemo: () => void;
  exitPresentationDemo: () => void;
  returnToWelcome: () => void;
  resumeNormalApp: () => void;

  // Normal User Mode (strictly isolated Day 1+ state)
  normalUser: NormalUserProfile;
  normalRecords: NormalDailyRecord[];
  normalPairing: NormalPairingState;
  normalPreferences: NormalPreferencesState;
  normalInteractions: NormalInteractionsState;
  normalBaseline: NormalBaselineAnalysis;
  normalActivePage: AppPage;
  setNormalActivePage: (page: AppPage) => void;
  completeOnboarding: (draft: OnboardingDraft) => void;
  resetNormalAccount: () => void;
  recordNormalCheckIn: (option: CheckInOption) => void;
  pairNormalLocalPartner: (code?: string) => void;
  toggleNormalSharing: (key: 'energy' | 'sleep' | 'activity') => void;
  addNormalCustomPreference: (label: string) => void;
  removeNormalCustomPreference: (tagId: string) => void;
  removeNormalPresetPreference: (
    kind: 'preferred' | 'avoid',
    key: PreferredCareTagKey | AvoidTagKey
  ) => void;
  saveNormalSuggestion: (suggestion: NormalCareSuggestion) => boolean;
  sendNormalCare: (suggestion: NormalCareSuggestion, customMessage?: string) => void;
  confirmNormalPremiumDemo: () => void;

  // Presentation Demo Mode (lazy-loaded 60-day Alex & Jamie data + separate demo state)
  presentationBundle: PresentationBundle | null;
  presentationLoading: boolean;
  activePages: Record<PartnerId, AppPage>;
  setActivePage: (partner: PartnerId, page: AppPage) => void;
  dailyCheckIns: Record<PartnerId, DailyCheckInState>;
  recordCheckIn: (partner: PartnerId, option: CheckInOption) => void;
  sharingPrefs: Record<PartnerId, SharingPreferences>;
  toggleSharingPref: (partner: PartnerId, key: 'energy' | 'sleep' | 'activity') => void;
  carePreferences: Record<PartnerId, PreferenceTagItem[]>;
  addCarePreference: (partner: PartnerId, label: string) => void;
  removeCarePreference: (partner: PartnerId, tagId: string) => void;
  savedSuggestionIds: Record<PartnerId, string[]>;
  saveCareSuggestion: (partner: PartnerId, suggestion: CareSuggestion) => boolean;
  notifications: CareNotification[];
  sendCareNotification: (
    sender: PartnerId,
    suggestion: CareSuggestion,
    customMessage?: string
  ) => void;
  updateNotificationStatus: (
    notificationId: string,
    status: NotificationStatus,
    responder: PartnerId
  ) => void;
  careActivity: CareActivityItem[];
  unreadCountForPartner: (partner: PartnerId) => number;
  premiumDemoConfirmed: boolean;
  confirmPremiumDemo: () => void;
  resetDemo: () => void;
}

const DualChargeContext = createContext<DualChargeContextValue | null>(null);

function formatNowTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function DualChargeProvider({ children }: { children: React.ReactNode }) {
  // Perform safe legacy migration once synchronously on initial render
  useState(() => {
    runSafeStorageMigration();
  });

  const [language, setLanguageState] = useState<LanguageCode>(() => loadPersistedLanguage());

  // Normal User Mode stores (completely independent from Presentation Demo)
  const [normalUser, setNormalUser] = useState<NormalUserProfile>(() => loadPersistedNormalUser());
  const [normalRecords, setNormalRecords] = useState<NormalDailyRecord[]>(() =>
    loadPersistedNormalRecords()
  );
  const [normalPairing, setNormalPairing] = useState<NormalPairingState>(() =>
    loadPersistedNormalPairing()
  );
  const [normalPreferences, setNormalPreferences] = useState<NormalPreferencesState>(() =>
    loadPersistedNormalPreferences()
  );
  const [normalInteractions, setNormalInteractions] = useState<NormalInteractionsState>(() =>
    loadPersistedNormalInteractions()
  );
  const [normalActivePage, setNormalActivePage] = useState<AppPage>('home');

  // Application Mode
  const [entryMode, setEntryMode] = useState<AppEntryMode>(() =>
    loadInitialEntryMode(normalUser.completed)
  );

  // Presentation Demo Mode stores + lazy-loaded canonical 60-day dataset
  const [presentationState, dispatchPresentation] = useReducer(
    presentationReducer,
    undefined,
    loadPersistedPresentationInteractions
  );
  const [presentationBundle, setPresentationBundle] = useState<PresentationBundle | null>(() =>
    getCachedPresentationBundle()
  );
  const [presentationLoading, setPresentationLoading] = useState<boolean>(false);
  const [activePages, setActivePages] = useState<Record<PartnerId, AppPage>>({
    alex: 'home',
    jamie: 'home',
  });

  // Lazy-load presentationDemoData.json ONLY when entering Presentation Demo Mode
  useEffect(() => {
    if (entryMode !== 'presentation' || presentationBundle) {
      return;
    }
    let cancelled = false;
    setPresentationLoading(true);
    loadPresentationBundle()
      .then((bundle) => {
        if (!cancelled) {
          setPresentationBundle(bundle);
          setPresentationLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPresentationLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [entryMode, presentationBundle]);

  // Persist Normal User Mode keys independently
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.NORMAL_USER, JSON.stringify(normalUser));
    } catch {
      // Ignore storage quota errors
    }
  }, [normalUser]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.NORMAL_RECORDS, JSON.stringify(normalRecords));
    } catch {
      // Ignore storage quota errors
    }
  }, [normalRecords]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.NORMAL_PAIRING, JSON.stringify(normalPairing));
    } catch {
      // Ignore storage quota errors
    }
  }, [normalPairing]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.NORMAL_PREFERENCES,
        JSON.stringify(normalPreferences)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [normalPreferences]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.NORMAL_INTERACTIONS,
        JSON.stringify(normalInteractions)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [normalInteractions]);

  // Persist Presentation Demo interactions independently
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.PRESENTATION_INTERACTIONS,
        JSON.stringify(presentationState)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [presentationState]);

  // Persist current application mode
  useEffect(() => {
    try {
      const modeToPersist = entryMode === 'onboarding' ? 'welcome' : entryMode;
      window.localStorage.setItem(STORAGE_KEYS.MODE, modeToPersist);
    } catch {
      // Ignore storage quota errors
    }
  }, [entryMode]);

  // Persist language across both modes
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    } catch {
      // Ignore storage quota errors
    }
  }, [language]);

  const normalBaseline = useMemo(
    () => analyzeNormalBaseline(normalRecords, normalUser.baselineStartDate),
    [normalRecords, normalUser.baselineStartDate]
  );

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  // Explicit mode navigation
  const enterOnboarding = () => {
    setEntryMode('onboarding');
  };

  const enterPresentationDemo = () => {
    setEntryMode('presentation');
  };

  const exitPresentationDemo = () => {
    if (normalUser.completed) {
      setNormalActivePage('home');
      setEntryMode('normal');
    } else {
      setEntryMode('welcome');
    }
  };

  const returnToWelcome = () => {
    setEntryMode('welcome');
  };

  const resumeNormalApp = () => {
    if (normalUser.completed) {
      setNormalActivePage('home');
      setEntryMode('normal');
    } else {
      setEntryMode('onboarding');
    }
  };

  /**
   * Complete Normal User Onboarding:
   * Initializes a clean Day 1 account with baselineStatus='building', validCheckInDays=0,
   * and an empty historical records array ([]). Never imports demo data.
   */
  const completeOnboarding = (draft: OnboardingDraft) => {
    const todayISO = getTodayLocalDateISO();
    const nowISO = new Date().toISOString();

    const cleanProfile: NormalUserProfile = {
      completed: true,
      completedAtISO: nowISO,
      nickname: draft.nickname.trim(),
      avatarId: draft.avatarId,
      baselineStartDate: todayISO,
      baselineStatus: 'building',
      validCheckInDays: 0,
      sharingConsent: {
        energy: draft.sharingConsent.energy,
        sleep: draft.sharingConsent.sleep,
        activity: draft.sharingConsent.activity,
        cycleReserved: false,
      },
      premiumDemoConfirmed: false,
    };

    const pairingCode =
      draft.pairingMethod === 'join' && draft.joinCodeInput.trim()
        ? draft.joinCodeInput.trim().toUpperCase()
        : draft.inviteCode || NORMAL_LOCAL_INVITE_CODE;

    const cleanPairing: NormalPairingState = {
      status: draft.pairingStatus,
      method: draft.pairingMethod,
      inviteCode: pairingCode,
      partnerHasRecords: false,
    };

    const cleanPreferences: NormalPreferencesState = {
      preferredCare: [...draft.preferredCare],
      avoidTags: [...draft.avoidTags],
      communicationStyle: draft.communicationStyle,
      customTags: [],
    };

    setNormalUser(cleanProfile);
    setNormalRecords([]); // Day 1 starts with 0 historical records
    setNormalPairing(cleanPairing);
    setNormalPreferences(cleanPreferences);
    setNormalInteractions(createInitialNormalInteractionsState());
    setNormalActivePage('home');
    setEntryMode('normal');
  };

  /**
   * Explicitly resets Normal User Mode data only.
   * Never deletes Presentation Demo interactions or Language preference.
   */
  const resetNormalAccount = () => {
    setNormalUser(createInitialNormalUserProfile());
    setNormalRecords([]);
    setNormalPairing(createInitialNormalPairingState());
    setNormalPreferences(createInitialNormalPreferencesState());
    setNormalInteractions(createInitialNormalInteractionsState());
    setNormalActivePage('home');
    setEntryMode('welcome');
  };

  /**
   * Creates or updates one NormalDailyRecord for today's local date.
   * Never duplicates same-day entries.
   */
  const recordNormalCheckIn = (option: CheckInOption) => {
    const timeLabel = formatNowTime();
    const nextRecords = upsertNormalDailyRecord(normalRecords, option, timeLabel, new Date());
    setNormalRecords(nextRecords);
    setNormalUser((prev) => ({
      ...prev,
      validCheckInDays: nextRecords.length,
      baselineStatus: nextRecords.length >= 7 ? 'preliminary' : 'building',
    }));
  };

  const pairNormalLocalPartner = (code?: string) => {
    const normalized = code?.trim().toUpperCase();
    setNormalPairing((prev) => ({
      status: 'paired_simulated',
      method: normalized ? 'join' : 'create',
      inviteCode: normalized || prev.inviteCode || NORMAL_LOCAL_INVITE_CODE,
      partnerHasRecords: false,
    }));
  };

  const toggleNormalSharing = (key: 'energy' | 'sleep' | 'activity') => {
    setNormalUser((prev) => ({
      ...prev,
      sharingConsent: {
        ...prev.sharingConsent,
        [key]: !prev.sharingConsent[key],
        cycleReserved: false,
      },
    }));
  };

  const addNormalCustomPreference = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setNormalPreferences((prev) => {
      const exists = prev.customTags.some(
        (tag) => (tag.customLabel ?? '').toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) return prev;
      return {
        ...prev,
        customTags: [
          ...prev.customTags,
          {
            id: `norm-pref-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            customLabel: trimmed,
          },
        ],
      };
    });
  };

  const removeNormalCustomPreference = (tagId: string) => {
    setNormalPreferences((prev) => ({
      ...prev,
      customTags: prev.customTags.filter((tag) => tag.id !== tagId),
    }));
  };

  const removeNormalPresetPreference = (
    kind: 'preferred' | 'avoid',
    key: PreferredCareTagKey | AvoidTagKey
  ) => {
    setNormalPreferences((prev) => ({
      ...prev,
      preferredCare:
        kind === 'preferred'
          ? prev.preferredCare.filter((k) => k !== key)
          : prev.preferredCare,
      avoidTags:
        kind === 'avoid' ? prev.avoidTags.filter((k) => k !== key) : prev.avoidTags,
    }));
  };

  const saveNormalSuggestion = (suggestion: NormalCareSuggestion): boolean => {
    if (normalInteractions.savedSuggestionIds.includes(suggestion.id)) {
      return false;
    }
    const timeLabel = formatNowTime();
    const dateISO = getTodayLocalDateISO();
    setNormalInteractions((prev) => {
      if (prev.savedSuggestionIds.includes(suggestion.id)) return prev;
      const newActivity: NormalCareActivityItem = {
        id: `norm-act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        kind: 'saved_care',
        suggestionId: suggestion.id,
        dateISO,
        timeLabel,
      };
      return {
        ...prev,
        savedSuggestionIds: [...prev.savedSuggestionIds, suggestion.id],
        careActivity: [newActivity, ...prev.careActivity].slice(0, 8),
      };
    });
    return true;
  };

  const sendNormalCare = (suggestion: NormalCareSuggestion, customMessage?: string) => {
    const timeLabel = formatNowTime();
    const dateISO = getTodayLocalDateISO();
    setNormalInteractions((prev) => {
      const newNotification: NormalCareNotification = {
        id: `norm-notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        direction: 'outgoing',
        suggestionId: suggestion.id,
        customMessage: customMessage?.trim() || undefined,
        dateISO,
        timeLabel,
        status: 'Sent',
      };
      const newActivity: NormalCareActivityItem = {
        id: `norm-act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        kind: 'sent_care',
        suggestionId: suggestion.id,
        dateISO,
        timeLabel,
      };
      return {
        ...prev,
        notifications: [newNotification, ...prev.notifications],
        careActivity: [newActivity, ...prev.careActivity].slice(0, 8),
      };
    });
  };

  const confirmNormalPremiumDemo = () => {
    setNormalUser((prev) => ({
      ...prev,
      premiumDemoConfirmed: true,
    }));
  };

  // Presentation Demo Mode actions (strictly scoped to presentationState)
  const setActivePage = (partner: PartnerId, page: AppPage) => {
    setActivePages((prev) => ({ ...prev, [partner]: page }));
  };

  const recordCheckIn = (partner: PartnerId, option: CheckInOption) => {
    dispatchPresentation({
      type: 'RECORD_CHECK_IN',
      partner,
      option,
      timeLabel: formatNowTime(),
    });
  };

  const toggleSharingPref = (partner: PartnerId, key: 'energy' | 'sleep' | 'activity') => {
    dispatchPresentation({ type: 'TOGGLE_SHARING', partner, key });
  };

  const addCarePreference = (partner: PartnerId, label: string) => {
    dispatchPresentation({ type: 'ADD_PREFERENCE', partner, label });
  };

  const removeCarePreference = (partner: PartnerId, tagId: string) => {
    dispatchPresentation({ type: 'REMOVE_PREFERENCE', partner, tagId });
  };

  const saveCareSuggestion = (partner: PartnerId, suggestion: CareSuggestion): boolean => {
    const alreadySaved = presentationState.savedSuggestionIds[partner].includes(suggestion.id);
    if (alreadySaved) return false;
    dispatchPresentation({
      type: 'SAVE_SUGGESTION',
      partner,
      suggestion,
      timeLabel: formatNowTime(),
    });
    return true;
  };

  const sendCareNotification = (
    sender: PartnerId,
    suggestion: CareSuggestion,
    customMessage?: string
  ) => {
    dispatchPresentation({
      type: 'SEND_CARE',
      sender,
      suggestion,
      customMessage,
      timeLabel: formatNowTime(),
    });
  };

  const updateNotificationStatus = (
    notificationId: string,
    status: NotificationStatus,
    responder: PartnerId
  ) => {
    dispatchPresentation({
      type: 'UPDATE_NOTIFICATION_STATUS',
      notificationId,
      status,
      responder,
      timeLabel: formatNowTime(),
    });
  };

  const confirmPremiumDemo = () => {
    dispatchPresentation({ type: 'CONFIRM_PREMIUM_DEMO' });
  };

  /**
   * Resets Presentation Demo interactions ONLY.
   * Preserves Normal User Mode profile/records and Language preference.
   */
  const resetDemo = () => {
    dispatchPresentation({ type: 'RESET_DEMO' });
    setActivePages({ alex: 'home', jamie: 'home' });
  };

  const unreadCountForPartner = (partner: PartnerId) => {
    return presentationState.notifications.filter(
      (n) => n.recipient === partner && n.status === 'Sent'
    ).length;
  };

  const t = TRANSLATIONS[language];

  return (
    <DualChargeContext.Provider
      value={{
        language,
        setLanguage,
        t,
        entryMode,
        enterOnboarding,
        enterPresentationDemo,
        exitPresentationDemo,
        returnToWelcome,
        resumeNormalApp,
        normalUser,
        normalRecords,
        normalPairing,
        normalPreferences,
        normalInteractions,
        normalBaseline,
        normalActivePage,
        setNormalActivePage,
        completeOnboarding,
        resetNormalAccount,
        recordNormalCheckIn,
        pairNormalLocalPartner,
        toggleNormalSharing,
        addNormalCustomPreference,
        removeNormalCustomPreference,
        removeNormalPresetPreference,
        saveNormalSuggestion,
        sendNormalCare,
        confirmNormalPremiumDemo,
        presentationBundle,
        presentationLoading,
        activePages,
        setActivePage,
        dailyCheckIns: presentationState.dailyCheckIns,
        recordCheckIn,
        sharingPrefs: presentationState.sharingPrefs,
        toggleSharingPref,
        carePreferences: presentationState.carePreferences,
        addCarePreference,
        removeCarePreference,
        savedSuggestionIds: presentationState.savedSuggestionIds,
        saveCareSuggestion,
        notifications: presentationState.notifications,
        sendCareNotification,
        updateNotificationStatus,
        careActivity: presentationState.careActivity,
        unreadCountForPartner,
        premiumDemoConfirmed: presentationState.premiumDemoConfirmed,
        confirmPremiumDemo,
        resetDemo,
      }}
    >
      {children}
    </DualChargeContext.Provider>
  );
}

export function useDualCharge() {
  const ctx = useContext(DualChargeContext);
  if (!ctx) {
    throw new Error('useDualCharge must be used within DualChargeProvider');
  }
  return ctx;
}

export { PRESENTATION_PAIRING_CODE };
