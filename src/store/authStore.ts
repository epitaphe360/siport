mport { create } from 'zustand';

// 1. Définir le "shape" (la structure) de votre store
interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
}

// 2. Créer le store avec Zustand
const useAuthStore = create<AuthState>((set) => ({
  // État initial
  isAuthenticated: false,
  user: null,

  // Actions pour modifier l'état
  login: (userData) => set({
    isAuthenticated: true,
    user: userData,
  }),

  logout: () => set({
    isAuthenticated: false,
    user: null,
  }),
}));

export default useAuthStore