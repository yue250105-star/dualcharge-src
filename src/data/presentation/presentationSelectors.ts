import alexAvatar from '@/src/assets/images/avatar_alex_1794573748589.jpg';
import jamieAvatar from '@/src/assets/images/avatar_jamie_1794573749370.jpg';
import { PRESENTATION_FORECAST_7_DAYS } from '@/src/data/presentation/presentationConstants';
import {
  CanonicalPartnerId,
  EnergyIndexSummary,
  EnergyRecord,
  HistoricalEnergyPoint,
  PartnerId,
  PartnerProfile,
  PartnerProfileData,
  PresentationBundle,
  RawDemoDataset,
} from '@/src/types/dualcharge';

let cachedBundle: PresentationBundle | null = null;
let inFlightPromise: Promise<PresentationBundle> | null = null;

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function toCanonicalPartnerId(partner: PartnerId): CanonicalPartnerId {
  return partner === 'alex' ? 'partner_a' : 'partner_b';
}

function toHistoricalEnergyPoint(record: EnergyRecord): HistoricalEnergyPoint {
  const [yearStr, monthStr, dayStr] = record.date.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  const dayOfMonth = Number(dayStr);
  const localDate = new Date(year, monthIndex, dayOfMonth);
  const weekdayIndex = localDate.getDay();

  return {
    dateISO: record.date,
    monthIndex,
    dayOfMonth,
    weekdayIndex,
    isThursday: record.weekday === 'Thursday',
    energy: record.estimated_energy_index_0_to_100,
    prevNightSleepHours: record.sleep_hours,
  };
}

function getPartnerLast60Records(
  dataset: RawDemoDataset,
  canonicalId: CanonicalPartnerId
): EnergyRecord[] {
  return dataset.records
    .filter((record) => record.partner_id === canonicalId)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-60);
}

function computePartnerSummary(
  dataset: RawDemoDataset,
  partnerId: PartnerId,
  records: EnergyRecord[]
): EnergyIndexSummary {
  const canonicalPartnerId = toCanonicalPartnerId(partnerId);
  const latestRecord = records[records.length - 1];

  const totalEnergy = records.reduce(
    (sum, record) => sum + record.estimated_energy_index_0_to_100,
    0
  );
  const overallMean = records.length > 0 ? roundToOneDecimal(totalEnergy / records.length) : 0;

  const thursdayRecords = records.filter((record) => record.weekday === 'Thursday');
  const thursdayEnergySum = thursdayRecords.reduce(
    (sum, record) => sum + record.estimated_energy_index_0_to_100,
    0
  );
  const thursdayMean =
    thursdayRecords.length > 0 ? roundToOneDecimal(thursdayEnergySum / thursdayRecords.length) : 0;

  const prevDaySleepValues: number[] = [];
  for (let i = 1; i < records.length; i++) {
    if (records[i].weekday === 'Thursday') {
      prevDaySleepValues.push(records[i - 1].sleep_hours);
    }
  }
  const prevDayBeforeThursdaySleepMean =
    prevDaySleepValues.length > 0
      ? roundToOneDecimal(
          prevDaySleepValues.reduce((sum, hours) => sum + hours, 0) / prevDaySleepValues.length
        )
      : 0;

  return {
    partnerId,
    canonicalPartnerId,
    recordCount: records.length,
    dateRange: {
      start: records[0]?.date ?? dataset.date_range.start,
      end: latestRecord?.date ?? dataset.date_range.end,
      days: records.length,
    },
    latestEnergy: latestRecord?.estimated_energy_index_0_to_100 ?? 0,
    overallMean,
    thursdayMean,
    thursdayCount: thursdayRecords.length,
    prevDayBeforeThursdaySleepMean,
  };
}

