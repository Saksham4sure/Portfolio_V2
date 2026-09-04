import React, { useRef } from "react";
import SplitChar from "../AnimationComponents/SplitChar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitWords from "../AnimationComponents/SplitWords";
import { useTheme } from "../../context/ThemeContext";

const HeroLeftText = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const line = useRef();

  useGSAP(() => {
    gsap.from(line.current, {
      scaleX: 0,
      duration: 1,
      delay: 1,
      ease: "power3.out",
    });
  });

  return (
    <div className="left-text w-[100vw] md:w-1/2 h-screen">
      <div className="top-text absolute bottom-[65%] min-[376px]:bottom-[63%] md:bottom-[39%]">
        <SplitChar
          delay={0}
          className={`text-3xl min-[376px]:text-[45px] w-[100vw] leading-[41px] bold animated-text transition-colors duration-300 ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          Frontend
        </SplitChar>
        <SplitChar
          delay={0.3}
          className={`text-3xl min-[376px]:text-[45px] w-[100vw] leading-[41px] bold animated-text transition-colors duration-300 ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          Developer
        </SplitChar>
        <SplitWords
          delay={0.5}
          className={`text-xl min-[376px]:text-3xl w-[100vw] light animated-text transition-colors duration-300 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          —still figuring it out.
        </SplitWords>
        <div
          ref={line}
          className={`w-[260px] h-[1px] absolute top-[120px] rounded-full origin-left animated-text transition-colors duration-300 ${
            isDark ? "bg-white/30" : "bg-zinc-800"
          }`}
        ></div>
      </div>
      <a
        href="/MyResume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={`bottom-text absolute bottom-[58%] min-[376px]:bottom-[54%] md:bottom-[4%] transition-colors duration-300 ${
          isDark ? "text-white hover:text-zinc-300" : "text-zinc-900 hover:text-zinc-600"
        }`}
      >
        <SplitWords delay={0.5} className="text-lg animated-text">
          View resume
        </SplitWords>
      </a>
    </div>
  );
};

export default HeroLeftText;
