<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  name: 'LoadingScreen',
  setup() {
    const isLoading = ref<boolean>(false);

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = true;
      }, 3000);
    });

    return {
      isLoading
    };
  }
};
</script>

<template>
  <div :class="{ 'animate-loadingScreen': isLoading }">
    <div
      class="flex flex-col right-0 left-0 bottom-0 top-0 z-[1000] opacity-90 bg-gradient-to-bl from-white to-[#F7F4F3] dark:from-black dark:to-[#191919] fixed items-center justify-center"
    >
      <span
        class="loading loading-spinner loading-lg text-black dark:text-gray-100 drop-shadow-lg"
      />
    </div>
  </div>
</template>