export function buildPresentationBundle(dataset: RawDemoDataset): PresentationBundle {
  const alexRecords = getPartnerLast60Records(dataset, 'partner_a');
  const jamieRecords = getPartnerLast60Records(dataset, 'partner_b');

  const alexSummary = computePartnerSummary(dataset, 'alex', alexRecords);
  const jamieSummary = computePartnerSummary(dataset, 'jamie', jamieRecords);

  const alexLatest = alexRecords[alexRecords.length - 1];
  const jamieLatest = jamieRecords[jamieRecords.length - 1];

  const alexHistoryPoints = alexRecords.map(toHistoricalEnergyPoint);
  const jamieHistoryPoints = jamieRecords.map(toHistoricalEnergyPoint);

  const buildPartnerMeta = (partnerId: PartnerId): PartnerProfile => {
    const canonicalId = toCanonicalPartnerId(partnerId);
    const rawPartner = dataset.partners[canonicalId];
    return {
      id: partnerId,
      canonicalId,
      display_name: rawPartner.display_name,
      role: rawPartner.role,
      care_preferences: {
        preferred_care: [...rawPartner.care_preferences.preferred_care],
        food_preferences: [...rawPartner.care_preferences.food_preferences],
        avoid: [...rawPartner.care_preferences.avoid],
        communication_style: rawPartner.care_preferences.communication_style,
      },
      shared_fields: [...rawPartner.shared_fields],
      pattern_note: rawPartner.pattern_note,
    };
  };

  const alexMeta = buildPartnerMeta('alex');
  const jamieMeta = buildPartnerMeta('jamie');

  const alexProfileData: PartnerProfileData = {
    id: 'alex',
    name: alexMeta.display_name,
    avatarUrl: alexAvatar,
    latestEnergy: alexLatest.estimated_energy_index_0_to_100,
    todaySummary: {
      sleepDurationHours: alexLatest.sleep_hours,
      sleepQualityScore: alexLatest.sleep_quality_1_to_5,
      activityMinutes: alexLatest.activity_minutes,
    },
    insights: {
      hasPattern: false,
      overallAvgEnergy: alexSummary.overallMean,
      historical60Days: alexHistoryPoints,
      forecast7Days: PRESENTATION_FORECAST_7_DAYS.alex,
    },
  };

  const jamieProfileData: PartnerProfileData = {
    id: 'jamie',
    name: jamieMeta.display_name,
    avatarUrl: jamieAvatar,
    latestEnergy: jamieLatest.estimated_energy_index_0_to_100,
    todaySummary: {
      sleepDurationHours: jamieLatest.sleep_hours,
      sleepQualityScore: jamieLatest.sleep_quality_1_to_5,
      activityMinutes: jamieLatest.activity_minutes,
    },
    insights: {
      hasPattern: true,
      overallAvgEnergy: jamieSummary.overallMean,
      thursdayAvgEnergy: jamieSummary.thursdayMean,
      thursdayObservations: jamieSummary.thursdayCount,
      prevDayAvgSleepHours: jamieSummary.prevDayBeforeThursdaySleepMean,
      historical60Days: jamieHistoryPoints,
      forecast7Days: PRESENTATION_FORECAST_7_DAYS.jamie,
    },
  };

  return {
    dateRange: dataset.date_range,
    disclaimer: dataset.disclaimer,
    partnerMeta: { alex: alexMeta, jamie: jamieMeta },
    partnerProfiles: { alex: alexProfileData, jamie: jamieProfileData },
    summaries: { alex: alexSummary, jamie: jamieSummary },
    latestRecords: { alex: alexLatest, jamie: jamieLatest },
    historicalPoints: { alex: alexHistoryPoints, jamie: jamieHistoryPoints },
    partnerCarePrefs: {
      alex: alexMeta.care_preferences,
      jamie: jamieMeta.care_preferences,
    },
  };
}

/**
 * Lazy-load the canonical 60-day JSON dataset strictly for Presentation Demo Mode.
 * Never invoked during welcome, onboarding, or normal-user initialization.
 */
export async function loadPresentationBundle(): Promise<PresentationBundle> {
  if (cachedBundle) {
    return cachedBundle;
  }
  if (!inFlightPromise) {
    inFlightPromise = import('@/src/data/presentation/presentationDemoData.json').then((mod) => {
      const dataset = (mod.default ?? mod) as RawDemoDataset;
      cachedBundle = buildPresentationBundle(dataset);
      return cachedBundle;
    });
  }
  return inFlightPromise;
}

export function getCachedPresentationBundle(): PresentationBundle | null {
  return cachedBundle;
}
