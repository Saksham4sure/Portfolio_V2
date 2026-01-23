import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";


function Project({ title, img, descri, techno, link }) {

  return (

    <div className="flex flex-col md:flex-row w-full py-5 md:px-4">
      <div className="w-full md:w-1/2 border-b border-[#bebebe] flex flex-col">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className="md:text-lg md:pr-20 pt-2 leading-tight">{descri}</p>
        <Link className="uppercase pt-6 md:pt-10 text-lg pb-2 md:text-2xl text-[#666666]" to={link}>See The Website</Link>
        <div className="flex gap-2 capitalize md:text-xl h-full items-end pb-5">
          {techno.map((tech) => (
            <p>{tech}</p>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 overflow-hidden py-5">
        <img className="scale-103 h-full object-cover w-full" src={img} alt={title} />
      </div>
    </div>

  );
}

export default Project;
