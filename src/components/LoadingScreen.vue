<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  name: 'LoadingScreen',
  setup() {
    const isScreenLoading = ref<boolean>(true);

    onMounted(() => {
      setTimeout(() => {
        isScreenLoading.value = false;
      }, 3000);
    });

    return {
      isScreenLoading
    };
  }
};
</script>

<template>
  <div
    :class="{ '!opacity-0 invisible': !isScreenLoading }"
    class="flex transition-all !duration-500 flex-col right-0 left-0 bottom-0 top-0 z-[1000] opacity-90 bg-gradient-to-bl from-white to-[#F7F4F3] dark:from-black dark:to-[#191919] fixed items-center justify-center"
  >
    <span class="loading loading-spinner loading-lg text-black dark:text-gray-100 drop-shadow-lg" />
  </div>
</template>
