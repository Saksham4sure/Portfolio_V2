import { useEffect, useState } from "react";
import './App.css'

import Preloader from './components/AnimationComponents/Preloader'
import Navbar from './components/Navbar'
import About from './Sections/About'
import Contact from './Sections/Contact'
import Hero from './Sections/Hero'
import Projects from './Sections/Projects'
import { projectItems } from './constants'

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
        <div className="overflow-x-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Contact />
        </div>
      )}
    </>
  );
}

export default App;

