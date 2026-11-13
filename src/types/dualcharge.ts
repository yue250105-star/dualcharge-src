export type PartnerId = 'alex' | 'jamie';

export type CanonicalPartnerId = 'partner_a' | 'partner_b';

export type AppPage = 'home' | 'insights' | 'care' | 'notifications' | 'profile';

export type CheckInOption = 'good' | 'tired' | 'rest';

export type NotificationStatus = 'Sent' | 'Received' | 'Completed';

export type LanguageCode = 'en' | 'zh-CN' | 'zh-TW';

export interface EnergyRecord {
  date: string;
  weekday: string;
  partner_id: CanonicalPartnerId;
  sleep_hours: number;
  sleep_quality_1_to_5: number;
  activity_minutes: number;
  self_reported_energy_1_to_5: number;
  estimated_energy_index_0_to_100: number;
  is_simulated: boolean;
}

export interface PartnerCarePreferences {
  preferred_care: string[];
  food_preferences: string[];
  avoid: string[];
  communication_style: string;
}

export interface PartnerProfile {
  id: PartnerId;
  canonicalId: CanonicalPartnerId;
  display_name: string;
  role: string;
  care_preferences: PartnerCarePreferences;
  shared_fields: string[];
  pattern_note: string;
}

export interface DatasetDateRange {
  start: string;
  end: string;
  days: number;
}

export interface PartnerHistory {
  partnerId: PartnerId;
  canonicalPartnerId: CanonicalPartnerId;
  dateRange: DatasetDateRange;
  records: EnergyRecord[];
  latestRecord: EnergyRecord;
}

export interface EnergyIndexSummary {
  partnerId: PartnerId;
  canonicalPartnerId: CanonicalPartnerId;
  recordCount: number;
  dateRange: DatasetDateRange;
  latestEnergy: number;
  overallMean: number;
  thursdayMean: number;
  thursdayCount: number;
  prevDayBeforeThursdaySleepMean: number;
}

export interface RawDemoDataset {
  project: string;
  dataset_version: string;
  dataset_type: string;
  date_range: DatasetDateRange;
  disclaimer: string;
  energy_index_formula: {
    sleep_duration_score: string;
    sleep_quality_score: string;
    self_report_score: string;
    final: string;
    interpretation: string;
  };
  partners: Record<
    CanonicalPartnerId,
    {
      display_name: string;
      role: string;
      care_preferences: PartnerCarePreferences;
      shared_fields: string[];
      pattern_note: string;
    }
  >;
  records: EnergyRecord[];
  validation_summary: Record<
    CanonicalPartnerId,
    {
      n_days: number;
      overall_mean_energy_index: number;
      weekday_means: Record<string, { n: number; mean_energy_index: number }>;
    }
  >;
}

export interface DailyCheckInState {
  status: CheckInOption | null;
  updatedAtTime: string | null;
  historyCount: number;
}

export interface SharingPreferences {
  energy: boolean;
  sleep: boolean;
  activity: boolean;
  cycleReserved: boolean;
}

export interface HistoricalEnergyPoint {
  dateISO: string;
  monthIndex: number;
  dayOfMonth: number;
  weekdayIndex: number;
  isThursday: boolean;
  energy: number;
  prevNightSleepHours: number;
}

export interface ForecastDay {
  dateISO: string;
  monthIndex: number;
  dayOfMonth: number;
  weekdayIndex: number;
  estimatedEnergy: number;
  confidence: 'High' | 'Moderate' | 'Low';
  isHighlighted?: boolean;
}

export interface CareSuggestion {
  id: string;
  recipient: PartnerId;
  category: 'warmth' | 'calm' | 'message';
}

export interface CareNotification {
  id: string;
  sender: PartnerId;
  recipient: PartnerId;
  suggestionId: string;
  customMessage?: string;
  timeLabel: string;
  isToday: boolean;
  status: NotificationStatus;
}

export interface CareActivityItem {
  id: string;
  kind: 'sent_care' | 'saved_care' | 'completed_care' | 'seed_supportive' | 'seed_saved_evening';
  actor: PartnerId;
  target?: PartnerId;
  suggestionId?: string;
  timeLabel: string;
  dayKind: 'today' | 'yesterday';
}

export interface PreferenceTagItem {
  id: string;
  presetKey?: string;
  customLabel?: string;
}

export interface PartnerProfileData {
  id: PartnerId;
  name: string;
  avatarUrl: string;
  latestEnergy: number;
  todaySummary: {
    sleepDurationHours: number;
    sleepQualityScore: number;
    activityMinutes: number;
  };
  insights: {
    hasPattern: boolean;
    overallAvgEnergy: number;
    thursdayAvgEnergy?: number;
    thursdayObservations?: number;
    prevDayAvgSleepHours?: number;
    historical60Days: HistoricalEnergyPoint[];
    forecast7Days: ForecastDay[];
  };
}

export interface PresentationBundle {
  dateRange: DatasetDateRange;
  disclaimer: string;
  partnerMeta: Record<PartnerId, PartnerProfile>;
  partnerProfiles: Record<PartnerId, PartnerProfileData>;
  summaries: Record<PartnerId, EnergyIndexSummary>;
  latestRecords: Record<PartnerId, EnergyRecord>;
  historicalPoints: Record<PartnerId, HistoricalEnergyPoint[]>;
  partnerCarePrefs: Record<PartnerId, PartnerCarePreferences>;
}

