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

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 1], [100, 0]);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      gsap.set(cards, {
        yPercent: (index) => (index === 0 ? 0 : 120),
        rotateX: (index) => (index === 0 ? 0 : -45),
        transformPerspective: 2000,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transformOrigin: "center center",
      });

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

      cards.forEach((card, index) => {
        if (index === 0) return;

        timeline.to(
          card,
          {
            yPercent: 0,
            rotateX: 0,
            duration: 1,
            ease: "none",
          },
          `card-${index}`
        );

        timeline.to(
          cards[index - 1],
          {
            scale: 0.7,
            duration: 1,
            rotateX: 45,
            ease: "none",
          },
          `card-${index}`
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
          Pins the header and card stack together until all cards stack 
        */}
        <div
          ref={pinnedWrapper}
          className="w-full h-screen flex flex-col justify-between pt-10 pb-6 relative overflow-hidden bg-white"
        >
          {/* STICKY HEADER */}
          <div className="z-50 px-10">
            <Titles title={titles[1].title} text={titles[1].text} />
            <h1 className="text-5xl font-bold mt-2">Selected Works</h1>
          </div>

          {/* CARD STACK VIEWPORT */}
          <div className="relative w-full flex-1 flex justify-center items-center px-10 my-4">
            {projectItems.map((proj, index) => (
              <div
                key={index}
                className="card absolute overflow-hidden shadow-2xl bg-white will-change-transform preserve-3d perspective-[2000px]"
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
          <div className="absolute h-[700%] w-[120%] bg-[#FFFFFF] left-[-10%] rounded-b-[50%] shadow-lg shadow-[#555555]"></div>
        </motion.div>
      </div>
    </>
  );
};

export default Projects;