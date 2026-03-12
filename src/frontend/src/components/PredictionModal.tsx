import { Skeleton } from "@/components/ui/skeleton";
import {
  Brain,
  MapPin,
  TrendingUp,
  Trophy,
  Users,
  Wind,
  X,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { usePrediction, useUpcomingMatches } from "../hooks/useQueries";

const FACTOR_ICONS: Record<string, React.ReactNode> = {
  "Recent Team Form": <TrendingUp className="w-4 h-4" />,
  "Head-to-Head Record": <Users className="w-4 h-4" />,
  "Player Performance": <Brain className="w-4 h-4" />,
  "Venue Statistics": <MapPin className="w-4 h-4" />,
  "Pitch Conditions": <Wind className="w-4 h-4" />,
};

interface PredictionModalProps {
  matchId: string | null;
  onClose: () => void;
}

export default function PredictionModal({
  matchId,
  onClose,
}: PredictionModalProps) {
  const { data: prediction, isLoading } = usePrediction(matchId);
  const { data: matches } = useUpcomingMatches();

  if (!matchId) return null;

  const match = matches?.find((m) => m.id === matchId);

  const team1Prob = prediction ? Number(prediction.team1Probability) : 50;
  const team2Prob = prediction ? Number(prediction.team2Probability) : 50;

  const chartData = [
    { name: match?.team1 ?? "Team 1", value: team1Prob, fill: "#7c3aed" },
    {
      name: match?.team2 ?? "Team 2",
      value: team2Prob,
      fill: "rgba(255,255,255,0.15)",
    },
  ];

  const isWinner1 = prediction?.predictedWinner === match?.team1;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      aria-modal="true"
      data-ocid="prediction.modal"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative glass-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
        style={{
          boxShadow:
            "0 0 60px rgba(168,85,247,0.2), 0 0 120px rgba(168,85,247,0.07)",
        }}
      >
        {/* Top gradient border */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)",
          }}
        />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs text-purple-300 tracking-widest uppercase font-medium mb-1">
                AI Prediction
              </p>
              {match ? (
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                  {match.team1} <span className="text-white/30">vs</span>{" "}
                  {match.team2}
                </h2>
              ) : (
                <Skeleton className="h-8 w-64 bg-white/10" />
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="glass rounded-xl p-2 text-white/50 hover:text-white transition-colors"
              data-ocid="prediction.close_button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4" data-ocid="prediction.loading_state">
              <Skeleton className="h-48 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-48 w-full rounded-2xl bg-white/5" />
            </div>
          ) : prediction ? (
            <div className="space-y-6">
              {/* Winner Banner */}
              <div
                className="rounded-2xl p-5 text-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.15))",
                  border: "1px solid rgba(168,85,247,0.3)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, #a855f7, transparent 70%)",
                  }}
                />
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-white/50 mb-1 uppercase tracking-widest">
                  Predicted Winner
                </p>
                <p className="font-display text-3xl font-bold gradient-text">
                  {prediction.predictedWinner}
                </p>
              </div>

              {/* Probability Chart */}
              <div className="glass rounded-2xl p-5">
                <p className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-widest">
                  Win Probability
                </p>

                {/* Donut chart */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-48 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                          strokeWidth={0}
                        >
                          {chartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "rgba(10,10,10,0.95)",
                            border: "1px solid rgba(168,85,247,0.3)",
                            borderRadius: "8px",
                            color: "white",
                          }}
                          formatter={(value: number) => [`${value}%`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    {/* Team 1 bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span
                          className={`text-sm font-semibold ${
                            isWinner1 ? "text-purple-300" : "text-white/60"
                          }`}
                        >
                          {match?.team1}
                          {isWinner1 && (
                            <span className="ml-2 text-xs text-purple-400">
                              &#9733; predicted
                            </span>
                          )}
                        </span>
                        <span className="font-display font-bold text-white">
                          {team1Prob}%
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${team1Prob}%`,
                            background: isWinner1
                              ? "linear-gradient(90deg, #7c3aed, #a855f7)"
                              : "rgba(255,255,255,0.2)",
                            boxShadow: isWinner1
                              ? "0 0 10px rgba(168,85,247,0.5)"
                              : "none",
                          }}
                        />
                      </div>
                    </div>

                    {/* Team 2 bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span
                          className={`text-sm font-semibold ${
                            !isWinner1 ? "text-purple-300" : "text-white/60"
                          }`}
                        >
                          {match?.team2}
                          {!isWinner1 && (
                            <span className="ml-2 text-xs text-purple-400">
                              &#9733; predicted
                            </span>
                          )}
                        </span>
                        <span className="font-display font-bold text-white">
                          {team2Prob}%
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${team2Prob}%`,
                            background: !isWinner1
                              ? "linear-gradient(90deg, #7c3aed, #a855f7)"
                              : "rgba(255,255,255,0.2)",
                            boxShadow: !isWinner1
                              ? "0 0 10px rgba(168,85,247,0.5)"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div>
                <p className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-widest">
                  AI Reasoning
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prediction.reasoning.map((item) => (
                    <div
                      key={item.factor}
                      className="glass rounded-xl p-4 flex gap-3"
                      style={{ borderLeft: "2px solid rgba(168,85,247,0.4)" }}
                    >
                      <div className="text-purple-400 mt-0.5 shrink-0">
                        {FACTOR_ICONS[item.factor] ?? (
                          <Brain className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-purple-300 mb-1">
                          {item.factor}
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/50">Prediction not available yet.</p>
              <p className="text-white/30 text-sm mt-1">
                Predictions unlock 24 hours before match.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
