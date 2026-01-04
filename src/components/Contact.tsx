"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import EarthCanvas from "./canvas/Earth";
import StarsCanvas from "./canvas/Stars";

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
        const SERVICE_ID = "service_lvv9xfa";
        const TEMPLATE_ID = "template_xinwy7t";
        const PUBLIC_KEY = "eaSI3S9MnnMuGe73P";

        if (formRef.current) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
                .then((result) => {
                    setLoading(false);
                    setSuccess(true);

                    // Trigger Confetti
                    const duration = 3000;
                    const end = Date.now() + duration;

                    (function frame() {
                        confetti({
                            particleCount: 5,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: ['#61dafb', '#d946ef', '#ffffff'] // Brand colors
                        });
                        confetti({
                            particleCount: 5,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: ['#61dafb', '#d946ef', '#ffffff']
                        });

                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());

                    if (formRef.current) formRef.current.reset();
                    // Reset success state after 6 seconds to show form again
                    setTimeout(() => setSuccess(false), 6000);
                }, (error) => {
                    setLoading(false);
                    console.error("EmailJS Error:", error);
                    alert(`Failed to send: ${JSON.stringify(error)}`);
                });
        }
    };

    return (
        <section id="contact" className="relative z-0 min-h-screen w-full overflow-hidden bg-black py-20">
            {/* Stars Background */}
            <div className="absolute inset-0 z-[-1]">
                <StarsCanvas />
            </div>

            {/* Neon Ambient Glows */}
            <div className="pointer-events-none absolute left-[-10%] top-[20%] z-0 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] z-0 h-[400px] w-[400px] rounded-full bg-neon-blue/10 blur-[120px]" />

            <div className="mx-auto flex max-w-7xl flex-col-reverse gap-10 overflow-hidden px-6 pb-10 xl:flex-row xl:gap-20 relative z-10">

                {/* LEFT: Contact Form Container */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative flex-[0.75] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-black/90 p-8 backdrop-blur-2xl shadow-[0_0_30px_rgba(79,70,229,0.1)]"
                >
                    {/* Glowing Border Effect */}
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-neon-blue via-purple-500 to-transparent opacity-80 shadow-[0_0_15px_#61dafb]" />

                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-lg font-medium uppercase tracking-widest text-gray-400">Get in touch</p>
                                <h3 className="mb-8 text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Contact.</h3>

                                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <label className="flex flex-col gap-2 group">
                                        <span className="font-semibold text-white group-focus-within:text-neon-blue transition-colors text-shadow-sm">Your Name</span>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="What's your name?"
                                            className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-white placeholder:text-gray-500 transition-all duration-300 focus:border-neon-blue/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:shadow-[0_0_20px_rgba(97,218,251,0.3)] hover:bg-white/10 hover:border-white/20"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2 group">
                                        <span className="font-semibold text-white group-focus-within:text-neon-blue transition-colors text-shadow-sm">Your Email</span>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="What's your web address?"
                                            className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-white placeholder:text-gray-500 transition-all duration-300 focus:border-neon-blue/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:shadow-[0_0_20px_rgba(97,218,251,0.3)] hover:bg-white/10 hover:border-white/20"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2 group">
                                        <span className="font-semibold text-white group-focus-within:text-neon-blue transition-colors text-shadow-sm">Your Message</span>
                                        <textarea
                                            rows={6}
                                            name="message"
                                            required
                                            placeholder="What do you want to say?"
                                            className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-white placeholder:text-gray-500 transition-all duration-300 focus:border-neon-blue/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-neon-blue focus:shadow-[0_0_20px_rgba(97,218,251,0.3)] hover:bg-white/10 hover:border-white/20"
                                        />
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative flex w-fit items-center gap-3 overflow-hidden rounded-xl bg-white px-8 py-3 text-lg font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:bg-neon-blue hover:text-white hover:shadow-[0_0_30px_rgba(97,218,251,0.6)] active:scale-95 disabled:opacity-70"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {loading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} className="transition-transform group-hover:translate-x-1" /></>}
                                        </span>
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex h-[500px] w-full flex-col items-center justify-center text-center space-y-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                                    className="relative flex h-32 w-32 items-center justify-center rounded-full bg-green-500/20 text-green-500 shadow-[0_0_50px_rgba(34,197,94,0.6)]"
                                >
                                    <CheckCircle size={64} strokeWidth={3} />
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-2 border-dashed border-green-500/50 rounded-full"
                                    />
                                </motion.div>

                                <div>
                                    <h3 className="mb-2 text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Message Sent!</h3>
                                    <p className="max-w-xs text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSuccess(false)}
                                    className="mt-6 flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors border border-white/5 hover:border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                >
                                    <Sparkles size={16} className="text-yellow-400" />
                                    Send Another
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* RIGHT: 3D Earth Model */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="h-[650px] flex-1 md:h-[550px] xl:h-auto"
                >
                    <EarthCanvas />
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
