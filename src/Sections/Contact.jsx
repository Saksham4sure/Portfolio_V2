import { useRef, useState } from "react";
import { contactLinks, socialMedias, titles } from "../constants";
import Titles from "../components/Titles";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  const { theme } = useTheme();
  // Footer MUST remain opposite color of whole website theme
  const isFooterLight = theme === "dark";
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const linksBlockRef = useRef(null);

  const handleCopyEmail = () => {
    const email = "sakshamorig123@gmail.com";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    if (!headingRef.current) return;

    // Split the big heading into chars with mask for clip reveal
    const headingSplit = new SplitText(headingRef.current, {
      type: "chars",
      mask: "chars",
    });

    // Staggered char reveal — each char slides up from behind its mask
    gsap.from(headingSplit.chars, {
      y: "100%",
      rotateX: 90,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.03,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Subtitle line slide-up
    if (subHeadingRef.current) {
      const subSplit = new SplitText(subHeadingRef.current, {
        type: "lines",
        mask: "lines",
      });

      gsap.from(subSplit.lines, {
        y: "100%",
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: subHeadingRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Stagger-reveal the links/contact block
    if (linksBlockRef.current) {
      const children = linksBlockRef.current.children;
      gsap.from(children, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: linksBlockRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <>
      <motion.div
        ref={sectionRef}
        id="contact"
        className={`py-10 md:min-h-[100vh] flex flex-col justify-between transition-colors duration-300 ${
          isFooterLight ? "bg-[#f4f4f6] text-[#18181b]" : "bg-[#121214] text-white"
        }`}
      >
        <div className="pt-20">
          <Titles title={titles[2].title} text={titles[2].text} inverted={true} />
        </div>

        {/* Awwwards-style big typography heading */}
        <div className="px-6 md:px-10 py-10 md:py-16">
          <h1
            ref={headingRef}
            className={`text-[12vw] md:text-[8vw] lg:text-[7vw] bold leading-[0.95] tracking-tight transition-colors duration-300 ${
              isFooterLight ? "text-[#18181b]" : "text-white"
            }`}
            style={{ perspective: "600px" }}
          >
            Get in touch
          </h1>
          <p
            ref={subHeadingRef}
            className={`mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl light max-w-2xl leading-relaxed transition-colors duration-300 ${
              isFooterLight ? "text-zinc-500" : "text-white/45"
            }`}
          >
            Have a project in mind, or just want to say hello? Let's craft
            something extraordinary together.
          </p>
        </div>

        <div className="px-6 md:px-10 pt-4 flex-1 flex flex-col justify-center">
          <div
            className={`h-[1px] rounded-full w-full transition-colors duration-300 ${
              isFooterLight ? "bg-zinc-300" : "bg-white/20"
            }`}
          />
          <div
            ref={linksBlockRef}
            className="flex flex-col items-center justify-center md:flex-row py-10 px-5 gap-10 md:gap-20"
          >
            <div className="flex gap-10 md:gap-20 md:w-1/2 items-center justify-center">
              <div className="flex flex-col">
                <p
                  className={`text-xl transition-colors duration-300 ${
                    isFooterLight ? "text-zinc-500" : "text-white/50"
                  }`}
                >
                  Go to
                </p>
                {contactLinks.map((navLinks, index) => (
                  <Link
                    className={`tracking-wide text-3xl light cursor-pointer transition-all duration-300 inline-block hover:translate-x-2 hover:-translate-y-0.5 ${
                      isFooterLight
                        ? "text-zinc-800 hover:text-black"
                        : "text-white hover:text-zinc-300"
                    }`}
                    key={index}
                    to={navLinks.href}
                    smooth
                    offset={0}
                    duration={2000}
                  >
                    {navLinks.id}
                  </Link>
                ))}
              </div>
              <div>
                <p
                  className={`text-xl transition-colors duration-300 ${
                    isFooterLight ? "text-zinc-500" : "text-white/50"
                  }`}
                >
                  Socials
                </p>
                <div className="flex flex-wrap flex-col">
                  {socialMedias.map((socials, index) => (
                    <a
                      className={`tracking-wide text-3xl light transition-all duration-300 inline-block hover:translate-x-2 hover:-translate-y-0.5 ${
                        isFooterLight
                          ? "text-zinc-800 hover:text-black"
                          : "text-white hover:text-zinc-300"
                      }`}
                      key={index}
                      href={socials.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {socials.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 gap-5 flex flex-col">
              <div>
                <p
                  className={`text-xl transition-colors duration-300 ${
                    isFooterLight ? "text-zinc-500" : "text-white/50"
                  }`}
                >
                  G-mail
                </p>
                <div
                  onClick={handleCopyEmail}
                  className="group inline-flex items-center gap-3 cursor-pointer select-none mt-0.5"
                  title="Click to copy email"
                >
                  <p
                    className={`text-2xl tracking-wide light transition-colors duration-300 group-hover:opacity-75 ${
                      isFooterLight ? "text-zinc-800" : "text-white"
                    }`}
                  >
                    sakshamorig123@gmail.com
                  </p>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-mono transition-all duration-300 ${
                      copied
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 opacity-100 scale-100"
                        : "opacity-0 scale-90 group-hover:opacity-70 group-hover:scale-95 text-zinc-400 border border-zinc-400/30"
                    }`}
                  >
                    {copied ? "Copied! ✓" : "Copy"}
                  </span>
                </div>
              </div>
              <div>
                <p
                  className={`text-xl transition-colors duration-300 ${
                    isFooterLight ? "text-zinc-500" : "text-white/50"
                  }`}
                >
                  Phone
                </p>
                <p
                  className={`text-2xl tracking-wide light transition-colors duration-300 ${
                    isFooterLight ? "text-zinc-800" : "text-white"
                  }`}
                >
                  +977-9767571599
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className={`h-[1px] rounded-full w-full mt-10 transition-colors duration-300 ${
              isFooterLight ? "bg-zinc-300" : "bg-white/20"
            }`}
          />
          <motion.div
            className={`h-[1px] rounded-full w-full mt-1 transition-colors duration-300 ${
              isFooterLight ? "bg-zinc-300" : "bg-white/20"
            }`}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Contact;
