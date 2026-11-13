import {
  AvoidTagKey,
  NormalCareSuggestion,
  PreferredCareTagKey,
} from '@/src/types/dualcharge';

export const NORMAL_CARE_CATALOG: NormalCareSuggestion[] = [
  {
    id: 'norm-care-warm-drinks',
    category: 'warmth',
    matchedPreferenceKey: 'warm_drinks',
  },
  {
    id: 'norm-care-gentle-messages',
    category: 'message',
    matchedPreferenceKey: 'gentle_messages',
    excludedByAvoidKeys: ['frequent_messages'],
  },
  {
    id: 'norm-care-quiet-time',
    category: 'calm',
    matchedPreferenceKey: 'quiet_time',
  },
  {
    id: 'norm-care-light-meals',
    category: 'warmth',
    matchedPreferenceKey: 'light_meals',
  },
  {
    id: 'norm-care-relaxing-walks',
    category: 'calm',
    matchedPreferenceKey: 'relaxing_walks',
    excludedByAvoidKeys: ['crowded_places'],
  },
  {
    id: 'norm-care-small-surprises',
    category: 'message',
    matchedPreferenceKey: 'small_surprises',
    excludedByAvoidKeys: ['surprise_visits', 'last_minute_plans'],
  },
];

const DEFAULT_FALLBACK_IDS = [
  'norm-care-gentle-messages',
  'norm-care-quiet-time',
  'norm-care-warm-drinks',
];

/**
 * Select general preference-based care ideas strictly from the user's explicit
 * onboarding selections — never referencing Alex, Jamie, or demo history.
 */
export function selectNormalCareSuggestions(
  preferredCare: PreferredCareTagKey[],
  avoidTags: AvoidTagKey[]
): NormalCareSuggestion[] {
  const safeCatalog = NORMAL_CARE_CATALOG.filter((item) => {
    if (!item.excludedByAvoidKeys) return true;
    return !item.excludedByAvoidKeys.some((avoid) => avoidTags.includes(avoid));
  });

  if (preferredCare.length > 0) {
    const matched = safeCatalog.filter(
      (item) => item.matchedPreferenceKey && preferredCare.includes(item.matchedPreferenceKey)
    );
    if (matched.length > 0) {
      return matched;
    }
  }

  const fallback = safeCatalog.filter((item) => DEFAULT_FALLBACK_IDS.includes(item.id));
  return fallback.length > 0 ? fallback : safeCatalog.slice(0, 3);
}
