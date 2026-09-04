import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useState } from "react";

const words = [
  "• Hello",
  "• Namaste",
  "• Nǐ hǎo",
  "• Ciao",
  "• Hola",
  "• Konnichiwa",
  "• Hallo",
  "• Bonjour",
  "• नमस्कार",
];

export default function Preloader({ ready, setLoading }) {
  const textRef = useRef();
  const containerRef = useRef();
  const progressBarRef = useRef();
  const percentRef = useRef();
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setAnimationDone(true),
    });

    const progressObj = { value: 0 };
    const totalWords = words.length;

    // Smooth entrance fade-in for text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      0
    );

    // Synchronized loading bar fill
    tl.to(
      progressBarRef.current,
      {
        scaleX: 1,
        duration: 2.2,
        ease: "power1.inOut",
      },
      0
    );

    // Synchronized percentage & text progression
    tl.to(
      progressObj,
      {
        value: 100,
        duration: 2.2,
        ease: "power1.inOut",
        onUpdate: () => {
          const currentPct = Math.round(progressObj.value);
          if (percentRef.current) {
            percentRef.current.innerText = `${currentPct}%`;
          }
          if (textRef.current) {
            const wordIdx = Math.min(
              Math.floor((progressObj.value / 100) * totalWords),
              totalWords - 1
            );
            textRef.current.innerText = words[wordIdx];
          }
        },
      },
      0
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!ready || !animationDone) return;

    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => setLoading(false),
    });
  }, [ready, animationDone, setLoading]);


  return (
    <div
      ref={containerRef}
      className="fixed bg-[#252525] h-[100vh] w-[100vw] flex flex-col items-center justify-center z-[9999]"
    >
      {/* Center greeting text */}
      <p
        ref={textRef}
        className="text-white text-5xl font-light tracking-wide text-center"
      >
        • Hello
      </p>

      {/* Bottom center: Loading bar above percentage counter */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        {/* Loading bar */}
        <div className="w-48 md:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-white rounded-full origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Percentage */}
        <span
          ref={percentRef}
          className="text-xs light text-white/50 tracking-widest font-mono"
        >
          0%
        </span>
      </div>
    </div>
  );
}
