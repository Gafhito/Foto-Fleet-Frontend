import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setUser({ role: storedUser });
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    return fetch('http://ec2-35-173-183-241.compute-1.amazonaws.com/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          setUser({ role: data.rol }); // seteamos rol 
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('user', data.rol);
          setIsLoggedIn(true);
          return data; // Tenemos que retornar el objeto user
        } else {
          console.error('Error al iniciar sesión:', data.error);
          throw new Error('Inicio de sesión fallido. Verifica tus credenciales.');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}