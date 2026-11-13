import {
  CheckInOption,
  NormalBaselineAnalysis,
  NormalDailyRecord,
  NormalEarlyInsightSummary,
  NormalWeekdayPatternSummary,
} from '@/src/types/dualcharge';

export const NORMAL_BASELINE_TARGET_DAYS = 7;
export const REQUIRED_WEEKDAY_REPEAT_WEEKS = 4;

const CHECK_IN_SCORE_MAP: Record<CheckInOption, number> = {
  good: 5,
  tired: 3,
  rest: 2,
};

export function checkInOptionToScore(option: CheckInOption): number {
  return CHECK_IN_SCORE_MAP[option];
}

export function getTodayLocalDateISO(referenceDate: Date = new Date()): string {
  const year = referenceDate.getFullYear();
  const month = String(referenceDate.getMonth() + 1).padStart(2, '0');
  const day = String(referenceDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDateISO(dateISO: string): Date {
  const [y, m, d] = dateISO.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/**
 * Compute Monday-based local week identifier (YYYY-Www) so repeated observations
 * of the same weekday can be counted strictly across distinct calendar weeks.
 */
export function getLocalWeekKey(dateISO: string): string {
  const date = parseLocalDateISO(dateISO);
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utcDate.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function getDayNumberSinceStart(
  baselineStartDate: string,
  todayDateISO: string = getTodayLocalDateISO()
): number {
  if (!baselineStartDate) return 1;
  const start = parseLocalDateISO(baselineStartDate);
  const today = parseLocalDateISO(todayDateISO);
  const diffDays = Math.floor((today.getTime() - start.getTime()) / 86400000);
  return Math.max(1, diffDays + 1);
}

/**
 * Create or update the single record for the given local calendar date.
 * Never duplicates same-day records.
 */
export function upsertNormalDailyRecord(
  existingRecords: NormalDailyRecord[],
  option: CheckInOption,
  timeLabel: string,
  referenceDate: Date = new Date()
): NormalDailyRecord[] {
  const dateISO = getTodayLocalDateISO(referenceDate);
  const weekdayIndex = referenceDate.getDay();
  const weekKey = getLocalWeekKey(dateISO);
  const nextRecord: NormalDailyRecord = {
    date: dateISO,
    weekdayIndex,
    weekKey,
    checkInStatus: option,
    selfReportedScore1To5: checkInOptionToScore(option),
    updatedAtTime: timeLabel,
    updatedAtISO: referenceDate.toISOString(),
  };

  const withoutToday = existingRecords.filter((rec) => rec.date !== dateISO);
  return [...withoutToday, nextRecord].sort((a, b) => a.date.localeCompare(b.date));
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildEarlyInsight(sortedRecords: NormalDailyRecord[]): NormalEarlyInsightSummary | null {
  if (sortedRecords.length < NORMAL_BASELINE_TARGET_DAYS) {
    return null;
  }

  const scores = sortedRecords.map((r) => r.selfReportedScore1To5);
  const sum = scores.reduce((acc, val) => acc + val, 0);
  const averageScore1To5 = roundToOneDecimal(sum / scores.length);
  const minScore1To5 = Math.min(...scores);
  const maxScore1To5 = Math.max(...scores);

  let transitionsCount = 0;
  for (let i = 1; i < sortedRecords.length; i++) {
    if (sortedRecords[i].checkInStatus !== sortedRecords[i - 1].checkInStatus) {
      transitionsCount++;
    }
  }

  const counts: Record<CheckInOption, number> = { good: 0, tired: 0, rest: 0 };
  for (const rec of sortedRecords) {
    counts[rec.checkInStatus]++;
  }

  let dominantStatus: CheckInOption = 'good';
  if (counts.tired > counts[dominantStatus]) dominantStatus = 'tired';
  if (counts.rest > counts[dominantStatus]) dominantStatus = 'rest';

  let variationKind: NormalEarlyInsightSummary['variationKind'] = 'steady';
  if (averageScore1To5 < 3.1) {
    variationKind = 'low_reserve';
  } else if (maxScore1To5 - minScore1To5 >= 2 || transitionsCount >= 3) {
    variationKind = 'fluctuating';
  }

  return {
    averageScore1To5,
    minScore1To5,
    maxScore1To5,
    variationKind,
    transitionsCount,
    dominantStatus,
  };
}

function analyzeWeekdayRepeats(
  sortedRecords: NormalDailyRecord[],
  overallAverage: number | null
): NormalWeekdayPatternSummary {
  const byWeekday = new Map<number, { weeks: Set<string>; scores: number[] }>();

  for (const rec of sortedRecords) {
    const entry = byWeekday.get(rec.weekdayIndex) ?? { weeks: new Set<string>(), scores: [] };
    entry.weeks.add(rec.weekKey);
    entry.scores.push(rec.selfReportedScore1To5);
    byWeekday.set(rec.weekdayIndex, entry);
  }

  let maxDistinctWeeksObserved = 0;
  let preliminaryLowWeekdayIndex: number | null = null;
  let preliminaryLowWeekdayMean: number | null = null;
  let preliminaryLowWeekdayWeeks = 0;

  byWeekday.forEach((entry, weekdayIdx) => {
    const distinctWeeks = entry.weeks.size;
    if (distinctWeeks > maxDistinctWeeksObserved) {
      maxDistinctWeeksObserved = distinctWeeks;
    }

    if (distinctWeeks >= REQUIRED_WEEKDAY_REPEAT_WEEKS && overallAverage !== null) {
      const mean = roundToOneDecimal(
        entry.scores.reduce((sum, val) => sum + val, 0) / entry.scores.length
      );
      if (
        overallAverage - mean >= 0.8 &&
        (preliminaryLowWeekdayMean === null || mean < preliminaryLowWeekdayMean)
      ) {
        preliminaryLowWeekdayIndex = weekdayIdx;
        preliminaryLowWeekdayMean = mean;
        preliminaryLowWeekdayWeeks = distinctWeeks;
      }
    }
  });

  return {
    hasEnoughWeekdayRepeats: maxDistinctWeeksObserved >= REQUIRED_WEEKDAY_REPEAT_WEEKS,
    maxDistinctWeeksObserved,
    requiredDistinctWeeks: REQUIRED_WEEKDAY_REPEAT_WEEKS,
    preliminaryLowWeekdayIndex,
    preliminaryLowWeekdayMean,
    preliminaryLowWeekdayWeeks,
  };
}

/**
 * Pure selector computing the Normal User baseline state solely from real user-entered records.
 */
export function analyzeNormalBaseline(
  records: NormalDailyRecord[],
  baselineStartDate: string,
  referenceDate: Date = new Date()
): NormalBaselineAnalysis {
  const todayDateISO = getTodayLocalDateISO(referenceDate);
  const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const recordedDaysCount = sortedRecords.length;
  const phase = recordedDaysCount >= NORMAL_BASELINE_TARGET_DAYS ? 'preliminary' : 'building';
  const todayRecord = sortedRecords.find((r) => r.date === todayDateISO);
  const earlyInsight = buildEarlyInsight(sortedRecords);
  const weekdayPattern = analyzeWeekdayRepeats(
    sortedRecords,
    earlyInsight?.averageScore1To5 ?? null
  );

  // Only permit history-based future estimates when >= 28 real recorded days AND >= 4 repeated weekday weeks exist
  const canShowFutureForecast =
    recordedDaysCount >= 28 && weekdayPattern.hasEnoughWeekdayRepeats;

  return {
    todayDateISO,
    currentDayNumber: getDayNumberSinceStart(baselineStartDate, todayDateISO),
    recordedDaysCount,
    progressTargetDays: NORMAL_BASELINE_TARGET_DAYS,
    phase,
    todayRecord,
    sortedRecords,
    earlyInsight,
    weekdayPattern,
    canShowFutureForecast,
  };
}
