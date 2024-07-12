<script lang="ts">
import { toRefs, type PropType } from 'vue';
import { RouterLink } from 'vue-router';

export interface INavItem {
  icon: string;
  label: string;
  href: string;
}

export default {
  name: 'NavItem',
  props: {
    data: {
      type: Object as PropType<INavItem>,
      required: true
    },
    isMobile: Boolean
  },
  setup(props) {
    const { data, isMobile } = toRefs(props);

    return {
      data,
      isMobile
    };
  }
};
</script>

<template>
  <RouterLink
    :to="data.href"
    :class="{
      'bg-black/20 dark:bg-white/10': isMobile,
      'hover:bg-black/20 dark:hover:bg-white/10': !isMobile
    }"
    class="!max-w-fit h-full transition-colors"
    active-class="bg-black/10 dark:bg-white/5 text-black/40 dark:text-white/40 pointer-events-none"
  >
    <div
      :class="{
        'bg-black/20 my-2 rounded-sm p-3 text-sm justify-start': isMobile,
        'h-full px-6 text-sm justify-center': !isMobile
      }"
      class="flex items-center whitespace-nowrap gap-2 font-semibold"
    >
      <v-icon :name="data.icon" />
      {{ data.label }}
    </div>
  </RouterLink>
</template>
