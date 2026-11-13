import React from 'react';
import { Wifi } from 'lucide-react';
import { AppHeader } from '@/src/components/phone/AppHeader';
import { BottomNav } from '@/src/components/phone/BottomNav';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { PartnerId } from '@/src/types/dualcharge';

interface PhoneFrameProps {
  partnerId: PartnerId;
  label: string;
  children: React.ReactNode;
  isDesktopMockup?: boolean;
  scope?: 'demo' | 'normal';
  subtitleName?: string;
}

export function PhoneFrame({
  partnerId,
  label,
  children,
  isDesktopMockup = true,
  scope = 'demo',
  subtitleName,
}: PhoneFrameProps) {
  const { presentationBundle, normalUser } = useDualCharge();
  const isNormal = scope === 'normal';

  const fallbackName = isNormal
    ? normalUser.nickname || 'You'
    : presentationBundle?.partnerProfiles[partnerId]?.name ??
      (partnerId === 'alex' ? 'Alex' : 'Jamie');
  const displayName = subtitleName ?? fallbackName;

  if (!isDesktopMockup) {
    return (
      <div className="flex flex-col w-full h-full dualcharge-phone-canvas overflow-hidden">
        <AppHeader partnerId={partnerId} scope={scope} />
        <main className="flex-1 overflow-y-auto phone-scroll px-4 py-4 space-y-4">
          {children}
        </main>
        <BottomNav partnerId={partnerId} scope={scope} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center shrink-0">
      {/* Clear Partner / Mode Label Above Each Phone */}
      <div className="mb-3 flex items-baseline gap-2.5">
        <span className="font-display text-[11.5px] font-bold tracking-[0.14em] text-[#85838D]">
          {label}
        </span>
        <span className="text-[#85838D]/45" aria-hidden="true">·</span>
        <span className="font-display text-[15px] font-semibold text-[#292832]">
          {displayName}
        </span>
      </div>

      {/* Realistic Smartphone Chassis (375px inner viewport width) */}
      <div
        className="relative w-[397px] h-[752px] max-h-[calc(100vh-142px)] min-h-[540px] bg-gradient-to-b from-[#2B2933] to-[#1D1C23] rounded-[50px] p-[11px] shadow-[0_28px_64px_-12px_rgba(41,40,50,0.22),0_4px_14px_rgba(41,40,50,0.08)] ring-1 ring-white/25 flex flex-col"
        aria-label={`${label} smartphone (${displayName})`}
      >
        {/* Inner 375px Screen (translate-z-0 scopes fixed modals to this phone screen) */}
        <div className="relative w-full h-full dualcharge-phone-canvas rounded-[39px] overflow-hidden flex flex-col translate-z-0">
          {/* iOS-inspired Status Bar with Dynamic Island */}
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

          {/* Sticky App Header */}
          <AppHeader partnerId={partnerId} scope={scope} />

          {/* Independently Scrollable Screen Content */}
          <main className="flex-1 overflow-y-auto phone-scroll px-4 py-4 space-y-4">
            {children}
          </main>

          {/* Fixed Bottom Navigation */}
          <BottomNav partnerId={partnerId} scope={scope} />

          {/* Subtle Home Indicator Bar */}
          <div className="shrink-0 bg-white/85 backdrop-blur-[10px] pb-1.5 pt-0.5 flex justify-center">
            <div className="w-28 h-1 rounded-full bg-[#292832]/15" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
