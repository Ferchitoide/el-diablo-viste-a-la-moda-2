"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

const LABELS = ["DÍAS", "HORAS", "MIN", "SEG"];

interface Props {
  targetDate: string;
  /** true = white text (for colored/dark backgrounds) */
  light?: boolean;
}

export default function Countdown({ targetDate, light = false }: Props) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const numColor   = light ? "#FFFFFF"                   : "#000000";
  const lblColor   = light ? "rgba(255,255,255,0.45)"    : "#9ca3af";
  const colonColor = "#E60000";

  const values = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <div className="flex items-end gap-3 sm:gap-6 flex-wrap">
      {values.map((val, i) => (
        <div key={i} className="flex items-end gap-3 sm:gap-6">
          <div className="text-center min-w-[56px] sm:min-w-[80px]">
            <div
              className="font-display font-light leading-none tabular-nums"
              style={{
                fontSize: "clamp(2.5rem,9vw,6rem)",
                color: numColor,
                transition: "color 0.3s",
              }}
            >
              {String(val).padStart(2, "0")}
            </div>
            <div
              className="font-sans text-[8px] tracking-[0.35em] mt-2"
              style={{ color: lblColor }}
            >
              {LABELS[i]}
            </div>
          </div>
          {i < 3 && (
            <div
              className="font-display font-light leading-none"
              style={{
                fontSize: "clamp(1.5rem,5vw,3.5rem)",
                color: colonColor,
                marginBottom: "1.4rem",
              }}
            >
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
