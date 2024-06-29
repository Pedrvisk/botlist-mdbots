<script lang="ts">
import BotCard from '@/components/Home/BotCard.vue';
import { useFetch } from '@/lib/useFetch';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'Search',
  components: {
    BotCard
  },
  setup() {
    const { data: botsData, loading: botsDataLoading } = useFetch(
      '/api/bots',
      {},
      {
        limit: '12'
      }
    );
    const BotsNewDataLoading = ref(false);
    const botsListPage = ref(2);
    const botsNewData = ref();

    const fetchMoreData = async () => {
      BotsNewDataLoading.value = true;
      try {
        const res = await fetch(`/api/bots?page=${botsListPage.value}&limit=12`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const resJson = await res.json();
        botsNewData.value = resJson;
        botsData.value = [...botsData.value, ...botsNewData.value];
        botsListPage.value++;
      } catch (err) {
        console.error(err);
      } finally {
        BotsNewDataLoading.value = false;
      }
    };

    return {
      botsData,
      botsNewData,
      botsDataLoading,
      BotsNewDataLoading,
      fetchMoreData
    };
  }
};
</script>

<template>
  <div class="flex flex-col w-full max-w-full items-center space-y-6 mt-12">
    <template v-if="botsDataLoading || botsData.data.length <= 0">
      <div class="w-full h-32 animate-pulse bg-black/40 dark:bg-white/10 rounded-md p-6" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        <div v-for="i in 8" :key="i" class="w-full h-full">
          <div class="animate-pulse bg-black/40 dark:bg-white/10 h-96 rounded-md" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="max-w-full w-full h-96 bg-black/40 rounded-md shadow-md p-6">Search</div>
      <div
        v-masonry
        :gutter="16"
        transition-duration="0"
        item-selector=".item"
        class="mansory-container max-w-full w-full"
      >
        <RouterLink
          v-masonry-tile
          class="item w-full sm:w-[290.05px] md:w-[227.06px] lg:w-[247.86px] xl:w-[264px] mb-4"
          v-for="botPromoted in botsData.data"
          :key="botPromoted.botId"
          :to="`/bots/${botPromoted.botId}`"
        >
          <BotCard :data="botPromoted" />
        </RouterLink>
      </div>
    </template>
    <button
      :disabled="!botsDataLoading && botsData.data.length <= 0"
      @click="fetchMoreData"
      :class="{ 'opacity-50 cursor-not-allowed': BotsNewDataLoading }"
      class="space-x-2 px-4 py-2 bg-black hover:bg-black/80 disabled:!bg-black/80 disabled:opacity-50 text-white dark:bg-black/40 dark:hover:bg-black/80 transition-colors rounded-md flex items-center justify-center"
    >
      <template v-if="!BotsNewDataLoading">Carregar mais Bots</template>
      <template v-else>
        <span class="loading loading-spinner loading-xs text-gray-100" />
        <span>Carregando...</span>
      </template>
    </button>
  </div>
</template>
