import { defineStore } from 'pinia';

interface MobileState {
  isMobileOpen: boolean;
  isLoginOpen: boolean;
}

const useStates = defineStore({
  id: 'states',
  state: (): MobileState => ({
    isMobileOpen: false,
    isLoginOpen: false
  }),
  actions: {
    onMobileOpenChange(): boolean {
      return (this.isMobileOpen = !this.isMobileOpen);
    },
    onLoginOpenChange(): boolean {
      return (this.isLoginOpen = !this.isLoginOpen);
    }
  }
});

export { useStates };
