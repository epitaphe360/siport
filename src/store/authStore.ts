import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import GoogleAuthService from '../services/googleAuth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  registeredUsers: User[];
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
  activateUser: (userId: string) => Promise<void>;
  getPendingUsers: () => User[];
  getUserById: (userId: string) => User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isGoogleLoading: false,
  registeredUsers: [],

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // D'abord, vérifier dans les utilisateurs enregistrés
      const { registeredUsers } = get();
      const registeredUser = registeredUsers.find(u => u.email === email);
      
      if (registeredUser) {
        // Vérifier le statut du compte
        if (registeredUser.status === 'pending') {
          set({ isLoading: false });
          throw new Error('Votre compte est en attente de validation par l\'administrateur');
        }
        
        if (registeredUser.status === 'suspended') {
          set({ isLoading: false });
          throw new Error('Votre compte a été suspendu. Contactez l\'administrateur');
        }
        
        if (registeredUser.status === 'rejected') {
          set({ isLoading: false });
          throw new Error('Votre demande d\'inscription a été rejetée');
        }
        
        // Compte actif - connexion réussie
        set({ user: registeredUser, isAuthenticated: true, isLoading: false });
        return;
      }
      
      // Mock user data
      let mockUser: User;
      
      // Créer un utilisateur selon l'email de connexion
      if (email === 'admin@siports.com') {
        mockUser = {
          id: 'admin1',
          email,
          name: 'Admin SIPORTS',
          type: 'admin',
          status: 'active',
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
          status: 'active',
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
          status: 'active',
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
          status: 'active',
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
      
      // Créer le nouvel utilisateur
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        type: userData.accountType,
        status: 'pending', // Nouveau compte en attente de validation
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
          objectives: userData.objectives || [],
          companyDescription: userData.description,
          sectors: [userData.sector],
          products: [],
          videos: [],
          images: [],
          participationObjectives: userData.objectives || [],
          thematicInterests: [],
          companySize: userData.employeeCount,
          geographicLocation: userData.country,
          collaborationTypes: userData.partnershipTypes || [],
          expertise: []
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Ajouter à la liste des utilisateurs enregistrés
      const { registeredUsers } = get();
      set({ 
        registeredUsers: [...registeredUsers, newUser],
        isLoading: false 
      });
      
      // Simulation d'envoi d'email
      console.log('📧 Email de confirmation envoyé à:', userData.email);
      
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profileData },
        updatedAt: new Date()
      };

      // Mettre à jour dans la liste des utilisateurs enregistrés
      const { registeredUsers } = get();
      const updatedRegisteredUsers = registeredUsers.map(u => 
        u.id === user.id ? updatedUser : u
      );
      
      set({ 
        user: updatedUser, 
        registeredUsers: updatedRegisteredUsers,
        isLoading: false 
      });
      set({ user: updatedUser, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  activateUser: async (userId: string) => {
    const { registeredUsers } = get();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUsers = registeredUsers.map(user => 
        user.id === userId 
          ? { ...user, status: 'active' as const, updatedAt: new Date() }
          : user
      );
      
      set({ registeredUsers: updatedUsers });
      
      // Simulation d'envoi d'email d'activation
      const activatedUser = updatedUsers.find(u => u.id === userId);
      if (activatedUser) {
        console.log('📧 Email d\'activation envoyé à:', activatedUser.email);
      }
      
    } catch (error) {
      throw error;
    }
  },

  getPendingUsers: () => {
    const { registeredUsers } = get();
    return registeredUsers.filter(user => user.status === 'pending');
  },

  getUserById: (userId: string) => {
    const { registeredUsers } = get();
    return registeredUsers.find(user => user.id === userId) || null;
  }
}),
{
  name: 'siports-auth-storage',
  partialize: (state) => ({ 
    registeredUsers: state.registeredUsers 
  })
}
)