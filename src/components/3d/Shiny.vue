<script setup lang="ts">
import { useLoop, type TresInstance } from '@tresjs/core';
import { Mesh, OctahedronGeometry, Vector3 } from 'three';
import { shallowRef, type ShallowRef } from 'vue';


const { onBeforeRender } = useLoop();
const props = withDefaults(defineProps<{ position: number[] }>(), {
    position: () => new Array(0, 0, 0)
});
const sphereRef : ShallowRef<TresInstance | null> = shallowRef(null);
const geometry = new OctahedronGeometry(.15);
const mesh = new Mesh(geometry);
// @ts-ignore
mesh.position.set(...props.position);
mesh.castShadow = true;
mesh.receiveShadow = true;


onBeforeRender(({ delta }) => {
    const pos = mesh.position;
	mesh.position.lerp(new Vector3(pos.x, Math.sin(pos.y * 250 * delta), pos.z), 0.5 * delta);
    mesh.rotation.y += .5 * delta;
    mesh.rotation.x += .25 * delta;
});
</script>

<template>
    <TresMesh ref="sphereRef" cast-shadow receive-shadow>
        <primitive :object="mesh">
            <TresMeshStandardMaterial
                color="#f2f"
                :roughness=".015"
                :metalness=".96"
                emissive="#f2f"
                :emissiveIntensity=".025"
            />
        </primitive>
    </TresMesh>
</template>