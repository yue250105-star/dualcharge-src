import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  HeartHandshake,
  Lock,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Wifi,
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserAvatar } from '@/src/components/ui/UserAvatar';
import { NORMAL_LOCAL_INVITE_CODE, useDualCharge } from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import {
  AvoidTagKey,
  CommunicationStyleKey,
  LanguageCode,
  OnboardingAvatarId,
  OnboardingDraft,
  PreferredCareTagKey,
} from '@/src/types/dualcharge';

const TOTAL_STEPS = 5;

const AVATAR_IDS: OnboardingAvatarId[] = [
  'coral-glow',
  'lavender-mist',
  'sage-calm',
  'warm-amber',
  'photo-a',
  'photo-b',
];

const PREFERRED_CARE_KEYS: PreferredCareTagKey[] = [
  'warm_drinks',
  'gentle_messages',
  'quiet_time',
  'light_meals',
  'relaxing_walks',
  'small_surprises',
];

const AVOID_KEYS: AvoidTagKey[] = [
  'crowded_places',
  'surprise_visits',
  'frequent_messages',
  'last_minute_plans',
];

const COMMUNICATION_STYLES: CommunicationStyleKey[] = [
  'gentle_supportive',
  'short_direct',
  'playful_cheerful',
];

const LANGUAGE_OPTIONS: LanguageCode[] = ['en', 'zh-CN', 'zh-TW'];

interface ConsentSwitchRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  badgeText?: string;
  onToggle?: () => void;
}

