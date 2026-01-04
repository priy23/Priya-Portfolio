"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarField = ({ size = 0.002, speed = 1, ...props }: any) => {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 1.2 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= (delta / 10) * speed;
            ref.current.rotation.y -= (delta / 15) * speed;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={size}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = ({ size, speed }: { size?: number, speed?: number }) => {
    return (
        <div className="absolute inset-0 z-[-1] h-auto w-full">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <StarField size={size} speed={speed} />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default StarsCanvas;
