import { Link } from "react-router-dom";


function Project({ title, img, descri, techno, link, about, idx }) {

  return (

    // <div className="flex flex-col md:flex-row w-full py-5 md:px-4">
    //   <div className="w-full md:w-1/2 border-b border-[#bebebe] flex flex-col">
    //     <h1 className="text-4xl font-semibold">{title}</h1>
    //     <p className="md:text-lg md:pr-20 pt-2 leading-tight">{descri}</p>
    //     <Link className="uppercase pt-6 md:pt-10 text-lg pb-2 md:text-2xl text-[#666666]" to={link}>See The Website</Link>
    //     <div className="flex gap-2 capitalize md:text-xl h-full items-end pb-5">
    //       {techno.map((tech) => (
    //         <p>{tech}</p>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="md:w-1/2 overflow-hidden py-5">
    //     <img className="scale-103 h-full object-cover w-full" src={img} alt={title} />
    //   </div>
    // </div>

    <div className="bg-[eeeeee] p-4 md:h-65 border border-zinc-200 w-80 md:w-150 flex flex-col md:flex-row">
      <div className="h-72 md:h-auto md:w-2/5 overflow-hidden">
        <img className="h-full w-full object-center object-cover" src={img} alt={title} />
      </div>
      <div className="md:w-3/5 mt-4 md:mt-0 md:pl-8 flex flex-col justify-center">
        <h1 className="text-sm text-[#999999]">Project {idx}</h1>
        <h1 className="text-[#222] text-4xl font-semibold mt-1">{title}</h1>
        <p className="text-2xl cardo lowercase leading-6 mt-1">{about}</p>
        <div className="mt-3 text-[#999999] flex gap-2 text-xs items-center cursor-default">
          {techno.map((t) => (
            <p>{t}</p>
          ))}
        </div>
        <a className="flex gap-2 text-lg items-center justify-center w-30 rounded-full py-px mt-5 text-[#eeeeee] bg-[#222222]" href={link} target="_blank" >Visit <i className="ri-arrow-right-long-line"></i></a>
      </div>
    </div>

  );
}

export default Project;
