<script lang="ts">
import BotList from '@/components/Home/BotList.vue';
import { useFetch } from '@/lib/useFetch';
import { computed } from 'vue';

export default {
  name: 'Home',
  components: {
    BotList
  },
  setup() {
    const { data: botList, loading: isBotsLoading } = useFetch('/api/bots', {}, { limit: '36' });

    const allBotList = computed(() => {
      return botList.value?.data.filter((bot: any) => !bot.isPeding) || [];
    });

    const promotedBotList = computed(() => {
      return botList.value?.data.filter((bot: any) => bot.isPromoted && !bot.isPeding) || [];
    });

    const newBotList = computed(
      () =>
        botList.value?.data.filter(
          (bot: any) =>
            new Date(bot.createdAt) >= new Date(new Date().setDate(new Date().getDate() - 7))
        ) || []
    );

    return {
      allBotList,
      newBotList,
      promotedBotList,
      isBotsLoading
    };
  }
};
</script>

<template>
  <div class="flex flex-col w-full max-w-full items-center space-y-6 mt-12">
    <BotList :botData="promotedBotList" :isLoading="isBotsLoading" />
    <BotList :botData="newBotList" :isLoading="isBotsLoading" />
    <BotList :botData="allBotList" :isLoading="isBotsLoading" />
    <div class="flex flex-col items-center justify-center w-full py-8 bg-black/20">
      <RouterLink
        to="/search"
        class="space-x-2 w-fit px-4 py-2 bg-black hover:bg-black/80 text-white dark:bg-black/40 dark:hover:bg-black/80 transition-colors rounded-md flex items-center justify-center"
      >
        Pesquisar bots
      </RouterLink>
    </div>
  </div>
</template>
