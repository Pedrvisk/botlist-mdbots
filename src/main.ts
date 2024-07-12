import './assets/global.css';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { VueMasonryPlugin } from 'vue-masonry';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Image from 'primevue/image';
import Menu from 'primevue/menu';

import {
  MdDashboardRound,
  OiSearch,
  FaDiscord,
  FaGithubAlt,
  MdMenuRound,
  IoClose,
  MdKeyboardarrowdownRound,
  MdFibernewOutlined,
  MdLogoutOutlined
} from 'oh-vue-icons/icons';

addIcons(
  MdDashboardRound,
  OiSearch,
  FaDiscord,
  FaGithubAlt,
  MdKeyboardarrowdownRound,
  MdMenuRound,
  IoClose,
  MdFibernewOutlined,
  MdLogoutOutlined
);

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.component('v-icon', OhVueIcon);
app.use(VueMasonryPlugin);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
});
app.component('Menu', Menu);
app.component('Avatar', Avatar);
app.component('Image', Image);
app.component('Button', Button);

app.mount('#app');
