import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Stats {
    totalPredictions: bigint;
    correctPredictions: bigint;
    accuracy: bigint;
}
export interface ReasoningFactor {
    description: string;
    factor: string;
}
export type Time = bigint;
export interface Match {
    id: string;
    actualWinner?: string;
    team1: string;
    team2: string;
    isCompleted: boolean;
    venue: string;
    matchDate: Time;
}
export interface Prediction {
    team1Probability: bigint;
    predictedWinner: string;
    generatedAt: Time;
    team2Probability: bigint;
    reasoning: Array<ReasoningFactor>;
    matchId: string;
}
export interface PredictionRecord {
    actualWinner?: string;
    predictedWinner: string;
    date: string;
    matchLabel: string;
    isCorrect?: boolean;
    matchId: string;
}
export interface backendInterface {
    getPrediction(matchId: string): Promise<Prediction | null>;
    getPredictionHistory(): Promise<Array<PredictionRecord>>;
    getStats(): Promise<Stats>;
    getUpcomingMatches(): Promise<Array<Match>>;
    initialize(): Promise<void>;
    setActualWinner(matchId: string, winner: string): Promise<void>;
}
