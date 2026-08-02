import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";



const SplitWords = ({children, className="", delay}) => {
    const wordRef = useRef(null);

    useGSAP(()=>{

        if(wordRef.current){
            const split = new SplitText(wordRef.current, { type: "words", mask: "words"});

            gsap.from(split.words, {
                y: 100,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: delay,
            })
        }
    }, []);


  return (
    <h1 ref={wordRef} className={className}>{children}</h1>
  )
}

export default SplitWords