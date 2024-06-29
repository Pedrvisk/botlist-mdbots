import { defineStore } from 'pinia';

interface UserData {
  id: string;
  username: string;
  avatarUrl: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData;
}

const useAuth = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    isAuthenticated: false,
    user: {
      id: '',
      username: '',
      avatarUrl: ''
    }
  }),
  actions: {
    async login(): Promise<void> {
      const res = await this.verifyToken();
      this.isAuthenticated = res;
      if (!this.isAuthenticated) return;
      this.fetchUserData();
    },

    async logout(): Promise<void> {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST'
        });

        if (!res.ok) throw new Error('Failed to logout');

        this.isAuthenticated = false;
        this.user = {
          id: '',
          username: '',
          avatarUrl: ''
        };
      } catch (err) {
        console.error(err);
      }
    },
    async fetchUserData(): Promise<void> {
      if (this.isAuthenticated) {
        try {
          const res = await fetch('/api/me/profile', {
            method: 'GET'
          });

          if (!res.ok) throw new Error('Failed to fetch User data');
          const userData: UserData = await res.json();

          this.user = userData;
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
