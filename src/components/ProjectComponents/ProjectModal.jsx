import { useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useTheme } from "../../context/ThemeContext";

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  img,
  link,
  idx,
  tech = [],
  desc = "",
  year = "2025",
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const overlayRef = useRef(null);
  const windowRef = useRef(null);

  // Animate in on mount
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const win = windowRef.current;
    if (!overlay || !win) return;

    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        win,
        { opacity: 0, scale: 0.92, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.05 }
      );
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [isOpen]);

  // Animate out then call onClose
  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const win = windowRef.current;
    if (!overlay || !win) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onClose();
      },
    });

    tl.to(win, { opacity: 0, scale: 0.92, y: 30, duration: 0.25, ease: "power2.in" }, 0);
    tl.to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.05);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const tags = ["RESPONSIVE", ...(tech || []).map((t) => t.toUpperCase())];

  const modal = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: isDark
            ? "rgba(0, 0, 0, 0.75)"
            : "rgba(0, 0, 0, 0.50)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* macOS Window */}
      <div
        ref={windowRef}
        className={`relative w-full max-w-2xl rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ${
          isDark
            ? "bg-[#1c1c1e] border border-white/[0.08]"
            : "bg-[#f5f5f5] border border-black/[0.08]"
        }`}
        style={{
          opacity: 0,
          maxHeight: "90vh",
          boxShadow: isDark
            ? "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(126, 58, 242, 0.12)"
            : "0 25px 60px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Title Bar — macOS style */}
        <div
          className={`flex items-center gap-2 px-4 py-2.5 ${
            isDark
              ? "bg-[#2a2a2c] border-b border-white/[0.06]"
              : "bg-[#e8e6e1] border-b border-black/[0.08]"
          }`}
        >
          {/* Traffic light buttons */}
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center group"
            aria-label="Close"
          >
            <svg
              className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 10 10"
              fill="none"
              stroke="#4d0000"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="2" y1="2" x2="8" y2="8" />
              <line x1="8" y1="2" x2="2" y2="8" />
            </svg>
          </button>
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />

          {/* Window title */}
          <span
            className={`ml-auto mr-auto text-xs font-medium tracking-wide ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            {title}
          </span>
          {/* Spacer to center the title (offset for 3 dots) */}
          <div className="w-[52px]" />
        </div>

        {/* Scrollable Content Area */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 44px)" }}
        >
          {/* Project Screenshot */}
          <div className="w-full aspect-[16/9] overflow-hidden bg-black/10">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Details */}
          <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-4">
            {/* Title + Index/Year row */}
            <div className="flex items-baseline justify-between gap-4">
              <h3
                className={`text-xl sm:text-2xl font-bold tracking-tight uppercase ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                {title}
              </h3>
              <span
                className={`font-mono text-xs sm:text-sm tracking-widest font-medium shrink-0 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                {idx} &nbsp;／&nbsp; {year}
              </span>
            </div>

            {/* Created date */}
            <div className="flex items-center gap-2">
              <span
                className={`text-xs tracking-wide uppercase font-medium ${
                  isDark ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Created
              </span>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {year}
              </span>
            </div>

            {/* Technology Tags */}
            <div className="space-y-2">
              <span
                className={`text-xs tracking-wide uppercase font-medium ${
                  isDark ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Technologies
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider uppercase ${
                      isDark
                        ? "bg-zinc-800/90 text-zinc-300 border border-zinc-700/60"
                        : "bg-zinc-200/80 text-zinc-700 border border-zinc-300/60"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span
                className={`text-xs tracking-wide uppercase font-medium ${
                  isDark ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                Description
              </span>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {desc}
              </p>
            </div>

            {/* Visit Site Button */}
            <div className="pt-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  isDark
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-800/40"
                    : "bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30"
                }`}
              >
                Visit Site
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
