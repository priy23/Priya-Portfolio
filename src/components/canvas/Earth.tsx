"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Sphere, MeshDistortMaterial } from "@react-three/drei";

const Earth = () => {
    return (
        <mesh>
            {/* Core Sphere - The Planet */}
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshStandardMaterial
                color="#4c1d95" // Deep Purple/Blue base
                roughness={0.7}
                metalness={0.5}
            />

            {/* Atmosphere / Wireframe Overlay */}
            <mesh scale={1.05}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </mesh>
    );
};

// A more complex "Digital Earth" using a GLTF if available, but since we don't have one, 
// let's build a nice procedural one.
// A more complex "Digital Earth" using a GLTF if available, but since we don't have one, 
// let's build a nice procedural one.
const DigitalEarth = ({ scale = 1 }: { scale?: number }) => {
    const earthRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.2; // Slow, steady rotation like real Earth
        }
    });

    return (
        <group ref={earthRef} rotation={[0, 0, 23.5 * (Math.PI / 180)]} scale={scale}> {/* Axial Tilt & Scale */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#61dafb" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#9c27b0" />

            {/* Main Globe */}
            <Sphere args={[2.4, 64, 64]}>
                <meshPhysicalMaterial
                    color="#1e1e3f"
                    roughness={0.4}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </Sphere>

            {/* Glowing Wireframe/Grid */}
            <mesh scale={1.01}>
                <sphereGeometry args={[2.4, 32, 32]} />
                <meshBasicMaterial
                    color="#4f46e5"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Distorted Atmosphere Layer */}
            <Sphere args={[2.4, 64, 64]} scale={1.2}>
                <MeshDistortMaterial
                    color="#2e1065"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={1}
                    transparent
                    opacity={0.1}
                />
            </Sphere>
        </group>
    );
}

const EarthCanvas = () => {
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setScale(1.5); // Reverted to 1.5: This is the max size that fits in the screen!
            } else if (window.innerWidth < 1024) {
                setScale(0.9); // Tablet
            } else {
                setScale(1); // Desktop
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Canvas
            shadows
            frameloop="always" // Changed to always for smooth rotation
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={null}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <DigitalEarth scale={scale} />
            </Suspense>
        </Canvas>
    );
};

export default EarthCanvas;
