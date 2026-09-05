import { useEffect, useRef, useState } from "react";

const INITIAL_TAGS = [
  { id: 1, label: "🛸 Antigravity", color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300" },
  { id: 2, label: "✦ Saksham", color: "from-white/15 to-white/5 border-white/20 text-white" },
  { id: 3, label: "⚛ React", color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300" },
  { id: 4, label: "⚡ GSAP", color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300" },
  { id: 5, label: "🎨 Motion UI", color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300" },
  { id: 6, label: "🚀 Frontend", color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300" },
  { id: 7, label: "☕ Let's Connect", color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-300" },
  { id: 8, label: "🌀 Zero Gravity", color: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300" },
  { id: 9, label: "💻 TailwindCSS", color: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-300" },
];

function AntigravityPlayground({ isLight = false }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const [items, setItems] = useState(INITIAL_TAGS);
  const [isZeroG, setIsZeroG] = useState(true);
  const [blastCount, setBlastCount] = useState(0);

  // Physics state stored in refs for 60fps loop without React re-render overhead
  const bodiesRef = useRef([]);
  const draggingIdRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, prevX: -1000, prevY: -1000 });
  const animFrameIdRef = useRef(null);

  // Initialize physical bodies
  const initBodies = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    bodiesRef.current = INITIAL_TAGS.map((tag, index) => {
      // Stagger positions across the container
      const col = index % 3;
      const row = Math.floor(index / 3);
      const cellW = width / 3;
      const cellH = height / 3;

      const x = cellW * col + Math.random() * (cellW * 0.5);
      const y = cellH * row + Math.random() * (cellH * 0.4);

      return {
        id: tag.id,
        x: Math.max(10, Math.min(width - 120, x)),
        y: Math.max(10, Math.min(height - 45, y)),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        rot: (Math.random() - 0.5) * 20,
        vRot: (Math.random() - 0.5) * 1.5,
        w: 120,
        h: 40,
        el: null,
      };
    });
  };

  // Antigravity blast: launches items into the air
  const triggerBlast = () => {
    setBlastCount((prev) => prev + 1);
    bodiesRef.current.forEach((b) => {
      b.vy = -(6 + Math.random() * 8);
      b.vx = (Math.random() - 0.5) * 10;
      b.vRot = (Math.random() - 0.5) * 16;
    });
  };

  // Reset positions gently
  const resetBodies = () => {
    initBodies();
  };

  useEffect(() => {
    initBodies();

    const handleResize = () => {
      initBodies();
    };
    window.addEventListener("resize", handleResize);

    // Physics animation loop
    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!containerRef.current) {
        animFrameIdRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const cW = rect.width;
      const cH = rect.height;

      // Update mouse velocity
      const m = mousePosRef.current;
      m.vx = m.x - m.prevX;
      m.vy = m.y - m.prevY;
      m.prevX = m.x;
      m.prevY = m.y;

      const draggingId = draggingIdRef.current;

      bodiesRef.current.forEach((b) => {
        if (b.id === draggingId) {
          // Being dragged: follow pointer with smooth velocity tracking
          const targetX = m.x - dragOffsetRef.current.x;
          const targetY = m.y - dragOffsetRef.current.y;
          b.vx = (targetX - b.x) * 0.4;
          b.vy = (targetY - b.y) * 0.4;
          b.x = targetX;
          b.y = targetY;
          b.vRot = b.vx * 0.8;
          b.rot += b.vRot;
        } else {
          // 1. Ambient Zero-Gravity floating drift
          b.vx += Math.sin(now * 0.0015 + b.id) * 0.06;
          b.vy += Math.cos(now * 0.0012 + b.id) * 0.06;

          // 2. Antigravity buoyancy: upward slow float when enabled
          if (isZeroG) {
            b.vy -= 0.05; // gentle upward lift
          } else {
            b.vy += 0.12; // normal gravity
          }

          // 3. Mouse repulsion force field (gravity wave)
          const centerX = b.x + b.w / 2;
          const centerY = b.y + b.h / 2;
          const dx = centerX - m.x;
          const dy = centerY - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 130;

          if (dist < repelRadius && dist > 1) {
            const force = ((repelRadius - dist) / repelRadius) * 2.2;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
            b.vRot += (dx > 0 ? 1 : -1) * force * 1.5;
          }

          // 4. Position update & friction
          b.x += b.vx;
          b.y += b.vy;
          b.rot += b.vRot;

          b.vx *= 0.985;
          b.vy *= 0.985;
          b.vRot *= 0.98;

          // 5. Elastic boundary bounce
          const restitution = 0.82;
          if (b.x < 5) {
            b.x = 5;
            b.vx = Math.abs(b.vx) * restitution;
            b.vRot += (Math.random() - 0.5) * 2;
          } else if (b.x + b.w > cW - 5) {
            b.x = cW - b.w - 5;
            b.vx = -Math.abs(b.vx) * restitution;
            b.vRot += (Math.random() - 0.5) * 2;
          }

          if (b.y < 5) {
            b.y = 5;
            b.vy = Math.abs(b.vy) * restitution;
            b.vRot += (Math.random() - 0.5) * 2;
          } else if (b.y + b.h > cH - 5) {
            b.y = cH - b.h - 5;
            b.vy = -Math.abs(b.vy) * restitution;
            b.vRot += (Math.random() - 0.5) * 2;
          }
        }

        // Apply transform to DOM element directly
        if (b.el) {
          b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0px) rotate(${b.rot}deg)`;
        }
      });

      animFrameIdRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameIdRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isZeroG]);

  // Mouse & Touch events
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current.x = e.clientX - rect.left;
    mousePosRef.current.y = e.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    mousePosRef.current.x = -1000;
    mousePosRef.current.y = -1000;
    draggingIdRef.current = null;
  };

  const handleItemPointerDown = (id, e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    const b = bodiesRef.current.find((item) => item.id === id);
    if (b) {
      draggingIdRef.current = id;
      dragOffsetRef.current = {
        x: curX - b.x,
        y: curY - b.y,
      };
      // Give initial grab momentum
      b.vRot = (Math.random() - 0.5) * 3;
    }
  };

  const handleItemPointerUp = () => {
    if (draggingIdRef.current) {
      const b = bodiesRef.current.find((item) => item.id === draggingIdRef.current);
      if (b) {
        // Fling with mouse velocity
        b.vx = mousePosRef.current.vx * 0.7;
        b.vy = mousePosRef.current.vy * 0.7;
      }
      draggingIdRef.current = null;
    }
  };

  return (
    <div className="w-full mt-10">
      {/* Header bar with mode toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span
            className={`text-xs font-mono uppercase tracking-widest font-semibold ${
              isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            ✦ Antigravity Lab — Drag & Throw Elements
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerBlast}
            className={`text-[11px] px-3 py-1 rounded-full font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
              isLight
                ? "bg-zinc-800 text-white hover:bg-black"
                : "bg-white/10 text-white hover:bg-white hover:text-black border border-white/20"
            }`}
            title="Launch items with a zero-gravity kinetic burst"
          >
            🛸 Zero-G Blast
          </button>
          <button
            onClick={() => setIsZeroG(!isZeroG)}
            className={`text-[11px] px-3 py-1 rounded-full font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 border ${
              isZeroG
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/20 shadow-sm"
                : isLight
                ? "bg-zinc-200 text-zinc-700 border-zinc-300"
                : "bg-white/5 text-zinc-400 border-white/10"
            }`}
          >
            {isZeroG ? "Gravity: OFF" : "Gravity: ON"}
          </button>
          <button
            onClick={resetBodies}
            className={`text-[11px] px-2.5 py-1 rounded-full font-mono transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
              isLight
                ? "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                : "bg-white/5 text-zinc-400 hover:bg-white/15"
            }`}
            title="Reset positions"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Physics Zero-G Canvas Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handleItemPointerUp}
        className={`relative w-full h-[230px] sm:h-[260px] md:h-[280px] rounded-2xl md:rounded-3xl overflow-hidden select-none border transition-colors duration-500 ${
          isLight
            ? "bg-gradient-to-b from-zinc-100/90 to-zinc-200/50 border-black/10 shadow-inner"
            : "bg-gradient-to-b from-black/40 via-zinc-950/60 to-black/80 border-white/[0.08] shadow-2xl"
        }`}
        style={{ touchAction: "none" }}
      >
        {/* Subtle grid background inside the playground */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)"} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Ambient hint when empty */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <span className="font-mono text-2xl sm:text-4xl uppercase tracking-[0.3em] font-black">
            ANTIGRAVITY
          </span>
        </div>

        {/* Floating Physical Bodies */}
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              const b = bodiesRef.current.find((bItem) => bItem.id === item.id);
              if (b) {
                b.el = el;
                if (el) {
                  b.w = el.offsetWidth || 120;
                  b.h = el.offsetHeight || 38;
                }
              }
            }}
            onPointerDown={(e) => handleItemPointerDown(item.id, e)}
            className={`absolute top-0 left-0 px-4 py-2 rounded-full border shadow-lg backdrop-blur-md cursor-grab active:cursor-grabbing font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap transition-shadow duration-200 hover:shadow-xl will-change-transform bg-gradient-to-r ${item.color} ${
              isLight
                ? "!text-zinc-900 !border-zinc-300/80 !bg-white/80 shadow-zinc-300/50"
                : "shadow-black/60 hover:border-white/40"
            }`}
            style={{
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AntigravityPlayground;
