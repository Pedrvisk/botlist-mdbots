<script lang="ts">
import { useTheme } from '@/stores/useTheme';
import { storeToRefs } from 'pinia';

export default {
  name: 'ThemeSwitch',
  setup() {
    const theme = useTheme();
    const { isLight } = storeToRefs(theme);
    const { toggle } = theme;
    return { isLight, toggle };
  }
};
</script>

<template>
  <div class="mr-4">
    <label class="cursor-pointer">
      <input type="checkbox" class="sr-only peer/theme" :checked="isLight" @change="toggle" />
      <div
        class="flex peer-checked/theme:hidden items-center justify-center w-8 h-8 bg-white/5 rounded-md dark:bg-white/5 peer-checked/theme:bg-white/5 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m8.66-8.66h1M4.34 12H3m15.36 4.95l.7.7M6.64 6.64l-.7-.7M18.36 18.36l.7.7M6.64 17.36l-.7-.7M12 7a5 5 0 100 10A5 5 0 0012 7z"
          />
        </svg>
      </div>
      <div
        class="hidden peer-checked/theme:flex items-center justify-center w-8 h-8 bg-black/80 rounded-md dark:bg-white/5 peer-checked/theme:bg-black/80 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 118.646 3.646 7 7 0 0020.354 15.354z"
          />
        </svg>
      </div>
    </label>
  </div>
</template>
