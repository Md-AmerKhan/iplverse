import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetMs: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ targetMs }: CountdownTimerProps) {
  const [diff, setDiff] = useState(() => Math.max(0, targetMs - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.max(0, targetMs - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (diff <= 0) {
    return (
      <span className="text-xs text-green-400 font-semibold">
        Match starting now!
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      {days > 0 && (
        <>
          <TimeUnit value={days} label="d" />
          <span className="text-white/30 text-xs">:</span>
        </>
      )}
      <TimeUnit value={hours} label="h" />
      <span className="text-white/30 text-xs">:</span>
      <TimeUnit value={minutes} label="m" />
      <span className="text-white/30 text-xs">:</span>
      <TimeUnit value={seconds} label="s" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display font-bold text-sm text-white tabular-nums w-6 text-center">
        {pad(value)}
      </span>
      <span className="text-[9px] text-white/30 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
