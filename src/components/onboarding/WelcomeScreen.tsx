import React from 'react';
import { ArrowRight, Heart, Sparkles, Users, Wifi } from 'lucide-react';
import { DualChargeLogoMark } from '@/src/components/phone/AppHeader';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import { LanguageCode } from '@/src/types/dualcharge';

const LANG_BUTTONS: { code: LanguageCode; shortLabel: string; aria: string }[] = [
  { code: 'en', shortLabel: 'EN', aria: 'English' },
  { code: 'zh-CN', shortLabel: '简', aria: '简体中文' },
  { code: 'zh-TW', shortLabel: '繁', aria: '繁體中文' },
];

function WelcomeVisualContent() {
  const {
    language,
    setLanguage,
    t,
    normalUser,
    enterOnboarding,
    enterPresentationDemo,
    resumeNormalApp,
  } = useDualCharge();

  return (
    <div className="flex flex-col h-full justify-between px-5 py-5 overflow-y-auto phone-scroll">
      {/* Top Bar: Brand + Compact Language Switcher */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 min-w-0">
          <DualChargeLogoMark size={26} />
          <span className="font-display text-[15px] font-bold tracking-tight text-[#292832] whitespace-nowrap">
            DualCharge
          </span>
        </div>

        <div
          role="group"
          aria-label={t.profile.languageSectionTitle}
          className="inline-flex items-center gap-0.5 p-0.5 rounded-xl bg-white/75 backdrop-blur-md ring-1 ring-[#292832]/[0.06] shrink-0"
        >
          {LANG_BUTTONS.map((btn) => {
            const active = language === btn.code;
            return (
              <button
                key={btn.code}
                type="button"
                aria-label={btn.aria}
                aria-pressed={active}
                onClick={() => setLanguage(btn.code)}
                className={`min-w-[32px] min-h-[30px] px-2 rounded-lg text-[11px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap ${
                  active
                    ? 'bg-[#292832] text-white shadow-xs'
                    : 'text-[#85838D] hover:text-[#292832]'
                }`}
              >
                {btn.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Central Editorial Hero */}
      <div className="my-auto py-5 flex flex-col items-center text-center space-y-5">
        {/* Dual Interlocking Calm Energy Emblem */}
        <div className="relative w-36 h-28 flex items-center justify-center" aria-hidden="true">
          <div className="absolute left-3 w-20 h-20 rounded-full bg-[#F5E8E7]/85 ring-1 ring-[#E88C7D]/30 shadow-[0_12px_32px_-8px_rgba(232,140,125,0.35)] flex items-center justify-center animate-dc-breathe">
            <div className="w-10 h-10 rounded-full bg-white/75 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D46B5B]" strokeWidth={1.8} />
            </div>
          </div>
          <div className="absolute right-3 w-20 h-20 rounded-full bg-[#EFEDF5]/90 ring-1 ring-[#9B93B8]/30 shadow-[0_12px_32px_-8px_rgba(155,147,184,0.35)] flex items-center justify-center animate-dc-breathe">
            <div className="w-10 h-10 rounded-full bg-white/75 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#706794] fill-[#9B93B8]/35" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <div className="space-y-2.5 max-w-[300px]">
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#706794]">
            DualCharge
          </div>
          <h1 className="font-display text-[26px] font-bold tracking-tight text-[#292832] leading-[1.2] text-balance">
            {t.welcome.headline}
          </h1>
          <p className="text-[13.5px] text-[#85838D] leading-relaxed">
            {t.welcome.subtitle}
          </p>
        </div>

        {/* Subtle Feature Anchor Card */}
        <div className="w-full rounded-[22px] bg-white/75 backdrop-blur-[10px] ring-1 ring-white/90 p-3.5 shadow-[0_10px_30px_-10px_rgba(41,40,50,0.06)] text-left space-y-1.5">
          <div className="text-[12px] font-semibold text-[#292832]">
            {t.meta.simulatedDemoData}
          </div>
          <p className="text-[11.5px] text-[#85838D] leading-snug">
            {t.welcome.demoFootnote}
          </p>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={enterOnboarding}
          className="w-full min-h-[50px] px-5 py-3 rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white font-display text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_12px_26px_-8px_rgba(232,140,125,0.55)] transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#292832]"
        >
          <span className="truncate">{t.welcome.startJourney}</span>
          <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          onClick={enterPresentationDemo}
          className="w-full min-h-[48px] px-5 py-2.5 rounded-2xl bg-white/85 hover:bg-white text-[#292832] ring-1 ring-[#292832]/[0.08] font-display text-[13.5px] font-semibold flex items-center justify-center gap-2 shadow-[0_6px_18px_-8px_rgba(41,40,50,0.08)] transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#9B93B8]"
        >
          <Users className="w-4 h-4 text-[#706794] shrink-0" strokeWidth={2} />
          <span className="truncate">{t.welcome.exploreDemo}</span>
        </button>

        {normalUser.completed && normalUser.nickname && (
          <button
            type="button"
            onClick={resumeNormalApp}
            className="w-full min-h-[40px] px-4 py-1.5 rounded-xl text-[12px] font-semibold text-[#706794] hover:text-[#292832] hover:bg-white/60 transition-colors"
          >
            {formatTemplate(t.welcome.resumePersonalApp, { name: normalUser.nickname })}
          </button>
        )}
      </div>
    </div>
  );
}

export function WelcomeScreen() {
  return (
    <div className="min-h-screen dualcharge-ambient-stage text-[#292832]">
      {/* Desktop: Centered Smartphone Welcome Experience (>= 920px) */}
      <div className="hidden min-[920px]:flex flex-col items-center justify-center min-h-screen px-6 py-6">
        <div
          className="relative w-[397px] h-[752px] max-h-[calc(100vh-48px)] min-h-[560px] bg-gradient-to-b from-[#2B2933] to-[#1D1C23] rounded-[50px] p-[11px] shadow-[0_28px_64px_-12px_rgba(41,40,50,0.22),0_4px_14px_rgba(41,40,50,0.08)] ring-1 ring-white/25 flex flex-col"
          aria-label="DualCharge Welcome"
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
              <WelcomeVisualContent />
            </div>

            <div className="shrink-0 pb-1.5 pt-0.5 flex justify-center">
              <div className="w-28 h-1 rounded-full bg-[#292832]/15" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Narrow Mobile Screen: Full-screen Mobile Layout (< 920px) */}
      <div className="flex min-[920px]:hidden flex-col h-[100dvh] w-full max-w-md mx-auto dualcharge-phone-canvas">
        <WelcomeVisualContent />
      </div>
    </div>
  );
}
