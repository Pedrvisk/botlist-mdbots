import { defineStore } from 'pinia';

interface UserData {
  id: string;
  username: string;
  avatarUrl: string;
}

interface AuthState {
  isUserAuthenticated: boolean;
  userData: UserData;
}

const useAuth = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    isUserAuthenticated: false,
    userData: {
      id: '',
      username: '',
      avatarUrl: ''
    }
  }),
  actions: {
    async signIn(): Promise<void> {
      const res = await this.verifyToken();
      this.isUserAuthenticated = res;
      if (!this.isUserAuthenticated) return;
      this.fetchUserData();
    },
    async signOut(): Promise<void> {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST'
        });

        if (!res.ok) throw new Error('Failed to logout');

        this.isUserAuthenticated = false;
        this.userData = {
          id: '',
          username: '',
          avatarUrl: ''
        };
      } catch (err) {
        console.error(err);
      }
    },
    async fetchUserData(): Promise<void> {
      if (this.isUserAuthenticated) {
        try {
          const res = await fetch('/api/me/profile', {
            method: 'GET'
          });

          if (!res.ok) throw new Error('Failed to fetch User data');
          const userData: UserData = await res.json();

          this.userData = userData;
        } catch (err) {
          console.error(err);
        }
      }
    },
    async verifyToken(): Promise<boolean> {
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST'
        });

        return res.ok;
      } catch {
        return false;
      }
    }
  }
});

export { useAuth };
