export interface INavbarLink {
  icon: string;
  label: string;
  href: string;
}

export interface IAuthLink {
  icon: string;
  label: string;
  href: string;
}

export interface IFooterLink {
  label: string;
  name?: string;
  href: string;
  isExternal?: boolean;
}

export interface IFooterSocialLink {
  icon: string;
  href: string;
}

export default {
  Navbar: [
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
  ] as INavbarLink[],
  Auth: [
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
  ] as IAuthLink[],
  Footer: {
    Social: [
      {
        icon: 'fa-discord',
        href: 'https://discord.com/invite/hFmHrpC8Sc'
      },
      {
        icon: 'fa-github-alt',
        href: 'https://github.com/MD-Community'
      }
    ] as IFooterSocialLink[],
    Menu: [
      {
        label: 'Início',
        href: '/'
      },
      {
        label: 'Descobrir',
        href: '/search'
      }
    ] as IFooterLink[],
    Dev: [
      {
        label: 'Adicionar Bot',
        href: '/bots/add'
      },
      {
        label: 'Documentação',
        href: '/docs'
      }
    ] as IFooterLink[],
    Company: [
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
        href: 'https://discord.com/invite/hFmHrpC8Sc',
        isExternal: true
      },
      {
        label: 'Faça Parte do Projeto',
        href: 'https://discord.com/invite/hFmHrpC8Sc',
        isExternal: true
      }
    ] as IFooterLink[]
  }
};
