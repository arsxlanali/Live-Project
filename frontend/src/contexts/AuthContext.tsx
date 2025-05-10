
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import type { User } from "@/store/slices/authSlice";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const reduxAuth = useAppSelector(state => state.auth);

  useEffect(() => {
    // Check if user is authenticated from localStorage or Redux store
    const authenticated = localStorage.getItem("authenticated") === "true" || !!reduxAuth.token;
    console.log("Authenticated from Redux:", authenticated);
    setIsAuthenticated(authenticated);
  }, [reduxAuth.token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const authenticated = !!storedToken;
    setIsAuthenticated(authenticated);
  }, []);

  const login = () => {
    localStorage.setItem("authenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authenticated");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
