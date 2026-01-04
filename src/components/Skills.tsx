"use client";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, OrbitControls, RoundedBox, Billboard } from "@react-three/drei";
import { Code2, Globe, Server, Database, Terminal, Cpu, Layers, Cloud } from "lucide-react";
import StarsCanvas from "./canvas/Stars";

// --- Data based on Image 1 ---
const skillCategories = [
    {
        title: "Languages",
        icon: <Terminal size={24} className="text-blue-400" />,
        skills: ["C++", "DSA", "Java", "Python", "JavaScript"],
        bg: "from-blue-500/10 to-transparent",
        border: "group-hover:border-blue-500/50",
    },
    {
        title: "Web Technologies",
        icon: <Globe size={24} className="text-purple-400" />,
        skills: ["React.js", "Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Express.js"],
        bg: "from-purple-500/10 to-transparent",
        border: "group-hover:border-purple-500/50",
    },
    {
        title: "Others",
        icon: <Cpu size={24} className="text-green-400" />,
        skills: ["OOPS", "CN", "DBMS", "OS", "Excel", "PowerBI"],
        bg: "from-green-500/10 to-transparent",
        border: "group-hover:border-green-500/50",
    },
    {
        title: "Database, Cloud & Deployment",
        icon: <Cloud size={24} className="text-orange-400" />,
        skills: ["MongoDB", "SQL", "Vercel", "Git & GitHub", "Render"],
        bg: "from-orange-500/10 to-transparent",
        border: "group-hover:border-orange-500/50",
    },
];

// Combine all skills for the floating bubbles
const allSkills = [
    { name: "React.js", color: "#61dafb", scale: 1.2 },
    { name: "Next.js", color: "#ffffff", scale: 1.1 },
    { name: "Python", color: "#ffde57", scale: 1.3 },
    { name: "Java", color: "#f89820", scale: 1 },
    { name: "C++", color: "#00599c", scale: 0.9 },
    { name: "Tailwind", color: "#38bdf8", scale: 1.1 },
    { name: "MongoDB", color: "#47a248", scale: 1 },
    { name: "SQL", color: "#00758f", scale: 0.9 },
    { name: "Git", color: "#f14e32", scale: 0.9 },
    { name: "Node.js", color: "#68a063", scale: 1.1 },
    { name: "JavaScript", color: "#f7df1e", scale: 1.2 },
    { name: "AWS", color: "#ff9900", scale: 1 },
];

