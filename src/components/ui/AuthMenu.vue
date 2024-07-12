<script lang="ts">
import { ref, onMounted, toRefs } from 'vue';
import { useAuth } from '@/stores/useAuth';
import { PopupWindow } from '@/lib/Popup';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

export interface IAuthNavItem {
  icon?: string;
  label?: string;
  href?: string;
  command?: () => void;
  separator?: boolean;
}

export default {
  name: 'AuthMenu',
  props: {
    isMobile: Boolean
  },
  setup(props) {
    const { isMobile } = toRefs(props);

    const authStore = useAuth();
    const { isUserAuthenticated, userData } = storeToRefs(authStore);
    const { signIn, signOut } = authStore;

    const isPopupOpen = ref<boolean>(false);
    const userDropdown = ref<any>();

    const authNavItems: IAuthNavItem[] = [
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

    onMounted(async () => await signIn());
    const toogleUserDropdown = (event: any) => userDropdown.value.toggle(event);

    const handlePopupLogin = async () => {
      isPopupOpen.value = true;
      try {
        await PopupWindow('/api/auth/login', 'MDBots - Login');
        signIn();
      } finally {
        isPopupOpen.value = false;
      }
    };

    return {
      isMobile,
      isPopupOpen,
      handlePopupLogin,
      authNavItems,
      signOut,
      userData,
      isUserAuthenticated,
      userDropdown,
      toogleUserDropdown
    };
  }
};
</script>

<template>
  <div v-if="isUserAuthenticated" class="relative h-full w-full">
    <button
      type="button"
      @click="toogleUserDropdown"
      :disabled="isMobile"
      aria-haspopup="true"
      aria-controls="user-dropdown-menu"
      :class="{ 'hover:bg-blue-700 transition-colors !w-full': !isMobile }"
      class="flex items-center justify-between min-w-48 h-full bg-blue-600"
    >
      <div
        :class="{ '!py-0 !px-4': !isMobile }"
        class="flex items-center justify-start p-2 gap-2 capitalize text-white font-semibold text-sm"
      >
        <Image :src="userData.avatarUrl" imageClass="rounded-md" class="w-8 h-8" />
        {{ userData.username.slice(0, 15) }}
      </div>
      <div
        :class="{ hidden: isMobile }"
        class="w-auto h-full px-4 flex items-center justify-center bg-blue-900"
      >
        <v-icon name="md-keyboardarrowdown-round" class="text-white/80 h-5 w-5" />
      </div>
    </button>
    <Menu
      ref="userDropdown"
      appendTo="nav"
      class="!top-[45px] min-w-48 max-w-48 p-2 bg-[#232323] shadow-md rounded-b-md border-[0.5px] border-white/5"
      id="user-dropdown-menu"
      :model="authNavItems"
      :unstyled="true"
      :popup="true"
    >
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.href" v-slot="{ href, navigate }" :to="item.href" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <div
              class="flex items-center text-white w-full mt-[0.5px] p-2 space-x-2 text-sm hover:bg-black/20 rounded-md"
            >
              <v-icon v-if="item.icon" :name="item.icon" />
              <span>{{ item.label }}</span>
            </div>
          </a>
        </router-link>
        <a
          v-else
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="cursor-pointer"
        >
          <div
            class="flex items-center text-white w-full mt-0.5 p-2 space-x-2 text-sm hover:bg-black/20 font-medium rounded-md transition-colors"
          >
            <v-icon v-if="item.icon" :name="item.icon" />
            <span>{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
          </div>
        </a>
      </template>
      <template #end>
        <div class="w-full h-[0.5px] mt-1 mb-2 bg-white/10 rounded-full" />
        <button
          @click="signOut()"
          class="flex items-center w-full p-2 text-white space-x-2 text-sm bg-red-500/80 hover:bg-red-500/100 font-medium rounded-md transition-colors"
        >
          <v-icon name="md-logout-outlined" />
          <span>Deslogar</span>
        </button>
      </template>
    </Menu>
  </div>
  <button
    v-else
    :disabled="isPopupOpen"
    @click="handlePopupLogin"
    class="!min-w-48 h-full text-white bg-blue-600 disabled:bg-blue-600 hover:bg-blue-700 flex items-center justify-center py-6 md:py-0 px-0 md:px-6 font-semibold text-sm transition-colors"
  >
    <template v-if="!isPopupOpen">Entrar com o Discord</template>
    <span v-else class="loading loading-spinner loading-xs text-white/40" />
  </button>
</template>
