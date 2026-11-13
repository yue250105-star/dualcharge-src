import React, { useState } from 'react';
import {
  Check,
  Crown,
  Globe,
  Home,
  Link2,
  Plus,
  RotateCcw,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { UserAvatar } from '@/src/components/ui/UserAvatar';
import {
  NORMAL_LOCAL_INVITE_CODE,
  PRESENTATION_PAIRING_CODE,
  useDualCharge,
} from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import { LanguageCode, PartnerId } from '@/src/types/dualcharge';

interface ProfilePageProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

function ToggleRow({
  label,
  description,
  checked,
  disabled = false,
  onToggle,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <div className={`text-[13px] font-medium ${disabled ? 'text-[#85838D]' : 'text-[#292832]'}`}>
          {label}
        </div>
        <div className="text-[11px] text-[#85838D] leading-snug mt-0.5">{description}</div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={onToggle}
        className={`relative w-12 h-7 rounded-full transition-colors duration-200 shrink-0 focus-visible:outline-2 focus-visible:outline-[#E88C7D] ${
          disabled
            ? 'bg-[#F4EFEA] cursor-not-allowed'
            : checked
              ? 'bg-[#8FA89B]'
              : 'bg-[#292832]/15'
        }`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-[24px]' : 'translate-x-[4px]'
          }`}
        />
      </button>
    </div>
  );
}

const LANGUAGE_OPTIONS: LanguageCode[] = ['en', 'zh-CN', 'zh-TW'];

function NormalProfileContent() {
  const {
    language,
    setLanguage,
    t,
    normalUser,
    normalPairing,
    normalPreferences,
    normalBaseline,
    pairNormalLocalPartner,
    toggleNormalSharing,
    addNormalCustomPreference,
    removeNormalCustomPreference,
    removeNormalPresetPreference,
    confirmNormalPremiumDemo,
    enterPresentationDemo,
    returnToWelcome,
    resetNormalAccount,
  } = useDualCharge();

  const displayName = normalUser.nickname || 'You';
  const partnerDisplayName = t.normalMode.partnerDisplayName;
  const mySharing = normalUser.sharingConsent;

  const [newTagInput, setNewTagInput] = useState('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showResetNormalConfirm, setShowResetNormalConfirm] = useState(false);
  const [sharingNotice, setSharingNotice] = useState<string | null>(null);

  const handleToggleSharing = (key: 'energy' | 'sleep' | 'activity', label: string) => {
    const nextState = !mySharing[key];
    toggleNormalSharing(key);
    setSharingNotice(
      formatTemplate(
        nextState ? t.profile.sharingFeedbackOn : t.profile.sharingFeedbackOff,
        { label, partner: partnerDisplayName }
      )
    );
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    addNormalCustomPreference(newTagInput);
    setNewTagInput('');
  };

  return (
    <div className="space-y-4 pb-2 relative">
      {/* 1. Personal Information */}
      <section
        aria-label={displayName}
        className="bg-white/85 backdrop-blur-[10px] ring-1 ring-white/80 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] flex items-center gap-3.5"
      >
        <UserAvatar
          avatarId={normalUser.avatarId}
          name={displayName}
          sizeClass="w-14 h-14"
          textSizeClass="text-[20px]"
        />
        <div className="min-w-0">
          <h1 className="font-display text-[18px] font-semibold text-[#292832] leading-tight truncate">
            {displayName}
          </h1>
          <div className="text-[12px] text-[#85838D] mt-0.5">
            {formatTemplate(t.normalMode.personalRoleLabel, {
              day: normalBaseline.currentDayNumber,
            })}
          </div>
          <div className="text-[11px] text-[#706794] font-medium mt-0.5">
            {formatTemplate(t.normalMode.recordedDaysProgress, {
              count: normalBaseline.recordedDaysCount,
              target: normalBaseline.progressTargetDays,
            })}
          </div>
        </div>
      </section>

      {/* 2. Couple Connection */}
      <section
        aria-label={t.profile.coupleSettingsTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-[#E88C7D]" strokeWidth={2} />
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.coupleSettingsTitle}
          </h2>
        </div>

        <div className="divide-y divide-[#292832]/[0.05] text-[12.5px]">
          <div className="flex items-center justify-between py-2 first:pt-0">
            <span className="text-[#85838D]">{t.profile.partnerName}</span>
            <span className="font-semibold text-[#292832]">{partnerDisplayName}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[#85838D]">{t.onboarding.step2.inviteCodeLabel}</span>
            <span className="font-mono-tabular text-[12px] font-medium text-[#292832]">
              {normalPairing.inviteCode || NORMAL_LOCAL_INVITE_CODE}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 last:pb-0">
            <span className="text-[#85838D]">{t.profile.connectionStatus}</span>
            <span
              className={`font-semibold ${
                normalPairing.status === 'paired_simulated' ? 'text-[#3D5E49]' : 'text-[#85838D]'
              }`}
            >
              {normalPairing.status === 'paired_simulated'
                ? formatTemplate(t.normalMode.pairedStatusValue, {
                    code: normalPairing.inviteCode,
                  })
                : t.normalMode.unpairedStatusValue}
            </span>
          </div>
        </div>

        {normalPairing.status === 'unpaired' && (
          <div className="pt-1 space-y-2">
            <p className="text-[11px] text-[#85838D] leading-snug">
              {t.normalMode.pairLaterActionHint}
            </p>
            <button
              type="button"
              onClick={() => pairNormalLocalPartner(normalPairing.inviteCode)}
              className="w-full min-h-[40px] px-3 rounded-2xl bg-[#EFEDF5] hover:bg-[#E4E0F0] text-[#5B527E] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>
                {formatTemplate(t.normalMode.simulatePartnerJoinNow, {
                  code: normalPairing.inviteCode || NORMAL_LOCAL_INVITE_CODE,
                })}
              </span>
            </button>
          </div>
        )}
      </section>

      {/* 3. Privacy & Data Sharing */}
      <section
        aria-label={t.profile.dataSharingTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8FA89B]" strokeWidth={2} />
            <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
              {t.profile.dataSharingTitle}
            </h2>
          </div>
          <p className="text-[11.5px] text-[#85838D] mt-1 leading-relaxed">
            {formatTemplate(t.profile.dataSharingDesc, { partner: partnerDisplayName })}
          </p>
        </div>

        <div className="divide-y divide-[#292832]/[0.05]">
          <ToggleRow
            label={t.profile.energySummaryTitle}
            description={t.profile.energySummaryDesc}
            checked={mySharing.energy}
            onToggle={() => handleToggleSharing('energy', t.profile.energySummaryTitle)}
          />
          <ToggleRow
            label={t.profile.sleepSummaryTitle}
            description={t.profile.sleepSummaryDesc}
            checked={mySharing.sleep}
            onToggle={() => handleToggleSharing('sleep', t.profile.sleepSummaryTitle)}
          />
          <ToggleRow
            label={t.profile.activitySummaryTitle}
            description={t.profile.activitySummaryDesc}
            checked={mySharing.activity}
            onToggle={() => handleToggleSharing('activity', t.profile.activitySummaryTitle)}
          />
          <ToggleRow
            label={t.profile.cycleTitle}
            description={t.profile.cycleDesc}
            checked={false}
            disabled
          />
        </div>

        {sharingNotice && (
          <div
            role="status"
            className="rounded-2xl bg-[#FDFBFA] px-3 py-2 text-[11.5px] text-[#292832] flex items-center gap-2 border border-[#292832]/[0.05]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8FA89B] shrink-0" />
            <span>{sharingNotice}</span>
          </div>
        )}
      </section>

      {/* 4. Care Preferences */}
      <section
        aria-label={t.profile.carePreferencesTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div>
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.carePreferencesTitle}
          </h2>
          <p className="text-[11.5px] text-[#85838D] mt-0.5">{t.profile.carePreferencesDesc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {normalPreferences.preferredCare.map((key) => {
            const displayLabel = t.onboarding.step4.preferredCareOptions[key];
            return (
              <span
                key={`pref-${key}`}
                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-xl bg-[#F5E8E7]/75 border border-[#E88C7D]/25 text-[11.5px] font-medium text-[#292832]"
              >
                <span>{displayLabel}</span>
                <button
                  type="button"
                  onClick={() => removeNormalPresetPreference('preferred', key)}
                  aria-label={formatTemplate(t.profile.removeTagAria, { tag: displayLabel })}
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-[#85838D] hover:text-[#292832] hover:bg-[#292832]/[0.06] active:scale-95 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          {normalPreferences.avoidTags.map((key) => {
            const displayLabel = t.onboarding.step4.avoidOptions[key];
            return (
              <span
                key={`avoid-${key}`}
                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-xl bg-[#EFEDF5]/80 border border-[#9B93B8]/25 text-[11.5px] font-medium text-[#292832]"
              >
                <span>{displayLabel}</span>
                <button
                  type="button"
                  onClick={() => removeNormalPresetPreference('avoid', key)}
                  aria-label={formatTemplate(t.profile.removeTagAria, { tag: displayLabel })}
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-[#85838D] hover:text-[#292832] hover:bg-[#292832]/[0.06] active:scale-95 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          {normalPreferences.communicationStyle && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-xl bg-[#8FA89B]/18 text-[11.5px] font-medium text-[#284735]">
              {t.onboarding.step4.communicationOptions[normalPreferences.communicationStyle]}
            </span>
          )}
          {normalPreferences.customTags.map((tag) => {
            const displayLabel = tag.customLabel ?? '';
            return (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-xl bg-[#FDFBFA] border border-[#292832]/[0.06] text-[11.5px] font-medium text-[#292832]"
              >
                <span>{displayLabel}</span>
                <button
                  type="button"
                  onClick={() => removeNormalCustomPreference(tag.id)}
                  aria-label={formatTemplate(t.profile.removeTagAria, { tag: displayLabel })}
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-[#85838D] hover:text-[#292832] hover:bg-[#292832]/[0.06] active:scale-95 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>

        <form onSubmit={handleAddTag} className="flex items-center gap-2 pt-0.5">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder={t.profile.newPreferencePlaceholder}
            aria-label={t.profile.newPreferencePlaceholder}
            className="flex-1 min-h-[40px] px-3 rounded-2xl bg-[#FDFBFA] border border-[#292832]/[0.08] text-[12px] text-[#292832] placeholder:text-[#85838D] focus:outline-none focus:ring-2 focus:ring-[#9B93B8]"
          />
          <button
            type="submit"
            className="min-h-[40px] px-3.5 rounded-2xl bg-[#292832] hover:bg-[#3B3A47] text-white text-[12px] font-semibold inline-flex items-center gap-1 shrink-0 transition-all duration-200 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.profile.addButton}</span>
          </button>
        </form>
      </section>

      {/* 5. Language Settings */}
      <section
        aria-label={t.profile.languageSectionTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#9B93B8]" strokeWidth={2} />
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.languageSectionTitle}
          </h2>
        </div>
        <p className="text-[11.5px] text-[#85838D] leading-snug">
          {t.profile.languageSectionDesc}
        </p>

        <div
          role="radiogroup"
          aria-label={t.profile.languageSectionTitle}
          className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4EFEA] rounded-2xl"
        >
          {LANGUAGE_OPTIONS.map((code) => {
            const isSelected = language === code;
            return (
              <button
                key={code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setLanguage(code)}
                className={`min-h-[38px] px-2 rounded-xl text-[11.5px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
                    : 'text-[#85838D] hover:text-[#292832]'
                }`}
              >
                {t.profile.languages[code]}
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Mode & Presentation Controls */}
      <section
        aria-label={t.normalMode.modeAndDemoTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div>
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.normalMode.modeAndDemoTitle}
          </h2>
          <p className="text-[11.5px] text-[#85838D] mt-0.5 leading-snug">
            {t.normalMode.modeAndDemoDesc}
          </p>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={enterPresentationDemo}
            className="w-full min-h-[44px] px-4 rounded-2xl bg-[#EFEDF5] hover:bg-[#E4E0F0] text-[#5B527E] text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>{t.normalMode.enterPresentationDemo}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={returnToWelcome}
              className="min-h-[40px] px-3 rounded-2xl bg-[#F4EFEA] hover:bg-[#EAE3DC] text-[#292832] text-[11.5px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.normalMode.returnToWelcomeBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetNormalConfirm(true)}
              className="min-h-[40px] px-3 rounded-2xl bg-[#F5E8E7]/80 hover:bg-[#F5E8E7] text-[#8E4D42] text-[11.5px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.normalMode.resetOnboardingBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Membership Preview */}
      <section aria-label={t.profile.membershipTitle} className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.membershipTitle}
          </h2>
          <span className="text-[10.5px] text-[#85838D]">{t.profile.demoPricingProposal}</span>
        </div>

        <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-[14.5px] font-semibold text-[#292832]">
              {t.profile.freePlanTitle}
            </h3>
            <span className="font-display text-[14px] font-bold text-[#292832] tabular-nums">
              {t.profile.freePrice}{' '}
              <span className="text-[11px] font-normal text-[#85838D]">
                {t.profile.perMonth}
              </span>
            </span>
          </div>
          <ul className="space-y-1 text-[12px] text-[#85838D]">
            {t.profile.freeBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#8FA89B] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-white via-[#FDFBFA] to-[#EFEDF5]/65 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] ring-1 ring-[#9B93B8]/30 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#9B93B8]" strokeWidth={2} />
              <h3 className="font-display text-[14.5px] font-semibold text-[#292832]">
                {t.profile.premiumPlanTitle}
              </h3>
            </div>
            <span className="font-display text-[13.5px] font-bold text-[#5B527E] tabular-nums">
              {t.profile.premiumPrice}{' '}
              <span className="text-[11px] font-normal text-[#85838D]">
                {t.profile.perCoupleMonth}
              </span>
            </span>
          </div>

          <ul className="space-y-1 text-[12px] text-[#292832]/85">
            {t.profile.premiumBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E88C7D] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="text-[10.5px] text-[#85838D]">{t.profile.pricingProposalNote}</div>

          <button
            type="button"
            onClick={() => setShowPremiumModal(true)}
            className="w-full min-h-[44px] rounded-2xl bg-[#9B93B8] hover:bg-[#8A81AC] text-white text-[12.5px] font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#292832]"
          >
            {t.profile.explorePremium}
          </button>
        </div>
      </section>

      {showPremiumModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="premium-modal-title-normal"
          className="fixed inset-0 z-40 flex items-end justify-center bg-[#292832]/30 backdrop-blur-[2px] p-3"
        >
          <div className="w-full bg-white/95 backdrop-blur-[10px] rounded-[24px] p-4 shadow-xl border border-white space-y-3 max-h-[90%] overflow-y-auto">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#9B93B8]" />
                <h3
                  id="premium-modal-title-normal"
                  className="font-display text-[15px] font-semibold text-[#292832]"
                >
                  {t.profile.premiumModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPremiumModal(false)}
                aria-label={t.profile.closePreview}
                className="min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center text-[#85838D] hover:bg-[#F4EFEA] active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[12px] text-[#292832]/85 leading-relaxed">
              {t.profile.premiumModalBody}
            </p>

            <div className="rounded-2xl bg-[#F4EFEA]/80 p-2.5 text-[11px] text-[#85838D]">
              {t.profile.premiumModalDisclaimer}
            </div>

            {normalUser.premiumDemoConfirmed && (
              <div
                role="status"
                className="rounded-2xl bg-[#8FA89B]/18 px-3 py-2 text-[11.5px] text-[#3D5E49] flex items-start gap-2"
              >
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{t.profile.premiumConfirmedBanner}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPremiumModal(false)}
                className="min-h-[42px] px-4 rounded-2xl bg-[#F4EFEA] text-[#292832] text-[12px] font-semibold active:scale-95 transition-transform"
              >
                {t.profile.closePreview}
              </button>
              <button
                type="button"
                onClick={confirmNormalPremiumDemo}
                className="flex-1 min-h-[42px] px-3 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white text-[12px] font-semibold transition-all duration-200 active:scale-95"
              >
                {t.profile.premiumConfirmButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetNormalConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-onboarding-title"
          className="fixed inset-0 z-40 flex items-end justify-center bg-[#292832]/30 backdrop-blur-[2px] p-3"
        >
          <div className="w-full bg-white/95 backdrop-blur-[10px] rounded-[24px] p-4 shadow-xl border border-white space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3
                id="reset-onboarding-title"
                className="font-display text-[15px] font-semibold text-[#292832]"
              >
                {t.normalMode.resetOnboardingTitle}
              </h3>
              <button
                type="button"
                onClick={() => setShowResetNormalConfirm(false)}
                aria-label={t.meta.cancel}
                className="min-w-[34px] min-h-[34px] rounded-full flex items-center justify-center text-[#85838D] hover:bg-[#F4EFEA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[12px] text-[#292832]/85 leading-relaxed">
              {t.normalMode.resetOnboardingBody}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowResetNormalConfirm(false)}
                className="flex-1 min-h-[42px] rounded-2xl bg-[#F4EFEA] text-[#292832] text-[12px] font-semibold active:scale-95"
              >
                {t.meta.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetNormalConfirm(false);
                  resetNormalAccount();
                }}
                className="flex-1 min-h-[42px] rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white text-[12px] font-semibold active:scale-95"
              >
                {t.normalMode.confirmResetOnboarding}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PresentationProfileContent({ partnerId }: { partnerId: PartnerId }) {
  const {
    language,
    setLanguage,
    t,
    presentationBundle,
    sharingPrefs,
    toggleSharingPref,
    carePreferences,
    addCarePreference,
    removeCarePreference,
    premiumDemoConfirmed,
    confirmPremiumDemo,
  } = useDualCharge();

  const [newTagInput, setNewTagInput] = useState('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [sharingNotice, setSharingNotice] = useState<string | null>(null);

  if (!presentationBundle) {
    return (
      <div className="py-12 text-center text-[13px] text-[#85838D]">
        {t.welcome.loadingPresentationDemo}
      </div>
    );
  }

  const otherPartnerId: PartnerId = partnerId === 'alex' ? 'jamie' : 'alex';
  const me = presentationBundle.partnerProfiles[partnerId];
  const meMeta = presentationBundle.partnerMeta[partnerId];
  const partnerMeta = presentationBundle.partnerMeta[otherPartnerId];

  const mySharing = sharingPrefs[partnerId];
  const myTags = carePreferences[partnerId];

  const handleToggleSharing = (key: 'energy' | 'sleep' | 'activity', label: string) => {
    const nextState = !mySharing[key];
    toggleSharingPref(partnerId, key);
    setSharingNotice(
      formatTemplate(
        nextState ? t.profile.sharingFeedbackOn : t.profile.sharingFeedbackOff,
        { label, partner: partnerMeta.display_name }
      )
    );
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    addCarePreference(partnerId, newTagInput);
    setNewTagInput('');
  };

  return (
    <div className="space-y-4 pb-2 relative">
      <section
        aria-label={meMeta.display_name}
        className="bg-white/85 backdrop-blur-[10px] ring-1 ring-white/80 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] flex items-center gap-3.5"
      >
        <img
          src={me.avatarUrl}
          alt={meMeta.display_name}
          referrerPolicy="no-referrer"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#E88C7D]/35 shrink-0"
        />
        <div className="min-w-0">
          <h1 className="font-display text-[18px] font-semibold text-[#292832] leading-tight truncate">
            {meMeta.display_name}
          </h1>
          <div className="text-[12px] text-[#85838D] mt-0.5">{t.profile.roles[partnerId]}</div>
          <div className="text-[11px] text-[#85838D] mt-0.5">{t.profile.simulatedDemoProfile}</div>
        </div>
      </section>

      <section
        aria-label={t.profile.coupleSettingsTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-[#E88C7D]" strokeWidth={2} />
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.coupleSettingsTitle}
          </h2>
        </div>

        <div className="divide-y divide-[#292832]/[0.05] text-[12.5px]">
          <div className="flex items-center justify-between py-2 first:pt-0">
            <span className="text-[#85838D]">{t.profile.partnerName}</span>
            <span className="font-semibold text-[#292832]">{partnerMeta.display_name}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[#85838D]">{t.profile.demoPairingCode}</span>
            <span className="font-mono-tabular text-[12px] font-medium text-[#292832]">
              {PRESENTATION_PAIRING_CODE}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 last:pb-0">
            <span className="text-[#85838D]">{t.profile.connectionStatus}</span>
            <span className="font-semibold text-[#3D5E49]">{t.profile.connectedStatusValue}</span>
          </div>
        </div>
      </section>

      <section
        aria-label={t.profile.dataSharingTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8FA89B]" strokeWidth={2} />
            <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
              {t.profile.dataSharingTitle}
            </h2>
          </div>
          <p className="text-[11.5px] text-[#85838D] mt-1 leading-relaxed">
            {formatTemplate(t.profile.dataSharingDesc, { partner: partnerMeta.display_name })}
          </p>
        </div>

        <div className="divide-y divide-[#292832]/[0.05]">
          <ToggleRow
            label={t.profile.energySummaryTitle}
            description={t.profile.energySummaryDesc}
            checked={mySharing.energy}
            onToggle={() => handleToggleSharing('energy', t.profile.energySummaryTitle)}
          />
          <ToggleRow
            label={t.profile.sleepSummaryTitle}
            description={t.profile.sleepSummaryDesc}
            checked={mySharing.sleep}
            onToggle={() => handleToggleSharing('sleep', t.profile.sleepSummaryTitle)}
          />
          <ToggleRow
            label={t.profile.activitySummaryTitle}
            description={t.profile.activitySummaryDesc}
            checked={mySharing.activity}
            onToggle={() => handleToggleSharing('activity', t.profile.activitySummaryTitle)}
          />
          <ToggleRow
            label={t.profile.cycleTitle}
            description={t.profile.cycleDesc}
            checked={false}
            disabled
          />
        </div>

        {sharingNotice && (
          <div
            role="status"
            className="rounded-2xl bg-[#FDFBFA] px-3 py-2 text-[11.5px] text-[#292832] flex items-center gap-2 border border-[#292832]/[0.05]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#8FA89B] shrink-0" />
            <span>{sharingNotice}</span>
          </div>
        )}
      </section>

      <section
        aria-label={t.profile.carePreferencesTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
      >
        <div>
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.carePreferencesTitle}
          </h2>
          <p className="text-[11.5px] text-[#85838D] mt-0.5">{t.profile.carePreferencesDesc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {myTags.map((tag) => {
            const displayLabel = tag.presetKey
              ? t.profile.presetTags[tag.presetKey] ?? tag.presetKey
              : tag.customLabel ?? '';
            return (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-xl bg-[#FDFBFA] border border-[#292832]/[0.06] text-[11.5px] font-medium text-[#292832]"
              >
                <span>{displayLabel}</span>
                <button
                  type="button"
                  onClick={() => removeCarePreference(partnerId, tag.id)}
                  aria-label={formatTemplate(t.profile.removeTagAria, { tag: displayLabel })}
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-[#85838D] hover:text-[#292832] hover:bg-[#292832]/[0.06] active:scale-95 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>

        <form onSubmit={handleAddTag} className="flex items-center gap-2 pt-0.5">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder={t.profile.newPreferencePlaceholder}
            aria-label={t.profile.newPreferencePlaceholder}
            className="flex-1 min-h-[40px] px-3 rounded-2xl bg-[#FDFBFA] border border-[#292832]/[0.08] text-[12px] text-[#292832] placeholder:text-[#85838D] focus:outline-none focus:ring-2 focus:ring-[#9B93B8]"
          />
          <button
            type="submit"
            className="min-h-[40px] px-3.5 rounded-2xl bg-[#292832] hover:bg-[#3B3A47] text-white text-[12px] font-semibold inline-flex items-center gap-1 shrink-0 transition-all duration-200 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.profile.addButton}</span>
          </button>
        </form>
      </section>

      <section
        aria-label={t.profile.languageSectionTitle}
        className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#9B93B8]" strokeWidth={2} />
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.languageSectionTitle}
          </h2>
        </div>
        <p className="text-[11.5px] text-[#85838D] leading-snug">
          {t.profile.languageSectionDesc}
        </p>

        <div
          role="radiogroup"
          aria-label={t.profile.languageSectionTitle}
          className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4EFEA] rounded-2xl"
        >
          {LANGUAGE_OPTIONS.map((code) => {
            const isSelected = language === code;
            return (
              <button
                key={code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setLanguage(code)}
                className={`min-h-[38px] px-2 rounded-xl text-[11.5px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
                    : 'text-[#85838D] hover:text-[#292832]'
                }`}
              >
                {t.profile.languages[code]}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label={t.profile.membershipTitle} className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-display text-[14.5px] font-semibold text-[#292832]">
            {t.profile.membershipTitle}
          </h2>
          <span className="text-[10.5px] text-[#85838D]">{t.profile.demoPricingProposal}</span>
        </div>

        <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-[14.5px] font-semibold text-[#292832]">
              {t.profile.freePlanTitle}
            </h3>
            <span className="font-display text-[14px] font-bold text-[#292832] tabular-nums">
              {t.profile.freePrice}{' '}
              <span className="text-[11px] font-normal text-[#85838D]">
                {t.profile.perMonth}
              </span>
            </span>
          </div>
          <ul className="space-y-1 text-[12px] text-[#85838D]">
            {t.profile.freeBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#8FA89B] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-white via-[#FDFBFA] to-[#EFEDF5]/65 rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] ring-1 ring-[#9B93B8]/30 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#9B93B8]" strokeWidth={2} />
              <h3 className="font-display text-[14.5px] font-semibold text-[#292832]">
                {t.profile.premiumPlanTitle}
              </h3>
            </div>
            <span className="font-display text-[13.5px] font-bold text-[#5B527E] tabular-nums">
              {t.profile.premiumPrice}{' '}
              <span className="text-[11px] font-normal text-[#85838D]">
                {t.profile.perCoupleMonth}
              </span>
            </span>
          </div>

          <ul className="space-y-1 text-[12px] text-[#292832]/85">
            {t.profile.premiumBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#E88C7D] shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="text-[10.5px] text-[#85838D]">{t.profile.pricingProposalNote}</div>

          <button
            type="button"
            onClick={() => setShowPremiumModal(true)}
            className="w-full min-h-[44px] rounded-2xl bg-[#9B93B8] hover:bg-[#8A81AC] text-white text-[12.5px] font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#292832]"
          >
            {t.profile.explorePremium}
          </button>
        </div>
      </section>

      {showPremiumModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="premium-modal-title"
          className="fixed inset-0 z-40 flex items-end justify-center bg-[#292832]/30 backdrop-blur-[2px] p-3"
        >
          <div className="w-full bg-white/95 backdrop-blur-[10px] rounded-[24px] p-4 shadow-xl border border-white space-y-3 max-h-[90%] overflow-y-auto">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#9B93B8]" />
                <h3
                  id="premium-modal-title"
                  className="font-display text-[15px] font-semibold text-[#292832]"
                >
                  {t.profile.premiumModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPremiumModal(false)}
                aria-label={t.profile.closePreview}
                className="min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center text-[#85838D] hover:bg-[#F4EFEA] active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[12px] text-[#292832]/85 leading-relaxed">
              {t.profile.premiumModalBody}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-2xl bg-[#FDFBFA] p-2.5 space-y-1 border border-[#292832]/[0.05]">
                <div className="font-semibold text-[#292832]">
                  {t.profile.freePlanTitle} · {t.profile.freePrice}
                </div>
                {t.profile.freeBenefits.map((b, i) => (
                  <div key={i} className="text-[#85838D] leading-snug">
                    · {b}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-[#EFEDF5]/70 p-2.5 space-y-1">
                <div className="font-semibold text-[#5B527E]">
                  {t.profile.premiumPlanTitle} · {t.profile.premiumPrice}
                </div>
                {t.profile.premiumBenefits.map((b, i) => (
                  <div key={i} className="text-[#292832]/85 leading-snug">
                    · {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4EFEA]/80 p-2.5 text-[11px] text-[#85838D]">
              {t.profile.premiumModalDisclaimer}
            </div>

            {premiumDemoConfirmed && (
              <div
                role="status"
                className="rounded-2xl bg-[#8FA89B]/18 px-3 py-2 text-[11.5px] text-[#3D5E49] flex items-start gap-2"
              >
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{t.profile.premiumConfirmedBanner}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPremiumModal(false)}
                className="min-h-[42px] px-4 rounded-2xl bg-[#F4EFEA] text-[#292832] text-[12px] font-semibold active:scale-95 transition-transform"
              >
                {t.profile.closePreview}
              </button>
              <button
                type="button"
                onClick={confirmPremiumDemo}
                className="flex-1 min-h-[42px] px-3 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white text-[12px] font-semibold transition-all duration-200 active:scale-95"
              >
                {t.profile.premiumConfirmButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProfilePage({ partnerId, scope = 'demo' }: ProfilePageProps) {
  if (scope === 'normal') {
    return <NormalProfileContent />;
  }
  return <PresentationProfileContent partnerId={partnerId} />;
}
