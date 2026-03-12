import { ArrowRight, Clock } from "lucide-react";

interface HeroSectionProps {
  onPredictClick: () => void;
  onHistoryClick: () => void;
}

export default function HeroSection({
  onPredictClick,
  onHistoryClick,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/assets/generated/hero-sphere.dim_1200x800.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Purple overlay gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-purple-950/20 to-[#0a0a0a]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />

      {/* Animated blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0 animate-blob-1"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none z-0 animate-blob-2"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none z-0 animate-blob-3"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6 border border-purple-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
          <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
            IPL 2026 Season
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-display animate-fade-up-delay-1 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 leading-none">
          <span className="shimmer-text">IPLVERSE</span>
        </h1>

        <p className="animate-fade-up-delay-2 font-display text-xl sm:text-2xl md:text-3xl font-medium text-white/80 mb-4">
          IPL Match Prediction Platform
        </p>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 flex items-center justify-center gap-2 text-sm sm:text-base text-white/50 mb-10">
          <Clock className="w-4 h-4 text-purple-400" />
          AI-powered predictions, 24 hours before every match
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onPredictClick}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-base"
            data-ocid="hero.primary_button"
          >
            <span>Predict Tomorrow's Match</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onHistoryClick}
            className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base"
            data-ocid="hero.secondary_button"
          >
            View Prediction History
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up-delay-3 mt-16 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
