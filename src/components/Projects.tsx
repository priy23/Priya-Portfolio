"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Tilt from "react-parallax-tilt";
import StarsCanvas from "./canvas/Stars";


// ... (Projects array and ProjectCard component remain unchanged - not including them in replacement to be safe/concise if I can target specific area, but `replace_file_content` works best with context. actually `replace_file_content` with specific range is risky if I don't have exact lines. I'll try to target the top of the file and the start of the component)

// Wait, I can't do two disjoint edits easily with one `replace_file_content`.
// I'll use `multi_replace_file_content` since I need to add an import AND add the component in the JSX.


const projects = [
    {
        title: "Ai-Trip-Planner",
        description: "Smart travel itineraries generated via Gemini AI. Features budget tracking, route optimization, and real-time destination data.",
        tags: ["React", "Node.js", "MongoDB", "Tailwind", "Gemini Api", "Map Api"],
        image: "https://lh3.googleusercontent.com/d/10ey-Mp6U9QHGrG-uQHOTaTaIzJrRld0D",
        source_code_link: "https://github.com/priy23/Ai-Trip-Planner-Web_dev/tree/main",
        live_link: "https://ai-world-routes.vercel.app/",
    },
    {
        title: "Movie Ott Platform",
        description: "Full-featured streaming experience with categories, search, and responsive player. Managed via custom MySQL database.",
        tags: ["HTML-5", "CSS-3", "JavaScript", "Data Base"],
        image: "https://lh3.googleusercontent.com/d/1t4J5spsBFZDSB0brxEFAJEXuV8VDYhYJ",
        source_code_link: "https://github.com/priy23/Movie-OTT-Platform",
        live_link: "https://tangerine-souffle-7eae56.netlify.app/",
    },
    {
        title: "Skill Swap",
        description: "Skill Swap enables real-time skill exchange through scheduling, chat,and video meetings.",
        tags: ["Socket.io", "WebRTC", "Node.js", "Tailwind", "JWT", "MongoDB", "Express.js", "Next.js"],
        image: "https://lh3.googleusercontent.com/d/1U4v7DjjRKPgQ9I5ewRSzp7S18TXa9TUD",
        source_code_link: "https://github.com/priy23/Skill-Swap-Exchange-Skills",
        live_link: "https://skill-swap-by-sonu.vercel.app/",
    },
    {
        title: "Glowify Ecommerce",
        description: "Glowify is a modern full-stack e-commerce platform built using the MERN stack, featuring a user-friendly shopping experience and a powerful admin dashboard.",
        tags: ["MERN", "React-Router", "JWT", "Tailwind", "Redux"],
        image: "https://lh3.googleusercontent.com/d/11D366CzL2zqf0u3J8hpCi5O21mPdt7Gv",
        source_code_link: "https://github.com/priy23/Glowify-Shopping-Website-With-Admin-Panel",
        live_link: "https://shopping-full-stack-website.vercel.app/",
    },
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`mb-20 flex w-full flex-col items-center justify-between gap-8 lg:flex-row ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
        >
            {/* Content Side */}
            <div className="w-full lg:w-[45%]">
                <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.02}
                    transitionSpeed={450}
                    className="glass group relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 hover:border-neon-blue/30 lg:p-8"
                >
                    {/* Image Placeholder */}
                    {/* Project Image */}
                    <div className="relative mb-6 h-[200px] w-full overflow-hidden rounded-xl bg-gray-900/50">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-black text-gray-500">
                                Project Preview
                            </div>
                        )}


                        {/* Overlay Links */}
                        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <a
                                href={project.source_code_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-black border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href={project.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-black border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black transition-all"
                            >
                                <ExternalLink size={24} />
                            </a>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">
                        {project.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-400 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                            <span key={tag} className="text-sm font-medium text-neon-green">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Mobile Links (Visible only on small screens) */}
                    <div className="mt-6 flex items-center justify-start gap-4 lg:hidden">
                        <a
                            href={project.source_code_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-neon-blue/30 bg-neon-blue/10 px-4 py-2 text-sm font-bold text-neon-blue hover:bg-neon-blue hover:text-black transition-all"
                        >
                            <Github size={18} /> Code
                        </a>
                        <a
                            href={project.live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-neon-purple/30 bg-neon-purple/10 px-4 py-2 text-sm font-bold text-neon-purple hover:bg-neon-purple hover:text-black transition-all"
                        >
                            <ExternalLink size={18} /> Live Demo
                        </a>
                    </div>
                </Tilt>
            </div >

            {/* Center Timeline Dot (Desktop Only) */}
            < div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center" >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black border-4 border-[#1a1a1a]">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.8)]" />
                </div>
            </div >

            {/* Empty Space for layout balance */}
            < div className="hidden w-[45%] lg:block" />
        </motion.div >
    );
};

const Projects = () => {
    return (
        <section id="projects" className="relative z-0 min-h-screen w-full bg-black py-12 pb-20 sm:py-20 sm:pb-40 overflow-hidden">
            <div className="absolute inset-0 z-[-1]">
                <StarsCanvas size={0.001} speed={0.2} />
            </div>
            {/* Background Glows */}
            <div className="absolute top-[20%] right-0 -z-10 h-[500px] w-[500px] rounded-full bg-neon-purple/20 blur-[120px] opacity-50 sm:opacity-100" />
            <div className="absolute bottom-[20%] left-0 -z-10 h-[500px] w-[500px] rounded-full bg-neon-blue/20 blur-[120px] opacity-50 sm:opacity-100" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center sm:mb-20"
                >
                    <p className="text-sm uppercase tracking-wider text-gray-400 sm:text-lg">My Work</p>
                    <h2 className="text-glow mt-2 text-3xl font-black text-white sm:text-4xl md:text-6xl">Projects.</h2>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line (Desktop) */}
                    <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />

                    {/* Use map to render project roadmap */}
                    <div className="flex flex-col">
                        {projects.map((project, index) => (
                            <ProjectCard key={`project-${index}`} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
