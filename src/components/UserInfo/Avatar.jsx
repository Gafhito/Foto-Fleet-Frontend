import { useState, useEffect } from 'react';
import { Avatar as MuiAvatar, Tooltip } from '@mui/material';

import { useAuth } from '../../utils/AuthContext';

import { colors } from '../../utils/constants';

export const Avatar = ({ onClick }) => {
    const { user, getUserData } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          const data = await getUserData();
          setUserData(data);
        };
    
        fetchUserData();
      }, [getUserData]);



    const role = user && user.role;
    console.log(' Avatar role:' + role)
    
    // Verificar si userData existe antes de acceder a sus propiedades
    const userInitial = userData
      ? (
          (userData.firstName && userData.firstName.charAt(0).toUpperCase()) +
          (userData.lastName && userData.lastName.charAt(0).toUpperCase())
        )
      : '';
    
    const userName = userData && userData.firstName + ' ' + userData.lastName;


    return (
        <Tooltip title={userName}>
            <MuiAvatar
                className="avatar"
                onClick={onClick}
                sx={{ cursor: 'pointer', backgroundColor:colors.primaryColor, color:colors.blackColor }}
            >
                {userInitial}
            </MuiAvatar>
        </Tooltip>
    );
}