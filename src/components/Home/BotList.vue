<script lang="ts">
import { toRefs, computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import BotCard from './BotCard.vue';

interface BotData {
  id: string;
  botId: string;
  ownerId: string;
  username: string;
  avatarUrl: string;
  bannerUrl: string;
  shortDescription: string;
  description: string;
  isVerifiedBot: boolean;
  isSlashCommands: boolean;
  authorId: string;
  authorUsername: string;
  isPending: boolean;
  isPromoted: boolean;
  totalVotes: number;
  lastvotedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  name: 'BotList',
  components: {
    BotCard
  },
  props: {
    botData: {
      type: Array as PropType<Array<BotData>>,
      required: true
    },
    isLoading: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup(props) {
    const { botData, isLoading } = toRefs(props);
    return { botData, isLoading };
  }
};
</script>

<template>
  <template v-if="isLoading">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      <div v-for="i in 8" :key="i" class="w-full h-full">
        <div class="animate-pulse bg-black/40 dark:bg-white/10 h-96 rounded-md" />
      </div>
    </div>
  </template>
  <template v-else-if="botData.length <= 0" />
  <template v-else>
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
        v-for="bot in botData"
        :key="bot.id"
        :to="`/bots/${bot.id}`"
      >
        <BotCard :data="bot" />
      </RouterLink>
    </div>
  </template>
</template>
