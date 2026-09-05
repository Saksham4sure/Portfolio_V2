import React, { useEffect, useRef, useState } from 'react';
import { navLinks, socialMedias } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const contactRef = useRef(null);
    const topLine = useRef(null);
    const bottomLine = useRef(null);
    const tl = useRef(null);
    const burgerTl = useRef(null);
    const logoRef = useRef(null);
    const butnRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const isOpenRef = useRef(false);
    const navbar = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = (e) => {
        e?.stopPropagation();
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

        // Tactile button spring pop animation
        if (butnRef.current) {
            gsap.timeline()
                .to(butnRef.current, { scale: 0.92, duration: 0.1, ease: "power2.in" })
                .to(butnRef.current, { scale: 1.08, duration: 0.2, ease: "back.out(2.5)" })
                .to(butnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
        }

        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        isOpenRef.current = isOpen;
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useGSAP(() => {
        // Entrance animation - runs strictly ONCE on initial mount
        gsap.from(navbar.current, {
            y: -100,
            delay: 1,
            duration: 1,
            ease: "power3.out",
        });

        gsap.set(navRef.current, { yPercent: -100 });
        gsap.set(linksRef.current, { autoAlpha: 0, x: -34 });
        gsap.set(contactRef.current, { autoAlpha: 0, y: 20 });

        // Dynamic scroll behavior:
        // - Hides smoothly when scrolling down
        // - Shows smoothly when scrolling up
        let lastScroll = 0;
        let isNavHidden = false;

        const handleScroll = () => {
            if (isOpenRef.current) return;
            const currentScroll = window.scrollY || document.documentElement.scrollTop;

            if (currentScroll <= 40) {
                if (isNavHidden) {
                    gsap.to(navbar.current, {
                        yPercent: 0,
                        duration: 0.35,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                    isNavHidden = false;
                }
            } else {
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling DOWN -> hide smoothly
                    if (!isNavHidden) {
                        gsap.to(navbar.current, {
                            yPercent: -120,
                            duration: 0.35,
                            ease: "power2.inOut",
                            overwrite: "auto",
                        });
                        isNavHidden = true;
                    }
                } else if (currentScroll < lastScroll) {
                    // Scrolling UP -> show smoothly
                    if (isNavHidden) {
                        gsap.to(navbar.current, {
                            yPercent: 0,
                            duration: 0.35,
                            ease: "power2.out",
                            overwrite: "auto",
                        });
                        isNavHidden = false;
                    }
                }
            }

            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Fullscreen navigation menu reveal timeline
        tl.current = gsap.timeline({ paused: true })
            .to(navRef.current, {
                yPercent: 0,
                duration: 0.5,
                ease: "power3.inOut",
            })
            .to(linksRef.current, {
                autoAlpha: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: "power3.out",
            }, "<+0.4")
            .to(contactRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.inOut",
            }, "<+0.2");

        // Smooth 2-line rotation into cross
        burgerTl.current = gsap.timeline({ paused: true })
            .to(topLine.current, {
                rotate: 135,
                y: 3.3,
                duration: 0.4,
                ease: "power3.inOut",
            })
            .to(bottomLine.current, {
                rotate: 405,
                y: -3.3,
                duration: 0.4,
                ease: "power3.inOut",
            }, "<");

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        if (isOpen) {
            tl.current.reverse();
            burgerTl.current.reverse();
        } else {
            tl.current.play();
            burgerTl.current.play();
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div
                ref={navbar}
                className='w-full fixed top-0 left-0 z-50 pointer-events-none bg-transparent'
                style={{ transform: "translateZ(0)" }}
            >
                {/* Navbar content without background color */}
                <div className='flex w-full justify-between items-center px-6 md:px-10 py-4 relative z-10'>
                    <div className="logo z-30 pointer-events-auto flex items-center">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="cursor-pointer focus:outline-none select-none transition-transform duration-200 hover:scale-105 active:scale-95"
                            aria-label="Saksham"
                        >
                            <img
                                ref={logoRef}
                                src="/saksham-logo.svg"
                                alt="Saksham"
                                className={`h-4 sm:h-[18px] md:h-5 w-auto transition-all duration-300 drop-shadow-sm ${
                                    theme === 'dark' || isOpen ? 'brightness-0 invert' : 'brightness-0'
                                }`}
                            />
                        </a>
                    </div>

                    <div className="menu flex items-center justify-center gap-3 h-full pointer-events-auto">
                        {/* 2-line Hamburger Button that smoothly rotates into a cross */}
                        <div
                            className={`hamburger rounded-full h-11 w-11 md:h-13 md:w-13 flex flex-col gap-1 items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all ${
                                theme === 'dark' || isOpen
                                    ? 'bg-[#1e1e24] border border-white/15 shadow-black/30'
                                    : 'bg-white border border-zinc-200/80 shadow-zinc-200/60'
                            }`}
                            onClick={toggleMenu}
                        >
                            <div
                                ref={topLine}
                                className={`w-[22px] md:w-[26px] h-[2px] transition-colors duration-300 ${
                                    theme === 'dark' || isOpen ? 'bg-white' : 'bg-zinc-900'
                                }`}
                            ></div>
                            <div
                                ref={bottomLine}
                                className={`w-[22px] md:w-[26px] h-[2px] transition-colors duration-300 ${
                                    theme === 'dark' || isOpen ? 'bg-white' : 'bg-zinc-900'
                                }`}
                            ></div>
                        </div>

                        {/* Email Pill Button (Click to Copy with Slide & Pulse Animation) */}
                        <div className='hidden md:flex'>
                            <button
                                ref={butnRef}
                                onClick={handleCopyEmail}
                                title="Click to copy email"
                                className={`relative text-xs px-3.5 py-2 rounded-full shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center overflow-hidden select-none will-change-transform ${
                                    theme === 'dark' || isOpen
                                        ? 'bg-[#1e1e24] shadow-black/20'
                                        : 'bg-white shadow-zinc-200/50'
                                } ${
                                    copied
                                        ? (theme === 'dark' || isOpen
                                            ? 'border border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/10'
                                            : 'border border-emerald-500/60 text-emerald-600 shadow-lg shadow-emerald-500/10')
                                        : (theme === 'dark' || isOpen
                                            ? 'border border-white/15 text-white/80 hover:bg-[#282832] hover:border-white/25 hover:text-white'
                                            : 'border border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-950')
                                }`}
                            >
                                {/* Rolling text container */}
                                <div className="relative h-4 min-w-[155px] overflow-hidden flex flex-col justify-center items-center">
                                    {/* Normal State: Email address */}
                                    <span
                                        className={`flex items-center justify-center gap-1.5 transition-all duration-300 transform ${
                                            copied
                                                ? '-translate-y-5 opacity-0 scale-90'
                                                : 'translate-y-0 opacity-100 scale-100'
                                        }`}
                                    >
                                        <span>sakshamorig123@gmail.com</span>
                                        <i className="ri-file-copy-line text-xs opacity-50" />
                                    </span>

                                    {/* Active State: Copied with Checkmark */}
                                    <span
                                        className={`absolute inset-0 flex items-center justify-center gap-1.5 font-medium transition-all duration-300 transform ${
                                            copied
                                                ? 'translate-y-0 opacity-100 scale-100'
                                                : 'translate-y-5 opacity-0 scale-90'
                                        }`}
                                    >
                                        <i className="ri-checkbox-circle-fill text-sm text-emerald-400 animate-bounce" />
                                        <span className="text-emerald-400 font-semibold tracking-wide">Copied!</span>
                                    </span>
                                </div>
                            </button>
                        </div>

                        {/* Dark/Light Mode Switcher: Filled icon, placed at the end */}
                        <button
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            className={`p-1.5 bg-transparent border-none outline-none flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
                                theme === 'dark' || isOpen ? 'text-white' : 'text-zinc-900'
                            }`}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? (
                                <i className="ri-sun-fill text-lg md:text-xl" />
                            ) : (
                                <i className="ri-moon-fill text-lg md:text-xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div ref={navRef} className="fullScreenNav bg-[#121215] text-[#D9D9D9] fixed h-[100vh] w-[100vw] z-40 pl-6">
                <div className='flex flex-col text-5xl absolute top-32 md:text-6xl light gap-y-2'>
                    {navLinks.map((navLinks, index) => (
                        <div className='overflow-hidden' key={index} ref={(el) => (linksRef.current[index] = el)}>
                            <Link to={`${navLinks.href}`} className=' cursor-pointer hover:text-white transition-colors' smooth offset={0} duration={500} onClick={toggleMenu}>{navLinks.id}</Link>
                        </div>
                    ))}
                </div>
                <div ref={contactRef} className='absolute bottom-[10%] md:bottom-[4%] flex flex-col flex-wrap justify-between gap-x-8 gap-y-5 md:flex-row'>
                    <div
                        onClick={handleCopyEmail}
                        className='light cursor-pointer group select-none'
                        title="Click to copy email"
                    >
                        <p className='text-white/50 flex items-center gap-2'>
                            <span>E-mail</span>
                            {copied && <span className='text-xs text-emerald-400 font-mono'>Copied! ✓</span>}
                        </p>
                        <p className='tracking-wide lowercase text-sm text-white/90 group-hover:text-white transition-colors flex items-center gap-1.5'>
                            sakshamorig123@gmail.com
                            <i className="ri-file-copy-line text-xs opacity-50" />
                        </p>
                    </div>
                    <div className='light'>
                        <p className='text-white/50'>Phone</p>
                        <p className='tracking-wide lowercase text-sm text-white/90'>+977-9767571599</p>
                    </div>
                    <div className='light'>
                        <p className='text-white/50'>Socials</p>
                        <div className='flex flex-col flex-wrap md:flex-row gap-x-2'>
                            {socialMedias.map((socials, index) => (
                                <a className='text-sm tracking-wide text-white/90 hover:text-white' key={index} href={socials.href} target="_blank" rel="noopener noreferrer">{socials.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
