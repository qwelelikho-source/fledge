"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function formatValue(value: number) {
  if (value >= 1_000_000) {
    const formatted = (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1);
    return `${formatted.replace(/\.0$/, "")}M`;
  }

  if (value >= 1_000) {
    const formatted = (value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1);
    return `${formatted.replace(/\.0$/, "")}K`;
  }

  return value.toLocaleString();
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1500,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!elementRef.current || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
              startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animate);
            }
          };

          animationFrameRef.current = requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, value]);

  return (
    <div ref={elementRef}>
      {formatValue(count)}
      {suffix}
    </div>
  );
}
