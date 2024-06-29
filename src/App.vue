<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingScreen from '@/components/LoadingScreen.vue';
import Header from '@/components/Partials/Header.vue';
import Footer from '@/components/Partials/Footer.vue';
</script>

<template>
  <LoadingScreen />
  <Header />
  <main class="flex grow w-full container-layout px-4 md:py-8 sm:px-4 md:px-6">
    <RouterView />
  </main>
  <Footer />
</template>
