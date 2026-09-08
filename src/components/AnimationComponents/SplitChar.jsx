import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const SplitChar = ({ children, className = "", delay = 0 }) => {
  const charRef = useRef(null);
  const splitRef = useRef(null);

  useGSAP(() => {
    if (!charRef.current) return;

    const split = new SplitText(charRef.current, { type: "chars" });
    splitRef.current = split;

    const tl = gsap.from(split.chars, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.04,
      delay,
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <h1
      ref={charRef}
      className={className}
    >
      {children}
    </h1>
  );
};

export default SplitChar;
