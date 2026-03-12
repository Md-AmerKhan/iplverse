import { Toaster } from "@/components/ui/sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PredictionHistory from "./components/PredictionHistory";
import PredictionModal from "./components/PredictionModal";
import UpcomingMatches from "./components/UpcomingMatches";
import { useActor } from "./hooks/useActor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

function AppContent() {
  const { actor } = useActor();
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const qc = useQueryClient();

  // Initialize backend on mount, then trigger match queries
  useEffect(() => {
    if (!actor) return;
    let cancelled = false;
    actor
      .initialize()
      .catch(() => {
        // Already initialized is fine
      })
      .finally(() => {
        if (!cancelled) {
          setInitialized(true);
          qc.invalidateQueries({ queryKey: ["upcomingMatches"] });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [actor, qc]);

  const handlePredictClick = () => {
    document.querySelector("#matches")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHistoryClick = () => {
    document.querySelector("#history")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main>
        <HeroSection
          onPredictClick={handlePredictClick}
          onHistoryClick={handleHistoryClick}
        />

        {/* Separator gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <UpcomingMatches
          onPredict={(id) => setSelectedMatchId(id)}
          initialized={initialized}
        />

        {/* Separator gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <FeatureCards />

        {/* Separator gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <PredictionHistory />
      </main>

      <Footer />

      {/* Prediction Modal */}
      {selectedMatchId && (
        <PredictionModal
          matchId={selectedMatchId}
          onClose={() => setSelectedMatchId(null)}
        />
      )}

      <Toaster />
    </div>
  );
}
