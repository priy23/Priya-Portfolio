"use client";
import React from "react";
import { motion } from "framer-motion";
import StarsCanvas from "./canvas/Stars";
import TypingEffect from "./TypingEffect";
import Link from "next/link";
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";

const LeetCodeIcon = ({ size = 28, className = "" }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
    >
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.843 5.843 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.816 5.428a1.384 1.384 0 0 0-.91 2.494l3.857 3.121a1.384 1.384 0 1 0 1.702-2.146l-3.857-3.121a1.384 1.384 0 0 0-.792-.348z" />
    </svg>
);

const Hero = () => {
    return (
        <section
            className="relative flex h-screen w-full items-center overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Improved Overlay with gradient regarding layout */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

            {/* 3D Background */}
            <StarsCanvas />

            <div className="z-10 mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-20">

                {/* Hello Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 w-fit rounded-full border border-neon-blue/30 bg-neon-blue/5 px-5 py-2 text-sm font-medium tracking-wide text-neon-blue backdrop-blur-md"
                >
                    HELLO, I'M
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl whitespace-nowrap"
                >
                    Priya <span className="text-gray-400">Kumari</span>
                </motion.h1>

                {/* Typing Role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-2xl font-medium text-gray-300 sm:text-4xl"
                >
                    <span className="font-mono text-gray-400">I am a </span>
                    <TypingEffect />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl"
                >
                    I build <span className="text-white font-semibold">scalable, high-performance</span> web applications and turn
                    complex problems into <span className="text-white font-semibold">clean, user-focused solutions</span>.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10 flex flex-wrap gap-4"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex items-center gap-2 rounded-lg bg-neon-blue px-8 py-4 text-lg font-bold text-black transition-all hover:bg-neon-blue/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] cursor-pointer"
                    >
                        View My Work <ArrowRight size={20} />
                    </a>
                    <Link
                        href="https://drive.google.com/file/d/1Xc2RAGhLuJQcNbCLSOJ2qrh3bJwejwQY/view?usp=sharing"
                        target="_blank"
                        className="flex items-center gap-2 rounded-lg border border-gray-700 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30"
                    >
                        My Resume <FileText size={20} />
                    </Link>
                </motion.div>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 flex gap-6 text-gray-400"
                >
                    <a
                        href="https://github.com/priy23"
                        target="_blank"
                        className="transform transition-colors hover:scale-110 hover:text-neon-blue"
                    >
                        <Github size={28} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/priya-kumari-a8180928a/"
                        target="_blank"
                        className="transform transition-colors hover:scale-110 hover:text-neon-blue"
                    >
                        <Linkedin size={28} />
                    </a>
                    {/* Replaced Twitter with LeetCode */}
                    <a
                        href="https://leetcode.com/u/Priya_Kumari2528/"
                        target="_blank"
                        className="transform transition-colors hover:scale-110 hover:text-neon-blue"
                    >
                        <LeetCodeIcon size={28} />
                    </a>
                    <a
                        href="mailto:pkumari61002@gmail.com"
                        className="transform transition-colors hover:scale-110 hover:text-neon-blue"
                    >
                        <Mail size={28} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
