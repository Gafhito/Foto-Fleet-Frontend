import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFavorties, setUserFavorties] = useState([]);



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

  const registerUser = (userData) => {
    return fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/auth/register/user', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId) {
          return data;
        } else {
          console.error('Error al registrar usuario:', data.error);
          throw new Error('Registro de usuario fallido. Verifica los datos proporcionados.');
        }
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        throw error;
      });
  };


  const getUserData = async () => {
    const token = user ? user.token : null;

    if (!token) {
      return null;
    }

    try {
      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        return userData;
      } else {
        console.error('Error al obtener datos del usuario:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  };

// EL GETCATEGORIES ESTA DE ATREVIDA ACA - CAMBIARLO DE RUTA HACIA PRODUCTCONTEXT
  const getCategories = async () => {
    /*const token = user ? user.token : null;

    if (!token) {1
      console.log('no hay token')
      return [];
    }*/

    try {
      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/categories'/*, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }*/);

      if (response.status === 200) {
        const categories = await response.json();
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



  const updateUserRole = async (email, newRole) => {
    const token = user ? user.token : null;
  
    if (!token) {
      console.log('No hay token');
      return null;
    }
  
    try {
      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          email,
          rol: newRole,
        }),
      });
  
      if (response.status === 200) {
        console.log('Rol del usuario actualizado exitosamente');
        return true;
      } else {
        console.error('Error al actualizar el rol del usuario:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error);
      console.log('DATOS ENVIADOS: ', email, newRole);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setIsLoggedIn, isLoggedIn, getCategories, getUserData, registerUser, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}