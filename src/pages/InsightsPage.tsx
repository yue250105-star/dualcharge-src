import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CalendarHeart,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Lock,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { ForecastChart, HistoricalTrendChart } from '@/src/components/ui/Charts';
import { getEnergyStateStyle } from '@/src/components/ui/EnergyIndicator';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import { ForecastDay, PartnerId } from '@/src/types/dualcharge';

interface InsightsPageProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

function NormalInsightsContent() {
  const {
    normalUser,
    normalPairing,
    normalBaseline,
    setNormalActivePage,
    t,
  } = useDualCharge();

  const [tab, setTab] = useState<'self' | 'partner'>('self');

  const {
    currentDayNumber,
    recordedDaysCount,
    progressTargetDays,
    phase,
    sortedRecords,
    earlyInsight,
    weekdayPattern,
    canShowFutureForecast,
  } = normalBaseline;

  const myDisplayName = normalUser.nickname || 'You';
  const partnerDisplayName = t.normalMode.partnerDisplayName;
  const progressPct = Math.min(100, Math.round((recordedDaysCount / progressTargetDays) * 100));

  return (
    <div className="space-y-4 pb-2">
      {/* Page Heading */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-[20px] font-semibold tracking-tight text-[#292832]">
            {t.insights.title}
          </h1>
          <span className="text-[11px] font-semibold text-[#8E4D42] bg-[#F5E8E7] px-2.5 py-0.5 rounded-xl">
            {formatTemplate(t.normalMode.dayBadgeTemplate, { day: currentDayNumber })}
          </span>
        </div>
        <p className="text-[12.5px] text-[#85838D] mt-0.5">{t.insights.subtitle}</p>
      </div>

      {/* My Pattern vs Partner Shared */}
      <div
        role="tablist"
        aria-label={t.insights.title}
        className="grid grid-cols-2 gap-1 p-1 bg-[#F4EFEA] rounded-2xl"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'self'}
          onClick={() => setTab('self')}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap px-2 ${
            tab === 'self'
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          {formatTemplate(t.insights.myPatternTab, { name: myDisplayName })}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'partner'}
          onClick={() => setTab('partner')}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap px-2 ${
            tab === 'partner'
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          {formatTemplate(t.insights.partnerSharedTab, { name: partnerDisplayName })}
        </button>
      </div>

      {tab === 'partner' ? (
        <div className="bg-white/85 backdrop-blur-[10px] rounded-[22px] p-5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] text-center space-y-2.5">
          <div className="w-10 h-10 rounded-full bg-[#EFEDF5] flex items-center justify-center mx-auto">
            {normalPairing.status === 'paired_simulated' ? (
              <Clock className="w-5 h-5 text-[#706794]" strokeWidth={1.75} />
            ) : (
              <UserPlus className="w-5 h-5 text-[#706794]" strokeWidth={1.75} />
            )}
          </div>
          <div className="font-display text-[14.5px] font-semibold text-[#292832]">
            {normalPairing.status === 'paired_simulated'
              ? t.normalMode.waitingForPartnerTitle
              : t.normalMode.invitePartnerTitle}
          </div>
          <p className="text-[12px] text-[#85838D] leading-relaxed">
            {normalPairing.status === 'paired_simulated'
              ? t.normalMode.waitingForPartnerCheckInBody
              : t.normalMode.invitePartnerBody}
          </p>
        </div>
      ) : (
        <>
          {/* Observed Personal Records So Far (never 60-day demo chart) */}
          <section className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
                {formatTemplate(t.normalMode.observedSoFarTitle, { count: recordedDaysCount })}
              </h2>
              <span className="text-[11px] font-semibold text-[#706794]">
                {phase === 'building'
                  ? t.normalMode.baselineBuildingBadge
                  : t.normalMode.earlyInsightBadge}
              </span>
            </div>

            {/* 7-day progress bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#292832] tabular-nums">
                <span>
                  {formatTemplate(t.normalMode.recordedDaysProgress, {
                    count: recordedDaysCount,
                    target: progressTargetDays,
                  })}
                </span>
                <span className="text-[#85838D]">{progressPct}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#F4EFEA] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E88C7D] to-[#9B93B8] transition-all duration-300"
                  style={{ width: `${Math.max(progressPct, recordedDaysCount > 0 ? 8 : 0)}%` }}
                />
              </div>
            </div>

            {sortedRecords.length === 0 ? (
              <div className="rounded-2xl bg-[#FDFBFA] border border-dashed border-[#292832]/12 p-4 text-center text-[12px] text-[#85838D] leading-relaxed">
                {t.normalMode.observedSoFarEmpty}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1.5 items-end pt-2">
                  {sortedRecords.slice(-7).map((rec) => {
                    const barHeightPx = Math.max(18, Math.round((rec.selfReportedScore1To5 / 5) * 68));
                    const weekdayShort = t.calendar.weekdaysShort[rec.weekdayIndex];
                    const shortDay = rec.date.slice(5);
                    return (
                      <div
                        key={rec.date}
                        className="flex flex-col items-center rounded-2xl bg-[#FDFBFA] border border-[#292832]/[0.05] py-2 px-0.5"
                      >
                        <span className="text-[11px] font-bold text-[#292832] tabular-nums mb-1">
                          {rec.selfReportedScore1To5}
                        </span>
                        <div className="w-full h-[70px] flex items-end justify-center px-1">
                          <div
                            className="w-full max-w-[18px] rounded-t-full rounded-b-md bg-[#E88C7D]/85 transition-all duration-300"
                            style={{ height: `${barHeightPx}px` }}
                          />
                        </div>
                        <span className="text-[9.5px] font-medium text-[#292832] mt-1">
                          {weekdayShort}
                        </span>
                        <span className="text-[9px] text-[#85838D] tabular-nums">{shortDay}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[10.5px] text-[#85838D] text-center">
                  {t.normalMode.selfReportedScaleNote}
                </div>
              </div>
            )}
          </section>

          {/* Baseline Building (Days 1-6) OR Early Insight (>= 7 Distinct Days) */}
          {phase === 'building' || !earlyInsight ? (
            <section className="bg-white/85 backdrop-blur-[10px] ring-1 ring-[#9B93B8]/25 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EFEDF5] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#706794]" strokeWidth={2} />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display text-[15px] font-semibold text-[#292832] leading-snug">
                    {t.normalMode.insightsBuildingTitle}
                  </h2>
                  <p className="text-[12px] text-[#85838D] leading-relaxed">
                    {t.normalMode.insightsBuildingBody}
                  </p>
                </div>
              </div>
            </section>
          ) : (
            <section className="bg-white/85 backdrop-blur-[10px] ring-1 ring-[#9B93B8]/25 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F5E8E7] flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarHeart className="w-4 h-4 text-[#C45E4E]" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#706794]">
                    {t.normalMode.earlyInsightBadge}
                  </span>
                  <h2 className="font-display text-[15px] font-semibold text-[#292832] mt-0.5 leading-snug">
                    {t.normalMode.earlyInsightTitle}
                  </h2>
                  <p className="text-[11.5px] text-[#85838D] mt-0.5">
                    {formatTemplate(t.normalMode.earlyInsightSubtitle, {
                      count: recordedDaysCount,
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">{t.normalMode.avgScoreLabel}</div>
                  <div className="font-display text-[17px] font-bold text-[#292832] tabular-nums mt-0.5">
                    {earlyInsight.averageScore1To5} / 5
                  </div>
                </div>
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">{t.normalMode.scoreRangeLabel}</div>
                  <div className="font-display text-[17px] font-bold text-[#292832] tabular-nums mt-0.5">
                    {earlyInsight.minScore1To5} – {earlyInsight.maxScore1To5}
                  </div>
                </div>
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">
                    {t.normalMode.dayTransitionsLabel}
                  </div>
                  <div className="font-display text-[17px] font-bold text-[#292832] tabular-nums mt-0.5">
                    {earlyInsight.transitionsCount}
                  </div>
                </div>
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">
                    {t.normalMode.mostCommonFeelingLabel}
                  </div>
                  <div className="font-display text-[13px] font-bold text-[#292832] mt-1 truncate">
                    {t.home.checkInOptions[earlyInsight.dominantStatus].label}
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[#292832]/85 leading-relaxed">
                {t.normalMode.variationNotes[earlyInsight.variationKind]}
              </p>
            </section>
          )}

          {/* Weekly Pattern Detection (requires >= 4 distinct weeks per weekday) */}
          <section className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2">
            <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
              {t.normalMode.weeklyPatternTitle}
            </h2>
            {weekdayPattern.hasEnoughWeekdayRepeats &&
            weekdayPattern.preliminaryLowWeekdayIndex !== null &&
            weekdayPattern.preliminaryLowWeekdayMean !== null ? (
              <div className="space-y-1.5">
                <span className="inline-block text-[10.5px] font-semibold text-[#706794] bg-[#EFEDF5] px-2.5 py-0.5 rounded-lg">
                  {t.normalMode.preliminaryWeeklyPatternBadge}
                </span>
                <p className="text-[12px] text-[#292832]/85 leading-relaxed">
                  {formatTemplate(t.normalMode.preliminaryWeeklyPatternBody, {
                    weeks: weekdayPattern.preliminaryLowWeekdayWeeks,
                    weekday: t.calendar.weekdaysFull[weekdayPattern.preliminaryLowWeekdayIndex],
                    mean: weekdayPattern.preliminaryLowWeekdayMean,
                  })}
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[12.5px] font-medium text-[#292832]">
                  {t.normalMode.notEnoughWeekdayRepeats}
                </p>
                <p className="text-[11.5px] text-[#85838D] leading-relaxed">
                  {formatTemplate(t.normalMode.weeklyPatternRequirementNote, {
                    weeks: weekdayPattern.maxDistinctWeeksObserved,
                  })}
                </p>
              </div>
            )}
          </section>

          {/* Future Predictions Disabled Until Sufficient Personal Multi-Week History */}
          {!canShowFutureForecast && (
            <section className="bg-[#FDFBFA] border border-[#292832]/[0.06] rounded-[22px] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#292832]">
                <Lock className="w-4 h-4 text-[#85838D] shrink-0" />
                <span>{t.normalMode.futureEstimatesInactiveTitle}</span>
              </div>
              <p className="text-[11.5px] text-[#85838D] leading-relaxed">
                {t.normalMode.futureEstimatesInactiveBody}
              </p>
            </section>
          )}
        </>
      )}

      {/* Care Action Entry */}
      <button
        type="button"
        onClick={() => setNormalActivePage('care')}
        className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white font-display text-[13.5px] font-semibold flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(232,140,125,0.55)] transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#292832]"
      >
        <span>{t.insights.viewCareSuggestions}</span>
        <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}

function PresentationInsightsContent({ partnerId }: { partnerId: PartnerId }) {
  const { presentationBundle, setActivePage, sharingPrefs, t, language } = useDualCharge();

  const otherPartnerId: PartnerId = partnerId === 'alex' ? 'jamie' : 'alex';
  const [viewedSubject, setViewedSubject] = useState<PartnerId>(partnerId);
  const [evidenceExpanded, setEvidenceExpanded] = useState<boolean>(false);

  if (!presentationBundle) {
    return (
      <div className="py-12 text-center text-[13px] text-[#85838D]">
        {t.welcome.loadingPresentationDemo}
      </div>
    );
  }

  const subjectProfile = presentationBundle.partnerProfiles[viewedSubject];
  const subjectMetadata = presentationBundle.partnerMeta[viewedSubject];
  const subjectSummary = presentationBundle.summaries[viewedSubject];
  const historical60Days = presentationBundle.historicalPoints[viewedSubject];
  const { insights } = subjectProfile;

  const isViewingPartner = viewedSubject !== partnerId;
  const isEnergyShared = sharingPrefs[viewedSubject].energy;
  const isSleepAllowed = !isViewingPartner || sharingPrefs[viewedSubject].sleep;

  const defaultHighlightedDay =
    insights.forecast7Days.find((d) => d.isHighlighted) ?? insights.forecast7Days[5];
  const [selectedForecastDay, setSelectedForecastDay] =
    useState<ForecastDay>(defaultHighlightedDay);

  const handleSwitchSubject = (nextSubject: PartnerId) => {
    setViewedSubject(nextSubject);
    const nextForecast = presentationBundle.partnerProfiles[nextSubject].insights.forecast7Days;
    setSelectedForecastDay(nextForecast.find((d) => d.isHighlighted) ?? nextForecast[5]);
  };

  const activeForecast =
    insights.forecast7Days.find((d) => d.dateISO === selectedForecastDay.dateISO) ??
    defaultHighlightedDay;
  const forecastStyle = getEnergyStateStyle(activeForecast.estimatedEnergy);

  const myDisplayName = presentationBundle.partnerProfiles[partnerId].name;
  const partnerDisplayName = presentationBundle.partnerProfiles[otherPartnerId].name;
  const activeSubjectName = isViewingPartner ? partnerDisplayName : myDisplayName;

  const formatFullForecastDate = (day: ForecastDay) => {
    const weekday = t.calendar.weekdaysFull[day.weekdayIndex];
    const month = t.calendar.monthsFull[day.monthIndex];
    if (language === 'en') {
      return `${weekday}, ${day.dayOfMonth} ${month} 2026`;
    }
    return `2026年${month}${day.dayOfMonth}日 ${weekday}`;
  };

  const evidenceObserved =
    viewedSubject === 'jamie' ? t.insights.jamieEvidenceObserved : t.insights.alexEvidenceObserved;
  const evidenceEstimated =
    viewedSubject === 'jamie'
      ? t.insights.jamieEvidenceEstimated
      : t.insights.alexEvidenceEstimated;

  return (
    <div className="space-y-4 pb-2">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-display text-[20px] font-semibold tracking-tight text-[#292832]">
            {t.insights.title}
          </h1>
          <span className="text-[10.5px] text-[#85838D]">{t.meta.simulatedDemoData}</span>
        </div>
        <p className="text-[12.5px] text-[#85838D] mt-0.5">{t.insights.subtitle}</p>
      </div>

      {/* Segmented View Toggle */}
      <div
        role="tablist"
        aria-label={t.insights.title}
        className="grid grid-cols-2 gap-1 p-1 bg-[#F4EFEA] rounded-2xl"
      >
        <button
          type="button"
          role="tab"
          aria-selected={viewedSubject === partnerId}
          onClick={() => handleSwitchSubject(partnerId)}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap px-2 ${
            viewedSubject === partnerId
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          {formatTemplate(t.insights.myPatternTab, { name: myDisplayName })}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewedSubject === otherPartnerId}
          onClick={() => handleSwitchSubject(otherPartnerId)}
          className={`min-h-[38px] rounded-xl text-[12px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap px-2 ${
            viewedSubject === otherPartnerId
              ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
              : 'text-[#85838D] hover:text-[#292832]'
          }`}
        >
          {formatTemplate(t.insights.partnerSharedTab, { name: partnerDisplayName })}
        </button>
      </div>

      {isViewingPartner && !isEnergyShared ? (
        <div className="bg-white/85 backdrop-blur-[10px] rounded-[22px] p-5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#EFEDF5] flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5 text-[#85838D]" strokeWidth={1.75} />
          </div>
          <div className="font-display text-[14px] font-semibold text-[#292832]">
            {t.insights.sharedInsightsPausedTitle}
          </div>
          <p className="text-[12px] text-[#85838D] leading-relaxed">
            {formatTemplate(t.insights.sharedInsightsPausedBody, { name: activeSubjectName })}
          </p>
        </div>
      ) : (
        <>
          <section className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
                {t.insights.historicalTrendTitle}
              </h2>
              <span className="text-[11px] text-[#85838D]">{t.insights.last60Days}</span>
            </div>
            <div className="text-[11px] text-[#85838D]">{t.insights.dateRangeTapHint}</div>

            <HistoricalTrendChart
              data={historical60Days}
              highlightThursdays={insights.hasPattern}
              showSleepDetail={isSleepAllowed}
            />
          </section>

          <section className="bg-white/78 backdrop-blur-[10px] ring-1 ring-[#9B93B8]/25 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#EFEDF5] flex items-center justify-center shrink-0 mt-0.5">
                <CalendarHeart className="w-4 h-4 text-[#706794]" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] font-medium text-[#706794]">
                  {formatTemplate(t.insights.patternDetectionPrefix, {
                    name: subjectMetadata.display_name,
                  })}
                </div>
                <h2 className="font-display text-[15px] font-semibold text-[#292832] mt-0.5 leading-snug">
                  {insights.hasPattern
                    ? t.insights.jamiePatternTitle
                    : t.insights.alexNoPatternTitle}
                </h2>
              </div>
            </div>

            {insights.hasPattern ? (
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">
                    {t.insights.overallAvgEnergy}
                  </div>
                  <div className="font-display text-[17px] font-bold text-[#292832] tabular-nums mt-0.5">
                    {subjectSummary.overallMean}
                  </div>
                </div>
                <div className="bg-[#F5E8E7]/80 rounded-2xl p-2.5">
                  <div className="text-[10.5px] text-[#8E4D42]">
                    {t.insights.thursdayAvgEnergy}
                  </div>
                  <div className="font-display text-[17px] font-bold text-[#8E4D42] tabular-nums mt-0.5">
                    {subjectSummary.thursdayMean}
                  </div>
                </div>
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">
                    {t.insights.thursdayObservations}
                  </div>
                  <div className="font-display text-[17px] font-bold text-[#292832] tabular-nums mt-0.5">
                    {subjectSummary.thursdayCount}
                  </div>
                </div>
                <div className="bg-[#FDFBFA] rounded-2xl p-2.5 border border-[#292832]/[0.04]">
                  <div className="text-[10.5px] text-[#85838D]">
                    {t.insights.prevDayAvgSleep}
                  </div>
                  <div className="font-display text-[17px] font-bold text-[#292832] tabular-nums mt-0.5">
                    {isSleepAllowed
                      ? `${subjectSummary.prevDayBeforeThursdaySleepMean} ${t.home.hoursUnit}`
                      : t.insights.sleepPrivateLabel}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#FDFBFA] rounded-2xl p-3 flex items-center justify-between border border-[#292832]/[0.04]">
                <span className="text-[12px] text-[#85838D]">
                  {t.insights.alexOverallAvgLabel}
                </span>
                <span className="font-display text-[17px] font-bold text-[#3D5E49] tabular-nums">
                  {subjectSummary.overallMean}
                </span>
              </div>
            )}

            <p className="text-[11.5px] text-[#85838D] leading-relaxed">
              {insights.hasPattern ? t.insights.jamiePatternNote : t.insights.alexNoPatternNote}
            </p>
          </section>

          <section className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
                {t.insights.future7DayTitle}
              </h2>
              <span className="text-[10.5px] text-[#706794] font-medium">
                {t.insights.forecastBadge} · {t.insights.forecastRange}
              </span>
            </div>

            <ForecastChart
              days={insights.forecast7Days}
              selectedDateISO={activeForecast.dateISO}
              onSelectDay={setSelectedForecastDay}
            />

            <div
              className={`rounded-2xl p-3 space-y-1 transition-colors ${
                activeForecast.isHighlighted ? 'bg-[#F5E8E7]/75' : 'bg-[#F4EFEA]/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#292832]">
                  <Calendar className="w-3.5 h-3.5 text-[#E88C7D]" strokeWidth={2} />
                  <span>{formatFullForecastDate(activeForecast)}</span>
                </div>
                {activeForecast.isHighlighted && (
                  <span className="text-[10px] font-semibold text-[#8E4D42]">
                    {t.insights.thursdayDipTag}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[12px] pt-0.5">
                <span className="text-[#85838D]">{t.insights.estimatedIndexColon}</span>
                <span className={`font-bold tabular-nums ${forecastStyle.textColor}`}>
                  {activeForecast.estimatedEnergy} / 100
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#85838D]">{t.insights.confidenceColon}</span>
                <span className="font-medium text-[#292832]">
                  {t.insights.confidenceLevels[activeForecast.confidence]}
                </span>
              </div>
            </div>

            <div className="text-[10.5px] text-[#85838D] text-center pt-0.5">
              {t.insights.forecastFooterLabel}
            </div>
          </section>

          <section className="bg-white rounded-[22px] shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] overflow-hidden">
            <button
              type="button"
              onClick={() => setEvidenceExpanded((prev) => !prev)}
              aria-expanded={evidenceExpanded}
              className="w-full min-h-[50px] px-4 py-3 flex items-center justify-between gap-2 text-left hover:bg-[#FDFBFA] transition-colors focus-visible:outline-2 focus-visible:outline-[#E88C7D]"
            >
              <span className="flex items-center gap-2 font-display text-[13.5px] font-semibold text-[#292832]">
                <Sparkles className="w-4 h-4 text-[#9B93B8] shrink-0" strokeWidth={2} />
                <span>{t.insights.whyIdentifiedTitle}</span>
              </span>
              {evidenceExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#85838D] shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#85838D] shrink-0" />
              )}
            </button>

            {evidenceExpanded && (
              <div className="px-4 pb-4 pt-2 border-t border-[#292832]/[0.05] space-y-3 text-[12px] leading-relaxed">
                <div className="rounded-2xl bg-[#FDFBFA] p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-[#292832]">
                    <Eye className="w-3.5 h-3.5 text-[#8FA89B]" />
                    <span>{t.insights.observedHistoricalTitle}</span>
                  </div>
                  <ul className="space-y-1 text-[#85838D] list-disc pl-4">
                    {evidenceObserved.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#EFEDF5]/55 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-[#292832]">
                    <CalendarHeart className="w-3.5 h-3.5 text-[#9B93B8]" />
                    <span>{t.insights.estimatedFutureTitle}</span>
                  </div>
                  <ul className="space-y-1 text-[#85838D] list-disc pl-4">
                    {evidenceEstimated.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </>
      )}

      <button
        type="button"
        onClick={() => setActivePage(partnerId, 'care')}
        className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white font-display text-[13.5px] font-semibold flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(232,140,125,0.55)] transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#292832]"
      >
        <span>{t.insights.viewCareSuggestions}</span>
        <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}

export function InsightsPage({ partnerId, scope = 'demo' }: InsightsPageProps) {
  if (scope === 'normal') {
    return <NormalInsightsContent />;
  }
  return <PresentationInsightsContent partnerId={partnerId} />;
}
