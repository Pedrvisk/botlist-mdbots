<script lang="ts">
import NavItem, { type INavItem } from '@/components/ui/NavItem.vue';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import MobileMenu from '@/components/ui/MobileMenu.vue';
import AuthMenu from '@/components/ui/AuthMenu.vue';
import { RouterLink } from 'vue-router';
import Logo from '@/assets/Logo.vue';

export default {
  name: 'Header',
  components: {
    Logo,
    ThemeSwitch,
    MobileMenu,
    AuthMenu,
    NavItem
  },
  setup() {
    const navItems: INavItem[] = [
      {
        icon: 'md-dashboard-round',
        label: 'Início',
        href: '/'
      },
      {
        icon: 'oi-search',
        label: 'Descobrir',
        href: '/search'
      }
    ];

    return {
      navItems
    };
  }
};
</script>

<template>
  <header class="fixed right-0 left-0 z-[50] bg-white dark:bg-[#141414]">
    <nav class="container-layout !py-0 h-12 w-full flex items-center justify-between">
      <RouterLink
        class="drop-shadow-[0px_0px_2px_black] dark:drop-shadow-[0px_0px_2px_white] h-full w-full flex items-center"
        to="/"
      >
        <Logo />
        <span class="font-bold text-ellipsis uppercase tracking-widest">BOTS</span>
      </RouterLink>
      <div class="flex items-center justify-end w-full">
        <ThemeSwitch />
      </div>
      <div class="h-full flex items-center justify-end">
        <div class="flex md:hidden items-center h-full justify-end">
          <MobileMenu />
        </div>
        <div class="hidden md:flex items-center h-full w-full justify-end">
          <NavItem v-for="navItem in navItems" :data="navItem" />
          <AuthMenu />
        </div>
      </div>
    </nav>
  </header>
</template>
