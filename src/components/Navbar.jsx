import React, { useEffect, useRef, useState } from 'react'
import { navLinks, socialMedias } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-scroll';

const Navbar = () => {
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
    const navbar = useRef(null);

    useEffect(() => {
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
        gsap.from(navbar.current, {
            y: -100,
            delay: 1,
            duration: 1,
            ease: "power3.out",
        });

        gsap.set(navRef.current, { yPercent: -100, });
        gsap.set(linksRef.current, {
            autoAlpha: 0,
            x: -34
        });
        gsap.set(contactRef.current, {
            autoAlpha: 0,
            y: 20
        });
        gsap.set(logoRef.current, {
            color: "#444444",
        });

        tl.current = gsap.timeline({ paused: true }).to(navRef.current, {
            yPercent: 0,
            duration: 0.5,
            ease: "power3.inOut"
        }).to(logoRef.current, {
            color: "#D9D9D9",
            duration: 0.5,
            ease: "power3.inOut"
        }, "<").to(butnRef.current, {
            color: "#D9D9D9",
            background: "#444444",
            duration: 0.5,
            ease: "power3.inOut"
        }, "<").to(linksRef.current, {
            autoAlpha: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "power3.out"
        }, "<+0.4").to(contactRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.inOut"
        }, "<+0.2");

        burgerTl.current = gsap.timeline({ paused: true }).to(topLine.current, {
            rotate: 135,
            y: 3.3,
            duration: 1,
            ease: "power3.inOut"
        }).to(bottomLine.current, {
            rotate: 405,
            y: -3.3,
            duration: 1,
            ease: "power3.inOut"
        }, "<");
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
    }

    return (
        <>
            <div ref={navbar} className='flex w-full justify-between items-center px-10 py-4 fixed z-50'>
                <div className="logo z-30 cursor-default">
                    <h1 ref={logoRef} className="text-5xl flex items-end">S<span className='text-xl'>x.</span></h1>
                </div>
                <div className="menu flex items-center justify-center gap-2 h-full">
                    <div className="hamburger rounded-full h-14 w-14 bg-[#FFFFFF] flex flex-col gap-1 items-center justify-center cursor-pointer" onClick={toggleMenu}>
                        <div ref={topLine} className='bg-black w-[28px] h-[2px]'></div>
                        <div ref={bottomLine} className='bg-black w-[28px] h-[2px]'></div>
                    </div>
                    <div className='hidden md:flex'>
                        <p ref={butnRef} className='text-xs px-3 py-1 bg-[#eee] rounded-full'>sakshamorig123@gmail.com</p>
                    </div>
                </div>
            </div>

            <div ref={navRef} className="fullScreenNav bg-[#1D1D1D] text-[#D9D9D9] fixed h-[100vh] w-[100vw] z-40 pl-6">
                <div className='flex flex-col text-5xl absolute top-32 md:text-6xl light gap-y-2'>
                    {navLinks.map((navLinks, index) => (
                        <div className='overflow-hidden' key={index} ref={(el) => (linksRef.current[index] = el)}>
                            <Link to={`${navLinks.href}`} className=' cursor-pointer' smooth offset={0} duration={500} onClick={toggleMenu}>{navLinks.id}</Link>
                        </div>
                    ))}
                </div>
                <div ref={contactRef} className='absolute bottom-[10%] md:bottom-[4%] flex flex-col flex-wrap justify-between gap-x-8 gap-y-5 md:flex-row'>
                    <div className='light'>
                        <p className='text-white/50'>E-mail</p>
                        <p className='tracking-wide lowercase text-sm'>sakshamorig123@gmail.com</p>
                    </div>
                    <div className='light'>
                        <p className='text-white/50'>Phone</p>
                        <p className='tracking-wide lowercase text-sm'>+977-9767571599</p>
                    </div>
                    <div className='light'>
                        <p className='text-white/50'>Socials</p>
                        <div className='flex flex-col flex-wrap md:flex-row gap-x-2'>
                            {socialMedias.map((socials, index) => (
                                <a className='text-sm tracking-wide' key={index} href={socials.href} target="_blank" rel="noopener noreferrer">{socials.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
