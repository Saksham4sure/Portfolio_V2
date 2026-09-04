import { motion, useScroll, useTransform } from "framer-motion";
import Project from "../components/ProjectComponents/Project";
import Titles from "../components/Titles";
import { projectItems, titles } from "../constants";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const container = useRef(null);
  const pinnedWrapper = useRef(null);
  const bgBlurRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Recalculate ScrollTrigger on theme change to ensure layout stability
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [theme]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      if (!cards.length) return;

      // Initial card stack states (all remain 100% opaque, no fading)
      gsap.set(cards, {
        yPercent: (index) => (index === 0 ? 0 : 120),
        rotateX: (index) => (index === 0 ? 0 : -16),
        scale: (index) => (index === 0 ? 1 : 0.96),
        opacity: 1,
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transformOrigin: "center center",
        force3D: true,
      });

      // Pin the viewport-height container cleanly
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedWrapper.current,
          start: "top top",
          end: () => `+=${cards.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Background blur activates right as card animation begins
      timeline.to(
        bgBlurRef.current,
        {
          opacity: 1,
          duration: 0.25,
          ease: "none",
        },
        0
      );

      // 2. Subtle header dimming
      timeline.to(
        headerRef.current,
        {
          opacity: 0.55,
          duration: 0.25,
          ease: "none",
        },
        0
      );

      // 3. Smooth sequential card stacking (ease: none for direct scrub tracking)
      cards.forEach((card, index) => {
        if (index === 0) return;

        const stepLabel = `step-${index}`;

        // All previous cards step backward in 3D space
        for (let j = 0; j < index; j++) {
          const depth = index - j;
          timeline.to(
            cards[j],
            {
              scale: Math.max(0.74, 1 - depth * 0.08),
              yPercent: -depth * 5,
              rotateX: depth * 6,
              duration: 1,
              ease: "none",
            },
            stepLabel
          );
        }

        // Current incoming card slides smoothly up to the center
        timeline.to(
          card,
          {
            yPercent: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: "none",
          },
          stepLabel
        );
      });
    },
    { scope: container }
  );

  return (
    <>
      <div
        ref={container}
        id="projects"
        className={`relative transition-colors duration-300 ${
          isDark ? "bg-[#121214] text-white" : "bg-[#f8f8fa] text-zinc-900"
        }`}
      >
        {/* 
          PINNED SECTION WRAPPER 
          Strictly viewport-height (h-screen) so ScrollTrigger pinning is 100% stable
        */}
        <div
          ref={pinnedWrapper}
          className="w-full h-screen relative flex flex-col justify-between pt-14 pb-8 overflow-x-clip"
        >
          {/* Ambient background orbs for rich blur visibility */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
              className={`absolute top-1/4 -left-12 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
                isDark
                  ? "bg-purple-900/20 opacity-40"
                  : "bg-purple-200/40 opacity-70"
              }`}
            />
            <div
              className={`absolute bottom-1/4 -right-12 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500 ${
                isDark
                  ? "bg-indigo-900/20 opacity-40"
                  : "bg-sky-200/40 opacity-70"
              }`}
            />
            <div
              className={`absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-3xl transition-opacity duration-500 ${
                isDark
                  ? "bg-emerald-900/15 opacity-30"
                  : "bg-amber-100/40 opacity-60"
              }`}
            />
          </div>

          {/* Background blur overlay: activates smoothly when cards start animating */}
          <div
            ref={bgBlurRef}
            className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
              isDark
                ? "bg-[#121214]/50 backdrop-blur-xl"
                : "bg-[#f8f8fa]/60 backdrop-blur-xl"
            }`}
            style={{ opacity: 0 }}
          />

          {/* STICKY HEADER */}
          <div
            ref={headerRef}
            className="z-20 px-8 md:px-14 transition-all duration-300"
          >
            <Titles title={titles[1].title} text={titles[1].text} />
            <h2
              className={`text-4xl md:text-5xl bold mt-2 tracking-tight transition-colors duration-300 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Selected Works
            </h2>
          </div>

          {/* CARD STACK VIEWPORT - Centered with ample room so shadows never clip */}
          <div className="relative w-full flex-1 flex justify-center items-center px-4 md:px-10 z-30 overflow-visible">
            {projectItems.map((proj, index) => (
              <div
                key={index}
                className="card absolute rounded-2xl md:rounded-3xl will-change-transform preserve-3d"
                style={{ zIndex: (index + 1) * 10 }}
              >
                <Project
                  title={proj.title}
                  img={proj.img}
                  descri={proj.desc}
                  techno={proj.tech}
                  link={proj.link}
                  about={proj.about}
                  idx={proj.idx}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CURVED BOTTOM SECTION: Matches the constant section background color */}
        <motion.div style={{ height }} className="relative mt-2.5 z-40">
          <div
            className={`absolute h-[700%] w-[120%] left-[-10%] rounded-b-[50%] shadow-lg transition-colors duration-300 ${
              isDark
                ? "bg-[#121214] shadow-black/40"
                : "bg-[#f8f8fa] shadow-zinc-300/40"
            }`}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Projects;