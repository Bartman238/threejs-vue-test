<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene: model } = await useGLTF('/src/models/room.glb');
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