<script lang="ts">
import router from '@/router';

export default {
  name: 'NotFound',
  setup() {
    return {
      router
    };
  }
};
</script>

<template>
  <div class="flex flex-col h-96 md:h-auto grow items-center justify-center">
    <h3 class="text-red-500 text-[120px] font-bold drop-shadow-2xl">404</h3>
    <div class="flex flex-col gap-3 items-center justify-center">
      <p class="text-center md:w-2/3 font-normal text-black dark:text-white/80">
        Oops... Parece que você encontrou uma página que não existe. Não se preocupe, aperte no
        botão de voltar!
      </p>
      <button
        @click="router.go(-1)"
        class="px-4 py-2 bg-black/80 hover:bg-black dark:bg-white/5 dark:hover:bg-white/10 w-24 text-white rounded-md transition-colors"
      >
        Voltar
      </button>
    </div>
  </div>
</template>
