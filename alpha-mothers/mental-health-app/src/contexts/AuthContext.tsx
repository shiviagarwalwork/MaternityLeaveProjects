// AuthContext - Firebase Authentication Context for AlphaMa
// Provides authentication state and methods throughout the app

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, UseAuthReturn } from '../hooks/useAuth';

// Create the context with undefined default
const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuthContext(): UseAuthReturn {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}

// Export types
export type { UseAuthReturn };
