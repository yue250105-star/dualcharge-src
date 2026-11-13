import React, { useState } from 'react';
import { getEnergyStateStyle } from '@/src/components/ui/EnergyIndicator';
import { useDualCharge } from '@/src/context/DualChargeContext';
import { ForecastDay, HistoricalEnergyPoint } from '@/src/types/dualcharge';

interface Point2D {
  x: number;
  y: number;
}

// Convert discrete points into a smooth organic Catmull-Rom cubic Bezier SVG path
function buildSmoothCurvePath(pts: Point2D[]): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  const tension = 0.2;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

interface HistoricalTrendChartProps {
  data: HistoricalEnergyPoint[];
  highlightThursdays?: boolean;
  showSleepDetail?: boolean;
}

export function HistoricalTrendChart({
  data,
  highlightThursdays = false,
  showSleepDetail = true,
}: HistoricalTrendChartProps) {
  const { language, t } = useDualCharge();
  const [selectedIndex, setSelectedIndex] = useState<number>(data.length - 1);

  const width = 316;
  const height = 156;
  const padLeft = 24;
  const padRight = 10;
  const padTop = 18;
  const padBottom = 24;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (idx: number) => padLeft + (idx / Math.max(1, data.length - 1)) * plotW;
  const getY = (val: number) => padTop + ((100 - val) / 100) * plotH;

  const coords: Point2D[] = data.map((pt, idx) => ({
    x: getX(idx),
    y: getY(pt.energy),
  }));

  const smoothLinePath = buildSmoothCurvePath(coords);
  const smoothAreaPath =
    coords.length > 0
      ? `${smoothLinePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`
      : '';

  const selectedPoint = data[selectedIndex] ?? data[data.length - 1];
  const selectedCoord = coords[selectedIndex] ?? coords[coords.length - 1];

  const formatShortDate = (pt: HistoricalEnergyPoint) => {
    const month = t.calendar.monthsShort[pt.monthIndex];
    if (language === 'en') {
      return `${month} ${pt.dayOfMonth}`;
    }
    return `${month}${pt.dayOfMonth}日`;
  };

  const selectedWeekday = t.calendar.weekdaysShort[selectedPoint.weekdayIndex];
  const lineColor = highlightThursdays ? '#9B93B8' : '#8FA89B';
  const fillGradId = highlightThursdays ? 'historyFillLavender' : 'historyFillSage';

  return (
    <div>
      {/* Supportive Thursday Rest Annotation when pattern is present */}
      {highlightThursdays && (
        <div className="mb-2 flex items-center justify-between gap-2 rounded-xl bg-[#F5E8E7]/75 px-3 py-1.5 text-[11px] text-[#8E4D42]">
          <span className="font-medium">{t.insights.restReminderAnnotation}</span>
          <span className="text-[10.5px] text-[#85838D]">{t.insights.historicalBadge}</span>
        </div>
      )}

      {/* Selected day readout */}
      <div className="flex items-center justify-between text-[11.5px] mb-2 min-h-[20px] gap-2">
        <span className="text-[#85838D] truncate">
          {selectedWeekday}, {formatShortDate(selectedPoint)}
          {selectedPoint.isThursday && highlightThursdays ? ` · ${t.insights.thursdayDipTag}` : ''}
        </span>
        <span className="font-semibold text-[#292832] tabular-nums shrink-0">
          {t.insights.indexLabel} {selectedPoint.energy} / 100
          {showSleepDetail
            ? ` · ${t.insights.sleepShortLabel} ${selectedPoint.prevNightSleepHours}h`
            : ''}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        role="img"
        aria-label={t.insights.historicalTrendTitle}
      >
        <defs>
          <linearGradient id="historyFillLavender" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9B93B8" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#E88C7D" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FDFBFA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="historyFillSage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8FA89B" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#FDFBFA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Minimal gentle horizontal guides */}
        {[25, 50, 75, 100].map((tick) => {
          const y = getY(tick);
          return (
            <g key={tick}>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke="#292832"
                strokeOpacity="0.05"
                strokeWidth="1"
              />
              <text
                x={padLeft - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-[#85838D] text-[9px] tabular-nums"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Soft Thursday vertical glow bands for Jamie */}
        {highlightThursdays &&
          data.map((pt, idx) =>
            pt.isThursday ? (
              <rect
                key={`band-${pt.dateISO}`}
                x={getX(idx) - 4}
                y={padTop}
                width={8}
                height={plotH}
                rx={4}
                fill="#C98D82"
                fillOpacity="0.1"
              />
            ) : null
          )}

        {/* Soft gradient area fill */}
        <path d={smoothAreaPath} fill={`url(#${fillGradId})`} />

        {/* Smooth curved trend line */}
        <path
          d={smoothLinePath}
          fill="none"
          stroke={lineColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle Thursday dot indicators */}
        {highlightThursdays &&
          data.map((pt, idx) =>
            pt.isThursday ? (
              <circle
                key={pt.dateISO}
                cx={coords[idx].x}
                cy={coords[idx].y}
                r={idx === selectedIndex ? 4.8 : 3.2}
                fill="#C98D82"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            ) : null
          )}

        {/* Selected crosshair & marker */}
        <line
          x1={selectedCoord.x}
          y1={padTop}
          x2={selectedCoord.x}
          y2={padTop + plotH}
          stroke="#E88C7D"
          strokeOpacity="0.45"
          strokeDasharray="2 3"
        />
        <circle
          cx={selectedCoord.x}
          cy={selectedCoord.y}
          r="6"
          fill="#E88C7D"
          fillOpacity="0.18"
        />
        <circle
          cx={selectedCoord.x}
          cy={selectedCoord.y}
          r="3.8"
          fill="#292832"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />

        {/* Interactive touch hit zones across 60 days */}
        {data.map((pt, idx) => {
          const stepW = plotW / data.length;
          return (
            <rect
              key={pt.dateISO}
              x={getX(idx) - stepW / 2}
              y={padTop}
              width={Math.max(stepW, 5)}
              height={plotH}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setSelectedIndex(idx)}
              onMouseEnter={() => setSelectedIndex(idx)}
            />
          );
        })}

        {/* X-axis date labels */}
        <text x={padLeft} y={height - 5} textAnchor="start" className="fill-[#85838D] text-[9px]">
          {data[0] ? formatShortDate(data[0]) : ''}
        </text>
        <text
          x={padLeft + plotW / 2}
          y={height - 5}
          textAnchor="middle"
          className="fill-[#85838D] text-[9px]"
        >
          {data[Math.floor(data.length / 2)]
            ? formatShortDate(data[Math.floor(data.length / 2)])
            : ''}
        </text>
        <text x={width - padRight} y={height - 5} textAnchor="end" className="fill-[#85838D] text-[9px]">
          {data[data.length - 1] ? formatShortDate(data[data.length - 1]) : ''}
        </text>
      </svg>

      {highlightThursdays && (
        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-[#85838D]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9B93B8] inline-block" aria-hidden="true" />
            {t.insights.legendDailyEnergy}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C98D82] inline-block" aria-hidden="true" />
            {t.insights.legendObservedThursdays}
          </span>
        </div>
      )}
    </div>
  );
}

interface ForecastChartProps {
  days: ForecastDay[];
  selectedDateISO: string;
  onSelectDay: (day: ForecastDay) => void;
}

export function ForecastChart({ days, selectedDateISO, onSelectDay }: ForecastChartProps) {
  const { t } = useDualCharge();

  return (
    <div className="grid grid-cols-7 gap-1.5 items-end pt-2 pb-1">
      {days.map((day) => {
        const isSelected = day.dateISO === selectedDateISO;
        const style = getEnergyStateStyle(day.estimatedEnergy);
        const barHeightPx = Math.max(22, Math.round((day.estimatedEnergy / 100) * 86));
        const shortDayLabel = t.calendar.weekdaysShort[day.weekdayIndex];

        return (
          <button
            key={day.dateISO}
            type="button"
            onClick={() => onSelectDay(day)}
            className={`flex flex-col items-center rounded-2xl py-2 px-0.5 transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#E88C7D] min-h-[44px] ${
              isSelected
                ? 'bg-[#FDFBFA] shadow-[0_6px_16px_-6px_rgba(41,40,50,0.12)] ring-1 ring-[#E88C7D]/35'
                : day.isHighlighted
                  ? 'bg-[#F5E8E7]/55 hover:bg-[#F5E8E7]/85'
                  : 'hover:bg-[#F4EFEA]/70'
            }`}
            aria-pressed={isSelected}
          >
            <span className="text-[11px] font-semibold text-[#292832] tabular-nums mb-1.5">
              {day.estimatedEnergy}
            </span>
            <div className="w-full h-[88px] flex items-end justify-center px-1">
              <div
                className={`w-full max-w-[20px] rounded-t-full rounded-b-md transition-all duration-300 ${style.barBg} ${
                  day.isHighlighted ? 'opacity-95 ring-4 ring-[#C98D82]/20' : 'opacity-85'
                }`}
                style={{ height: `${barHeightPx}px` }}
              />
            </div>
            <span
              className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                day.isHighlighted ? 'text-[#8E4D42] font-semibold' : 'text-[#85838D]'
              }`}
            >
              {shortDayLabel}
            </span>
            <span className="text-[10px] text-[#85838D] tabular-nums">{day.dayOfMonth}</span>
          </button>
        );
      })}
    </div>
  );
}
