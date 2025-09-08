import { create } from 'zustand';
import { SupabaseService } from '../services/supabaseService';
import GoogleAuthService from '../services/googleAuth';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  updateProfile: (profileData: any) => Promise<void>;
}

// Mock users pour la démonstration
const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@siports.com',
    name: 'Admin SIPORTS',
    type: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'SIPORTS',
      company: 'SIPORTS Organization',
      position: 'Administrateur',
      country: 'Morocco',
      bio: 'Administrateur de la plateforme SIPORTS 2026',
      interests: [],
      objectives: []
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  },
  {
    id: 'exhibitor-1',
    email: 'exposant@siports.com',
    name: 'Sarah Johnson',
    type: 'exhibitor',
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      company: 'Port Solutions Inc.',
      position: 'CEO',
      country: 'Netherlands',
      bio: 'Expert en solutions portuaires',
      interests: ['Port Operations', 'Digital Transformation'],
      objectives: ['Showcase innovations', 'Find partners']
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: 'partner-1',
    email: 'partenaire@siports.com',
    name: 'Ahmed El Mansouri',
    type: 'partner',
    profile: {
      firstName: 'Ahmed',
      lastName: 'El Mansouri',
      company: 'Autorité Portuaire Casablanca',
      position: 'Directeur Technique',
      country: 'Morocco',
      bio: 'Directeur technique avec expertise portuaire',
      interests: ['Infrastructure', 'Sustainability'],
      objectives: ['International cooperation', 'Technology adoption']
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date()
  },
  {
    id: 'visitor-1',
    email: 'visiteur@siports.com',
    name: 'Marie Dubois',
    type: 'visitor',
    profile: {
      firstName: 'Marie',
      lastName: 'Dubois',
      company: 'Maritime Consulting France',
      position: 'Consultante Senior',
      country: 'France',
      bio: 'Consultante en solutions maritimes',
      interests: ['Consulting', 'Innovation'],
      objectives: ['Find suppliers', 'Technology scouting']
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date()
  }
];
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isGoogleLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      // Pour la démo, vérifier les comptes de test
      const mockUser = mockUsers.find(u => u.email === email);
      
      if (mockUser && password === 'demo123') {
        set({ 
          user: mockUser, 
          token: 'mock-token', 
          isAuthenticated: true,
          isLoading: false 
        });
        return;
      }
      
      // Essayer de récupérer l'utilisateur depuis Supabase
      const user = await SupabaseService.getUserByEmail(email);
      
      if (user) {
        set({ 
          user, 
          token: 'supabase-token', 
          isAuthenticated: true,
          isLoading: false 
        });
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: any) => {
    set({ isLoading: true });
    
    try {
      const newUser = await SupabaseService.createUser({
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        type: userData.accountType || 'visitor',
        profile: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          company: userData.companyName,
          position: userData.position,
          country: userData.country,
          phone: userData.phone,
          linkedin: userData.linkedin,
          website: userData.website,
          bio: userData.description,
          interests: [],
          objectives: userData.objectives || []
        }
      });
      
      set({ isLoading: false });
      
      // Ne pas connecter automatiquement, laisser l'utilisateur se connecter
      return newUser;
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
        token: 'google-token', 
        isAuthenticated: true,
        isGoogleLoading: false 
      });
    } catch (error) {
      set({ isGoogleLoading: false });
      throw error;
    }
  },
  
  logout: () => set({ 
    user: null,
    token: null,
    isAuthenticated: false
  }),
  
  setUser: (user) => set({ 
    user
  }),

  updateProfile: async (profileData: any) => {
    const { user } = get();
    if (!user) throw new Error('Utilisateur non connecté');
    
    set({ isLoading: true });
    
    try {
      const updatedUser = await SupabaseService.updateUser(user.id, {
        ...user,
        profile: { ...user.profile, ...profileData }
      });
      
      set({ user: updatedUser, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  }
}));

const useAuthStore = create<AuthState>((set, get) => ({
export { useAuthStore };
export default useAuthStore;