function ConsentSwitchRow({
  label,
  description,
  checked,
  disabled = false,
  badgeText,
  onToggle,
}: ConsentSwitchRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <div className={`text-[13px] font-semibold ${disabled ? 'text-[#85838D]' : 'text-[#292832]'}`}>
          {label}
        </div>
        <div className="text-[11.5px] text-[#85838D] leading-snug mt-0.5">{description}</div>
        {badgeText && (
          <div className="text-[10.5px] font-medium text-[#706794] mt-1">{badgeText}</div>
        )}
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
              : 'bg-[#292832]/16'
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

function OnboardingWizardBody() {
  const { language, setLanguage, t, returnToWelcome, completeOnboarding } = useDualCharge();

  const [step, setStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const [draft, setDraft] = useState<OnboardingDraft>({
    nickname: '',
    avatarId: 'coral-glow',
    pairingMethod: 'create',
    inviteCode: NORMAL_LOCAL_INVITE_CODE,
    joinCodeInput: '',
    pairingStatus: 'unpaired',
    sharingConsent: {
      energy: false,
      sleep: false,
      activity: false,
      cycleReserved: false,
    },
    preferredCare: [],
    avoidTags: [],
    communicationStyle: null,
  });

  const handleBack = () => {
    setErrorMessage(null);
    setJoinError(null);
    if (step === 1) {
      returnToWelcome();
    } else {
      setStep((prev) => Math.max(1, prev - 1));
    }
  };

  const handleContinue = () => {
    setErrorMessage(null);

    if (step === 1) {
      if (!draft.nickname.trim()) {
        setErrorMessage(t.onboarding.step1.nicknameRequiredError);
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const canProceed =
        draft.pairingMethod === 'later' || draft.pairingStatus === 'paired_simulated';
      if (!canProceed) {
        setErrorMessage(t.onboarding.step2.pairingRequiredError);
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(4);
      return;
    }

    if (step === 4) {
      setStep(5);
      return;
    }

    completeOnboarding(draft);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(draft.inviteCode);
    } catch {
      // Clipboard API may be unavailable in restricted frames
    }
    setCopiedCode(true);
    window.setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleVerifyJoinCode = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError(null);
    setErrorMessage(null);
    const normalized = draft.joinCodeInput.trim().toUpperCase();
    // Accept valid DC-XXXX format or 4-digit pairing code
    const isValidFormat = /^(DC-\d{4}|\d{4})$/.test(normalized);
    if (!isValidFormat) {
      setDraft((prev) => ({ ...prev, pairingStatus: 'unpaired' }));
      setJoinError(t.onboarding.step2.invalidCodeError);
      return;
    }
    const formattedCode = normalized.startsWith('DC-') ? normalized : `DC-${normalized}`;
    setDraft((prev) => ({
      ...prev,
      pairingMethod: 'join',
      joinCodeInput: formattedCode,
      pairingStatus: 'paired_simulated',
    }));
  };

  const togglePreferredCare = (key: PreferredCareTagKey) => {
    setDraft((prev) => {
      const exists = prev.preferredCare.includes(key);
      return {
        ...prev,
        preferredCare: exists
          ? prev.preferredCare.filter((k) => k !== key)
          : [...prev.preferredCare, key],
      };
    });
  };

  const toggleAvoidTag = (key: AvoidTagKey) => {
    setDraft((prev) => {
      const exists = prev.avoidTags.includes(key);
      return {
        ...prev,
        avoidTags: exists
          ? prev.avoidTags.filter((k) => k !== key)
          : [...prev.avoidTags, key],
      };
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top Bar: Back + Progress + Compact Language */}
      <header className="shrink-0 px-4 pt-3 pb-2.5 bg-[#FDFBFA]/85 backdrop-blur-md border-b border-[#292832]/[0.05] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1 min-h-[38px] px-2 -ml-1 rounded-xl text-[12.5px] font-semibold text-[#292832] hover:bg-[#292832]/[0.05] active:scale-95 transition-all whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" strokeWidth={2} />
            <span>{t.onboarding.back}</span>
          </button>

          <span className="text-[11.5px] font-semibold text-[#85838D] tabular-nums whitespace-nowrap">
            {formatTemplate(t.onboarding.stepCounter, { current: step, total: TOTAL_STEPS })}
          </span>

          <div
            role="group"
            aria-label={t.profile.languageSectionTitle}
            className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-[#F4EFEA] shrink-0"
          >
            {LANGUAGE_OPTIONS.map((code) => {
              const label = code === 'en' ? 'EN' : code === 'zh-CN' ? '简' : '繁';
              const active = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLanguage(code)}
                  className={`min-w-[26px] min-h-[26px] px-1.5 rounded-md text-[10.5px] font-semibold transition-all ${
                    active ? 'bg-white text-[#292832] shadow-xs' : 'text-[#85838D]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Segment Progress Bar */}
        <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                idx <= step ? 'bg-[#E88C7D]' : 'bg-[#292832]/10'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Scrollable Step Content */}
      <main className="flex-1 overflow-y-auto phone-scroll px-4 py-4">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* STEP 1: Create Profile */}
          {step === 1 && (
            <>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-[#706794]">
                  {t.onboarding.localSetupTag}
                </div>
                <h1 className="font-display text-[21px] font-bold tracking-tight text-[#292832] leading-snug">
                  {t.onboarding.step1.title}
                </h1>
                <p className="text-[12.5px] text-[#85838D] leading-relaxed">
                  {t.onboarding.step1.subtitle}
                </p>
              </div>

              {/* Nickname Field */}
              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2">
                <label
                  htmlFor="onboarding-nickname"
                  className="block text-[12.5px] font-semibold text-[#292832]"
                >
                  {t.onboarding.step1.nicknameLabel}
                </label>
                <input
                  id="onboarding-nickname"
                  type="text"
                  maxLength={32}
                  value={draft.nickname}
                  onChange={(e) => {
                    setErrorMessage(null);
                    setDraft((prev) => ({ ...prev, nickname: e.target.value }));
                  }}
                  placeholder={t.onboarding.step1.nicknamePlaceholder}
                  className="w-full min-h-[46px] px-3.5 rounded-2xl bg-[#FDFBFA] border border-[#292832]/12 text-[14px] text-[#292832] placeholder:text-[#85838D]/75 focus:outline-none focus:ring-2 focus:ring-[#E88C7D]"
                />
              </div>

              {/* Profile Avatar Picker (Optional) */}
              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3">
                <div className="text-[12.5px] font-semibold text-[#292832]">
                  {t.onboarding.step1.avatarLabel}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {AVATAR_IDS.map((id) => {
                    const selected = draft.avatarId === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setDraft((prev) => ({ ...prev, avatarId: id }))}
                        className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl transition-all duration-200 active:scale-95 ${
                          selected
                            ? 'bg-[#F5E8E7]/85 ring-1 ring-[#E88C7D] text-[#292832]'
                            : 'bg-[#FDFBFA] text-[#85838D] hover:bg-[#F4EFEA]'
                        }`}
                      >
                        <UserAvatar
                          avatarId={id}
                          name={draft.nickname || 'You'}
                          sizeClass="w-10 h-10"
                          textSizeClass="text-[15px]"
                        />
                        <span className="text-[10.5px] font-medium whitespace-nowrap">
                          {t.onboarding.step1.avatarOptions[id]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Language */}
              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5">
                <div className="text-[12.5px] font-semibold text-[#292832]">
                  {t.onboarding.step1.languageLabel}
                </div>
                <div
                  role="radiogroup"
                  aria-label={t.onboarding.step1.languageLabel}
                  className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4EFEA] rounded-2xl"
                >
                  {LANGUAGE_OPTIONS.map((code) => {
                    const active = language === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setLanguage(code)}
                        className={`min-h-[38px] px-2 rounded-xl text-[11.5px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap ${
                          active
                            ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
                            : 'text-[#85838D] hover:text-[#292832]'
                        }`}
                      >
                        {t.profile.languages[code]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Connect with Your Partner (Create / Enter Code / Invite Later) */}
          {step === 2 && (
            <>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-[#706794]">
                  {t.onboarding.localSetupTag}
                </div>
                <h1 className="font-display text-[21px] font-bold tracking-tight text-[#292832] leading-snug">
                  {t.onboarding.step2.title}
                </h1>
                <p className="text-[12.5px] text-[#85838D] leading-relaxed">
                  {t.onboarding.step2.subtitle}
                </p>
              </div>

              {/* 3-Way Selector: Create Code | Enter Code | Invite Later */}
              <div
                role="tablist"
                aria-label={t.onboarding.step2.title}
                className="grid grid-cols-3 gap-1 p-1 bg-[#F4EFEA] rounded-2xl"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={draft.pairingMethod === 'create'}
                  onClick={() => {
                    setErrorMessage(null);
                    setJoinError(null);
                    setDraft((prev) => ({
                      ...prev,
                      pairingMethod: 'create',
                      pairingStatus: prev.pairingMethod === 'join' ? prev.pairingStatus : 'unpaired',
                    }));
                  }}
                  className={`min-h-[40px] px-1.5 rounded-xl text-[11px] font-semibold transition-all active:scale-95 ${
                    draft.pairingMethod === 'create'
                      ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
                      : 'text-[#85838D] hover:text-[#292832]'
                  }`}
                >
                  {t.onboarding.step2.optionCreate}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={draft.pairingMethod === 'join'}
                  onClick={() => {
                    setErrorMessage(null);
                    setJoinError(null);
                    setDraft((prev) => ({
                      ...prev,
                      pairingMethod: 'join',
                      pairingStatus: 'unpaired',
                    }));
                  }}
                  className={`min-h-[40px] px-1.5 rounded-xl text-[11px] font-semibold transition-all active:scale-95 ${
                    draft.pairingMethod === 'join'
                      ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
                      : 'text-[#85838D] hover:text-[#292832]'
                  }`}
                >
                  {t.onboarding.step2.optionJoin}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={draft.pairingMethod === 'later'}
                  onClick={() => {
                    setErrorMessage(null);
                    setJoinError(null);
                    setDraft((prev) => ({
                      ...prev,
                      pairingMethod: 'later',
                      pairingStatus: 'unpaired',
                    }));
                  }}
                  className={`min-h-[40px] px-1.5 rounded-xl text-[11px] font-semibold transition-all active:scale-95 ${
                    draft.pairingMethod === 'later'
                      ? 'bg-white text-[#292832] shadow-[0_4px_12px_-4px_rgba(41,40,50,0.08)]'
                      : 'text-[#85838D] hover:text-[#292832]'
                  }`}
                >
                  {t.onboarding.step2.optionLater}
                </button>
              </div>

              {draft.pairingMethod === 'create' && (
                <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3.5">
                  <p className="text-[12px] text-[#85838D] leading-relaxed">
                    {t.onboarding.step2.createDesc}
                  </p>

                  <div className="rounded-2xl bg-[#FDFBFA] border border-[#292832]/[0.06] p-3.5 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10.5px] font-medium text-[#85838D]">
                        {t.onboarding.step2.inviteCodeLabel}
                      </div>
                      <div className="font-mono-tabular text-[22px] font-bold tracking-wider text-[#292832] mt-0.5">
                        {draft.inviteCode}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="min-h-[40px] px-3 rounded-xl bg-[#F4EFEA] hover:bg-[#EAE3DC] text-[#292832] text-[12px] font-semibold inline-flex items-center gap-1.5 active:scale-95 transition-all shrink-0 whitespace-nowrap"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#3D5E49]" />
                          <span>{t.onboarding.step2.copiedCode}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#85838D]" />
                          <span>{t.onboarding.step2.copyCode}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setDraft((prev) => ({
                        ...prev,
                        pairingStatus:
                          prev.pairingStatus === 'paired_simulated'
                            ? 'unpaired'
                            : 'paired_simulated',
                      }));
                    }}
                    className={`w-full min-h-[44px] px-4 rounded-2xl text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      draft.pairingStatus === 'paired_simulated'
                        ? 'bg-[#8FA89B]/20 text-[#3D5E49] ring-1 ring-[#8FA89B]/40'
                        : 'bg-[#EFEDF5] hover:bg-[#E4E0F0] text-[#5B527E]'
                    }`}
                  >
                    {draft.pairingStatus === 'paired_simulated' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{t.onboarding.step2.partnerJoinedConfirmed}</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 shrink-0" />
                        <span>{t.onboarding.step2.partnerJoinedButton}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {draft.pairingMethod === 'join' && (
                <form
                  onSubmit={handleVerifyJoinCode}
                  className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3"
                >
                  <p className="text-[12px] text-[#85838D] leading-relaxed">
                    {t.onboarding.step2.joinDesc}
                  </p>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="onboarding-join-code"
                      className="block text-[12px] font-semibold text-[#292832]"
                    >
                      {t.onboarding.step2.joinCodeLabel}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="onboarding-join-code"
                        type="text"
                        value={draft.joinCodeInput}
                        onChange={(e) => {
                          setJoinError(null);
                          setErrorMessage(null);
                          setDraft((prev) => ({
                            ...prev,
                            joinCodeInput: e.target.value,
                          }));
                        }}
                        placeholder={t.onboarding.step2.joinCodePlaceholder}
                        className="flex-1 min-h-[44px] px-3.5 rounded-2xl bg-[#FDFBFA] border border-[#292832]/12 font-mono-tabular text-[14px] uppercase text-[#292832] placeholder:normal-case placeholder:font-sans placeholder:text-[#85838D]/75 focus:outline-none focus:ring-2 focus:ring-[#9B93B8]"
                      />
                      <button
                        type="submit"
                        className="min-h-[44px] px-4 rounded-2xl bg-[#292832] hover:bg-[#3B3A47] text-white text-[12.5px] font-semibold shrink-0 active:scale-95 transition-all whitespace-nowrap"
                      >
                        {t.onboarding.step2.verifyCodeButton}
                      </button>
                    </div>
                  </div>

                  {joinError && (
                    <div
                      role="alert"
                      className="rounded-2xl bg-[#F5E8E7] px-3 py-2 text-[11.5px] text-[#8E4D42] flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{joinError}</span>
                    </div>
                  )}

                  {draft.pairingStatus === 'paired_simulated' && !joinError && (
                    <div
                      role="status"
                      className="rounded-2xl bg-[#8FA89B]/18 px-3 py-2.5 text-[12px] font-medium text-[#3D5E49] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        {formatTemplate(t.onboarding.step2.pairingSuccessBanner, {
                          code: draft.joinCodeInput,
                        })}
                      </span>
                    </div>
                  )}
                </form>
              )}

              {draft.pairingMethod === 'later' && (
                <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EFEDF5] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#706794]" strokeWidth={1.85} />
                    </div>
                    <div className="space-y-1">
                      <div className="font-display text-[14.5px] font-semibold text-[#292832]">
                        {t.onboarding.step2.laterTitle}
                      </div>
                      <p className="text-[12px] text-[#85838D] leading-relaxed">
                        {t.onboarding.step2.laterDesc}
                      </p>
                    </div>
                  </div>

                  <div
                    role="status"
                    className="rounded-2xl bg-[#FDFBFA] border border-[#292832]/[0.06] px-3 py-2.5 text-[11.5px] text-[#5B527E] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#706794]" />
                    <span>{t.onboarding.step2.laterConfirmedBanner}</span>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-[#85838D] text-center px-2 leading-relaxed">
                {t.onboarding.step2.localSimulationNote}
              </p>
            </>
          )}

          {/* STEP 3: Data Sharing Consent (all OFF by default) */}
          {step === 3 && (
            <>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-[#706794]">
                  {t.onboarding.localSetupTag}
                </div>
                <h1 className="font-display text-[21px] font-bold tracking-tight text-[#292832] leading-snug">
                  {t.onboarding.step3.title}
                </h1>
                <p className="text-[12.5px] text-[#85838D] leading-relaxed">
                  {t.onboarding.step3.subtitle}
                </p>
              </div>

              <div className="rounded-2xl bg-[#EFEDF5]/60 px-3.5 py-2.5 flex items-start gap-2 text-[11.5px] text-[#5B527E]">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{t.onboarding.step3.offByDefaultNote}</span>
              </div>

              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] divide-y divide-[#292832]/[0.05]">
                <ConsentSwitchRow
                  label={t.profile.energySummaryTitle}
                  description={t.profile.energySummaryDesc}
                  checked={draft.sharingConsent.energy}
                  onToggle={() =>
                    setDraft((prev) => ({
                      ...prev,
                      sharingConsent: {
                        ...prev.sharingConsent,
                        energy: !prev.sharingConsent.energy,
                      },
                    }))
                  }
                />
                <ConsentSwitchRow
                  label={t.profile.sleepSummaryTitle}
                  description={t.profile.sleepSummaryDesc}
                  checked={draft.sharingConsent.sleep}
                  onToggle={() =>
                    setDraft((prev) => ({
                      ...prev,
                      sharingConsent: {
                        ...prev.sharingConsent,
                        sleep: !prev.sharingConsent.sleep,
                      },
                    }))
                  }
                />
                <ConsentSwitchRow
                  label={t.profile.activitySummaryTitle}
                  description={t.profile.activitySummaryDesc}
                  checked={draft.sharingConsent.activity}
                  onToggle={() =>
                    setDraft((prev) => ({
                      ...prev,
                      sharingConsent: {
                        ...prev.sharingConsent,
                        activity: !prev.sharingConsent.activity,
                      },
                    }))
                  }
                />
                <ConsentSwitchRow
                  label={t.profile.cycleTitle}
                  description={t.profile.cycleDesc}
                  badgeText={t.onboarding.step3.cycleFutureBadge}
                  checked={false}
                  disabled
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#85838D]">
                <Lock className="w-3.5 h-3.5" />
                <span>{t.onboarding.step3.privacyFootnote}</span>
              </div>
            </>
          )}

          {/* STEP 4: Care Preferences */}
          {step === 4 && (
            <>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-[#706794]">
                  {t.onboarding.localSetupTag}
                </div>
                <h1 className="font-display text-[21px] font-bold tracking-tight text-[#292832] leading-snug">
                  {t.onboarding.step4.title}
                </h1>
                <p className="text-[12.5px] text-[#85838D] leading-relaxed">
                  {t.onboarding.step4.subtitle}
                </p>
              </div>

              {/* Preferred care */}
              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5">
                <div className="text-[13px] font-semibold text-[#292832]">
                  {t.onboarding.step4.preferredCareTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {PREFERRED_CARE_KEYS.map((key) => {
                    const selected = draft.preferredCare.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => togglePreferredCare(key)}
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-[12px] font-medium inline-flex items-center gap-1.5 transition-all active:scale-95 ${
                          selected
                            ? 'bg-[#F5E8E7] text-[#8E4D42] ring-1 ring-[#E88C7D]'
                            : 'bg-[#FDFBFA] border border-[#292832]/[0.08] text-[#292832] hover:bg-[#F4EFEA]'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        <span>{t.onboarding.step4.preferredCareOptions[key]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Things to avoid */}
              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5">
                <div className="text-[13px] font-semibold text-[#292832]">
                  {t.onboarding.step4.avoidTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVOID_KEYS.map((key) => {
                    const selected = draft.avoidTags.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleAvoidTag(key)}
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-[12px] font-medium inline-flex items-center gap-1.5 transition-all active:scale-95 ${
                          selected
                            ? 'bg-[#EFEDF5] text-[#5B527E] ring-1 ring-[#9B93B8]'
                            : 'bg-[#FDFBFA] border border-[#292832]/[0.08] text-[#292832] hover:bg-[#F4EFEA]'
                        }`}
                      >
                        {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        <span>{t.onboarding.step4.avoidOptions[key]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Communication style */}
              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-2.5">
                <div className="text-[13px] font-semibold text-[#292832]">
                  {t.onboarding.step4.communicationTitle}
                </div>
                <div className="space-y-2">
                  {COMMUNICATION_STYLES.map((styleKey) => {
                    const selected = draft.communicationStyle === styleKey;
                    return (
                      <button
                        key={styleKey}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            communicationStyle:
                              prev.communicationStyle === styleKey ? null : styleKey,
                          }))
                        }
                        className={`w-full min-h-[42px] px-3.5 py-2 rounded-2xl text-[12.5px] font-medium flex items-center justify-between transition-all active:scale-[0.99] ${
                          selected
                            ? 'bg-[#8FA89B]/18 text-[#284735] ring-1 ring-[#8FA89B]'
                            : 'bg-[#FDFBFA] border border-[#292832]/[0.06] text-[#292832] hover:bg-[#F4EFEA]'
                        }`}
                      >
                        <span>{t.onboarding.step4.communicationOptions[styleKey]}</span>
                        {selected && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* STEP 5: Start Your Energy Baseline (Genuine Day 1 Cold Start) */}
          {step === 5 && (
            <>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-[#706794]">
                  {t.onboarding.localSetupTag}
                </div>
                <h1 className="font-display text-[21px] font-bold tracking-tight text-[#292832] leading-snug">
                  {t.onboarding.step5.title}
                </h1>
                <p className="text-[12.5px] text-[#85838D] leading-relaxed">
                  {t.onboarding.step5.subtitle}
                </p>
              </div>

              <div className="bg-white rounded-[22px] p-4 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F5E8E7] flex items-center justify-center shrink-0">
                    <CalendarPlus className="w-5 h-5 text-[#C45E4E]" strokeWidth={1.85} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-[#706794]">
                      {t.onboarding.step5.day1Badge}
                    </div>
                    <h2 className="font-display text-[15px] font-semibold text-[#292832] mt-0.5">
                      {t.onboarding.step5.startBaselineTitle}
                    </h2>
                    <p className="text-[12px] text-[#85838D] mt-1 leading-relaxed">
                      {t.onboarding.step5.startBaselineBody}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="rounded-2xl bg-[#FDFBFA] border border-[#292832]/[0.05] px-3 py-2.5 text-[11.5px] font-medium text-[#292832] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E88C7D] shrink-0" />
                    <span>{t.onboarding.step5.zeroHistoryBadge}</span>
                  </div>
                  <div className="rounded-2xl bg-[#EFEDF5]/60 px-3 py-2.5 text-[11.5px] font-medium text-[#5B527E] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#706794] shrink-0" />
                    <span className="leading-tight">{t.onboarding.step5.firstInsightBadge}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F4EFEA]/85 p-3.5 space-y-1.5 text-[11.5px] text-[#85838D] leading-relaxed">
                <div className="flex items-start gap-2 text-[#292832]/85 font-medium">
                  <HeartHandshake className="w-4 h-4 text-[#E88C7D] shrink-0 mt-0.5" />
                  <span>{t.onboarding.step5.futureIntegrationsNote}</span>
                </div>
                <p className="pl-6">{t.onboarding.step5.noHealthClaimNote}</p>
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Bottom Validation + Action Footer */}
      <footer className="shrink-0 px-4 pt-2.5 pb-4 bg-white/88 backdrop-blur-[10px] border-t border-[#292832]/[0.05] space-y-2">
        {errorMessage && (
          <div
            role="alert"
            className="rounded-xl bg-[#F5E8E7] px-3 py-2 text-[11.5px] font-medium text-[#8E4D42] flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white font-display text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(232,140,125,0.5)] transition-all duration-200 active:scale-[0.98]"
        >
          <span className="truncate">
            {step === TOTAL_STEPS ? t.onboarding.step5.completeBaselineCta : t.onboarding.continue}
          </span>
          {step < TOTAL_STEPS ? (
            <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.2} />
          ) : (
            <Check className="w-4 h-4 shrink-0" strokeWidth={2.3} />
          )}
        </button>

        {step === 4 && (
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setStep(5);
            }}
            className="w-full min-h-[36px] text-[12px] font-semibold text-[#85838D] hover:text-[#292832] transition-colors"
          >
            {t.onboarding.skipForNow}
          </button>
        )}
      </footer>
    </div>
  );
}

export function OnboardingWizard() {
  return (
    <div className="min-h-screen dualcharge-ambient-stage text-[#292832]">
      {/* Desktop: Single Centered Smartphone Onboarding Frame (>= 920px) */}
      <div className="hidden min-[920px]:flex flex-col items-center justify-center min-h-screen px-6 py-6">
        <div
          className="relative w-[397px] h-[752px] max-h-[calc(100vh-48px)] min-h-[560px] bg-gradient-to-b from-[#2B2933] to-[#1D1C23] rounded-[50px] p-[11px] shadow-[0_28px_64px_-12px_rgba(41,40,50,0.22),0_4px_14px_rgba(41,40,50,0.08)] ring-1 ring-white/25 flex flex-col"
          aria-label="DualCharge Onboarding"
        >
          <div className="relative w-full h-full dualcharge-phone-canvas rounded-[39px] overflow-hidden flex flex-col translate-z-0">
            <div className="shrink-0 h-8 px-6 bg-[#FDFBFA]/80 backdrop-blur-md flex items-center justify-between text-[11px] font-semibold text-[#292832] select-none">
              <span className="tabular-nums">9:41</span>
              <div
                className="w-[88px] h-[22px] bg-[#18171D] rounded-full flex items-center justify-end pr-2"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-[#2E2D38]" />
              </div>
              <div className="flex items-center gap-1.5 text-[#292832]" aria-hidden="true">
                <Wifi className="w-3.5 h-3.5" strokeWidth={2.2} />
                <div className="w-5 h-2.5 rounded-[3px] border border-[#292832]/45 p-[1.5px] flex items-center">
                  <div className="w-full h-full bg-[#292832] rounded-[1px]" />
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <OnboardingWizardBody />
            </div>

            <div className="shrink-0 bg-white/88 backdrop-blur-[10px] pb-1.5 pt-0.5 flex justify-center">
              <div className="w-28 h-1 rounded-full bg-[#292832]/15" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Narrow Mobile Screen: Full-screen Mobile Layout (< 920px) */}
      <div className="flex min-[920px]:hidden flex-col h-[100dvh] w-full max-w-md mx-auto dualcharge-phone-canvas">
        <OnboardingWizardBody />
      </div>
    </div>
  );
}
