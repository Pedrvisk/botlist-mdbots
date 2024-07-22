<script lang="ts">
import FooterItem from '@/components/ui/FooterItem.vue';
import Links from '@/router/routerLinks';
import { RouterLink } from 'vue-router';

export default {
  name: 'Footer',
  components: {
    RouterLink,
    FooterItem
  },
  setup() {
    return {
      footerSocialLinks: Links.Footer.Social,
      footerLinksMenu: Links.Footer.Menu,
      footerLinksDev: Links.Footer.Dev,
      footerLinksCompany: Links.Footer.Company
    };
  }
};
</script>

<template>
  <footer class="bg-white dark:bg-[#141414]">
    <div
      class="container-layout flex flex-col items-center md:items-start justify-center md:justify-start w-full px-4 gap-2 md:gap-2"
    >
      <div
        class="flex flex-col-reverse md:flex-row items-center md:items-end justify-center md:justify-between gap-6 md:gap-0 w-full"
      >
        <div
          class="md:w-full flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start"
        >
          <div
            class="flex gap-2 py-1 px-2 rounded-md items-center bg-black/20 dark:bg-white/5 w-fit"
          >
            <a
              v-for="socialLink in footerSocialLinks"
              :key="socialLink.href"
              :href="socialLink.href"
              target="_blank"
              class="hover:text-black/80 dark:hover:text-white/80 transition-colors"
            >
              <v-icon class="h-5 w-5" :name="socialLink.icon" />
            </a>
          </div>
        </div>
        <div
          class="w-full flex gap-6 text-center md:text-start md:gap-0 flex-col md:flex-row items-center md:items-start justify-center md:justify-between"
        >
          <div class="space-y-2">
            <h3 class="text-md font-semibold">Menu</h3>
            <div class="flex flex-col gap-1">
              <FooterItem
                v-for="footerLinkMenu in footerLinksMenu"
                :key="footerLinkMenu.href"
                :data="footerLinkMenu"
              />
            </div>
          </div>
          <div class="space-y-2">
            <h3 class="text-md font-semibold">Desenvolvedores</h3>
            <div class="flex flex-col gap-1">
              <FooterItem
                v-for="footerLinkDev in footerLinksDev"
                :key="footerLinkDev.href"
                :data="footerLinkDev"
              />
            </div>
          </div>
          <div class="space-y-2">
            <h3 class="text-md font-semibold">Empresa</h3>
            <div class="flex flex-col gap-1">
              <FooterItem
                v-for="footerLinkCompany in footerLinksCompany"
                :key="footerLinkCompany.href"
                :data="footerLinkCompany"
              />
            </div>
          </div>
        </div>
      </div>
      <span
        class="font-medium text-xs text-center md:text-start w-full text-black/80 dark:text-white/80"
        >Copyright © 2023 - 2024 MD Community</span
      >
    </div>
  </footer>
</template>
