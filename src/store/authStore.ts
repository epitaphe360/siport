import { create } from 'zustand';
import { User } from '../types';
import GoogleAuthService from '../services/googleAuth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isGoogleLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      let mockUser: User;
      
      // Créer un utilisateur selon l'email de connexion
      if (email === 'admin@siports.com') {
        mockUser = {
          id: 'admin1',
          email,
          name: 'Admin SIPORTS',
          type: 'admin',
          profile: {
            firstName: 'Admin',
            lastName: 'SIPORTS',
            company: 'SIPORTS Organization',
            position: 'Administrateur Système',
            country: 'Morocco',
            phone: '+212 5 23 45 67 89',
            bio: 'Administrateur de la plateforme SIPORTS 2026',
            interests: ['System Management', 'User Administration', 'Platform Security'],
            objectives: ['Manage platform', 'Ensure security', 'Monitor performance']
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } else if (email === 'partenaire@siports.com') {
        mockUser = {
          id: 'partner1',
          email,
          name: 'Partenaire SIPORTS',
          type: 'partner',
          profile: {
            firstName: 'Marie',
            lastName: 'Dubois',
            company: 'Autorité Portuaire de Casablanca',
            position: 'Directrice Partenariats',
            country: 'Morocco',
            phone: '+212 5 22 12 34 56',
            bio: 'Responsable des partenariats stratégiques pour SIPORTS 2026',
            interests: ['Strategic Partnerships', 'Port Development', 'International Cooperation'],
            objectives: ['Develop partnerships', 'Promote collaboration', 'Expand network']
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } else if (email === 'visiteur@siports.com') {
        mockUser = {
          id: 'visitor1',
          email,
          name: 'Visiteur SIPORTS',
          type: 'visitor',
          profile: {
            firstName: 'Pierre',
            lastName: 'Martin',
            company: 'Maritime Consulting',
            position: 'Consultant Senior',
            country: 'France',
            phone: '+33 1 23 45 67 89',
            bio: 'Consultant spécialisé en solutions portuaires',
            interests: ['Port Operations', 'Technology', 'Consulting'],
            objectives: ['Find suppliers', 'Network', 'Learn best practices']
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } else {
        // Utilisateur exposant par défaut
        mockUser = {
          id: 'exhibitor1',
          email,
          name: 'Exposant SIPORTS',
          type: 'exhibitor',
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            company: 'Port Solutions Inc.',
            position: 'CEO',
            country: 'Morocco',
            phone: '+212 6 12 34 56 78',
            linkedin: 'https://linkedin.com/in/johndoe',
            website: 'https://portsolutions.com',
            bio: 'Expert in port management and logistics solutions',
            interests: ['Port Operations', 'Digital Transformation', 'Sustainability'],
            objectives: ['Find new partners', 'Showcase innovations', 'Network with industry leaders']
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loginWithGoogle: async () => {
    set({ isGoogleLoading: true });
    try {
      const user = await GoogleAuthService.signInWithGoogle();
      set({ 
        user, 
        isAuthenticated: true, 
        isGoogleLoading: false 
      });
    } catch (error: any) {
      set({ isGoogleLoading: false });
      throw new Error(error.message || 'Erreur lors de la connexion Google');
    }
  },

  logout: () => {
    // Déconnexion Google si connecté via Google
    if (GoogleAuthService.isAuthenticated()) {
      GoogleAuthService.signOut();
    }
    set({ user: null, isAuthenticated: false });
  },

  register: async (userData: any) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateProfile: async (profileData: any) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profileData },
        updatedAt: new Date()
      };

      set({ user: updatedUser, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));