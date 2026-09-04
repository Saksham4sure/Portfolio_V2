import { motion, useScroll, useTransform } from "framer-motion";
import Project from "../components/ProjectComponents/Project";
import Titles from "../components/Titles";
import { projectItems, titles } from "../constants";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const container = useRef(null);
  const pinnedWrapper = useRef(null);
  const bgBlurRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], [100, 0]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      // Initial card stack state:
      // All cards remain 100% opaque (no transparency/fading)
      gsap.set(cards, {
        yPercent: (index) => (index === 0 ? 0 : 120),
        rotateX: (index) => (index === 0 ? 0 : -28),
        scale: 1,
        opacity: 1,
        transformPerspective: 1800,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transformOrigin: "center center",
        force3D: true,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedWrapper.current,
          start: "top top",
          end: () => `+=${cards.length * 125}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1.4, // Smoother scroll damping
          invalidateOnRefresh: true,
        },
      });

      // Background blurs smoothly as soon as the project card animation starts
      timeline.to(
        bgBlurRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );

      timeline.to(
        headerRef.current,
        {
          opacity: 0.55,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );

      // Smooth sequential card stacking without any transparency/fading
      cards.forEach((card, index) => {
        if (index === 0) return;

        const cardLabel = `card-${index}`;

        // Previous card scales down and tilts back smoothly
        timeline.to(
          cards[index - 1],
          {
            scale: 0.78,
            rotateX: 22,
            duration: 1.2,
            ease: "power1.inOut",
          },
          cardLabel
        );

        // Incoming card swings into position smoothly
        timeline.to(
          card,
          {
            yPercent: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "power1.inOut",
          },
          cardLabel
        );
      });
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} id="projects" className="relative">
        {/* 
          PINNED SECTION WRAPPER 
          Increased height & padding so card shadows never clip
        */}
        <div
          ref={pinnedWrapper}
          className="w-full min-h-[120vh] md:min-h-[125vh] flex flex-col justify-between pt-10 pb-20 relative overflow-x-clip bg-[#fafafa]"
        >
          {/* Background blur layer active during scroll animation */}
          <div
            ref={bgBlurRef}
            className="absolute inset-0 bg-white/40 backdrop-blur-md opacity-0 pointer-events-none z-10 transition-opacity duration-300"
          />

          {/* STICKY HEADER */}
          <div
            ref={headerRef}
            className="z-20 px-8 md:px-14 transition-all duration-300"
          >
            <Titles title={titles[1].title} text={titles[1].text} />
            <h2 className="text-4xl md:text-5xl bold mt-2 tracking-tight text-zinc-900">
              Selected Works
            </h2>
          </div>

          {/* CARD STACK VIEWPORT - ample vertical room with overflow-visible to prevent shadow clipping */}
          <div className="relative w-full flex-1 flex justify-center items-center px-6 md:px-10 py-6 z-30 overflow-visible">
            {projectItems.map((proj, index) => (
              <div
                key={index}
                className="card absolute overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-white will-change-transform preserve-3d"
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

        {/* CURVED BOTTOM SECTION */}
        <motion.div style={{ height }} className="relative mt-2.5 z-40">
          <div className="absolute h-[700%] w-[120%] bg-[#fafafa] left-[-10%] rounded-b-[50%] shadow-lg shadow-[#555555]/20"></div>
        </motion.div>
      </div>
    </>
  );
};

export default Projects;