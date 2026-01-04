import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black/90 py-8 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Priya Kumari. All rights reserved.
                </div>

                <div className="flex space-x-6">
                    <a href="https://github.com/priy23" className="text-gray-400 transition-colors hover:text-neon-blue hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/priya-kumari-a8180928a/" className="text-gray-400 transition-colors hover:text-neon-blue hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:pkumari61002@gmail.com" className="text-gray-400 transition-colors hover:text-neon-blue hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
