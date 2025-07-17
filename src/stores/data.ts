import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {
  const doorScaleMod = ref<number>(1.0);
  const isPrimitiveDoor = ref<boolean>(true);

  return { doorScaleMod, isPrimitiveDoor }
})
