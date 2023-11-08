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

    if (storedToken) {
      setUser({ role: storedUser, token: storedToken });
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    return fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          setUser({ role: data.rol, token: data.accessToken }); // Agregamos el campo 'token' al objeto user
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


  const getCategories = async () => {
    const token = user ? user.token : null;

    if (!token) {
      console.log('no hay token')
      return [];
    }

    try {
      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/categories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const categories = await response.json();
        console.log('categories del Auth: ', categories)
        return categories;
      } else {
        console.error('Error al obtener las categorías:', response.status, response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, getCategories }}>
      {children}
    </AuthContext.Provider>
  );
}