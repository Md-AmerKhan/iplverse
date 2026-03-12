import { Heart, Zap } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

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

          {/* Attribution */}
          <p className="text-xs text-white/25">
            © {year}. Built with{" "}
            <Heart className="inline w-3 h-3 text-purple-400 fill-purple-400" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400/70 hover:text-purple-400 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
