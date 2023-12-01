
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; 

const RentalContext = createContext();

export const useRentalContext = () => useContext(RentalContext);

export const RentalProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserData, user } = useAuth(); 

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const userData = await getUserData();

        const token = user ? user.token : null;

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/user/rentals', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setRentals(data);
          setLoading(false);
        } else {
          console.error('Error al obtener las reservas:', response.status, response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
        setLoading(false);
      }
    };

    fetchRentals();
  }, [getUserData]);

  return (
    <RentalContext.Provider value={{ rentals, loading }}>
      {children}
    </RentalContext.Provider>
  );
};
