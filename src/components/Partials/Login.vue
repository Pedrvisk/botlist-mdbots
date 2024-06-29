<script lang="ts">
import Dropdown from '@/components/MdUI/Dropdown.vue';
import { useAuth } from '@/stores/useAuth';
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Popup } from '@/lib/Popup';

interface UserItems {
  icon?: string;
  label?: string;
  href?: string;
  separator?: boolean;
}

export default {
  name: 'Login',
  components: {
    Dropdown
  },
  methods: {
    handleLoginEvent() {
      this.isLoading = true;
      Popup('/api/auth/login', 'MDBots - Login').then(() => {
        this.isLoading = false;
        this.login();
      });
    }
  },
  setup() {
    const isLoading = ref<boolean>(false);

    const loginDropdown = ref<any>();
    const onChangeLoginDropdown = (event: any) => loginDropdown.value.toggle(event);

    const auth = useAuth();
    const { isAuthenticated, user } = storeToRefs(auth);
    const { login, logout } = auth;

    const userItems = ref<UserItems[]>([
      {
        icon: 'md-dashboard-round',
        label: 'Início',
        href: '/'
      },
      {
        icon: 'oi-search',
        label: 'Descobrir',
        href: '/search'
      },
      {
        separator: true
      }
    ]);

    onMounted(async () => {
      await login();
    });

    return {
      userItems,
      isLoading,
      login,
      logout,
      user,
      isAuthenticated,
      onChangeLoginDropdown
    };
  }
};
</script>

<template>
  <div v-if="isAuthenticated" class="relative h-auto md:h-full w-full">
    <Button
      type="button"
      label="Toggle"
      @click="onChangeLoginDropdown"
      aria-haspopup="true"
      aria-controls="login_dropdown_menu"
      class="flex items-center justify-between w-full md:min-w-48 h-full bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      <div
        class="flex items-center justify-start gap-2 capitalize text-white font-semibold text-sm py-6 md:py-0 px-6 md:px-4"
      >
        <img alt="Navbar Discord User Avatar" :src="user.avatarUrl" class="rounded-full w-8 h-8" />
        {{ user.username.slice(0, 15) }}
      </div>
      <div class="w-auto h-full px-4 flex items-center justify-center bg-blue-900">
        <v-icon name="md-keyboardarrowdown-round" class="text-white/80 h-5 w-5" />
      </div>
    </Button>
    <TieredMenu ref="menu" id="login_dropdown_menu" :model="userItems" popup />
    <!-- <div
      class="absolute z-10 w-full bg-[#232323] shadow-md max-h-56 overflow-auto rounded-b-md border-[0.5px] border-white/5"
    >
      <RouterLink
        v-for="userLink in userLinks"
        :to="userLink.href"
        class="w-full h-full text-white hover:bg-black/20 dark:hover:bg-black/40 transition-colors"
        active-class="bg-black/10 dark:bg-white/5 text-black/40 dark:text-white pointer-events-none"
      >
        <div class="h-full flex items-center justify-center py-2 gap-2 font-semibold text-sm">
          {{ userLink.label }}
        </div>
      </RouterLink>
      <button
        @click="logout"
        class="text-center bg-red-600 py-2 w-full h-full text-white hover:bg-red-600/80 font-semibold text-sm transition-colors"
        active-class="bg-black/10 dark:bg-white/5 text-black/40 dark:text-white pointer-events-none"
      >
        Deslogar
      </button>
    </div> -->
  </div>
  <button
    v-else
    :disabled="isLoading"
    @click="handleLoginEvent"
    class="!min-w-48 !w-full h-full text-white bg-blue-600 disabled:bg-blue-600 hover:bg-blue-700 flex items-center justify-center py-6 md:py-0 px-0 md:px-6 font-semibold text-sm transition-colors"
  >
    <template v-if="!isLoading">Entrar com o Discord</template>
    <span v-else class="loading loading-spinner loading-xs text-white/40" />
  </button>
</template>
