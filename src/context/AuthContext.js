// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // “Base de datos” mínima guardada en localStorage
  const [db, setDb] = useState(() => {
    try {
      const raw = localStorage.getItem("auth_db");
      return raw ? JSON.parse(raw) : []; // [{email, password, name}]
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("auth_db", JSON.stringify(db));
  }, [db]);

  const register = async ({ name, email, password }) => {
    // valida duplicados simples
    if (db.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Ese correo ya está registrado.");
    }
    const newUser = { name, email, password };
    setDb(prev => [...prev, newUser]);
    setUser({ name, email }); // Inicia sesión tras registro
    return { ok: true };
  };

  const login = async ({ email, password }) => {
    const found = db.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      throw new Error("Credenciales inválidas.");
    }
    setUser({ name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, register, login, logout }), [user, db]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Ayuda a detectar si olvidaste envolver con el provider
    throw new Error("useAuth debe usarse dentro de <AuthProvider>.");
  }
  return ctx;
}
