"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = ["Software Engineer", "Data Analyst", "Web Developer"];

const TypingEffect = () => {
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [delta, setDelta] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const currentRole = roles[roleIndex];
            const updatedText = isDeleting
                ? currentRole.substring(0, text.length - 1)
                : currentRole.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === currentRole) {
                setDelta(2000); // Pause at end
                setIsDeleting(true);
            } else if (isDeleting && updatedText === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setDelta(150); // Reset speed
            } else {
                setDelta(isDeleting ? 80 : 150);
            }
        };

        const timer = setTimeout(handleTyping, delta);
        return () => clearTimeout(timer);
    }, [text, isDeleting, roleIndex, delta]);

    return (
        <span className="font-mono text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.6)]">
            {text}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 inline-block h-8 w-1 bg-neon-purple align-middle"
            />
        </span>
    );
};

export default TypingEffect;