export interface PresentationInteractionsState {
  dailyCheckIns: Record<PartnerId, DailyCheckInState>;
  sharingPrefs: Record<PartnerId, SharingPreferences>;
  carePreferences: Record<PartnerId, PreferenceTagItem[]>;
  savedSuggestionIds: Record<PartnerId, string[]>;
  notifications: CareNotification[];
  careActivity: CareActivityItem[];
  premiumDemoConfirmed: boolean;
}

export type AppEntryMode = 'welcome' | 'onboarding' | 'normal' | 'presentation';

export type OnboardingAvatarId =
  | 'coral-glow'
  | 'lavender-mist'
  | 'sage-calm'
  | 'warm-amber'
  | 'photo-a'
  | 'photo-b';

export type PreferredCareTagKey =
  | 'warm_drinks'
  | 'gentle_messages'
  | 'quiet_time'
  | 'light_meals'
  | 'relaxing_walks'
  | 'small_surprises';

export type AvoidTagKey =
  | 'crowded_places'
  | 'surprise_visits'
  | 'frequent_messages'
  | 'last_minute_plans';

export type CommunicationStyleKey =
  | 'gentle_supportive'
  | 'short_direct'
  | 'playful_cheerful';

export type NormalPairingMethod = 'create' | 'join' | 'later';
export type NormalPairingStatus = 'unpaired' | 'paired_simulated';
export type NormalBaselineStatus = 'building' | 'preliminary';

export interface OnboardingDraft {
  nickname: string;
  avatarId: OnboardingAvatarId;
  pairingMethod: NormalPairingMethod;
  inviteCode: string;
  joinCodeInput: string;
  pairingStatus: NormalPairingStatus;
  sharingConsent: SharingPreferences;
  preferredCare: PreferredCareTagKey[];
  avoidTags: AvoidTagKey[];
  communicationStyle: CommunicationStyleKey | null;
}

export interface NormalUserProfile {
  completed: boolean;
  completedAtISO: string | null;
  nickname: string;
  avatarId: OnboardingAvatarId;
  baselineStartDate: string;
  baselineStatus: NormalBaselineStatus;
  validCheckInDays: number;
  sharingConsent: SharingPreferences;
  premiumDemoConfirmed: boolean;
}

export interface NormalDailyRecord {
  date: string; // YYYY-MM-DD local calendar date
  weekdayIndex: number; // 0 (Sun) - 6 (Sat)
  weekKey: string; // YYYY-Www (Monday-based local week)
  checkInStatus: CheckInOption;
  selfReportedScore1To5: number;
  updatedAtTime: string;
  updatedAtISO: string;
}

export interface NormalPairingState {
  status: NormalPairingStatus;
  method: NormalPairingMethod;
  inviteCode: string;
  partnerHasRecords: boolean;
}

export interface NormalPreferencesState {
  preferredCare: PreferredCareTagKey[];
  avoidTags: AvoidTagKey[];
  communicationStyle: CommunicationStyleKey | null;
  customTags: PreferenceTagItem[];
}

export interface NormalCareNotification {
  id: string;
  direction: 'outgoing';
  suggestionId: string;
  customMessage?: string;
  dateISO: string;
  timeLabel: string;
  status: NotificationStatus;
}

export interface NormalCareActivityItem {
  id: string;
  kind: 'sent_care' | 'saved_care';
  suggestionId: string;
  dateISO: string;
  timeLabel: string;
}

export interface NormalInteractionsState {
  savedSuggestionIds: string[];
  notifications: NormalCareNotification[];
  careActivity: NormalCareActivityItem[];
}

export interface NormalCareSuggestion {
  id: string;
  category: 'warmth' | 'calm' | 'message';
  matchedPreferenceKey?: PreferredCareTagKey;
  excludedByAvoidKeys?: AvoidTagKey[];
}

export interface NormalEarlyInsightSummary {
  averageScore1To5: number;
  minScore1To5: number;
  maxScore1To5: number;
  variationKind: 'steady' | 'fluctuating' | 'low_reserve';
  transitionsCount: number;
  dominantStatus: CheckInOption;
}

export interface NormalWeekdayPatternSummary {
  hasEnoughWeekdayRepeats: boolean;
  maxDistinctWeeksObserved: number;
  requiredDistinctWeeks: number;
  preliminaryLowWeekdayIndex: number | null;
  preliminaryLowWeekdayMean: number | null;
  preliminaryLowWeekdayWeeks: number;
}

export interface NormalBaselineAnalysis {
  todayDateISO: string;
  currentDayNumber: number;
  recordedDaysCount: number;
  progressTargetDays: number;
  phase: NormalBaselineStatus;
  todayRecord: NormalDailyRecord | undefined;
  sortedRecords: NormalDailyRecord[];
  earlyInsight: NormalEarlyInsightSummary | null;
  weekdayPattern: NormalWeekdayPatternSummary;
  canShowFutureForecast: boolean;
}
