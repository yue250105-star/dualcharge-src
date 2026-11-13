import React from 'react';
import alexAvatar from '@/src/assets/images/avatar_alex_1794573748589.jpg';
import jamieAvatar from '@/src/assets/images/avatar_jamie_1794573749370.jpg';
import { OnboardingAvatarId } from '@/src/types/dualcharge';

interface UserAvatarProps {
  avatarId: OnboardingAvatarId;
  name: string;
  sizeClass?: string;
  textSizeClass?: string;
  className?: string;
}

const AVATAR_GRADIENTS: Record<
  Exclude<OnboardingAvatarId, 'photo-a' | 'photo-b'>,
  { bg: string; text: string; ring: string }
> = {
  'coral-glow': {
    bg: 'bg-gradient-to-br from-[#F7D7D2] via-[#E88C7D]/65 to-[#E5B8AF]',
    text: 'text-[#6D2E25]',
    ring: 'ring-[#E88C7D]/35',
  },
  'lavender-mist': {
    bg: 'bg-gradient-to-br from-[#EAE6F4] via-[#9B93B8]/55 to-[#D5CFE7]',
    text: 'text-[#423A61]',
    ring: 'ring-[#9B93B8]/35',
  },
  'sage-calm': {
    bg: 'bg-gradient-to-br from-[#DFEAE3] via-[#8FA89B]/60 to-[#C8DDD0]',
    text: 'text-[#284735]',
    ring: 'ring-[#8FA89B]/35',
  },
  'warm-amber': {
    bg: 'bg-gradient-to-br from-[#F7EBD9] via-[#E2B783]/60 to-[#EAD2B0]',
    text: 'text-[#5C4120]',
    ring: 'ring-[#D49F62]/35',
  },
};

export function UserAvatar({
  avatarId,
  name,
  sizeClass = 'w-8 h-8',
  textSizeClass = 'text-[13px]',
  className = '',
}: UserAvatarProps) {
  const initial = (name.trim().charAt(0) || 'D').toUpperCase();

  if (avatarId === 'photo-a' || avatarId === 'photo-b') {
    const src = avatarId === 'photo-a' ? alexAvatar : jamieAvatar;
    return (
      <img
        src={src}
        alt={name || 'Profile'}
        referrerPolicy="no-referrer"
        className={`${sizeClass} rounded-full object-cover ring-1 ring-[#292832]/12 shrink-0 ${className}`}
      />
    );
  }

  const palette = AVATAR_GRADIENTS[avatarId] ?? AVATAR_GRADIENTS['coral-glow'];

  return (
    <div
      aria-label={name || 'Profile'}
      className={`${sizeClass} ${palette.bg} ${palette.text} ring-1 ${palette.ring} rounded-full flex items-center justify-center font-display font-bold ${textSizeClass} select-none shrink-0 ${className}`}
    >
      {initial}
    </div>
  );
}
