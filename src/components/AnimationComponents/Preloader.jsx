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
      className="fixed inset-0 bg-[#252525] h-screen h-[100dvh] w-screen w-[100dvw] flex flex-col items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Center greeting text */}
      <p
        ref={textRef}
        className="text-white text-4xl sm:text-5xl font-light tracking-wide text-center"
      >
        • Hello
      </p>

      {/* Bottom center: Loading bar above percentage counter (visible on mobile) */}
      <div
        className="absolute bottom-12 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3.5 z-20 w-full max-w-[240px] px-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
      >
        {/* Loading bar */}
        <div className="w-full h-[3px] bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-white rounded-full origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Percentage */}
        <span
          ref={percentRef}
          className="text-xs font-medium text-white/75 tracking-widest font-mono select-none"
        >
          0%
        </span>
      </div>
    </div>
  );
}
