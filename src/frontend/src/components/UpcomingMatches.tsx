import { Skeleton } from "@/components/ui/skeleton";
import { useUpcomingMatches } from "../hooks/useQueries";
import MatchCard from "./MatchCard";

interface UpcomingMatchesProps {
  onPredict: (matchId: string) => void;
  initialized?: boolean;
}

export default function UpcomingMatches({
  onPredict,
  initialized = false,
}: UpcomingMatchesProps) {
  const { data: matches, isLoading, isError } = useUpcomingMatches(initialized);

  return (
    <section id="matches" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4 border border-purple-500/20">
            <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
              Live Schedule
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Upcoming Matches
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Predictions unlock 24 hours before each match. Stay tuned for
            AI-powered insights.
          </p>
        </div>

        {(isLoading || !initialized) && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="matches.loading_state"
          >
            {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((id) => (
              <div
                key={id}
                className="glass rounded-2xl p-5 flex flex-col gap-4"
              >
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-16 rounded-lg bg-white/8" />
                  <Skeleton className="h-4 w-6 rounded bg-white/5" />
                  <Skeleton className="h-8 w-16 rounded-lg bg-white/8" />
                </div>
                <Skeleton className="h-px w-full bg-white/5" />
                <Skeleton className="h-3 w-40 bg-white/5" />
                <Skeleton className="h-3 w-32 bg-white/5" />
                <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12" data-ocid="matches.error_state">
            <p className="text-red-400">
              Failed to load matches. Please try again.
            </p>
          </div>
        )}

        {initialized && !isLoading && !isError && matches && (
          <div>
            {matches.length === 0 ? (
              <div
                className="glass rounded-2xl p-12 text-center"
                data-ocid="matches.empty_state"
              >
                <div className="text-5xl mb-4">🏏</div>
                <p className="text-white/50 text-lg font-medium">
                  No upcoming matches scheduled yet.
                </p>
                <p className="text-white/30 text-sm mt-2">
                  Check back soon for IPL 2026 fixtures.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match, i) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    index={i}
                    onPredict={onPredict}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
