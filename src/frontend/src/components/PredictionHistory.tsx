import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3, CheckCircle2, XCircle } from "lucide-react";
import { usePredictionHistory, useStats } from "../hooks/useQueries";

export default function PredictionHistory() {
  const { data: history, isLoading: historyLoading } = usePredictionHistory();
  const { data: stats, isLoading: statsLoading } = useStats();

  const totalPredictions = stats ? Number(stats.totalPredictions) : 0;
  const correctPredictions = stats ? Number(stats.correctPredictions) : 0;
  const accuracy = stats ? Number(stats.accuracy) : 0;

  return (
    <section id="history" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4 border border-purple-500/20">
            <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
              Track Record
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Prediction History
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Every prediction logged, verified, and tracked for accuracy.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Predictions"
            value={statsLoading ? null : totalPredictions}
            icon={<BarChart3 className="w-5 h-5 text-purple-400" />}
            color="#a855f7"
          />
          <StatCard
            label="Correct Predictions"
            value={statsLoading ? null : correctPredictions}
            icon={<CheckCircle2 className="w-5 h-5 text-green-400" />}
            color="#34d399"
          />
          <StatCard
            label="Accuracy"
            value={statsLoading ? null : `${accuracy}%`}
            icon={<BarChart3 className="w-5 h-5 text-yellow-400" />}
            color="#fbbf24"
          />
        </div>

        {/* History table */}
        <div className="glass rounded-2xl overflow-hidden">
          {historyLoading ? (
            <div className="p-6 space-y-3" data-ocid="history.loading_state">
              {["hs1", "hs2", "hs3", "hs4"].map((id) => (
                <Skeleton
                  key={id}
                  className="h-12 w-full rounded-lg bg-white/5"
                />
              ))}
            </div>
          ) : !history || history.length === 0 ? (
            <div className="text-center py-16" data-ocid="history.empty_state">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-white/50 text-lg font-medium">
                No prediction history yet.
              </p>
              <p className="text-white/30 text-sm mt-2">
                Predictions will appear here after matches are played.
              </p>
            </div>
          ) : (
            <Table data-ocid="history.table">
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-white/40 text-xs uppercase tracking-widest">
                    Date
                  </TableHead>
                  <TableHead className="text-white/40 text-xs uppercase tracking-widest">
                    Match
                  </TableHead>
                  <TableHead className="text-white/40 text-xs uppercase tracking-widest hidden sm:table-cell">
                    Predicted
                  </TableHead>
                  <TableHead className="text-white/40 text-xs uppercase tracking-widest hidden md:table-cell">
                    Actual
                  </TableHead>
                  <TableHead className="text-white/40 text-xs uppercase tracking-widest text-right">
                    Result
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((record, i) => (
                  <TableRow
                    key={record.matchId}
                    className="border-white/5 hover:bg-white/3 transition-colors"
                    data-ocid={`history.row.${i + 1}`}
                  >
                    <TableCell className="text-white/60 text-sm">
                      {record.date}
                    </TableCell>
                    <TableCell className="text-white text-sm font-medium">
                      {record.matchLabel}
                    </TableCell>
                    <TableCell className="text-purple-300 text-sm hidden sm:table-cell">
                      {record.predictedWinner}
                    </TableCell>
                    <TableCell className="text-white/60 text-sm hidden md:table-cell">
                      {record.actualWinner ?? (
                        <span className="text-white/30 italic">Pending</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {record.isCorrect === undefined ? (
                        <span className="text-white/30 text-sm">&#8212;</span>
                      ) : record.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-green-400 font-bold text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          +1
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-white/30 text-sm">
                          <XCircle className="w-3.5 h-3.5" />0
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number | string | null;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className="glass card-hover rounded-2xl p-5 flex items-center gap-4"
      style={{ borderLeft: `2px solid ${color}60` }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}18` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
          {label}
        </p>
        {value === null ? (
          <Skeleton className="h-7 w-16 bg-white/10" />
        ) : (
          <p className="font-display text-2xl font-bold text-white">{value}</p>
        )}
      </div>
    </div>
  );
}
