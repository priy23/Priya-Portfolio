"use client";
import React from "react";
import { motion } from "framer-motion";
import { Code2, Globe } from "lucide-react";
import StarsCanvas from "./canvas/Stars";

const About = () => {
    return (
        <section id="about" className="relative z-0 min-h-screen w-full bg-black py-20 overflow-hidden">
            {/* Background Stars */}
            <div className="absolute inset-0 z-[-1]">
                <StarsCanvas />
            </div>
            <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Left Side: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2"
                >
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-neon-blue backdrop-blur-md">
                            <Code2 size={24} />
                        </div>
                        <h2 className="text-4xl font-bold text-white sm:text-5xl">About Me</h2>
                    </div>

                    {/* Paragraphs */}
                    <div className="space-y-6 text-lg leading-relaxed text-gray-400">
                        <p>
                            I am a <span className="font-semibold text-neon-blue">Bachelor of Engineering</span> student at{" "}
                            <span className="font-semibold text-white">Chandigarh University</span> with a strong interest in{" "}
                            <span className="font-bold text-neon-purple">Full Stack Web Development</span> and problem solving.
                        </p>

                        <p>
                            I have hands-on experience building real-world web applications using{" "}
                            <span className="font-semibold text-white">React, Next.js, Node.js, Express, MongoDB, and SQL</span>. I enjoy
                            working across the full development lifecycle — from designing clean user interfaces to implementing efficient
                            backend logic and APIs.
                        </p>

                        <p>
                            I actively practice <span className="font-semibold text-neon-purple">Data Structures and Algorithms</span> and
                            focus on writing clean, scalable, and maintainable code. I am motivated, self-driven, and continuously learning
                            new technologies to improve my skills.
                        </p>

                        {/* Quote Box */}
                        <div className="rounded-lg border-l-4 border-neon-blue bg-white/5 p-4 italic text-gray-300">
                            I am currently seeking <span className="text-neon-blue">internship or entry-level opportunities</span> where I can
                            apply my skills, learn from experienced engineers, and contribute to building impactful software products.
                        </div>
                    </div>

                    {/* Tech Pills */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        {["C++", "DSA", "Java", "Python", "React.js", "Node.js", "MongoDB", "SQL", "AWS", "Git", "EXCEL", "POWER-BI"].map(
                            (tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:border-neon-blue hover:text-neon-blue"
                                >
                                    {tech}
                                </span>
                            )
                        )}
                    </div>
                </motion.div>

                {/* Right Side: Code Editor Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative lg:w-[45%]"
                >
                    {/* Editor Container */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all hover:border-neon-blue/30">
                        {/* Title Bar */}
                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                                <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-xs font-medium text-gray-400">profile.tsx</span>
                            <div className="opacity-0">...</div> {/* Spacer */}
                        </div>

                        {/* Code Content */}
                        <div className="p-6 font-mono text-sm leading-7 sm:text-base">
                            <span className="text-neon-purple">const</span> <span className="text-blue-400">Priya</span>{" "}
                            <span className="text-white">=</span> <span className="text-yellow-400">{"{"}</span>
                            <br />
                            &nbsp;&nbsp;<span className="text-white">education:</span>{" "}
                            <span className="text-green-400">"Chandigarh University"</span>,
                            <br />
                            &nbsp;&nbsp;<span className="text-white">experience:</span>{" "}
                            <span className="text-green-400">"HighRadius Intern"</span>,
                            <br />
                            &nbsp;&nbsp;<span className="text-white">skills:</span>{" "}
                            <span className="text-yellow-400">["</span>
                            <span className="text-green-400">C++</span>
                            <span className="text-yellow-400">", "</span>
                            <span className="text-green-400">DSA</span>
                            <span className="text-yellow-400">", "</span>
                            <span className="text-green-400">Full Stack Web Dev</span>
                            <span className="text-yellow-400">"]</span>,
                            <br />
                            &nbsp;&nbsp;<span className="text-white">status:</span>{" "}
                            <span className="text-green-400">"Open to Work"</span>,
                            <br />
                            &nbsp;&nbsp;<span className="text-blue-400">loves:</span> <span className="text-neon-purple">()</span>{" "}
                            <span className="text-neon-blue">=&gt;</span> <span className="text-green-400">"Innovation"</span>
                            <br />
                            <span className="text-yellow-400">{"}"}</span>
                        </div>

                        {/* Background Decoration (Globe) */}
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Globe size={150} className="text-white animate-spin-slow" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
