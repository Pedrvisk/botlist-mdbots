<script lang="ts">
import AuthMenu from '@/components/ui/AuthMenu.vue';
import NavItem from '@/components/ui/NavItem.vue';
import { useAuth } from '@/stores/useAuth';
import Logo from '@/assets/Logo.vue';
import Links from '@/router/routerLinks';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: 'MobileMenu',
  components: {
    AuthMenu,
    NavItem,
    Logo
  },
  setup() {
    const isMobileMenuVisible = ref<boolean>(false);

    const authStore = useAuth();
    const { isUserAuthenticated } = storeToRefs(authStore);
    const { signOut } = authStore;

    return {
      navItems: Links.Navbar,
      authNavItems: Links.Auth,
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
  >
    <div
      class="bg-[#191919] h-screen w-screen flex flex-col z-[500] fixed top-0 left-0 bottom-0 right-0"
    >
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
      <div class="bg-[#F7F4F3] dark:bg-[#191919] flex flex-col grow py-2 px-4 overflow-y-auto">
        <div class="mb-2 !space-y-2">
          <NavItem
            v-for="navItem in navItems"
            :data="navItem"
            :isMobile="true"
            @click="isMobileMenuVisible = false"
          />
        </div>
        <div class="w-full flex items-center">
          <span class="text-xs font-black uppercase text-ellipsis tracking-widest whitespace-nowrap"
            >Painel de Controle</span
          >
          <div class="w-full bg-black/20 dark:bg-white/5 h-0.5 rounded-full" />
        </div>
        <div v-if="isUserAuthenticated" class="mt-4 mb-2 !space-y-2">
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
        <div
          v-else
          class="mt-4 mb-2 rounded-sm text-center bg-black/20 grow flex items-center justify-center"
        >
          <h3 class="px-7 font-medium dark:text-white/90 text-ellipsis text-pretty text-sm">
            Entre com o Discord para ter acesso ao Painel de Controle!
          </h3>
        </div>
      </div>
      <div
        class="bg-white dark:bg-[#141414] border-t-[0.5px] border-t-black/20 dark:border-t-white/5 px-4 py-3 w-full flex items-center justify-center text-xs"
      >
        <span
          class="drop-shadow-[0px_0px_1px_black] dark:drop-shadow-[0px_0px_1px_white] font-bold text-ellipsis uppercase tracking-wider"
        >
          MD Community
        </span>
      </div>
    </div>
  </Transition>
</template>
