<script lang="ts">
import { RouterLink } from 'vue-router';

interface FooterSocialLink {
  icon: string;
  href: string;
}

interface FooterLink {
  label: string;
  name?: string;
  href: string;
  isExternal?: boolean;
}

export default {
  name: 'Footer',
  setup() {
    const footerSocialLinks: FooterSocialLink[] = [
      {
        icon: 'fa-discord',
        href: 'https://discord.com/invite/hFmHrpC8Sc'
      },
      {
        icon: 'fa-github-alt',
        href: 'https://github.com/MD-Community'
      }
    ];

    const footerLinksMenu: FooterLink[] = [
      {
        label: 'Início',
        href: '/'
      },
      {
        label: 'Descobrir',
        href: '/search'
      }
    ];

    const footerLinksDev: FooterLink[] = [
      {
        label: 'Adicionar Bot',
        href: '/bots/add'
      },
      {
        label: 'Documentação',
        href: '/docs'
      }
    ];

    const footerLinksCompany: FooterLink[] = [
      {
        label: 'Termos de Uso',
        href: '/privacy-terms#terms'
      },
      {
        label: 'Políticas de Privacidade',
        href: '/privacy-terms#privacy'
      },
      {
        label: 'Servidor do Discord',
        href: 'https://discord.com/invite/hFmHrpC8Sc'
      },
      {
        label: 'Faça Parte do Projeto',
        href: 'https://discord.com/invite/hFmHrpC8Sc'
      }
    ];

    return {
      footerSocialLinks,
      footerLinksMenu,
      footerLinksDev,
      footerLinksCompany
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
              <RouterLink
                v-for="menuLink in footerLinksMenu"
                :key="menuLink.label"
                :to="menuLink.href"
                class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
              >
                {{ menuLink.label }}
              </RouterLink>
            </div>
          </div>
          <div class="space-y-2">
            <h3 class="text-md font-semibold">Desenvolvedores</h3>
            <div class="flex flex-col gap-1">
              <RouterLink
                v-for="devLink in footerLinksDev.filter((link) => !link.href.startsWith('https'))"
                :key="devLink.label"
                :to="devLink.href"
                class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
              >
                {{ devLink.label }}
              </RouterLink>
              <a
                v-for="externalDevLink in footerLinksDev.filter((link) =>
                  link.href.startsWith('https')
                )"
                :key="externalDevLink.href"
                :href="externalDevLink.href"
                target="_blank"
                class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
              >
                {{ externalDevLink.label }}
              </a>
            </div>
          </div>
          <div class="space-y-2">
            <h3 class="text-md font-semibold">Empresa</h3>
            <div class="flex flex-col gap-1">
              <RouterLink
                v-for="companyLink in footerLinksCompany.filter(
                  (link) => !link.href.startsWith('https')
                )"
                :key="companyLink.label"
                :to="companyLink.href"
                class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
              >
                {{ companyLink.label }}
              </RouterLink>
              <a
                v-for="externalCompanyLink in footerLinksCompany.filter((link) =>
                  link.href.startsWith('https')
                )"
                :key="externalCompanyLink.href"
                :href="externalCompanyLink.href"
                target="_blank"
                class="hover:text-black/60 dark:hover:text-white/80 text-sm transition-colors"
              >
                {{ externalCompanyLink.label }}
              </a>
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
