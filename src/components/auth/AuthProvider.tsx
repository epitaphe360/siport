import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import GoogleAuthService from '../services/googleAuth.ts';
import { useAuthStore } from '../store/authStore';

interface AuthContextType {
  firebaseUser: FirebaseUser | null;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  isInitialized: false
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = React.useState<FirebaseUser | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    // Écouter les changements d'état Firebase
    const unsubscribe = GoogleAuthService.onAuthStateChanged((firebaseUser) => {
      setFirebaseUser(firebaseUser);
      setIsInitialized(true);

      // Si l'utilisateur Firebase est déconnecté mais qu'on a encore un utilisateur local
      if (!firebaseUser && user) {
        logout();
      }
    });

    return () => unsubscribe();
  }, [user, logout]);

  const value = {
    firebaseUser,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};