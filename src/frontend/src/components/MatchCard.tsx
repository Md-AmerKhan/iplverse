import { Lock, MapPin, Zap } from "lucide-react";
import type { Match } from "../backend.d";
import { getTeamAbbr, getTeamColors } from "../lib/teamColors";
import CountdownTimer from "./CountdownTimer";

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

  const t1Color = getTeamColors(match.team1);
  const t2Color = getTeamColors(match.team2);

  return (
    <div
      className="glass card-hover rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-ocid={`matches.item.${index + 1}`}
    >
      {/* Subtle gradient top border using team 1 color */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, ${t1Color.glow}, ${t2Color.glow})`,
        }}
      />

      {/* Teams */}
      <div className="flex items-center justify-between gap-3">
        <TeamBadge name={match.team1} />
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-white/30 tracking-widest">
            VS
          </span>
        </div>
        <TeamBadge name={match.team2} align="right" />
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
  align = "left",
}: {
  name: string;
  align?: "left" | "right";
}) {
  const colors = getTeamColors(name);
  const abbr = getTeamAbbr(name);

  return (
    <div
      className={`flex flex-col gap-1 ${
        align === "right" ? "items-end" : "items-start"
      } flex-1`}
    >
      <div
        className="px-2.5 py-1 rounded-lg text-sm font-display font-bold tracking-wide"
        style={{
          background: colors.bg,
          color: colors.primary,
          border: `1px solid ${colors.border}`,
          textShadow: `0 0 12px ${colors.glow}`,
        }}
      >
        {abbr}
      </div>
      <span className="text-xs text-white/60 leading-tight max-w-[90px] truncate">
        {name}
      </span>
    </div>
  );
}
