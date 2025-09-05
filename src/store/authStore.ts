import { create } from 'zustand';

// 1. Définir le "shape" (la structure) de votre store
interface AuthState {
  // Define your auth state properties here
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Define your actions here
  login: (user: any, token: string) => void;
  logout: () => void;
  setUser: (user: any) => void;
}

// 2. Créer le store avec Zustand
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: (user, token) => set(() => ({
    user,
    token,
    isAuthenticated: true
  })),
  
  logout: () => set(() => ({
    user: null,
    token: null,
    isAuthenticated: false
  })),
  
  setUser: (user) => set((state) => ({
    ...state,
    user
  }))
}));

export default useAuthStore;