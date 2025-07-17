<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import { SoftShadows, Environment } from '@tresjs/cientos'
import Door from '@/components/3d/Door.vue';
import Room from '@/components/3d/Room.vue';
import Camera from '@/components/3d/Camera.vue';
import Shiny from '@/components/3d/Shiny.vue';
import { ref, useTemplateRef } from 'vue';

const camRef = useTemplateRef<typeof Camera>('camRef');
const isControlEnabled = ref<boolean>(false);

function startCameraAnimation(): void {
  camRef.value!.$.exposed!.startAnim();
}
</script>

<template>
  <TresCanvas window-size clear-color="#82DBC5" shadows :shadowMap-enabled="true" preset="realistic">
    <Suspense>
      <Camera ref="camRef"/>
    </Suspense>
    <Suspense>
      <Door @open="startCameraAnimation" />
    </Suspense>
    <Suspense>
      <Room />
    </Suspense>
    <Shiny :position="[0, .25, -.85]" />
    <TresAmbientLight :intensity=".25" />
    <TresDirectionalLight
      color="#fdffc9"
      :intensity="6"
      :position="[-15, 14, 25]"
      :cast-shadow="true"
      :shadow-mapSize-width="4096"
      :shadow-mapSize-height="4096"
      :shadow-camera-far="120"
    />
    <SoftShadows :size="32" :samples="32" :focus=".25" />
    <Suspense>
      <Environment background :backgroundIntensity="20" files="/src/assets/cubemap.hdr" />
    </Suspense>
  </TresCanvas>
</template>