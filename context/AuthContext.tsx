"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 THIS RUNS ON APP LOAD
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();

      setUser(data.user); // 🔥 THIS CONTROLS EVERYTHING
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔥 custom hook
export const useAuth = () => useContext(AuthContext);