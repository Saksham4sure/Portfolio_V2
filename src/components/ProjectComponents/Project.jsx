import { useTheme } from "../../context/ThemeContext";

function Project({ title, img, descri, techno, link, about, idx }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`p-5 md:p-6 w-[320px] sm:w-[380px] md:w-[450px] max-w-[90vw] rounded-2xl md:rounded-3xl border flex flex-col transition-colors duration-300 ${
        isDark
          ? "bg-[#18181d] border-white/10 text-white shadow-2xl shadow-black/60"
          : "bg-white border-zinc-200/80 text-zinc-900 shadow-2xl shadow-zinc-400/25"
      }`}
    >
      {/* Project image with hover preview effect */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl md:rounded-2xl overflow-hidden relative group/img aspect-[16/10] bg-zinc-900/10 shadow-inner"
      >
        <img
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
          src={img}
          alt={title}
        />
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-4 py-2 rounded-full bg-white/95 text-zinc-900 text-xs font-semibold shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
            View Live <i className="ri-external-link-line" />
          </span>
        </div>
      </a>

      {/* Project content */}
      <div className="mt-4 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <span
            className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Project {idx}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
              isDark
                ? "text-emerald-300 bg-emerald-950/60 border-emerald-500/30"
                : "text-emerald-700 bg-emerald-50 border-emerald-200/60"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        <h3
          className={`text-2xl md:text-3xl bold mt-1 tracking-tight ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          {title}
        </h3>

        <p
          className={`text-sm md:text-base cardo mt-1 leading-snug line-clamp-2 h-10 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          {about}
        </p>

        {/* Tech stack badges & action button */}
        <div
          className={`flex justify-between items-center mt-3 pt-3 border-t gap-2 ${
            isDark ? "border-white/10" : "border-zinc-100"
          }`}
        >
          <div className="flex flex-wrap gap-1.5 items-center">
            {techno.map((t) => (
              <span
                key={t}
                className={`px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider rounded-full border ${
                  isDark
                    ? "bg-white/5 text-zinc-300 border-white/10"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200/60"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <a
            className={`group/btn inline-flex gap-1.5 text-xs md:text-sm font-medium items-center justify-center px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md shrink-0 ${
              isDark
                ? "text-zinc-900 bg-white hover:bg-zinc-200"
                : "text-white bg-[#1a1a1a] hover:bg-black"
            }`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit{" "}
            <i className="ri-arrow-right-up-line transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Project;
