import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [ready, setReady]             = useState(false);

  // Intenta restaurar la sesión desde la cookie de refresh token al montar
  useEffect(() => {
    authApi.refresh()
      .then(async (data) => {
        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          const me = await authApi.getMe(data.accessToken);
          setUser(me);
        }
      })
      .finally(() => setReady(true));
  }, []);

  async function login(email, password) {
    const data = await authApi.login(email, password);
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data.user;
  }

  async function register(name, email, password) {
    const data = await authApi.register(name, email, password);
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    if (accessToken) await authApi.logout(accessToken);
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
