import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /*useEffect(() => {
    // Verifica si el token existe en el localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Establece al usuario como autenticado
      setUser({ token: storedToken });
    }
  }, []);*/

  const login = (userData) => {
    fetch('http://ec2-35-173-183-241.compute-1.amazonaws.com/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          // Almacena el token en localStorage
          localStorage.setItem('token', data.accessToken);
          // Establece al usuario como autenticado
          setUser(data);
          console.log('Este es el user: '+data.user)
          setUser({ token: data.accessToken });
        } else {
          console.error('Error al iniciar sesión:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  const logout = () => {
    // Lógica para cerrar sesión y limpiar la información del usuario
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}