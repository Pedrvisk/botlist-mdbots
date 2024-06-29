import './assets/global.css';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { VueMasonryPlugin } from 'vue-masonry';
import Aura from '@primevue/themes/aura';
import TieredMenu from 'primevue/tieredmenu';
import PrimeVue from 'primevue/config';

import {
  MdDashboardRound,
  OiSearch,
  FaDiscord,
  FaGithubAlt,
  MdMenuRound,
  IoClose,
  MdKeyboardarrowdownRound,
  MdFibernewOutlined
} from 'oh-vue-icons/icons';

addIcons(
  MdDashboardRound,
  OiSearch,
  FaDiscord,
  FaGithubAlt,
  MdKeyboardarrowdownRound,
  MdMenuRound,
  IoClose,
  MdFibernewOutlined
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
    preset: Aura
  }
});
app.component('TieredMenu', TieredMenu);

app.mount('#app');
