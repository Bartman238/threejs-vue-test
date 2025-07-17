<script setup lang="ts">
import { LoopOnce } from 'three';
import { useAnimations, useGLTF, PointerLockControls } from '@tresjs/cientos'
import { useTresContext } from '@tresjs/core';
import { ref } from 'vue';

const BASE = import.meta.env.BASE_URL;

const emit = defineEmits<{
	(e: 'anim-finished'): void
}>();
const { animations } = await useGLTF(`${BASE}/models/camera.glb`);
const { camera } = useTresContext();
camera.value!.position.set(...[0, 0.75, 2]);
camera.value!.rotation.set(0, 0, 0);
camera.value!.name = 'Camera';
camera.value!.animations = animations;
const { actions, mixer } = useAnimations(animations, camera);

const animFinished = ref<boolean>(false);

function startAnim(): void {
	mixer.addEventListener('finished', () => {
		emit('anim-finished');
		animFinished.value = true;
	});
	actions.CameraAction.setLoop(LoopOnce, 1);
	actions.CameraAction.clampWhenFinished = true;
	actions.CameraAction.play();
}

defineExpose({
	startAnim
})
</script>

<template>
	<PointerLockControls v-if="animFinished" />
</template>