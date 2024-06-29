<script lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import Login from '@/components/Partials/Login.vue';
import { useStates } from '@/stores/useStates';
import { RouterLink } from 'vue-router';
import Logo from '@/assets/Logo.vue';
import { storeToRefs } from 'pinia';

interface navLinks {
  icon: string;
  label: string;
  href: string;
}

export default {
  name: 'Header',
  components: {
    Logo,
    ThemeSwitch,
    Login
  },
  setup() {
    const states = useStates();
    const { isMobileOpen } = storeToRefs(states);
    const { onMobileOpenChange } = states;

    const navLinks: navLinks[] = [
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
      navLinks,
      isMobileOpen,
      onMobileOpenChange
    };
  }
};
</script>

<template>
  <header class="fixed z-[50] left-0 right-0 bg-white dark:bg-[#141414]">
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
          <button @click="onMobileOpenChange" class="bg-black/60 w-14 h-full pt-0.5">
            <template v-if="isMobileOpen">
              <v-icon name="io-close" class="text-red-500 h-10 w-10" />
            </template>
            <template v-else>
              <v-icon name="md-menu-round" class="text-white h-8 w-8" />
            </template>
          </button>
        </div>
        <div class="hidden md:flex items-center h-full w-full justify-end">
          <RouterLink
            v-for="navLink in navLinks"
            :to="navLink.href"
            class="!max-w-fit h-full hover:bg-black/20 dark:hover:bg-white/10 transition-colors"
            active-class="bg-black/10 dark:bg-white/5 text-black/40 dark:text-white/40 pointer-events-none"
          >
            <div
              class="h-full flex items-center whitespace-nowrap justify-center px-6 gap-2 font-semibold text-sm"
            >
              <v-icon :name="navLink.icon" />
              {{ navLink.label }}
            </div>
          </RouterLink>
          <Login />
        </div>
      </div>
    </nav>
    <div
      v-show="isMobileOpen"
      class="h-screen w-full border-t-[1px] border-black/5 dark:border-white/5 border-solid flex flex-col items-start justify-start"
    >
      <RouterLink
        v-for="navLinkMobile in navLinks"
        :to="navLinkMobile.href"
        class="w-full py-6 hover:bg-black/20 dark:hover:bg-white/10 transition-colors"
        active-class="bg-black/10 dark:bg-white/5 text-black/40 dark:text-white/40 pointer-events-none"
        @click="onMobileOpenChange"
      >
        <div class="h-full flex items-center justify-center gap-2 font-semibold text-sm">
          <v-icon :name="navLinkMobile.icon" />
          {{ navLinkMobile.label }}
        </div>
      </RouterLink>
      <Login />
    </div>
  </header>
</template>

<!-- <template>
  <nav class="container-layout !py-0 h-12 w-full flex items-center">
    <MegaMenu
      :model="navbarItems"
      class="!border-0 !p-0 !w-full !flex !items-center !justify-between"
    >
      <template #start>
        <RouterLink
          class="drop-shadow-[0px_0px_2px_black] dark:drop-shadow-[0px_0px_2px_white] h-full w-full flex items-center"
          to="/"
        >
          <Logo />
          <span class="font-bold text-ellipsis uppercase tracking-widest">BOTS</span>
        </RouterLink>
      </template>
      <template #item="{ item }">
        <a
          v-if="item.root"
          v-ripple
          class="flex items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase"
          style="border-radius: 2rem"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
        <a v-else-if="!item.image" class="flex items-center p-3 cursor-pointer mb-2 gap-2">
          <span
            class="inline-flex items-center justify-center rounded-full bg-primary text-primary-inverse w-[3rem] h-[3rem] shrink-0"
          >
            <i :class="[item.icon, 'text-lg']"></i>
          </span>
          <span class="inline-flex flex-col gap-1">
            <span class="font-medium text-lg text-surface-900 dark:text-surface-0">{{
              item.label
            }}</span>
            <span class="whitespace-nowrap">{{ item.subtext }}</span>
          </span>
        </a>
        <div v-else class="flex flex-col items-start gap-3">
          <img alt="megamenu-demo" :src="item.image" class="w-full" />
          <span>{{ item.subtext }}</span>
          <Button :label="item.label" outlined />
        </div>
      </template>
      <template #end class="!p-0 h-full">
        <Login />
      </template>
    </MegaMenu>
  </nav>
</template>

<script lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import Login from '@/components/Partials/Login.vue';
import { useStates } from '@/stores/useStates';
import { RouterLink } from 'vue-router';
import Logo from '@/assets/Logo.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: 'Header',
  components: {
    Logo,
    ThemeSwitch,
    Login
  },
  setup() {
    const states = useStates();
    const { isMobileOpen } = storeToRefs(states);
    const { onMobileOpenChange } = states;

    const navbarItems = ref([
      {
        label: 'Company',
        root: true,
        items: [
          [
            {
              items: [
                { label: 'Features', icon: 'pi pi-list', subtext: 'Subtext of item' },
                { label: 'Customers', icon: 'pi pi-users', subtext: 'Subtext of item' },
                { label: 'Case Studies', icon: 'pi pi-file', subtext: 'Subtext of item' }
              ]
            }
          ],
          [
            {
              items: [
                { label: 'Solutions', icon: 'pi pi-shield', subtext: 'Subtext of item' },
                { label: 'Faq', icon: 'pi pi-question', subtext: 'Subtext of item' },
                { label: 'Library', icon: 'pi pi-search', subtext: 'Subtext of item' }
              ]
            }
          ],
          [
            {
              items: [
                { label: 'Community', icon: 'pi pi-comments', subtext: 'Subtext of item' },
                { label: 'Rewards', icon: 'pi pi-star', subtext: 'Subtext of item' },
                { label: 'Investors', icon: 'pi pi-globe', subtext: 'Subtext of item' }
              ]
            }
          ],
          [
            {
              items: [
                {
                  image: 'https://primefaces.org/cdn/primevue/images/uikit/uikit-system.png',
                  label: 'GET STARTED',
                  subtext: 'Build spectacular apps in no time.'
                }
              ]
            }
          ]
        ]
      },
      {
        label: 'Resources',
        root: true
      },
      {
        label: 'Contact',
        root: true
      }
    ]);

    return {
      navbarItems
    };
  }
};
</script> -->
