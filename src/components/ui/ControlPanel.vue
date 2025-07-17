<script setup lang="ts">
import { useDataStore } from '@/stores/data';

    const store = useDataStore();
</script>

<template>
    <div class="control">
        <label>Door scale modificator: <input type="number" v-model="store.doorScaleMod" step="0.05" /></label>
        <label>Primitive door: <input type="checkbox" v-model="store.isPrimitiveDoor" /></label>
    </div>
</template>

<style scoped>
.control {
    position: absolute;
    right: 15px;
    top: 15px;
    padding: 20px;
    background: lightgray;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
}
</style>