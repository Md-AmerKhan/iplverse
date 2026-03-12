import { BarChart2, Brain, CalendarDays, Target } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Match Prediction",
    description:
      "AI predicts IPL matches 1 day before play using advanced statistical models.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    icon: BarChart2,
    title: "AI Match Analysis",
    description:
      "Deep analysis explains exactly why a team is predicted to win.",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.25)",
  },
  {
    icon: CalendarDays,
    title: "Upcoming Matches",
    description:
      "Full IPL 2026 match schedule with venues, timings, and team info.",
    color: "#e879f9",
    glow: "rgba(232,121,249,0.25)",
  },
  {
    icon: Target,
    title: "Accuracy Tracker",
    description:
      "Track how accurate AI predictions are over time with detailed stats.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.25)",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-4 border border-purple-500/20">
            <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
              Platform Features
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Why IPLVERSE?
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            The smartest IPL prediction engine — combining AI, data science, and
            real-time cricket intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass card-hover rounded-2xl p-6 flex flex-col gap-4 group relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Hover glow background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${feature.glow}, transparent 70%)`,
                  }}
                />

                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${feature.glow}`,
                    border: `1px solid ${feature.color}40`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>

                <div className="relative">
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
