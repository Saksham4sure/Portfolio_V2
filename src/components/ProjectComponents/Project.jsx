import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../../context/ThemeContext";
import HorizontalBlockReveal from "./HorizontalBlockReveal";

gsap.registerPlugin(ScrollTrigger);

function Project({
  index = 0,
  title,
  img,
  link,
  idx,
  tech = [],
  about = "",
  desc = "",
  year = "2025",
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardRef = useRef(null);
  const showcaseRef = useRef(null);

  // Build tags: include RESPONSIVE + project tech tags
  const tags = ["RESPONSIVE", ...(tech || []).map((t) => t.toUpperCase())];

  // Description line matching reference format: ALL CAPS ending with em-dash
  const displayDesc = about
    ? `${about.toUpperCase().replace(/\.$/, "")} —`
    : desc
    ? `${desc.slice(0, 75).toUpperCase().trim()} —`
    : "";

  const isEven = index % 2 === 0;

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      // 1. Dedicated Scroll-Tracked 3D Tilt Animation
      // This continuously tracks scroll as the card travels through the entire viewport
      const showcaseContainer = card.querySelector(".showcase-container");
      const ambientGlow = card.querySelector(".showcase-ambient-glow");
      const borderGlow = card.querySelector(".showcase-border-glow");

      if (showcaseContainer) {
        // Continuous 3D Tilt:
        // - At bottom of screen: tilts backward (rotateX: 10deg)
        // - In center of screen: sits completely flat and majestic (rotateX: 0deg)
        // - At top of screen: tilts forward (rotateX: -8deg)
        gsap.fromTo(
          showcaseContainer,
          {
            transformPerspective: 1200,
            rotateX: 10,
            rotateY: isDesktop ? (isEven ? -3 : 3) : 0,
          },
          {
            rotateX: -8,
            rotateY: isDesktop ? (isEven ? 2 : -2) : 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8, // tracks scroll with smooth dampening
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 2. Unveil & Horizontal Block Reveal Timeline
      // Configured so that the entire animation finishes completely while the card
      // is comfortably in the center of the viewport (NEVER after it has gone up)
      const startTrigger = isDesktop
        ? isEven
          ? "top 86%"
          : "top 72%"
        : "top 82%";

      // Ends when the center of the card is at 48% (even) or 44% (odd) of viewport
      // Ensuring the last card and all cards complete in full view!
      const endTrigger = isDesktop
        ? isEven
          ? "center 48%"
          : "center 44%"
        : "center 46%";

      // Image elements
      const imageBar = card.querySelector(".image-reveal-bar");
      const imageImg = card.querySelector(".project-screenshot-img");

      // Text elements
      const titleBar = card.querySelector(".title-reveal .block-reveal-bar");
      const titleContent = card.querySelector(".title-reveal .block-reveal-content");
      const metaBar = card.querySelector(".meta-reveal .block-reveal-bar");
      const metaContent = card.querySelector(".meta-reveal .block-reveal-content");
      const tagBars = card.querySelectorAll(".tag-reveal .block-reveal-bar");
      const tagContents = card.querySelectorAll(".tag-reveal .block-reveal-content");
      const descBar = card.querySelector(".desc-reveal .block-reveal-bar");
      const descContent = card.querySelector(".desc-reveal .block-reveal-content");

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: startTrigger,
          end: endTrigger,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Ambient aura bloom & border lighting as card enters
      if (ambientGlow) {
        revealTl.fromTo(
          ambientGlow,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          0
        );
      }

      if (borderGlow) {
        revealTl.fromTo(
          borderGlow,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          0
        );
      }

      if (showcaseContainer) {
        revealTl.fromTo(
          showcaseContainer,
          { opacity: 0.4, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          0
        );
      }

      // Image Horizontal Block Reveal (0.12 -> 0.60)
      if (imageBar && imageImg) {
        // Phase 1: Majestic block sweeps across from left
        revealTl.fromTo(
          imageBar,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.32, ease: "power2.inOut" },
          0.12
        );

        // At peak: unmask image
        revealTl.set(imageImg, { opacity: 1 }, 0.40);

        // Phase 2: Block collapses away to right while image settles
        revealTl.to(
          imageBar,
          {
            scaleX: 0,
            duration: 0.32,
            ease: "power2.inOut",
            transformOrigin: "right center",
          },
          0.40
        );
        revealTl.to(
          imageImg,
          {
            scale: 1,
            duration: 0.32,
            ease: "power2.out",
          },
          0.40
        );
      }

      // Helper for horizontal block reveal animation of texts
      const addBlockWipe = (bar, content, startTime, duration = 0.14) => {
        if (!bar || !content) return;
        revealTl.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration, ease: "power2.inOut" },
          startTime
        );
        revealTl.set(content, { opacity: 1 }, startTime + duration);
        revealTl.to(
          bar,
          {
            scaleX: 0,
            duration,
            ease: "power2.inOut",
            transformOrigin: "right center",
          },
          startTime + duration
        );
      };

      // Staggered horizontal text block reveals (0.36 -> 0.85)
      // All finishes by 0.85 of the timeline (well before card reaches middle of screen!)
      addBlockWipe(titleBar, titleContent, 0.36, 0.13);
      addBlockWipe(metaBar, metaContent, 0.46, 0.12);

      if (tagBars.length > 0 && tagContents.length > 0) {
        tagBars.forEach((bar, i) => {
          const content = tagContents[i];
          addBlockWipe(bar, content, 0.55 + i * 0.03, 0.10);
        });
      }

      if (descBar && descContent) {
        addBlockWipe(descBar, descContent, 0.66, 0.13);
      }
    },
    { scope: cardRef, dependencies: [index, isDark] }
  );

  // Subtle interactive 3D mouse tilt when hovering the showcase
  const handleMouseMove = (e) => {
    const el = showcaseRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: xPct * 7,
      rotateX: -yPct * 7,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const el = showcaseRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`project-item group flex flex-col w-full ${
        !isEven ? "md:mt-24 lg:mt-32" : ""
      }`}
    >
      {/* 1. Dark Showcase Preview Container with Scroll-Tracked 3D Tilt & Ambient Glow */}
      <div className="relative w-full">
        {/* Ambient Majestic Backlight Aura */}
        <div
          className="showcase-ambient-glow absolute -inset-2 rounded-3xl opacity-0 pointer-events-none blur-2xl transition-all duration-700"
          style={{
            background: isDark
              ? "radial-gradient(circle at 50% 50%, rgba(126, 58, 242, 0.22), rgba(59, 130, 246, 0.10), transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(126, 58, 242, 0.14), transparent 70%)",
          }}
        />

        <a
          ref={showcaseRef}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="showcase-container relative block w-full aspect-[16/10] sm:aspect-[1.65/1] rounded-2xl sm:rounded-3xl bg-[#141416] p-4 sm:p-5 md:p-6 overflow-hidden shadow-md transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/30"
          aria-label={`View ${title} project`}
          style={{
            willChange: "transform, opacity",
            transformOrigin: "center center",
          }}
        >
          {/* Subtle inner border glow */}
          <div className="showcase-border-glow absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.08] pointer-events-none transition-colors duration-500 group-hover:border-purple-500/30" />

          {/* Center Mockup Window */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="mockup-window w-full max-w-[580px] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#e8e6e1] transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Window Top Bar with 3 Dots */}
              <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#dedbd5] border-b border-black/[0.08]">
                <span className="w-2 h-2 rounded-full bg-black/25 inline-block" />
                <span className="w-2 h-2 rounded-full bg-black/25 inline-block" />
                <span className="w-2 h-2 rounded-full bg-black/25 inline-block" />
              </div>

              {/* Project Screenshot with Majestic Horizontal Block Reveal */}
              <div className="image-reveal-container relative aspect-[16/9] overflow-hidden bg-black/10">
                {/* Project Screenshot */}
                <img
                  src={img}
                  alt={title}
                  className="project-screenshot-img w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ opacity: 0, transform: "scale(1.08)" }}
                  loading="lazy"
                />

                {/* Majestic Dark Horizontal Block Reveal Bar */}
                <div
                  className="image-reveal-bar absolute inset-0 z-20 pointer-events-none origin-left"
                  style={{
                    transform: "scaleX(0)",
                    background: isDark
                      ? "linear-gradient(110deg, #0d0b14 0%, #1e1333 25%, #361a5c 50%, #4d2380 75%, #170e2b 100%)"
                      : "linear-gradient(110deg, #161024 0%, #291642 40%, #3f1e63 70%, #190f2b 100%)",
                    boxShadow: isDark
                      ? "0 0 35px rgba(77, 35, 128, 0.45), inset 0 0 20px rgba(168, 85, 247, 0.2)"
                      : "0 0 25px rgba(63, 30, 99, 0.35)",
                  }}
                >
                  {/* Luminous Leading Edge Accent */}
                  <div
                    className="absolute top-0 bottom-0 right-0 w-[3px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(168, 85, 247, 0.2) 0%, rgba(216, 180, 254, 0.95) 50%, rgba(168, 85, 247, 0.2) 100%)",
                      boxShadow: "0 0 12px rgba(192, 132, 252, 0.9)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* 2. Metadata Section Below Showcase with Horizontal Block Reveals */}
      <div className="flex flex-col mt-5 sm:mt-6">
        {/* Row 1: Title (Left) + Index / Year (Right) */}
        <div className="flex items-baseline justify-between gap-4">
          <div className="title-reveal">
            <HorizontalBlockReveal>
              <h3
                className={`text-xl sm:text-2xl font-bold tracking-tight uppercase transition-colors duration-300 ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  {title}
                </a>
              </h3>
            </HorizontalBlockReveal>
          </div>

          <div className="meta-reveal shrink-0">
            <HorizontalBlockReveal>
              <span
                className={`font-mono text-xs sm:text-sm tracking-widest font-medium transition-colors duration-300 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                {idx} &nbsp;／&nbsp; {year}
              </span>
            </HorizontalBlockReveal>
          </div>
        </div>

        {/* Row 2: Tag Pills with Horizontal Block Reveals */}
        <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-3.5">
          {tags.map((tag, i) => (
            <div key={i} className="tag-reveal inline-block">
              <HorizontalBlockReveal containerClassName="inline-block rounded-full">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider uppercase inline-block transition-colors duration-300 ${
                    isDark
                      ? "bg-zinc-800/90 text-zinc-300 border border-zinc-700/60"
                      : "bg-zinc-200/80 text-zinc-700 border border-zinc-300/60"
                  }`}
                >
                  {tag}
                </span>
              </HorizontalBlockReveal>
            </div>
          ))}
        </div>

        {/* Row 3: Uppercase Description Line with Horizontal Block Reveal */}
        {displayDesc && (
          <div className="desc-reveal mt-3.5 sm:mt-4">
            <HorizontalBlockReveal containerClassName="block">
              <p
                className={`text-[11px] sm:text-xs tracking-wider uppercase font-normal leading-relaxed transition-colors duration-300 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                {displayDesc}
              </p>
            </HorizontalBlockReveal>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
