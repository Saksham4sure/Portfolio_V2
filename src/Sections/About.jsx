import { useRef } from "react";
import SkillCard from "../components/SkillComponents/Skills";
import Titles from "../components/Titles";
import { aboutPara1, aboutPara2, skillTiles, titles } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const words1 = aboutPara1.split(" ");
  const words2 = aboutPara2.split(" ");
  const mainText = useRef(null);
  const secondText = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const text1 = mainText.current.querySelectorAll("span");
    const text2 = secondText.current.querySelectorAll("span");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      })
      .from(text1, {
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.1,
        ease: "power3.out",
      })
      .from(text2, {
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.out",
      });
  }, []);

  return (
    <div
      id="skills"
      className={`flex flex-col items-center px-6 md:px-10 transition-colors duration-300 relative bg-transparent ${
        isDark ? "text-white" : "text-zinc-900"
      }`}
    >
      <div
        ref={sectionRef}
        className="py-36 flex flex-col items-center justify-center gap-8 md:h-[70vh] md:w-[100vw] md:relative z-10"
      >
        <div
          ref={mainText}
          className={`text-3xl md:text-[2.5vw] md:absolute md:left-15 md:top-[35%] md:w-[70vw] flex flex-wrap transition-colors duration-300 ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          {words1.map((word, i) => (
            <span className="mr-[6px] inline-block" key={i}>
              {word}
            </span>
          ))}
        </div>

        <div
          ref={secondText}
          className={`text-xl md:text-[1.7vw] md:absolute md:right-15 md:w-[30vw] md:top-[60%] light flex flex-wrap transition-colors duration-300 ${
            isDark ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          {words2.map((word, i) => (
            <span className="mr-[6px] inline-block" key={i}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Dim base text layer behind the scroll-revealed text */}
      <div
        className={`py-36 flex flex-col items-center justify-center gap-8 md:h-[70vh] md:w-[100vw] absolute px-6 md:px-10 pointer-events-none transition-colors duration-300 ${
          isDark ? "text-white/15" : "text-zinc-300/80"
        }`}
      >
        <div className="text-3xl md:text-[2.5vw] md:absolute md:left-15 md:top-[35%] md:w-[70vw] flex flex-wrap">
          {words1.map((word, i) => (
            <span className="mr-[6px] inline-block" key={i}>
              {word}
            </span>
          ))}
        </div>

        <div className="text-xl md:text-[1.7vw] md:absolute md:right-15 md:w-[30vw] md:top-[60%] light flex flex-wrap">
          {words2.map((word, i) => (
            <span className="mr-[6px] inline-block" key={i}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="md:pt-10 pb-16 w-full">
        <Titles title={titles[0].title} text={titles[0].text} />
        <div className="flex flex-wrap justify-center gap-5 px-6 md:px-16 max-w-6xl mx-auto">
          {skillTiles.map((skill, index) => (
            <SkillCard
              key={skill.skill}
              skill={skill.skill}
              desc={skill.desc}
              marq={skill.marq}
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
