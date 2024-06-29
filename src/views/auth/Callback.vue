<script lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

export default {
  name: 'Callback',
  setup() {
    const route = useRoute();

    onMounted(() => {
      if (window) {
        window.close();
      }
    });
  }
};
</script>

<template>
  <div
    class="flex flex-col right-0 left-0 bottom-0 top-0 z-[1000] opacity-100 bg-gradient-to-bl from-white to-[#F7F4F3] dark:from-black dark:to-[#191919] fixed items-center justify-center"
  >
    <span class="loading loading-spinner loading-lg text-black dark:text-gray-100 drop-shadow-lg" />
  </div>
</template>
