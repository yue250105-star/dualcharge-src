import React from 'react';
import { HeartHandshake, Home, LineChart, User } from 'lucide-react';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { AppPage, PartnerId } from '@/src/types/dualcharge';

interface BottomNavProps {
  partnerId: PartnerId;
  scope?: 'demo' | 'normal';
}

export function BottomNav({ partnerId, scope = 'demo' }: BottomNavProps) {
  const { activePages, setActivePage, normalActivePage, setNormalActivePage, t } = useDualCharge();
  const isNormal = scope === 'normal';
  const current = isNormal ? normalActivePage : activePages[partnerId];

  const handleSelect = (page: AppPage) => {
    if (isNormal) {
      setNormalActivePage(page);
    } else {
      setActivePage(partnerId, page);
    }
  };

  const navItems: {
    id: AppPage;
    label: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }[] = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'insights', label: t.nav.insights, icon: LineChart },
    { id: 'care', label: t.nav.care, icon: HeartHandshake },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  return (
    <nav
      aria-label={`${isNormal ? 'normal' : partnerId} navigation`}
      className="shrink-0 bg-white/85 backdrop-blur-[10px] border-t border-[#292832]/[0.05] px-2 pt-1.5 pb-2 z-20"
    >
      <div className="grid grid-cols-4 items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = current === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[46px] rounded-2xl transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#E88C7D] ${
                isActive
                  ? 'text-[#D46B5B] bg-[#F5E8E7]/80'
                  : 'text-[#85838D] hover:text-[#292832] hover:bg-[#292832]/[0.03]'
              }`}
            >
              <Icon className="w-[19px] h-[19px]" strokeWidth={isActive ? 2.2 : 1.75} />
              <span
                className={`text-[10px] mt-1 tracking-tight whitespace-nowrap ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
