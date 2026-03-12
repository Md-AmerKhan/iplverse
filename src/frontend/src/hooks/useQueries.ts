import { useQuery } from "@tanstack/react-query";
import type { Match, Prediction, PredictionRecord, Stats } from "../backend.d";
import { useActor } from "./useActor";

export function useUpcomingMatches(initialized = false) {
  const { actor, isFetching } = useActor();
  return useQuery<Match[]>({
    queryKey: ["upcomingMatches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpcomingMatches();
    },
    enabled: !!actor && !isFetching && initialized,
    staleTime: 60_000,
  });
}

export function usePrediction(matchId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Prediction | null>({
    queryKey: ["prediction", matchId],
    queryFn: async () => {
      if (!actor || !matchId) return null;
      return actor.getPrediction(matchId);
    },
    enabled: !!actor && !isFetching && !!matchId,
    staleTime: 5 * 60_000,
  });
}

export function usePredictionHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<PredictionRecord[]>({
    queryKey: ["predictionHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPredictionHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor)
        return { totalPredictions: 0n, correctPredictions: 0n, accuracy: 0n };
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}
