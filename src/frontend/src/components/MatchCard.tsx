import { Lock, MapPin, Zap } from "lucide-react";
import type { Match } from "../backend.d";
import CountdownTimer from "./CountdownTimer";

const TEAM_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  MI: {
    bg: "rgba(30,64,175,0.3)",
    text: "#60a5fa",
    border: "rgba(96,165,250,0.4)",
  },
  CSK: {
    bg: "rgba(234,179,8,0.2)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.4)",
  },
  RCB: {
    bg: "rgba(220,38,38,0.25)",
    text: "#f87171",
    border: "rgba(248,113,113,0.4)",
  },
  KKR: {
    bg: "rgba(124,58,237,0.3)",
    text: "#c084fc",
    border: "rgba(192,132,252,0.4)",
  },
  DC: {
    bg: "rgba(37,99,235,0.25)",
    text: "#93c5fd",
    border: "rgba(147,197,253,0.4)",
  },
  RR: {
    bg: "rgba(236,72,153,0.25)",
    text: "#f9a8d4",
    border: "rgba(249,168,212,0.4)",
  },
  PBKS: {
    bg: "rgba(185,28,28,0.25)",
    text: "#fca5a5",
    border: "rgba(252,165,165,0.4)",
  },
  SRH: {
    bg: "rgba(234,88,12,0.25)",
    text: "#fb923c",
    border: "rgba(251,146,60,0.4)",
  },
  GT: {
    bg: "rgba(8,145,178,0.25)",
    text: "#67e8f9",
    border: "rgba(103,232,249,0.4)",
  },
  LSG: {
    bg: "rgba(13,148,136,0.25)",
    text: "#5eead4",
    border: "rgba(94,234,212,0.4)",
  },
};

function getTeamColor(team: string) {
  const abbr = Object.keys(TEAM_COLORS).find(
    (k) => team.toUpperCase().includes(k) || k === team.toUpperCase(),
  );
  return abbr
    ? TEAM_COLORS[abbr]
    : {
        bg: "rgba(168,85,247,0.2)",
        text: "#c084fc",
        border: "rgba(192,132,252,0.3)",
      };
}

interface MatchCardProps {
  match: Match;
  index: number;
  onPredict: (matchId: string) => void;
}

export default function MatchCard({ match, index, onPredict }: MatchCardProps) {
  const matchMs = Number(match.matchDate / 1_000_000n);
  const now = Date.now();
  const diffMs = matchMs - now;
  const within24h = diffMs > 0 && diffMs <= 24 * 60 * 60 * 1000;
  const isPast = diffMs <= 0;

  const matchDate = new Date(matchMs);
  const formattedDate = matchDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = matchDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const t1Color = getTeamColor(match.team1);
  const t2Color = getTeamColor(match.team2);

  return (
    <div
      className="glass card-hover rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-ocid={`matches.item.${index + 1}`}
    >
      {/* Subtle gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)",
        }}
      />

      {/* Teams */}
      <div className="flex items-center justify-between gap-3">
        <TeamBadge name={match.team1} color={t1Color} />
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-white/30 tracking-widest">
            VS
          </span>
        </div>
        <TeamBadge name={match.team2} color={t2Color} align="right" />
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Match info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs text-white/50">
          <span className="text-purple-400">📅</span>
          <span>
            {formattedDate} · {formattedTime} IST
          </span>
        </div>
        <div className="flex items-start gap-1.5 text-xs text-white/50">
          <MapPin className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
          <span className="line-clamp-1">{match.venue}</span>
        </div>
      </div>

      {/* Countdown or status */}
      {!isPast && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Starts in</span>
            <CountdownTimer targetMs={matchMs} />
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto">
        {isPast ? (
          <div className="text-xs text-white/30 text-center py-2">
            Match completed
          </div>
        ) : within24h ? (
          <button
            type="button"
            onClick={() => onPredict(match.id)}
            className="w-full btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold animate-neon-pulse"
            data-ocid={`matches.predict_button.${index + 1}`}
          >
            <Zap className="w-3.5 h-3.5" />
            Predict Match
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs text-white/30 bg-white/3 border border-white/5">
            <Lock className="w-3 h-3" />
            Prediction available 1 day before match
          </div>
        )}
      </div>
    </div>
  );
}

function TeamBadge({
  name,
  color,
  align = "left",
}: {
  name: string;
  color: { bg: string; text: string; border: string };
  align?: "left" | "right";
}) {
  const abbr = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  // Override with known abbrs
  const knownAbbr =
    Object.keys(TEAM_COLORS).find((k) => name.toUpperCase().includes(k)) ||
    abbr;

  return (
    <div
      className={`flex flex-col gap-1 ${align === "right" ? "items-end" : "items-start"} flex-1`}
    >
      <div
        className="px-2.5 py-1 rounded-lg text-sm font-display font-bold tracking-wide"
        style={{
          background: color.bg,
          color: color.text,
          border: `1px solid ${color.border}`,
        }}
      >
        {knownAbbr}
      </div>
      <span className="text-xs text-white/60 leading-tight max-w-[90px] truncate">
        {name}
      </span>
    </div>
  );
}
