<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos';

const BASE = import.meta.env.BASE_URL;

const { scene: model } = await useGLTF(`${BASE}/models/room.glb`);
model.children.forEach(child => {
	child.castShadow = true;
	child.receiveShadow = true;
});
</script>

<template>
	<TresMesh
		cast-shadow
		receive-shadow
	>	
		<primitive :object="model" />
	</TresMesh>
</template>