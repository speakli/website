import React from "react";
import "./StarBorder.css";

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  color?: string;
  speed?: string;
  thickness?: number;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function StarBorder({
  as: Component = "div",
  className = "",
  color = "white",
  speed = "6s",
  thickness = 2,
  innerClassName = "",
  innerStyle,
  children,
  style,
  ...rest
}: StarBorderProps) {
  const Tag = Component as React.ElementType;

  // Conic-gradient comet: bright arc ~120° wide, rest transparent
  const gradient = `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, transparent 120deg, transparent 360deg)`;

  return (
    <Tag
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px`, ...style }}
      {...rest}
    >
      <div
        className="sb-orbit"
        style={{ background: gradient, animationDuration: speed }}
      />
      <div className={`star-border-inner ${innerClassName}`} style={innerStyle}>
        {children}
      </div>
    </Tag>
  );
}
