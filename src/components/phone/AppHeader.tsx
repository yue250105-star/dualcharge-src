import React from 'react';
import { Bell } from 'lucide-react';
import { UserAvatar } from '@/src/components/ui/UserAvatar';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { formatTemplate } from '@/src/i18n/translations';
import { PartnerId } from '@/src/types/dualcharge';

export function DualChargeLogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="6" width="14" height="16" rx="7" fill="#E88C7D" fillOpacity="0.92" />
      <rect x="12" y="6" width="14" height="16" rx="7" fill="#9B93B8" fillOpacity="0.86" />
      <circle cx="14" cy="14" r="3" fill="#FFFFFF" fillOpacity="0.94" />
    </svg>
  );
}

interface AppHeaderProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

export function AppHeader({ partnerId, scope = 'demo' }: AppHeaderProps) {
  const {
    activePages,
    setActivePage,
    unreadCountForPartner,
    presentationBundle,
    normalActivePage,
    setNormalActivePage,
    normalUser,
    t,
  } = useDualCharge();

  const isNormal = scope === 'normal';
  const demoProfile = !isNormal ? presentationBundle?.partnerProfiles[partnerId] : undefined;
  const fallbackDemoName = partnerId === 'alex' ? 'Alex' : 'Jamie';
  const displayName = isNormal
    ? normalUser.nickname || 'You'
    : demoProfile?.name ?? fallbackDemoName;
  const greetingText = isNormal
    ? formatTemplate(t.normalMode.greetingTemplate, { name: displayName })
    : t.greetings[partnerId];

  // Normal mode notifications are outgoing local log items; Presentation mode tracks recipient unread notifications
  const unreadCount = isNormal ? 0 : unreadCountForPartner(partnerId);

  const isNotificationsActive = isNormal
    ? normalActivePage === 'notifications'
    : activePages[partnerId] === 'notifications';

  const navigateTo = (page: 'home' | 'notifications' | 'profile') => {
    if (isNormal) {
      setNormalActivePage(page);
    } else {
      setActivePage(partnerId, page);
    }
  };

  return (
    <header className="shrink-0 px-4 py-2.5 bg-[#FDFBFA]/82 backdrop-blur-[10px] border-b border-[#292832]/[0.05] flex items-center justify-between gap-2 z-20">
      {/* Brand + greeting */}
      <button
        type="button"
        onClick={() => navigateTo('home')}
        className="flex items-center gap-2.5 text-left min-w-0 active:scale-95 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-[#E88C7D] rounded-xl"
      >
        <DualChargeLogoMark size={26} />
        <div className="min-w-0">
          <div className="font-display text-[14px] font-bold tracking-tight text-[#292832] leading-tight truncate">
            DualCharge
          </div>
          <div className="text-[11px] text-[#85838D] leading-tight truncate">
            {greetingText}
          </div>
        </div>
      </button>

      {/* Bell + Avatar */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => navigateTo('notifications')}
          aria-label={`${t.nav.notificationsAria}${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
          className={`relative min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#E88C7D] ${
            isNotificationsActive
              ? 'bg-[#E88C7D]/16 text-[#C45E4E]'
              : 'text-[#292832] hover:bg-[#292832]/[0.05]'
          }`}
        >
          <Bell className="w-[19px] h-[19px]" strokeWidth={1.85} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#E88C7D] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums leading-none shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigateTo('profile')}
          aria-label={`${displayName} ${t.nav.profile}`}
          className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#E88C7D]"
        >
          {isNormal ? (
            <UserAvatar
              avatarId={normalUser.avatarId}
              name={displayName}
              sizeClass="w-8 h-8"
              textSizeClass="text-[12px]"
            />
          ) : demoProfile ? (
            <img
              src={demoProfile.avatarUrl}
              alt={demoProfile.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#292832]/10"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#EFEDF5] flex items-center justify-center text-[12px] font-bold text-[#5B527E]">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
