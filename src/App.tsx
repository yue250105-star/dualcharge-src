import React, { useState } from 'react';
import { Home, LogOut, RotateCcw, Users, X } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import { OnboardingWizard } from '@/src/components/onboarding/OnboardingWizard';
import { WelcomeScreen } from '@/src/components/onboarding/WelcomeScreen';
import { DualChargeLogoMark } from '@/src/components/phone/AppHeader';
import { PhoneFrame } from '@/src/components/phone/PhoneFrame';
import { DualChargeProvider, useDualCharge } from '@/src/context/DualChargeContext';
import { CarePage } from '@/src/pages/CarePage';
import { HomePage } from '@/src/pages/HomePage';
import { InsightsPage } from '@/src/pages/InsightsPage';
import { NotificationsPage } from '@/src/pages/NotificationsPage';
import { ProfilePage } from '@/src/pages/ProfilePage';
import { PartnerId } from '@/src/types/dualcharge';

function PartnerScreenContent({
  partnerId,
  scope = 'demo',
}: {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}) {
  const { activePages, normalActivePage } = useDualCharge();
  const page = scope === 'normal' ? normalActivePage : activePages[partnerId];

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage partnerId={partnerId} scope={scope} />;
      case 'insights':
        return <InsightsPage partnerId={partnerId} scope={scope} />;
      case 'care':
        return <CarePage partnerId={partnerId} scope={scope} />;
      case 'notifications':
        return <NotificationsPage partnerId={partnerId} scope={scope} />;
      case 'profile':
        return <ProfilePage partnerId={partnerId} scope={scope} />;
      default:
        return <HomePage partnerId={partnerId} scope={scope} />;
    }
  };

  return (
    <motion.div
      key={`${scope}-${page}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {renderPage()}
    </motion.div>
  );
}

function NormalUserWorkspace() {
  const { normalUser, t, enterPresentationDemo, returnToWelcome } = useDualCharge();
  const userName = normalUser.nickname || 'You';

  return (
    <div className="min-h-screen dualcharge-ambient-stage text-[#292832]">
      {/* Desktop: Centered Single Smartphone Experience (>= 920px) */}
      <div className="hidden min-[920px]:flex flex-col items-center justify-center min-h-screen px-6 py-5">
        <header className="w-full max-w-[680px] mb-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={returnToWelcome}
            className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md hover:bg-white text-[#292832] text-[12px] font-medium shadow-[0_6px_18px_-6px_rgba(41,40,50,0.08)] ring-1 ring-white transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#E88C7D]"
          >
            <Home className="w-3.5 h-3.5 text-[#85838D]" />
            <span>{t.welcome.returnToWelcome}</span>
          </button>

          <div className="inline-flex items-center gap-2">
            <DualChargeLogoMark size={24} />
            <span className="font-display text-[19px] font-bold tracking-tight text-[#292832]">
              DualCharge
            </span>
          </div>

          <button
            type="button"
            onClick={enterPresentationDemo}
            className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md hover:bg-white text-[#5B527E] text-[12px] font-semibold shadow-[0_6px_18px_-6px_rgba(41,40,50,0.08)] ring-1 ring-white transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#9B93B8]"
          >
            <Users className="w-3.5 h-3.5 text-[#706794]" />
            <span>{t.welcome.enterDemoMode}</span>
          </button>
        </header>

        <PhoneFrame
          partnerId="alex"
          scope="normal"
          label={t.welcome.personalModeBadge}
          subtitleName={userName}
          isDesktopMockup
        >
          <PartnerScreenContent partnerId="alex" scope="normal" />
        </PhoneFrame>
      </div>

      {/* Narrow Mobile Screen: Full-screen Mobile Layout (< 920px) */}
      <div className="flex min-[920px]:hidden flex-col h-[100dvh] w-full max-w-md mx-auto dualcharge-phone-canvas shadow-sm">
        <div className="shrink-0 px-3 py-1.5 bg-[#292832] text-white flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={returnToWelcome}
            className="min-h-[32px] px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium inline-flex items-center gap-1 active:scale-95 transition-all whitespace-nowrap"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.welcome.returnToWelcome}</span>
          </button>
          <span className="text-[11px] font-semibold text-white/90 truncate">{userName}</span>
          <button
            type="button"
            onClick={enterPresentationDemo}
            className="min-h-[32px] px-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold inline-flex items-center gap-1 active:scale-95 transition-all whitespace-nowrap"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.welcome.enterDemoMode}</span>
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <PhoneFrame
            partnerId="alex"
            scope="normal"
            label={t.welcome.personalModeBadge}
            subtitleName={userName}
            isDesktopMockup={false}
          >
            <PartnerScreenContent partnerId="alex" scope="normal" />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

function PresentationDemoWorkspace() {
  const [mobilePartner, setMobilePartner] = useState<PartnerId>('alex');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const {
    presentationBundle,
    presentationLoading,
    unreadCountForPartner,
    t,
    resetDemo,
    exitPresentationDemo,
    returnToWelcome,
  } = useDualCharge();

  const alexUnread = unreadCountForPartner('alex');
  const jamieUnread = unreadCountForPartner('jamie');

  const handleConfirmReset = () => {
    resetDemo();
    setShowResetConfirm(false);
  };

  if (presentationLoading || !presentationBundle) {
    return (
      <div className="min-h-screen dualcharge-ambient-stage flex flex-col items-center justify-center px-6 text-center space-y-3 text-[#292832]">
        <DualChargeLogoMark size={36} />
        <p className="font-display text-[15px] font-semibold">{t.welcome.loadingPresentationDemo}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen dualcharge-ambient-stage text-[#292832]">
      {/* Desktop Presentation Mode: Two Smartphones Side by Side (>= 920px) */}
      <div className="hidden min-[920px]:flex flex-col items-center justify-center min-h-screen px-6 py-5">
        <header className="w-full max-w-[850px] mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={exitPresentationDemo}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md hover:bg-white text-[#292832] text-[12px] font-medium shadow-[0_6px_18px_-6px_rgba(41,40,50,0.08)] ring-1 ring-white transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#E88C7D]"
            >
              <LogOut className="w-3.5 h-3.5 text-[#85838D]" />
              <span>{t.welcome.exitDemoMode}</span>
            </button>
            <button
              type="button"
              onClick={returnToWelcome}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-2xl bg-white/75 backdrop-blur-md hover:bg-white text-[#85838D] hover:text-[#292832] text-[12px] font-medium shadow-[0_6px_18px_-6px_rgba(41,40,50,0.06)] ring-1 ring-white transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#E88C7D]"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.welcome.returnToWelcome}</span>
            </button>
          </div>

          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center gap-2.5">
              <DualChargeLogoMark size={26} />
              <h1 className="font-display text-[22px] font-bold tracking-tight text-[#292832]">
                DualCharge
              </h1>
            </div>
            <p className="text-[13px] text-[#85838D]">{t.meta.presentationSubtitle}</p>
          </div>

          <div className="flex justify-end shrink-0">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md hover:bg-white text-[#292832] text-[12px] font-medium shadow-[0_6px_18px_-6px_rgba(41,40,50,0.08)] ring-1 ring-white transition-all duration-200 active:scale-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#E88C7D]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#85838D]" />
              <span>{t.meta.resetDemo}</span>
            </button>
          </div>
        </header>

        <div className="flex items-start justify-center gap-8 xl:gap-14">
          <PhoneFrame partnerId="alex" label={t.meta.partnerALabel} isDesktopMockup>
            <PartnerScreenContent partnerId="alex" />
          </PhoneFrame>

          <PhoneFrame partnerId="jamie" label={t.meta.partnerBLabel} isDesktopMockup>
            <PartnerScreenContent partnerId="jamie" />
          </PhoneFrame>
        </div>
      </div>

      {/* Responsive Mobile Mode (< 920px) */}
      <div className="flex min-[920px]:hidden flex-col h-[100dvh] w-full max-w-md mx-auto dualcharge-phone-canvas shadow-sm">
        <div className="shrink-0 px-3 py-2 bg-[#292832] text-white flex items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={exitPresentationDemo}
            aria-label={t.welcome.exitDemoMode}
            className="min-h-[34px] px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium inline-flex items-center gap-1 shrink-0 active:scale-95 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>

          <div
            role="tablist"
            aria-label={t.meta.activePhone}
            className="grid grid-cols-2 gap-1 p-0.5 bg-white/10 rounded-xl flex-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobilePartner === 'alex'}
              onClick={() => setMobilePartner('alex')}
              className={`min-h-[34px] px-2 rounded-lg text-[11.5px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap ${
                mobilePartner === 'alex'
                  ? 'bg-white text-[#292832]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {t.meta.partnerALabel} · Alex{alexUnread > 0 ? ` (${alexUnread})` : ''}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobilePartner === 'jamie'}
              onClick={() => setMobilePartner('jamie')}
              className={`min-h-[34px] px-2 rounded-lg text-[11.5px] font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap ${
                mobilePartner === 'jamie'
                  ? 'bg-white text-[#292832]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {t.meta.partnerBLabel} · Jamie{jamieUnread > 0 ? ` (${jamieUnread})` : ''}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            aria-label={t.meta.resetDemo}
            className="min-h-[34px] px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium inline-flex items-center gap-1 shrink-0 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.meta.resetDemo}</span>
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <PhoneFrame
            partnerId={mobilePartner}
            label={mobilePartner === 'alex' ? t.meta.partnerALabel : t.meta.partnerBLabel}
            isDesktopMockup={false}
          >
            <PartnerScreenContent partnerId={mobilePartner} />
          </PhoneFrame>
        </div>
      </div>

      {/* Reset Demo Confirmation Dialog */}
      {showResetConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-demo-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#292832]/35 backdrop-blur-[2px] p-4"
        >
          <div className="w-full max-w-sm bg-white/95 backdrop-blur-[10px] rounded-[24px] p-5 shadow-xl border border-white space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h2
                id="reset-demo-title"
                className="font-display text-[16px] font-bold text-[#292832]"
              >
                {t.meta.resetConfirmTitle}
              </h2>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                aria-label={t.meta.cancel}
                className="min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center text-[#85838D] hover:bg-[#F4EFEA] active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13px] text-[#292832]/85 leading-relaxed">
              {t.meta.resetConfirmBody}
            </p>
            <p className="text-[11.5px] text-[#85838D]">{t.meta.resetConfirmNote}</p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 min-h-[42px] rounded-2xl bg-[#F4EFEA] hover:bg-[#EAE3DC] text-[#292832] text-[12.5px] font-semibold transition-all duration-200 active:scale-95"
              >
                {t.meta.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="flex-1 min-h-[42px] rounded-2xl bg-[#E88C7D] hover:bg-[#DC7D6E] text-white text-[12.5px] font-semibold transition-all duration-200 active:scale-95"
              >
                {t.meta.confirmReset}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DualChargeRootRouter() {
  const { entryMode } = useDualCharge();

  switch (entryMode) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'onboarding':
      return <OnboardingWizard />;
    case 'normal':
      return <NormalUserWorkspace />;
    case 'presentation':
      return <PresentationDemoWorkspace />;
    default:
      return <WelcomeScreen />;
  }
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DualChargeProvider>
        <DualChargeRootRouter />
      </DualChargeProvider>
    </MotionConfig>
  );
}
