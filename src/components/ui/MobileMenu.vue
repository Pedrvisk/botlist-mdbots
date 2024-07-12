<script lang="ts">
import NavItem, { type INavItem } from '@/components/ui/NavItem.vue';
import AuthMenu from '@/components/ui/AuthMenu.vue';
import { useAuth } from '@/stores/useAuth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: 'MobileMenu',
  components: {
    AuthMenu,
    NavItem
  },
  setup() {
    const isMobileMenuVisible = ref<boolean>(false);

    const authStore = useAuth();
    const { isUserAuthenticated, userData } = storeToRefs(authStore);
    const { signIn, signOut } = authStore;

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

    const authNavItems: INavItem[] = [
      {
        icon: 'md-dashboard-round',
        label: 'Perfil',
        href: '/'
      },
      {
        icon: 'oi-search',
        label: 'Meus Bots',
        href: '/search'
      }
    ];

    return {
      navItems,
      authNavItems,
      isMobileMenuVisible,
      isUserAuthenticated,
      signOut
    };
  }
};
</script>
<template>
  <button
    type="button"
    @click="isMobileMenuVisible = true"
    class="flex items-center justify-center h-full min-w-14 bg-[#232323]"
  >
    <v-icon name="md-menu-round" class="w-8 h-8 text-white" />
  </button>
  <Transition
    v-show="isMobileMenuVisible"
    enter-active-class="duration-200 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
    class="bg-[#191919] h-full w-full flex flex-col z-[500] fixed top-0 left-0 bottom-0 right-0"
  >
    <div>
      <div
        class="bg-white dark:bg-[#141414] border-b-[0.5px] border-b-black/20 dark:border-b-white/5 !py-0 !h-12 w-full flex items-center justify-between"
      >
        <AuthMenu :isMobile="true" />
        <button
          type="button"
          @click="isMobileMenuVisible = false"
          class="flex items-center justify-center h-full min-w-14 bg-[#232323]"
        >
          <v-icon name="io-close" class="w-8 h-8 text-red-500" />
        </button>
      </div>
      <div class="bg-[#F7F4F3] dark:bg-[#191919] grow py-2 px-4 overflow-auto">
        <div class="mb-4 !space-y-2">
          <NavItem
            v-for="navItem in navItems"
            :data="navItem"
            :isMobile="true"
            @click="isMobileMenuVisible = false"
          />
        </div>
        <div class="w-full flex items-center gap-2">
          <span
            class="text-xs text-gray-300 font-black uppercase text-ellipsis tracking-widest whitespace-nowrap"
            >Painel de Controle</span
          >
          <div class="w-full bg-black/20 dark:bg-white/5 h-0.5 rounded-full" />
        </div>
        <div v-if="isUserAuthenticated" class="my-4 !space-y-2">
          <NavItem
            v-for="authNavItem in authNavItems"
            :data="authNavItem"
            :isMobile="true"
            @click="isMobileMenuVisible = false"
          />
          <button
            @click="signOut()"
            class="flex items-center w-full p-3 text-white space-x-2 text-sm bg-red-500/80 hover:bg-red-500/100 font-medium rounded-sm transition-colors"
          >
            <v-icon name="md-logout-outlined" />
            <span>Deslogar</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
