import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

function SkillCard({ skill, desc, marq, icon, index }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);

  useGSAP(() => {
    // Entrance fade-in for each card
    gsap.from(cardRef.current, {
      y: 35,
      opacity: 0,
      scale: 0.94,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 95%",
        toggleActions: "play none none none",
      },
      delay: (index % 3) * 0.08,
    });

    // Individual card scroll-tracked flip sequence:
    // - Entrance flip at start (0 -> 180deg)
    // - Stable reading hold in middle
    // - Exit flip at end (180 -> 360deg)
    const step = index % 4;
    const startY = 92 - step * 8;
    const endY = 60 - step * 8;
    const exitStartY = 20 - step * 8;
    const exitEndY = -12 - step * 8;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: `top ${startY}%`,
        end: `top ${exitEndY}%`,
        scrub: 0.8,
      },
    });

    tl.fromTo(
      cardInnerRef.current,
      { rotateY: 0 },
      {
        rotateY: 180,
        force3D: true,
        ease: "power1.inOut",
        duration: 32,
      }
    )
      .to(cardInnerRef.current, {
        rotateY: 180,
        duration: 40,
      })
      .to(cardInnerRef.current, {
        rotateY: 360,
        force3D: true,
        ease: "power1.inOut",
        duration: 32,
      });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-[240px] mx-auto cursor-default"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardInnerRef}
        className="relative w-full"
        style={{
          transformStyle: "preserve-3d",
          aspectRatio: "3 / 3.8",
          willChange: "transform",
        }}
      >
        {/* ===== FRONT FACE (Always Minimal Dark Card) ===== */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-between py-7 px-5 border border-white/[0.08] overflow-hidden shadow-xl shadow-black/40"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(145deg, #18181c, #0f0f12)",
          }}
        >
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="flex-1 flex items-center justify-center">
            <img
              src={icon}
              alt={skill}
              className="w-12 h-12 md:w-14 md:h-14"
              style={{ filter: "brightness(0) invert(1) opacity(0.8)" }}
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl bold tracking-wider uppercase text-white/90">
              {skill}
            </h3>
            <p className="text-xs md:text-sm light mt-1 tracking-wide text-white/40">
              {desc}
            </p>
          </div>
        </div>

        {/* ===== BACK FACE (Light Holographic Card with Blended Dark Content) ===== */}
        <div
          className="absolute inset-0 rounded-2xl light-holo-card holo-card-glow flex flex-col items-center justify-between py-7 px-5 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Organic Aurora holographic fluid background */}
          <div className="absolute inset-0 holo-aurora rounded-2xl" />

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Top ambient card indicator - darker overlay blend */}
          <div
            className="relative w-full flex justify-between items-center text-[10px] tracking-widest uppercase font-mono font-bold"
            style={{
              color: "#000000",
              mixBlendMode: "overlay",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            <span>SKILL</span>
            <span>0{index + 1}</span>
          </div>

          {/* Glass border reflection + inner shine */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          />

          {/* Center icon: overlay blend with darker contrast */}
          <div className="relative flex-1 flex items-center justify-center" style={{ mixBlendMode: "overlay" }}>
            <img
              src={icon}
              alt={skill}
              className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 hover:scale-110 object-contain holo-overlay-icon"
            />
          </div>
          

          {/* Bottom typography: overlay blend with darker contrast */}
          <div className="relative text-center" style={{ mixBlendMode: "overlay" }}>
            <h3
              className="text-xl md:text-2xl bold tracking-wider uppercase holo-overlay-title"
              style={{
                fontFamily: "'SatoshiBold', sans-serif",
              }}
            >
              {skill}
            </h3>
            <p
              className="text-xs md:text-[13px] mt-1.5 tracking-wide cardo italic holo-overlay-subtext"
            >
              {marq}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;