import { useEffect, useState } from "react";
import './App.css'

import Preloader from './components/AnimationComponents/Preloader'
import Navbar from './components/Navbar'
import About from './Sections/About'
import Contact from './Sections/Contact'
import Hero from './Sections/Hero'
import Projects from './Sections/Projects'
import { projectItems } from './constants'
import { useTheme } from "./context/ThemeContext";

const imagesToPreload = [
  "/saksham.jpg",
  ...projectItems.map((item) => item.img).filter(Boolean),
];

function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve();
    const img = new Image();
    img.src = src;

    const handleSuccess = () => {
      if ("decode" in img) {
        img.decode().then(resolve).catch(resolve);
      } else {
        resolve();
      }
    };

    if (img.complete) {
      handleSuccess();
    } else {
      img.onload = handleSuccess;
      img.onerror = () => resolve();
    }
  });
}

async function preloadFonts() {
  if (document.fonts) {
    try {
      await Promise.all([
        document.fonts.load("16px Satoshi"),
        document.fonts.load("16px SatoshiBold"),
        document.fonts.load("16px cardo"),
        document.fonts.load("16px SatoshiLight"),
        document.fonts.load("16px Stylish"),
      ]);
    } catch (e) {
      console.warn("Font preloading warning:", e);
    }
    await document.fonts.ready;
  }
}

function App() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function prepare() {
      const fontPromise = preloadFonts();
      const imagePromises = imagesToPreload.map((src) => preloadImage(src));

      await Promise.all([fontPromise, ...imagePromises]);

      if (isMounted) {
        setReady(true);
      }
    }

    prepare();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Preloader ready={ready} setLoading={setLoading} />

      {/* Hidden container to force early browser DOM preloading of fonts & images */}
      <div
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {imagesToPreload.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
        <span style={{ fontFamily: "Satoshi" }}>a</span>
        <span style={{ fontFamily: "SatoshiBold" }}>a</span>
        <span style={{ fontFamily: "cardo" }}>a</span>
        <span style={{ fontFamily: "SatoshiLight" }}>a</span>
        <span style={{ fontFamily: "Stylish" }}>a</span>
      </div>

      {!loading && (
        <div
          className={`relative overflow-x-hidden min-h-screen transition-colors duration-300 ${
            theme === "dark" ? "bg-[#121214] text-white" : "bg-[#f8f8fa] text-zinc-900"
          }`}
        >
          {/* Fixed Whole-Page Dot Grid */}
          <div
            className="fixed inset-0 pointer-events-none z-0 dot-grid-pattern"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <Navbar />
            <Hero />
            {/* Divider line between Home and About section */}
            <div className="w-full px-6 md:px-14 max-w-7xl mx-auto relative z-20">
              <div
                className={`w-full h-[1px] rounded-full transition-colors duration-300 ${
                  theme === "dark" ? "bg-white/10" : "bg-zinc-200"
                }`}
              />
            </div>
            <About />
            <Projects />
            <Contact />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

