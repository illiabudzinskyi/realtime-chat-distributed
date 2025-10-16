import React, { createContext, useContext, useEffect, useState, FC, ReactNode } from "react";
import { User } from "../api/user";

interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthUserContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  // 🧩 Синхронізація між вкладками
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === "auth_user") {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <AuthUserContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error("useAuthUser must be used within AuthUserProvider");
  return context;
};