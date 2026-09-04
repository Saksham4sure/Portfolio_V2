import { useTheme } from "../context/ThemeContext";

function Titles({ title, text, inverted = false }) {
  const { theme } = useTheme();
  // When inverted is true (e.g. in Contact footer), invert the color scheme
  const isLight = inverted ? theme === 'dark' : theme === 'light';

  return (
    <div className="md:px-40 pb-10 px-10">
      <h1 className={`light text-3xl transition-colors duration-300 ${
        isLight ? 'text-zinc-900' : 'text-white'
      }`}>
        {title}
      </h1>
      <p className={`light text-lg transition-colors duration-300 ${
        isLight ? 'text-zinc-500' : 'text-white/50'
      }`}>
        {text}
      </p>
    </div>
  );
}

export default Titles;
