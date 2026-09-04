import { contactLinks, socialMedias, titles } from "../constants";
import Titles from "../components/Titles";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();
  // Footer MUST remain opposite color of whole website theme
  const isFooterLight = theme === "dark";

  return (
    <>
      <motion.div
        id="contact"
        className={`py-10 md:min-h-[100vh] flex flex-col justify-between transition-colors duration-300 ${
          isFooterLight ? "bg-[#f4f4f6] text-[#18181b]" : "bg-[#121214] text-white"
        }`}
      >
        <div className="pt-20">
          <Titles title={titles[2].title} text={titles[2].text} inverted={true} />
        </div>
        <div>
          <h1
            className={`text-5xl bold px-10 transition-colors duration-300 ${
              isFooterLight ? "text-[#18181b]" : "text-white"
            }`}
          >
            Get in touch
          </h1>
        </div>
        <div className="px-10 pt-4 flex-1 flex flex-col justify-center">
          <div
            className={`h-[1px] rounded-full w-full transition-colors duration-300 ${
              isFooterLight ? "bg-zinc-300" : "bg-white/20"
            }`}
          />
          <div className="flex flex-col items-center justify-center md:flex-row py-10 px-5 gap-10 md:gap-20">
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
                    className={`tracking-wide text-3xl light cursor-pointer transition-colors ${
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
                      className={`tracking-wide text-3xl light transition-colors ${
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
                <p
                  className={`text-2xl tracking-wide light transition-colors duration-300 ${
                    isFooterLight ? "text-zinc-800" : "text-white"
                  }`}
                >
                  sakshamorig123@gmail.com
                </p>
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
            className={`h-[1px] rounded-full w-full transition-colors duration-300 ${
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