// --- 3D Components ---
// Standardized Bubble Component suitable for physics
const Bubble = ({ position, text, color, scale, index, bubblesRef }: any) => {
    const meshRef = useRef<any>(null);
    const sphereRef = useRef<any>(null); // Ref for just the sphere (to rotate it)
    const [hovered, setHovered] = useState(false);

    // Register self
    React.useLayoutEffect(() => {
        if (meshRef.current) {
            bubblesRef.current[index] = {
                mesh: meshRef.current,
                originalPos: new THREE.Vector3(...position),
                position: new THREE.Vector3(...position),
                velocity: new THREE.Vector3(0, 0, 0),
                radius: 0.9 * scale, // Approximate radius
                scale: scale
            };
        }
    }, [index, position, scale, bubblesRef]);

    // Internal animation for Bubble rotation only (Text stays still via Billboard)
    useFrame((state, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x += delta * 0.1;
            sphereRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group
            ref={meshRef}
            position={position}
            scale={scale}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        >
            {/* Bubble Shell - Rotates internally */}
            <mesh ref={sphereRef} castShadow receiveShadow>
                <sphereGeometry args={[0.9, 64, 64]} />
                <meshPhysicalMaterial
                    color={hovered ? color : "#ffffff"}
                    roughness={0}
                    metalness={0.1}
                    transmission={0.95}
                    thickness={1.5}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    ior={1.5}
                    attenuationColor={color}
                    attenuationDistance={1}
                />
            </mesh>

            {/* Text Label Pill - Always faces camera */}
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <group position={[0, 0, 1.15]}>
                    <RoundedBox args={[text.length * 0.12 + 0.4, 0.5, 0.1]} radius={0.2} smoothness={4}>
                        <meshPhysicalMaterial
                            color={hovered ? color : "#1a1a1a"}
                            transparent
                            opacity={0.8}
                            roughness={0.2}
                            metalness={0.5}
                            side={THREE.DoubleSide}
                        />
                    </RoundedBox>
                    <Text
                        position={[0, 0, 0.06]}
                        fontSize={0.25}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {text}
                    </Text>
                </group>
            </Billboard>
        </group>
    );
};

const SkillsScene = () => {
    const bubblesRef = useRef<any[]>([]);
    const [skillsData] = useState([
        // Center - Core
        { text: "React", color: "#61dafb", scale: 1.4, radius: 0, speed: 0, yPos: 0, angle: 0 },

        // Inner Orbit (Web) - Radius 3.5
        { text: "Next.js", color: "#ffffff", scale: 1.1, radius: 3.5, speed: 0.5, yPos: 1, angle: 0 },
        { text: "Node", color: "#68a063", scale: 1.1, radius: 3.5, speed: 0.6, yPos: -1, angle: Math.PI / 2 },
        { text: "Tailwind", color: "#38bdf8", scale: 1.1, radius: 3.5, speed: 0.5, yPos: 0.5, angle: Math.PI },
        { text: "JS", color: "#f7df1e", scale: 1.1, radius: 3.5, speed: 0.7, yPos: -0.5, angle: -Math.PI / 2 },

        // Middle Orbit (Languages/DB) - Radius 6
        { text: "Python", color: "#ffde57", scale: 1.2, radius: 6, speed: 0.3, yPos: 1.5, angle: 0.5 },
        { text: "Java", color: "#f89820", scale: 1.1, radius: 6, speed: 0.4, yPos: -1.5, angle: 2.5 },
        { text: "SQL", color: "#00758f", scale: 1.0, radius: 6, speed: 0.3, yPos: 0, angle: 4.5 },
        { text: "MongoDB", color: "#47a248", scale: 1.0, radius: 6, speed: 0.35, yPos: 1, angle: 5.5 },

        // Outer Orbit (Tools) - Radius 8.5
        { text: "AWS", color: "#ff9900", scale: 1.1, radius: 8.5, speed: 0.2, yPos: -1, angle: 1 },
        { text: "Git", color: "#f14e32", scale: 1.0, radius: 8.5, speed: 0.25, yPos: 2, angle: 3 },
        { text: "C++", color: "#00599c", scale: 1.0, radius: 8.5, speed: 0.2, yPos: -2, angle: 5 },
    ]);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // Calculate Mouse Position in 3D Space (at z=0)
        const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
        vec.unproject(state.camera);
        const dir = vec.sub(state.camera.position).normalize();
        const distanceToPlane = -state.camera.position.z / dir.z;
        const mousePos = state.camera.position.clone().add(dir.multiplyScalar(distanceToPlane));

        bubblesRef.current.forEach((bubble, i) => {
            if (!bubble || !skillsData[i]) return;
            const data = skillsData[i];

            // --- 1. Calculate Target Orbital Position ---
            let targetX, targetY, targetZ;

            if (data.radius === 0) {
                targetX = 0;
                targetZ = 0;
                targetY = data.yPos + Math.sin(time * 0.5) * 0.2;
            } else {
                const currentAngle = data.angle + time * data.speed * 0.3;
                targetX = Math.cos(currentAngle) * data.radius;
                targetZ = Math.sin(currentAngle) * data.radius;
                targetY = data.yPos + Math.sin(time * 0.5 + i) * 0.5;
            }

            // --- 2. Physics Forces ---

            // a. Attraction to Orbit Target (Spring)
            const k = 3.0; // Spring stiffness
            const ax = (targetX - bubble.position.x) * k;
            const ay = (targetY - bubble.position.y) * k;
            const az = (targetZ - bubble.position.z) * k;

            bubble.velocity.x += ax * delta;
            bubble.velocity.y += ay * delta;
            bubble.velocity.z += az * delta;

            // b. Mouse Repulsion
            const distToMouse = new THREE.Vector3(bubble.position.x, bubble.position.y, 0).distanceTo(mousePos);
            if (distToMouse < 4) { // Interaction radius
                const repulsionForce = (4 - distToMouse) * 15; // Strength
                const angle = Math.atan2(bubble.position.y - mousePos.y, bubble.position.x - mousePos.x);
                bubble.velocity.x += Math.cos(angle) * repulsionForce * delta;
                bubble.velocity.y += Math.sin(angle) * repulsionForce * delta;
            }

            // c. Collision Avoidance (Bubble vs Bubble)
            bubblesRef.current.forEach((otherBubble, j) => {
                if (i === j || !otherBubble) return;
                const dist = bubble.position.distanceTo(otherBubble.position);
                const minDist = bubble.radius + otherBubble.radius + 2.0; // Restored Strong Padding

                if (dist < minDist) {
                    const overlap = minDist - dist;
                    const normal = new THREE.Vector3().subVectors(bubble.position, otherBubble.position).normalize();
                    const force = 100 * overlap; // Restored Strong Force
                    bubble.velocity.add(normal.multiplyScalar(force * delta));
                }
            });

            // d. Friction/Damping
            bubble.velocity.multiplyScalar(0.92); // Damping factor

            // --- 3. Update Position ---
            bubble.position.add(bubble.velocity.clone().multiplyScalar(delta));

            // Apply to Mesh
            if (bubble.mesh) {
                bubble.mesh.position.copy(bubble.position);
            }
        });
    });

    return (
        <group>
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="white" />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa00" distance={10} /> {/* Center Glow */}

            {/* Orbit Lines (Optional, for visual guide) - faint */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.4, 3.6, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.05} transparent side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[5.9, 6.1, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.03} transparent side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[8.4, 8.6, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.02} transparent side={THREE.DoubleSide} />
            </mesh>


            {skillsData.map((skill, index) => (
                <Bubble
                    key={skill.text}
                    index={index}
                    bubblesRef={bubblesRef}
                    position={[0, 0, 0]} // Initial position doesn't matter, controlled by useFrame
                    text={skill.text}
                    color={skill.color}
                    scale={skill.scale}
                />
            ))}
        </group>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="relative z-0 min-h-screen w-full bg-black py-20">
            {/* Star Background */}
            <div className="absolute inset-0 z-[-1]">
                <StarsCanvas />
            </div>

            {/* Main Content Container */}
            <div className="mx-auto flex h-full max-w-7xl flex-col items-center px-6">

                {/* 1. SECTION HEADER (Top) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-2 text-center"
                >
                    <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-blue/10 text-neon-blue backdrop-blur-md">
                            <Cpu size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-white sm:text-5xl md:text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                            Technical Skills
                        </h2>
                    </div>

                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-lg">
                        A strong technical skill set covering full-stack development, core computer science concepts, and data analytics,
                        built through academic learning and practical internship experience.
                    </p>
                </motion.div>

                {/* 2. 3D BUBBLE EFFECT (Middle - Dedicated Space) */}
                <div className="relative h-[700px] w-full max-w-full -mt-20"> {/* Negative top margin only to pull up, no bottom overlap */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 via-transparent to-black" />
                    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
                        <fog attach="fog" args={['#000000', 5, 40]} />
                        <SkillsScene />
                        {/* Enable Pan for 'mouse movable' feel */}
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={true} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                    </Canvas>
                </div>

                {/* 3. SKILL CARDS (Bottom) */}
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {skillCategories.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${cat.border}`}
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                            {/* Header */}
                            <div className="relative z-10 mb-6 flex items-center gap-4 border-b border-white/10 pb-4">
                                <div className="rounded-lg bg-white/5 p-2.5 transition-colors group-hover:bg-white/10 group-hover:scale-110 duration-300">
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white leading-tight">
                                    {cat.title}
                                </h3>
                            </div>

                            {/* Skills Tags */}
                            <div className="relative z-10 flex flex-wrap gap-2">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-400 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
