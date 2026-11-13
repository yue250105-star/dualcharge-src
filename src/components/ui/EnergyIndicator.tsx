import React from 'react';
import { useDualCharge } from '@/src/context/DualChargeContext';

interface EnergyStateStyle {
  stateKey: 'steady' | 'moderate' | 'low';
  stroke: string;
  barBg: string;
  textColor: string;
  glowColor: string;
}

export function getEnergyStateStyle(score: number): EnergyStateStyle {
  if (score >= 70) {
    return {
      stateKey: 'steady',
      stroke: '#7B9E87',
      barBg: 'bg-[#7B9E87]',
      textColor: 'text-[#3D5E49]',
      glowColor: 'rgba(123, 158, 135, 0.24)',
    };
  }
  if (score >= 50) {
    return {
      stateKey: 'moderate',
      stroke: '#D4A373',
      barBg: 'bg-[#D4A373]',
      textColor: 'text-[#8A5E32]',
      glowColor: 'rgba(212, 163, 115, 0.26)',
    };
  }
  return {
    stateKey: 'low',
    stroke: '#C98D82',
    barBg: 'bg-[#C98D82]',
    textColor: 'text-[#8E4D42]',
    glowColor: 'rgba(201, 141, 130, 0.26)',
  };
}

interface CircularEnergyRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  accentVariant?: 'self' | 'partner';
}

export function CircularEnergyRing({
  score,
  size = 82,
  strokeWidth = 6.5,
  accentVariant = 'self',
}: CircularEnergyRingProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const style = getEnergyStateStyle(clamped);

  const auraBackground =
    accentVariant === 'self'
      ? `radial-gradient(circle, ${style.glowColor} 0%, rgba(232,140,125,0.08) 55%, transparent 75%)`
      : `radial-gradient(circle, ${style.glowColor} 0%, rgba(155,147,184,0.12) 55%, transparent 75%)`;

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size + 12, height: size + 12 }}
    >
      {/* Gentle breathing ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full animate-dc-breathe pointer-events-none"
        style={{ background: auraBackground }}
      />

      <svg width={size} height={size} className="-rotate-90 relative z-10" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(41, 40, 50, 0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={style.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className="font-display text-[22px] font-bold leading-none text-[#292832] tabular-nums tracking-tight">
          {clamped}
        </span>
        <span className="text-[10px] font-medium text-[#85838D] tabular-nums mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

interface BatteryEnergyBarProps {
  score: number;
}

export function BatteryEnergyBar({ score }: BatteryEnergyBarProps) {
  const { t } = useDualCharge();
  const clamped = Math.max(0, Math.min(100, score));
  const style = getEnergyStateStyle(clamped);
  const label = t.energyStates[style.stateKey];

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`${clamped} / 100 (${label})`}
    >
      <div className="relative flex-1 h-2 bg-[#292832]/[0.06] rounded-full overflow-hidden p-[1px]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${style.barBg}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className="w-1 h-1.5 rounded-r-sm bg-[#292832]/15 shrink-0" aria-hidden="true" />
    </div>
  );
}
