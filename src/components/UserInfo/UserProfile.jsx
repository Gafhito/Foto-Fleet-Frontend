import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/AuthContext';

export const UserProfile = () => {
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, [getUserData]);


  const formattedRegistrationDate = userData
    ? new Date(userData.registrationDate).toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      })
    : '';



  console.log('userData del PROFILE: ', userData)

  return (
    <div style={{ 
        minHeight: '95vh',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'}}>

      <p>Nombre: {userData?.firstName}</p>
      <p>Apellido: {userData?.lastName}</p>
      <p>Email: {userData?.email}</p>
      <p>Direccion: {userData?.address}</p>
      <p>Telefono: {userData?.phone}</p>
      <p>Miembro desde: {formattedRegistrationDate}</p>

    </div>
  );
};
