import React from 'react';
import {
  Activity,
  ArrowRight,
  Check,
  Clock,
  Heart,
  Lock,
  Moon,
  Sparkles,
  Sun,
  UserPlus,
} from 'lucide-react';
import {
  BatteryEnergyBar,
  CircularEnergyRing,
  getEnergyStateStyle,
} from '@/src/components/ui/EnergyIndicator';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import { CareActivityItem, CheckInOption, PartnerId } from '@/src/types/dualcharge';

interface HomePageProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

const CHECK_IN_KEYS: CheckInOption[] = ['good', 'tired', 'rest'];

function NormalHomeContent() {
  const {
    normalUser,
    normalPairing,
    normalBaseline,
    normalInteractions,
    recordNormalCheckIn,
    setNormalActivePage,
    t,
    language,
  } = useDualCharge();

  const {
    currentDayNumber,
    recordedDaysCount,
    progressTargetDays,
    phase,
    todayRecord,
    earlyInsight,
  } = normalBaseline;

  const progressPct = Math.min(100, Math.round((recordedDaysCount / progressTargetDays) * 100));
  const partnerName = t.normalMode.partnerDisplayName;
  const formattedToday = new Date().toLocaleDateString(
    language === 'en' ? 'en-US' : language === 'zh-CN' ? 'zh-CN' : 'zh-TW',
    { weekday: 'short', month: 'short', day: 'numeric' }
  );

  return (
    <div className="space-y-4 pb-2">
      {/* Connection + Local Day Indicator */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#292832]/85 min-w-0">
          <Heart
            className="w-3.5 h-3.5 text-[#E88C7D] fill-[#E88C7D]/30 animate-dc-sync shrink-0"
            strokeWidth={2}
          />
          <span className="truncate">
            {normalPairing.status === 'paired_simulated'
              ? formatTemplate(t.home.connectedWith, { partner: partnerName })
              : t.normalMode.unpairedStatusValue}
          </span>
        </div>
        <span className="text-[10.5px] text-[#85838D] shrink-0 tabular-nums">{formattedToday}</span>
      </div>

      {/* Day 1 / Baseline Building Banner */}
      <section
        aria-label={t.normalMode.baselineStartingTitle}
        className="bg-white/85 backdrop-blur-[10px] ring-1 ring-[#E88C7D]/25 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8E4D42] bg-[#F5E8E7] px-2.5 py-1 rounded-xl">
            {formatTemplate(t.normalMode.dayBadgeTemplate, { day: currentDayNumber })}
          </span>
          <span className="text-[11px] font-semibold text-[#706794]">
            {phase === 'building'
              ? t.normalMode.baselineBuildingBadge
              : t.normalMode.earlyBaselineBadge}
          </span>
        </div>

        <h1 className="font-display text-[16px] font-bold text-[#292832] leading-snug">
          {phase === 'building'
            ? t.normalMode.baselineStartingTitle
            : t.normalMode.earlyInsightTitle}
        </h1>

        <p className="text-[12px] text-[#85838D] leading-relaxed">
          {phase === 'building'
            ? t.normalMode.baselineStartingBody
            : formatTemplate(t.normalMode.earlyInsightSubtitle, { count: recordedDaysCount })}
        </p>

        <div className="pt-1 space-y-1.5">
          <div className="flex items-center justify-between text-[11.5px] font-semibold text-[#292832] tabular-nums">
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
          {phase === 'building' && (
            <p className="text-[11px] text-[#85838D] leading-snug pt-0.5">
              {t.normalMode.firstInsightTimingNote}
            </p>
          )}
        </div>
      </section>

      {/* Couple Energy Cards: Personal Baseline Status + Partner Empty/Waiting State */}
      <section aria-label={t.home.myEnergy} className="grid grid-cols-2 gap-3">
        {/* My Baseline Card (never fabricates 0-100 index) */}
        <div className="bg-white/78 backdrop-blur-[10px] ring-1 ring-white/85 rounded-[22px] p-3.5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-[#292832] truncate">
                {t.home.myEnergy}
              </span>
              <span className="text-[9.5px] font-medium text-[#85838D] shrink-0">
                {t.home.personalSpaceTag}
              </span>
            </div>
            <div className="text-[10px] text-[#85838D] mt-0.5">
              {phase === 'building'
                ? t.normalMode.baselineBuildingBadge
                : t.normalMode.earlyBaselineBadge}
            </div>
          </div>

          <div className="my-3 flex flex-col items-center justify-center text-center">
            <div className="w-[72px] h-[72px] rounded-full border-[3px] border-dashed border-[#E88C7D]/45 bg-[#FDFBFA] flex flex-col items-center justify-center">
              <span className="font-display text-[15px] font-bold text-[#292832] tabular-nums leading-none">
                {earlyInsight ? earlyInsight.averageScore1To5 : `${recordedDaysCount}/7`}
              </span>
              <span className="text-[9px] text-[#85838D] mt-0.5">
                {earlyInsight ? '/ 5' : formatTemplate(t.normalMode.dayBadgeTemplate, { day: currentDayNumber })}
              </span>
            </div>
          </div>

          <div className="text-[11px] font-medium text-[#292832]/85 text-center leading-snug">
            {todayRecord
              ? t.home.checkInOptions[todayRecord.checkInStatus].label
              : t.home.pendingCheckIn}
          </div>
        </div>

        {/* Partner Card (Honest Empty / Waiting State) */}
        <div className="bg-[#FDFBFA]/75 backdrop-blur-[10px] ring-1 ring-[#9B93B8]/20 rounded-[22px] p-3.5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] flex flex-col justify-between text-center">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-[#292832] truncate">
                {partnerName}
              </span>
              <span className="text-[9.5px] font-medium text-[#706794] shrink-0">
                {t.home.sharedSpaceTag}
              </span>
            </div>
            <div className="text-[10px] text-[#85838D] mt-0.5 text-left">
              {normalPairing.status === 'paired_simulated'
                ? t.normalMode.waitingForPartnerTitle
                : t.normalMode.unpairedStatusValue}
            </div>
          </div>

          {normalPairing.status === 'unpaired' ? (
            <div className="my-2.5 flex flex-col items-center justify-center space-y-2">
              <div className="w-9 h-9 rounded-full bg-[#EFEDF5] flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-[#706794]" strokeWidth={1.8} />
              </div>
              <div className="text-[11px] font-semibold text-[#292832] leading-snug">
                {t.normalMode.invitePartnerTitle}
              </div>
              <button
                type="button"
                onClick={() => setNormalActivePage('profile')}
                className="min-h-[32px] px-3 rounded-xl bg-[#EFEDF5] hover:bg-[#E4E0F0] text-[#5B527E] text-[10.5px] font-semibold active:scale-95 transition-all"
              >
                {t.normalMode.invitePartnerCta}
              </button>
            </div>
          ) : (
            <div className="my-3 flex flex-col items-center justify-center space-y-2 px-1">
              <div className="w-9 h-9 rounded-full bg-[#EFEDF5] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#706794]" strokeWidth={1.8} />
              </div>
              <div className="text-[11px] text-[#85838D] leading-snug">
                {t.normalMode.waitingForPartnerCheckInBody}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Daily Check-in */}
      <section
        aria-label={t.home.dailyCheckIn}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[#292832]">
            {t.home.dailyCheckIn}
          </h2>
          <span className="text-[11px] text-[#85838D]">{t.home.howAreYouFeeling}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {CHECK_IN_KEYS.map((key) => {
            const opt = t.home.checkInOptions[key];
            const isSelected = todayRecord?.checkInStatus === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => recordNormalCheckIn(key)}
                aria-pressed={isSelected}
                className={`min-h-[52px] px-2 py-2.5 rounded-2xl text-center transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#E88C7D] ${
                  isSelected
                    ? 'bg-[#F5E8E7] ring-1 ring-[#E88C7D] text-[#292832] shadow-[0_6px_16px_-6px_rgba(232,140,125,0.4)]'
                    : 'bg-[#F4EFEA]/70 text-[#292832] hover:bg-[#F4EFEA]'
                }`}
              >
                <div className="text-[12px] font-semibold leading-tight">{opt.label}</div>
                <div className="text-[10px] text-[#85838D] mt-0.5 leading-tight">{opt.hint}</div>
              </button>
            );
          })}
        </div>

        {todayRecord && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-2xl bg-[#8FA89B]/14 px-3 py-2 text-[11px] text-[#3D5E49]"
          >
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={2.2} />
            <div className="leading-snug">
              <div className="font-medium">
                {formatTemplate(t.home.checkInConfirmed, {
                  status: t.home.checkInOptions[todayRecord.checkInStatus].label,
                  time: `${t.notifications.todayPrefix} · ${todayRecord.updatedAtTime}`,
                })}
              </div>
              <div className="text-[#85838D] mt-0.5">
                {formatTemplate(t.normalMode.checkInSavesBaselineNote, {
                  count: recordedDaysCount,
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Today's Summary (Never fabricates unentered sleep/activity numbers) */}
      <section
        aria-label={t.home.todaysSummary}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[#292832]">
            {t.home.todaysSummary}
          </h2>
          <span className="text-[11px] text-[#85838D]">{t.home.personalView}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Moon className="w-3.5 h-3.5 text-[#9B93B8]" strokeWidth={2} />
              <span>{t.home.sleepDuration}</span>
            </div>
            <div className="mt-1 font-display text-[12.5px] font-medium text-[#85838D]">
              {t.normalMode.notEnteredYet}
            </div>
          </div>

          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Sun className="w-3.5 h-3.5 text-[#E88C7D]" strokeWidth={2} />
              <span>{t.home.sleepQuality}</span>
            </div>
            <div className="mt-1 font-display text-[12.5px] font-medium text-[#85838D]">
              {t.normalMode.notEnteredYet}
            </div>
          </div>

          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Activity className="w-3.5 h-3.5 text-[#8FA89B]" strokeWidth={2} />
              <span>{t.home.activity}</span>
            </div>
            <div className="mt-1 font-display text-[12.5px] font-medium text-[#85838D]">
              {t.normalMode.notEnteredYet}
            </div>
          </div>

          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Clock className="w-3.5 h-3.5 text-[#85838D]" strokeWidth={2} />
              <span>{t.home.selfReported}</span>
            </div>
            <div className="mt-1 font-display text-[13px] font-semibold text-[#292832] truncate">
              {todayRecord
                ? t.home.checkInOptions[todayRecord.checkInStatus].label
                : t.home.pendingCheckIn}
            </div>
          </div>
        </div>
      </section>

      {/* AI Insight Preview */}
      <section
        aria-label={t.home.aiInsightPreview}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#706794]">
          <Sparkles className="w-3.5 h-3.5 text-[#9B93B8]" strokeWidth={2} />
          <span>{t.home.aiInsightPreview}</span>
        </div>
        <p className="text-[13px] text-[#292832] leading-relaxed">
          {earlyInsight
            ? formatTemplate(t.normalMode.insightPreviewEarly, {
                count: recordedDaysCount,
                avg: earlyInsight.averageScore1To5,
              })
            : t.normalMode.insightPreviewBuilding}
        </p>
        <button
          type="button"
          onClick={() => setNormalActivePage('insights')}
          className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-2xl bg-[#EFEDF5] hover:bg-[#E4E0F0] text-[#5B527E] text-[12px] font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#9B93B8]"
        >
          <span>{t.home.viewInsights}</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </section>

      {/* Recent Care Activity (Strictly Personal Interactions Only) */}
      <section
        aria-label={t.home.recentCareActivity}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[#292832]">
            {t.home.recentCareActivity}
          </h2>
          <button
            type="button"
            onClick={() => setNormalActivePage('care')}
            className="text-[11.5px] font-semibold text-[#D46B5B] hover:underline min-h-[32px] px-1 active:scale-95 transition-transform"
          >
            {t.home.openCare}
          </button>
        </div>

        {normalInteractions.careActivity.length === 0 ? (
          <p className="text-[12px] text-[#85838D] py-1">{t.normalMode.noCareActivityYet}</p>
        ) : (
          <ul className="divide-y divide-[#292832]/[0.05]">
            {normalInteractions.careActivity.slice(0, 4).map((item) => {
              const title = t.normalMode.careSuggestions[item.suggestionId]?.title ?? '';
              const text =
                item.kind === 'sent_care'
                  ? formatTemplate(t.activityTemplates.sentCare, {
                      actor: normalUser.nickname || 'You',
                      target: partnerName,
                      suggestion: title,
                    })
                  : formatTemplate(t.activityTemplates.savedCare, {
                      actor: normalUser.nickname || 'You',
                      suggestion: title,
                    });
              return (
                <li key={item.id} className="py-2 first:pt-0 last:pb-0">
                  <p className="text-[12.5px] text-[#292832] leading-snug">{text}</p>
                  <span className="text-[10.5px] text-[#85838D]">
                    {item.dateISO} · {item.timeLabel}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function PresentationHomeContent({ partnerId }: { partnerId: PartnerId }) {
  const {
    presentationBundle,
    setActivePage,
    dailyCheckIns,
    recordCheckIn,
    sharingPrefs,
    careActivity,
    t,
  } = useDualCharge();

  if (!presentationBundle) {
    return (
      <div className="py-12 text-center text-[13px] text-[#85838D]">
        {t.welcome.loadingPresentationDemo}
      </div>
    );
  }

  const partnerOtherId: PartnerId = partnerId === 'alex' ? 'jamie' : 'alex';
  const partnerProfile = presentationBundle.partnerMeta[partnerOtherId];
  const myLatestRecord = presentationBundle.latestRecords[partnerId];
  const partnerLatestRecord = presentationBundle.latestRecords[partnerOtherId];

  const myCheckIn = dailyCheckIns[partnerId];
  const partnerSharing = sharingPrefs[partnerOtherId];

  const myEnergy = myLatestRecord.estimated_energy_index_0_to_100;
  const partnerEnergy = partnerLatestRecord.estimated_energy_index_0_to_100;
  const myStyle = getEnergyStateStyle(myEnergy);
  const partnerStyle = getEnergyStateStyle(partnerEnergy);

  const renderActivityText = (item: CareActivityItem): string => {
    const actorName = presentationBundle.partnerProfiles[item.actor].name;
    const targetName = item.target ? presentationBundle.partnerProfiles[item.target].name : '';
    const suggestionTitle = item.suggestionId
      ? t.care.suggestions[item.suggestionId]?.title ?? ''
      : '';

    switch (item.kind) {
      case 'sent_care':
        return formatTemplate(t.activityTemplates.sentCare, {
          actor: actorName,
          target: targetName,
          suggestion: suggestionTitle,
        });
      case 'saved_care':
        return formatTemplate(t.activityTemplates.savedCare, {
          actor: actorName,
          suggestion: suggestionTitle,
        });
      case 'completed_care':
        return formatTemplate(t.activityTemplates.completedCare, {
          actor: actorName,
          suggestion: suggestionTitle,
        });
      case 'seed_supportive':
        return t.activityTemplates.seedSupportive;
      case 'seed_saved_evening':
        return t.activityTemplates.seedSavedEvening;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4 pb-2">
      {/* Couple Synchronization Header + Subtle Demo Date */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#292832]/85 min-w-0">
          <Heart
            className="w-3.5 h-3.5 text-[#E88C7D] fill-[#E88C7D]/30 animate-dc-sync shrink-0"
            strokeWidth={2}
          />
          <span className="truncate">
            {formatTemplate(t.home.connectedWith, { partner: partnerProfile.display_name })}
          </span>
        </div>
        <span className="text-[10.5px] text-[#85838D] shrink-0">{t.meta.todayDateLabel}</span>
      </div>

      {/* Couple Energy Cards */}
      <section aria-label={t.home.myEnergy} className="grid grid-cols-2 gap-3">
        <div className="bg-white/78 backdrop-blur-[10px] ring-1 ring-white/85 rounded-[22px] p-3.5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_14px_34px_-10px_rgba(41,40,50,0.09)]">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-[#292832] truncate">
                {t.home.myEnergy}
              </span>
              <span className="text-[9.5px] font-medium text-[#85838D] shrink-0">
                {t.home.personalSpaceTag}
              </span>
            </div>
            <div className="text-[10px] text-[#85838D] mt-0.5">
              {t.home.estimatedEnergyIndex}
            </div>
          </div>

          <div className="my-2.5 flex items-center justify-center">
            <CircularEnergyRing
              score={myEnergy}
              size={76}
              strokeWidth={6}
              accentVariant="self"
            />
          </div>

          <div className="space-y-1.5">
            <BatteryEnergyBar score={myEnergy} />
            <div className={`text-[11px] font-semibold ${myStyle.textColor}`}>
              {t.energyStates[myStyle.stateKey]} · {myEnergy}/100
            </div>
          </div>
        </div>

        <div className="bg-[#FDFBFA]/72 backdrop-blur-[10px] ring-1 ring-[#9B93B8]/20 rounded-[22px] p-3.5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_14px_34px_-10px_rgba(41,40,50,0.09)]">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-[#292832] truncate">
                {formatTemplate(t.home.partnerSharedEnergy, {
                  partner: partnerProfile.display_name,
                })}
              </span>
              <span className="text-[9.5px] font-medium text-[#706794] shrink-0">
                {t.home.sharedSpaceTag}
              </span>
            </div>
            <div className="text-[10px] text-[#85838D] mt-0.5">
              {t.home.estimatedEnergyIndex}
            </div>
          </div>

          {partnerSharing.energy ? (
            <>
              <div className="my-2.5 flex items-center justify-center">
                <CircularEnergyRing
                  score={partnerEnergy}
                  size={76}
                  strokeWidth={6}
                  accentVariant="partner"
                />
              </div>

              <div className="space-y-1.5">
                <BatteryEnergyBar score={partnerEnergy} />
                <div className={`text-[11px] font-semibold ${partnerStyle.textColor}`}>
                  {t.energyStates[partnerStyle.stateKey]} · {partnerEnergy}/100
                </div>
              </div>
            </>
          ) : (
            <div className="my-4 flex flex-col items-center justify-center text-center px-1">
              <div className="w-9 h-9 rounded-full bg-[#EFEDF5] flex items-center justify-center mb-2">
                <Lock className="w-4 h-4 text-[#85838D]" strokeWidth={1.75} />
              </div>
              <div className="text-[11px] font-medium text-[#292832]">{t.home.sharingPaused}</div>
              <div className="text-[10px] text-[#85838D] mt-0.5 leading-snug">
                {formatTemplate(t.home.sharingPausedNote, {
                  partner: partnerProfile.display_name,
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Today's Summary */}
      <section
        aria-label={t.home.todaysSummary}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[#292832]">
            {t.home.todaysSummary}
          </h2>
          <span className="text-[11px] text-[#85838D]">{t.home.personalView}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Moon className="w-3.5 h-3.5 text-[#9B93B8]" strokeWidth={2} />
              <span>{t.home.sleepDuration}</span>
            </div>
            <div className="mt-1 font-display text-[15px] font-semibold text-[#292832] tabular-nums">
              {myLatestRecord.sleep_hours} {t.home.hoursUnit}
            </div>
          </div>

          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Sun className="w-3.5 h-3.5 text-[#E88C7D]" strokeWidth={2} />
              <span>{t.home.sleepQuality}</span>
            </div>
            <div className="mt-1 font-display text-[15px] font-semibold text-[#292832] tabular-nums">
              {myLatestRecord.sleep_quality_1_to_5} / 5
            </div>
          </div>

          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Activity className="w-3.5 h-3.5 text-[#8FA89B]" strokeWidth={2} />
              <span>{t.home.activity}</span>
            </div>
            <div className="mt-1 font-display text-[15px] font-semibold text-[#292832] tabular-nums">
              {myLatestRecord.activity_minutes} {t.home.minutesUnit}
            </div>
          </div>

          <div className="bg-[#FDFBFA] rounded-2xl p-3 border border-[#292832]/[0.04]">
            <div className="flex items-center gap-1.5 text-[11px] text-[#85838D]">
              <Clock className="w-3.5 h-3.5 text-[#85838D]" strokeWidth={2} />
              <span>{t.home.selfReported}</span>
            </div>
            <div className="mt-1 font-display text-[13px] font-semibold text-[#292832] truncate">
              {myCheckIn.status
                ? t.home.checkInOptions[myCheckIn.status].label
                : t.home.pendingCheckIn}
            </div>
          </div>
        </div>

        {/* Distinct Partner Shared Context Block */}
        <div className="rounded-2xl bg-[#EFEDF5]/55 px-3 py-2.5 text-[11px] text-[#85838D] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#292832]/85">
              {formatTemplate(t.home.partnerSharedContext, {
                partner: partnerProfile.display_name,
              })}
            </span>
            <span className="text-[#706794] font-medium">{t.home.privacyControlled}</span>
          </div>
          {partnerSharing.sleep || partnerSharing.activity ? (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[#292832]/85 tabular-nums">
              {partnerSharing.sleep && (
                <span>
                  {t.home.sleepLabel}: {partnerLatestRecord.sleep_hours}h (
                  {partnerLatestRecord.sleep_quality_1_to_5}/5)
                </span>
              )}
              {partnerSharing.activity && (
                <span>
                  {t.home.activityLabel}: {partnerLatestRecord.activity_minutes}{' '}
                  {t.home.minutesUnit}
                </span>
              )}
            </div>
          ) : !partnerSharing.energy ? (
            <p className="leading-relaxed">
              {formatTemplate(t.home.partnerEnergyHiddenNotice, {
                partner: partnerProfile.display_name,
              })}
            </p>
          ) : (
            <p className="leading-relaxed">
              {formatTemplate(t.home.partnerDefaultPrivacyNotice, {
                partner: partnerProfile.display_name,
              })}
            </p>
          )}
        </div>
      </section>

      {/* Daily Check-in */}
      <section
        aria-label={t.home.dailyCheckIn}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[#292832]">
            {t.home.dailyCheckIn}
          </h2>
          <span className="text-[11px] text-[#85838D]">{t.home.howAreYouFeeling}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {CHECK_IN_KEYS.map((key) => {
            const opt = t.home.checkInOptions[key];
            const isSelected = myCheckIn.status === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => recordCheckIn(partnerId, key)}
                aria-pressed={isSelected}
                className={`min-h-[52px] px-2 py-2.5 rounded-2xl text-center transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#E88C7D] ${
                  isSelected
                    ? 'bg-[#F5E8E7] ring-1 ring-[#E88C7D] text-[#292832] shadow-[0_6px_16px_-6px_rgba(232,140,125,0.4)]'
                    : 'bg-[#F4EFEA]/70 text-[#292832] hover:bg-[#F4EFEA]'
                }`}
              >
                <div className="text-[12px] font-semibold leading-tight">{opt.label}</div>
                <div className="text-[10px] text-[#85838D] mt-0.5 leading-tight">{opt.hint}</div>
              </button>
            );
          })}
        </div>

        {myCheckIn.status && myCheckIn.updatedAtTime && (
          <div
            role="status"
            className="flex items-start gap-2 rounded-2xl bg-[#8FA89B]/14 px-3 py-2 text-[11px] text-[#3D5E49]"
          >
            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={2.2} />
            <div className="leading-snug">
              <div className="font-medium">
                {formatTemplate(t.home.checkInConfirmed, {
                  status: t.home.checkInOptions[myCheckIn.status].label,
                  time: `${t.notifications.todayPrefix} · ${myCheckIn.updatedAtTime}`,
                })}
              </div>
              <div className="text-[#85838D] mt-0.5">
                {formatTemplate(t.home.checkInPreservedNote, { count: myCheckIn.historyCount })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* AI Insight Preview */}
      <section
        aria-label={t.home.aiInsightPreview}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#706794]">
          <Sparkles className="w-3.5 h-3.5 text-[#9B93B8]" strokeWidth={2} />
          <span>{t.home.aiInsightPreview}</span>
        </div>
        <p className="text-[13px] text-[#292832] leading-relaxed">
          {partnerId === 'alex' ? t.home.insightPreviewAlex : t.home.insightPreviewJamie}
        </p>
        <button
          type="button"
          onClick={() => setActivePage(partnerId, 'insights')}
          className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-2xl bg-[#EFEDF5] hover:bg-[#E4E0F0] text-[#5B527E] text-[12px] font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#9B93B8]"
        >
          <span>{t.home.viewInsights}</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </section>

      {/* Recent Care Activity */}
      <section
        aria-label={t.home.recentCareActivity}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[#292832]">
            {t.home.recentCareActivity}
          </h2>
          <button
            type="button"
            onClick={() => setActivePage(partnerId, 'care')}
            className="text-[11.5px] font-semibold text-[#D46B5B] hover:underline min-h-[32px] px-1 active:scale-95 transition-transform"
          >
            {t.home.openCare}
          </button>
        </div>

        <ul className="divide-y divide-[#292832]/[0.05]">
          {careActivity.slice(0, 4).map((item) => {
            const dayPrefix =
              item.dayKind === 'today'
                ? t.notifications.todayPrefix
                : t.notifications.yesterdayPrefix;
            return (
              <li key={item.id} className="py-2 first:pt-0 last:pb-0">
                <p className="text-[12.5px] text-[#292832] leading-snug">
                  {renderActivityText(item)}
                </p>
                <span className="text-[10.5px] text-[#85838D]">
                  {dayPrefix} · {item.timeLabel}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="text-center text-[10px] text-[#85838D]/85 pt-0.5">
        {t.meta.simulatedDemoData}
      </div>
    </div>
  );
}

export function HomePage({ partnerId, scope = 'demo' }: HomePageProps) {
  if (scope === 'normal') {
    return <NormalHomeContent />;
  }
  return <PresentationHomeContent partnerId={partnerId} />;
}
