import {
  CareActivityItem,
  CareNotification,
  CareSuggestion,
  ForecastDay,
  PartnerId,
  PreferenceTagItem,
  PresentationInteractionsState,
  SharingPreferences,
} from '@/src/types/dualcharge';

export const PRESENTATION_PAIRING_CODE = 'DC-4829';

export const PRESENTATION_FORECAST_7_DAYS: Record<PartnerId, ForecastDay[]> = {
  alex: [
    { dateISO: '2026-11-14', monthIndex: 10, dayOfMonth: 14, weekdayIndex: 6, estimatedEnergy: 81, confidence: 'High' },
    { dateISO: '2026-11-15', monthIndex: 10, dayOfMonth: 15, weekdayIndex: 0, estimatedEnergy: 83, confidence: 'High' },
    { dateISO: '2026-11-16', monthIndex: 10, dayOfMonth: 16, weekdayIndex: 1, estimatedEnergy: 78, confidence: 'Moderate' },
    { dateISO: '2026-11-17', monthIndex: 10, dayOfMonth: 17, weekdayIndex: 2, estimatedEnergy: 77, confidence: 'Moderate' },
    { dateISO: '2026-11-18', monthIndex: 10, dayOfMonth: 18, weekdayIndex: 3, estimatedEnergy: 79, confidence: 'Moderate' },
    { dateISO: '2026-11-19', monthIndex: 10, dayOfMonth: 19, weekdayIndex: 4, estimatedEnergy: 76, confidence: 'Moderate' },
    { dateISO: '2026-11-20', monthIndex: 10, dayOfMonth: 20, weekdayIndex: 5, estimatedEnergy: 78, confidence: 'Low' },
  ],
  jamie: [
    { dateISO: '2026-11-14', monthIndex: 10, dayOfMonth: 14, weekdayIndex: 6, estimatedEnergy: 68, confidence: 'High' },
    { dateISO: '2026-11-15', monthIndex: 10, dayOfMonth: 15, weekdayIndex: 0, estimatedEnergy: 74, confidence: 'High' },
    { dateISO: '2026-11-16', monthIndex: 10, dayOfMonth: 16, weekdayIndex: 1, estimatedEnergy: 70, confidence: 'Moderate' },
    { dateISO: '2026-11-17', monthIndex: 10, dayOfMonth: 17, weekdayIndex: 2, estimatedEnergy: 67, confidence: 'Moderate' },
    { dateISO: '2026-11-18', monthIndex: 10, dayOfMonth: 18, weekdayIndex: 3, estimatedEnergy: 63, confidence: 'Moderate' },
    {
      dateISO: '2026-11-19',
      monthIndex: 10,
      dayOfMonth: 19,
      weekdayIndex: 4,
      estimatedEnergy: 47,
      confidence: 'Moderate',
      isHighlighted: true,
    },
    { dateISO: '2026-11-20', monthIndex: 10, dayOfMonth: 20, weekdayIndex: 5, estimatedEnergy: 64, confidence: 'Low' },
  ],
};

export const PRESENTATION_CARE_SUGGESTIONS: CareSuggestion[] = [
  { id: 'care-jamie-warm-drink', recipient: 'jamie', category: 'warmth' },
  { id: 'care-jamie-quiet-evening', recipient: 'jamie', category: 'calm' },
  { id: 'care-jamie-gentle-checkin', recipient: 'jamie', category: 'message' },
  { id: 'care-alex-evening-walk', recipient: 'alex', category: 'calm' },
  { id: 'care-alex-fruit-tea', recipient: 'alex', category: 'warmth' },
  { id: 'care-alex-supportive-note', recipient: 'alex', category: 'message' },
];

export const INITIAL_PRESENTATION_SHARING_PREFS: Record<PartnerId, SharingPreferences> = {
  alex: { energy: true, sleep: false, activity: false, cycleReserved: false },
  jamie: { energy: true, sleep: false, activity: false, cycleReserved: false },
};

export const INITIAL_PRESENTATION_PREFERENCES: Record<PartnerId, PreferenceTagItem[]> = {
  alex: [
    { id: 'pref-a1', presetKey: 'alex_short_messages' },
    { id: 'pref-a2', presetKey: 'alex_evening_walks' },
    { id: 'pref-a3', presetKey: 'alex_fruit_tea' },
    { id: 'pref-a4', presetKey: 'alex_no_surprise_visits' },
  ],
  jamie: [
    { id: 'pref-j1', presetKey: 'jamie_quiet_time' },
    { id: 'pref-j2', presetKey: 'jamie_light_dinner' },
    { id: 'pref-j3', presetKey: 'jamie_warm_milk_tea' },
    { id: 'pref-j4', presetKey: 'jamie_gentle_checkins' },
    { id: 'pref-j5', presetKey: 'jamie_no_crowds' },
  ],
};

export const INITIAL_PRESENTATION_NOTIFICATIONS: CareNotification[] = [
  {
    id: 'notif-seed-1',
    sender: 'alex',
    recipient: 'jamie',
    suggestionId: 'care-jamie-gentle-checkin',
    timeLabel: '9:15 AM',
    isToday: true,
    status: 'Sent',
  },
];

export const INITIAL_PRESENTATION_CARE_ACTIVITY: CareActivityItem[] = [
  {
    id: 'act-seed-1',
    kind: 'seed_supportive',
    actor: 'alex',
    target: 'jamie',
    timeLabel: '9:15 AM',
    dayKind: 'today',
  },
  {
    id: 'act-seed-2',
    kind: 'seed_saved_evening',
    actor: 'jamie',
    timeLabel: '8:40 PM',
    dayKind: 'yesterday',
  },
];

export function createInitialPresentationInteractions(): PresentationInteractionsState {
  return {
    dailyCheckIns: {
      alex: { status: null, updatedAtTime: null, historyCount: 60 },
      jamie: { status: null, updatedAtTime: null, historyCount: 60 },
    },
    sharingPrefs: {
      alex: { ...INITIAL_PRESENTATION_SHARING_PREFS.alex },
      jamie: { ...INITIAL_PRESENTATION_SHARING_PREFS.jamie },
    },
    carePreferences: {
      alex: [...INITIAL_PRESENTATION_PREFERENCES.alex],
      jamie: [...INITIAL_PRESENTATION_PREFERENCES.jamie],
    },
    savedSuggestionIds: {
      alex: [],
      jamie: [],
    },
    notifications: INITIAL_PRESENTATION_NOTIFICATIONS.map((n) => ({ ...n })),
    careActivity: INITIAL_PRESENTATION_CARE_ACTIVITY.map((a) => ({ ...a })),
    premiumDemoConfirmed: false,
  };
}
