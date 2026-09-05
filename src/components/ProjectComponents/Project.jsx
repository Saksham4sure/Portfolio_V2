import { useTheme } from "../../context/ThemeContext";

function Project({
  title,
  img,
  link,
  idx,
  tech = [],
  about = "",
  desc = "",
  year = "2025",
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Build tags: include RESPONSIVE + project tech tags
  const tags = ["RESPONSIVE", ...(tech || []).map((t) => t.toUpperCase())];

  // Description line matching reference format: ALL CAPS ending with em-dash
  const displayDesc = about
    ? `${about.toUpperCase().replace(/\.$/, "")} —`
    : desc
    ? `${desc.slice(0, 75).toUpperCase().trim()} —`
    : "";

  return (
    <div className="project-item group flex flex-col w-full">
      {/* 1. Dark Showcase Preview Container */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-[16/10] sm:aspect-[1.65/1] rounded-2xl sm:rounded-3xl bg-[#141416] p-4 sm:p-5 md:p-6 overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-black/30 group-hover:-translate-y-1"
        aria-label={`View ${title} project`}
      >
        {/* Subtle inner border glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.06] pointer-events-none" />

        {/* Center Mockup Window */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[580px] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#e8e6e1] transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Window Top Bar with 3 Dots */}
            <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#dedbd5] border-b border-black/[0.08]">
              <span className="w-2 h-2 rounded-full bg-black/25 inline-block" />
              <span className="w-2 h-2 rounded-full bg-black/25 inline-block" />
              <span className="w-2 h-2 rounded-full bg-black/25 inline-block" />
            </div>

            {/* Project Screenshot */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </a>

      {/* 2. Metadata Section Below Showcase */}
      <div className="flex flex-col mt-5 sm:mt-6">
        {/* Row 1: Title (Left) + Index / Year (Right) */}
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={`text-xl sm:text-2xl font-bold tracking-tight uppercase transition-colors duration-300 ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              {title}
            </a>
          </h3>

          <span
            className={`font-mono text-xs sm:text-sm tracking-widest font-medium shrink-0 transition-colors duration-300 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            {idx} &nbsp;／&nbsp; {year}
          </span>
        </div>

        {/* Row 2: Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-3.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider uppercase transition-colors duration-300 ${
                isDark
                  ? "bg-zinc-800/90 text-zinc-300 border border-zinc-700/60"
                  : "bg-zinc-200/80 text-zinc-700 border border-zinc-300/60"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Row 3: Uppercase Description Line */}
        {displayDesc && (
          <p
            className={`mt-3.5 sm:mt-4 text-[11px] sm:text-xs tracking-wider uppercase font-normal leading-relaxed transition-colors duration-300 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            {displayDesc}
          </p>
        )}
      </div>
    </div>
  );
}

export default Project;
