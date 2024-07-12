<script lang="ts">
import { toRefs, type PropType } from 'vue';

export interface BotData {
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
  name: 'BotCard',
  props: {
    data: {
      type: Object as PropType<BotData>,
      required: true
    }
  },
  setup(props) {
    const { data } = toRefs(props);
    return { data };
  }
};
</script>

<template>
  <div class="w-full h-full rounded-lg shadow-lg relative">
    <div
      class="flex items-end h-32 min-w-full max-w-full w-full shadow-md rounded-t-lg bg-no-repeat bg-cover bg-center"
      :style="{ backgroundImage: `url(${data.bannerUrl})` }"
    >
      <div
        :class="{
          'pr-3 pl-3 pt-3': data.shortDescription,
          'pr-3 pl-3 pt-3 pb-3': !data.shortDescription
        }"
        class="bg-[#232323] rounded-tr-2xl"
      >
        <div
          class="rounded-full h-12 w-12 bg-no-repeat bg-cover ring-2 ring-white"
          :style="{ backgroundImage: `url(${data.avatarUrl})` }"
        />
      </div>
      <h3
        :class="{
          'pt-2 pr-2': data.shortDescription,
          'pt-2 pr-2 pb-2': !data.shortDescription
        }"
        class="text-sm max-h-10 truncate text-clip text-start text-pretty bg-[#232323] rounded-tr-lg pt-2 pr-2"
      >
        {{ data.username }}
      </h3>
      <v-icon
        name="md-fibernew-outlined"
        class="absolute right-0 top-0 pr-2 w-8 h-8 text-yellow-400"
      />
    </div>
    <div class="bg-[#232323] rounded-b-lg">
      <div v-if="data.shortDescription" class="p-4">
        <p class="text-xs max-h-32 truncate text-clip text-start text-pretty">
          {{ data.shortDescription }}
        </p>
      </div>
      <button
        type="button"
        class="w-full h-full py-3 text-pretty bg-blue-500 hover:bg-black/60 transition-colors rounded-b-lg"
      >
        Vamos lá
      </button>
    </div>
  </div>
</template>
