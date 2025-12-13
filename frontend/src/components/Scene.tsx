import { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import React from "react";
import { type Group } from "three";

export function Model(props: GroupProps) {
    useGLTF.preload("/scene.gltf");

    const { nodes, materials } = useGLTF("/scene.gltf");

    const groupRef = useRef<Group>(null);

    const [rotationY, setRotationY] = useState(0);

    useFrame((_state, delta) => {
        setRotationY((rotationY) => rotationY + 0.2 * delta);

        if (groupRef.current) {
            groupRef.current.position.y = -2.7;
            groupRef.current.rotation.y = rotationY;
        }
    });

    return (
        //@ts-expect-error No Types
        <group ref={groupRef} {...props} dispose={null}>
            {/** @ts-expect-error No Types */}
            <group rotation={[-Math.PI / 2, 0, 0]}>
                {/** @ts-expect-error No Types */}
                <group scale={[0.212 * 1.5, 0.212 * 1.5, 1 * 1.5]}>
                    {/** @ts-expect-error No Types */}
                    <mesh
                        //@ts-expect-error No Types
                        geometry={nodes.PaloCentral002_1.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    {/** @ts-expect-error No Types */}
                    <mesh
                        //@ts-expect-error No Types
                        geometry={nodes.PaloCentral002_2.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                    {/** @ts-expect-error No Types */}
                </group>
                {/** @ts-expect-error No Types */}
            </group>
            {/** @ts-expect-error No Types */}
        </group>
    );
}
