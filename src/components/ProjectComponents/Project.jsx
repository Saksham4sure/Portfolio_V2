import { Link } from "react-router-dom";


function Project({ title, img, descri, techno, link, about, idx }) {

  return (

    <div className="bg-[#fefefe] p-4 border border-zinc-200 w-80 md:w-108 flex flex-col ">
      <a href={link} target="_blank">
        <div className="h-41 w-72 md:h-56 md:w-100 overflow-hidden">
          <img className="h-full w-full object-center object-cover" src={img} alt={title} />
        </div>
      </a>
      <div className="mt-4 flex flex-col justify-center">
        <h1 className="text-sm text-[#999999]">Project {idx}</h1>
        <h1 className="text-[#222] text-4xl font-semibold mt-1">{title}</h1>
        <p className="text-2xl cardo lowercase leading-6 mt-1 h-13">{about}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="text-[#999999] flex gap-2 text-xs md:text-sm items-center cursor-default">
            {techno.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <a className="flex gap-2 text-lg items-center justify-center w-30 rounded-full py-px text-[#eeeeee] bg-[#222222]" href={link} target="_blank" >Visit <i className="ri-arrow-right-long-line"></i></a>
        </div>
      </div>
    </div>

  );
}

export default Project;
