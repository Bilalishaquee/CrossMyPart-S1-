"use client";

import * as React from "react";

const STORAGE_KEY = "cmp-auth-v1";

export type AuthUser = {
  email: string;
  name: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

function readStored(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed?.email) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setUser(readStored());
    setReady(true);
  }, []);

  const login = React.useCallback((email: string, password: string) => {
    void password;
    const trimmed = email.trim();
    const u: AuthUser = {
      email: trimmed,
      name: trimmed.split("@")[0] || "User",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const signup = React.useCallback((name: string, email: string, password: string) => {
    void password;
    const u: AuthUser = {
      email: email.trim(),
      name: name.trim() || email.trim().split("@")[0] || "User",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, ready, login, signup, logout }),
    [user, ready, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
