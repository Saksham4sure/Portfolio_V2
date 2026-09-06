import Project from "../components/ProjectComponents/Project";
import Titles from "../components/Titles";
import { projectItems, titles } from "../constants";
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      id="projects"
      className={`relative transition-colors duration-300 pt-20 pb-36 md:pb-52 lg:pb-60 bg-transparent ${
        isDark ? "text-white" : "text-zinc-900"
      }`}
    >
      {/* Section header */}
      <div className="px-8 md:px-14 mb-12">
        <Titles title={titles[1].title} text={titles[1].text} />
        <h2
          className={`text-4xl md:text-5xl bold mt-2 tracking-tight transition-colors duration-300 md:px-40 px-10 ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          Selected Works
        </h2>
      </div>

      {/* Projects grid */}
      <div className="px-6 md:px-14 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-14 md:gap-y-20">
          {projectItems.map((proj, index) => (
            <Project
              key={index}
              index={index}
              title={proj.title}
              img={proj.img}
              link={proj.link}
              idx={proj.idx}
              tech={proj.tech}
              about={proj.about}
              desc={proj.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;