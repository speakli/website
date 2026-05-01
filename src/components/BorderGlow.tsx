import { useRef, useCallback, type ReactNode, type CSSProperties } from 'react';
import './BorderGlow.css';

interface BorderGlowProps {
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  glowColor?: string;
  colors?: string[];
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  className?: string;
  style?: CSSProperties;
}

export default function BorderGlow({
  children,
  backgroundColor = '#ffffff',
  borderRadius = 24,
  colors = ['#007AFF', '#BAC8FF', '#1A2E49'],
  glowRadius = 30,
  glowIntensity = 0.8,
  coneSpread = 20,
  className = '',
  style,
}: BorderGlowProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    const border = borderRef.current;
    if (!wrapper || !border) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
    const normalizedAngle = ((angle % 360) + 360) % 360;

    const colorCount = colors.length;
    const colorIdx = Math.floor((normalizedAngle / 360) * colorCount) % colorCount;
    const nextIdx = (colorIdx + 1) % colorCount;
    const t = ((normalizedAngle / 360) * colorCount) % 1;

    const c1 = hexToRgb(colors[colorIdx]);
    const c2 = hexToRgb(colors[nextIdx]);
    const blended = blendColors(c1, c2, t);
    const glowColorStr = `rgba(${blended.r}, ${blended.g}, ${blended.b}, ${glowIntensity})`;
    const halfCone = coneSpread / 2;

    border.style.setProperty('--angle', `${normalizedAngle}deg`);
    border.style.setProperty('--glow-color', glowColorStr);
    border.style.setProperty('--cone-half-deg', `${halfCone}deg`);
    border.style.setProperty('--cone-deg', `${coneSpread}deg`);
    border.style.setProperty('--glow-radius', `${glowRadius}px`);
  }, [colors, glowRadius, glowIntensity, coneSpread]);

  return (
    <div
      ref={wrapperRef}
      className={`border-glow-wrapper ${className}`}
      style={{
        borderRadius,
        border: '1px solid rgba(0,0,0,0.08)',
        backgroundColor,
        ...style,
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={borderRef}
        className="border-glow-wrapper"
        style={{
          borderRadius,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="border-glow-inner" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function blendColors(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number
): { r: number; g: number; b: number } {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}
