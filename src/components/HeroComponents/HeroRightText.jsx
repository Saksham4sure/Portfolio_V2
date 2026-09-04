import SplitLines from "../AnimationComponents/SplitLines";
import SplitWords from "../AnimationComponents/SplitWords";
import { useTheme } from "../../context/ThemeContext";

const HeroRightText = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <div className="right-text w-[90vw] md:w-1/2 absolute bottom-[42%] min-[376px]:bottom-[42%] md:bottom-[4%] md:right-3 ">
        <SplitWords
          delay={0.6}
          className={`text-lg md:text-xl animated-text transition-colors duration-300 ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          Saksham Shrestha
        </SplitWords>
        <SplitLines
          delay={0.7}
          className={`text-sm md:text-base leading-snug light animated-text transition-colors duration-300 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          I'm a frontend-focused web developer crafting modern, scalable, and
          user-friendly digital experiences with a strong eye for design and
          performance.
        </SplitLines>
      </div>
    </>
  );
};

export default HeroRightText;
