import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

const useTheme = defineStore('theme', () => {
  const itemStorage: string = 'mdbots.lightMode';
  const isLight = ref<boolean>(localStorage.getItem(itemStorage) === 'true');

  const changeTheme = (): void => {
    isLight.value = !isLight.value;
    localStorage.setItem(itemStorage, isLight.value.toString());
  };

  watchEffect(() => {
    if (isLight.value) document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  });

  return { isLight, changeTheme };
});

export { useTheme };
