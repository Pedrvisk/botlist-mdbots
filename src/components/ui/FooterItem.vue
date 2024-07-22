<script lang="ts">
import { type IFooterLink } from '@/router/routerLinks';
import { toRefs, type PropType } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'FooterItem',
  components: {
    RouterLink
  },
  props: {
    data: {
      type: Object as PropType<IFooterLink>,
      required: true
    }
  },
  setup(props) {
    const { data } = toRefs(props);

    return {
      data
    };
  }
};
</script>

<template>
  <a
    v-if="data.isExternal"
    :href="data.href"
    target="_blank"
    class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
  >
    {{ data.label }}
  </a>
  <RouterLink
    v-else
    :to="data.href"
    class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
  >
    {{ data.label }}
  </RouterLink>
</template>
