<script setup lang="ts">
import { useLoop, type TresInstance } from '@tresjs/core';
import { BoxGeometry, LoopOnce, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { ref, shallowRef, watch, type ShallowRef } from 'vue';
import { useDataStore } from '@/stores/data';

const emit = defineEmits<{
	(e: 'open'): void
}>();
const store = useDataStore();

const cuboid = {
	geometry: new BoxGeometry(.65, .88, .05),
	material: new MeshBasicMaterial({ color: '#f2f' })
}
const primitiveDoor = new Mesh(cuboid.geometry, cuboid.material);
primitiveDoor.name = 'Untitled';
primitiveDoor.position.set(0, .46, .01);
let primitiveAnimStart = false;
let primitiveAnimFinished = false;

const { onBeforeRender } = useLoop();
const { scene: model, animations } = await useGLTF('/src/models/door.glb');
const { actions } = useAnimations(animations, model);

const MAX_SCALING = new Vector3(1.1, 1.1, 1.1);
const DEFAULT_SCALING = new Vector3(1, 1, 1);
const SCALING_SPEED = 15;

// изменяем свойства объекта напрямую, не используя реактивные свойства из соображений оптимизации, удобнее канеш было бы используя reactive и прокидывая проп скейла в TresMesh
// всратое старое определение темплейтрефа из-за того что используя useTemplateRef мы получаем иммутабельный объект, а вот такой пример взят из оф доки (кринж)
const meshRef : ShallowRef<TresInstance | null> = shallowRef(null);
const isHovered = ref<boolean>(false);
const isOpened = ref<boolean>(false);

watch(() => store.doorScaleMod, (val) => {
	DEFAULT_SCALING.setScalar(1 * val);
	MAX_SCALING.setScalar(1.1 * val);
});

function handlePointerEnter(): void {
    if (isHovered.value) return
    isHovered.value = true;
}
function handlePointerLeave(): void {
    if (!isHovered.value) return
    isHovered.value = false;
}
function handleClick(): void {
	if (!store.isPrimitiveDoor) {
		actions.Open.setLoop(LoopOnce, 1);
		actions.Open.clampWhenFinished = true;
		actions.Open.play();
	} else {
		primitiveAnimStart = true;
		setTimeout(() => {
			primitiveAnimFinished = true;
		}, 750);
	}
	isOpened.value = true;
	setTimeout(() => {
		emit('open');
	}, 500);
}

onBeforeRender(({ delta }) => {
	const scale = meshRef.value!.scale;
	if (primitiveAnimStart && !primitiveAnimFinished) {
		primitiveDoor.position.lerp(new Vector3(primitiveDoor.position.x - 2, primitiveDoor.position.y, primitiveDoor.position.z), 0.5 * delta)
	}
	if (isOpened.value) return
	if (isHovered.value && scale.x < MAX_SCALING.x) {
		scale.lerp(MAX_SCALING, SCALING_SPEED * delta);
		return
	}
	scale.lerp(DEFAULT_SCALING, SCALING_SPEED * delta);
});
</script>

<template>
	<TresMesh
		ref="meshRef"
		cast-shadow
		receive-shadow
		@click="handleClick"
		@pointer-enter="handlePointerEnter"
		@pointer-leave="handlePointerLeave"
	>	
		<primitive v-if="!store.isPrimitiveDoor" :object="model" />
		<primitive v-else :object="primitiveDoor" />
	</TresMesh>
</template>