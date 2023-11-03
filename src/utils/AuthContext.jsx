import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /*useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      setUser((prevUser) => ({
        role: storedUser
      }));
      console.log('en el primer UE');
      console.log('storedToken: ' + storedToken);
      console.log('storedUser: ' + storedUser);
      console.log('User: ' + user)
    }
    setLoading(false);
  }, []);*/

  useEffect(() => {
    console.log('User al inicio de sesión:', user);
    console.log(localStorage.getItem('token'));
  }, [user]);

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
          setUser(data);
          console.log('User Data: ' + data)
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('user', data.rol)
        } else {
          console.error('Error al iniciar sesión:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}