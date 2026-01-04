"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const linkVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 },
    };

    return (
        <React.Fragment>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-black/80 py-4 backdrop-blur-lg shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12">
                    {/* Logo */}
                    <Link href="/" className="group relative z-50 flex items-center gap-1">
                        <span className="text-2xl font-black tracking-tighter text-white transition-all group-hover:text-neon-blue">
                            Priya_
                            <span className="text-neon-blue transition-all group-hover:text-white">
                                Portfolio
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-10 md:flex">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
                            >
                                <span className="relative z-10">{item.name}</span>
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-neon-blue transition-all duration-300 ease-out group-hover:w-full"></span>
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-neon-purple transition-all delay-75 duration-300 ease-out group-hover:w-full"></span>
                            </Link>
                        ))}

                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="z-50 md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-black/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((item) => (
                                <motion.div key={item.name} variants={linkVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-bold uppercase tracking-widest text-white transition-all hover:text-neon-blue"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Navbar;
