<script lang="ts">
import { useTheme } from '@/stores/useTheme';
import Moon from '@/assets/Moon.vue';
import { storeToRefs } from 'pinia';
import Sun from '@/assets/Sun.vue';

export default {
  name: 'ThemeSwitch',
  components: {
    Moon,
    Sun
  },
  setup() {
    const theme = useTheme();
    const { isLight } = storeToRefs(theme);
    const { changeTheme } = theme;
    return { isLight, changeTheme };
  }
};
</script>

<template>
  <div class="mr-4">
    <label
      class="cursor-pointer relative flex items-center justify-center w-8 h-8 bg-black/80 rounded-md dark:bg-white/5"
    >
      <input type="checkbox" class="sr-only" :checked="isLight" @change="changeTheme" />
      <transition
        enter-active-class="transition-transform duration-200 ease-out"
        enter-from-class="scale-0 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-0 opacity-0"
      >
        <div v-if="isLight" key="moon" class="absolute flex items-center justify-center">
          <Moon />
        </div>
      </transition>
      <transition
        enter-active-class="transition-transform duration-200 ease-out"
        enter-from-class="scale-0 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-0 opacity-0"
      >
        <div v-if="!isLight" key="sun" class="absolute flex items-center justify-center">
          <Sun />
        </div>
      </transition>
    </label>
  </div>
</template>
