// NavBar.jsx

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { NavLinks } from './NavLinks';
import { HeaderButtons } from './HeaderButtons';
import { useAuth } from '../../../utils/AuthContext';
import { Avatar } from '../../UserInfo/Avatar';
import { UserMenu } from '../../UserInfo/UserMenu';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/perfil');
    handleClose();
  };

  const handleLogoutClick = () => {
    // Manejar el cierre de sesión
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { sm: 'space-between', md: 'space-around' }, width: { lg: '65%', sm: '85%' } }}>
      <NavLinks />
      <Box sx={{ display: 'flex' }}>
        {user ? (
          <div>
            <Avatar onClick={handleClick} />
            <UserMenu anchorEl={anchorEl} onClose={handleClose} onProfileClick={handleProfileClick} onLogoutClick={handleLogoutClick} />
          </div>
        ) : (
          <HeaderButtons />
        )}
      </Box>
    </Box>
  );
};