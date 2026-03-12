import { Zap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-12 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-neon-purple" fill="#a855f7" />
              <span className="font-display font-bold text-xl gradient-text">
                IPLVERSE
              </span>
            </div>
            <p className="text-xs text-white/30">Powered by AI · IPL 2026</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-white/30">
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#matches")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-white/60 transition-colors"
            >
              Matches
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-white/60 transition-colors"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#history")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-white/60 transition-colors"
            >
              History
            </button>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/25">
            © {year} IPLVERSE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
