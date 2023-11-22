import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useLoginForm } from '../../../utils/LoginFormContext';
import { colorsHeader, colors } from '../../../utils/constants';


export const HeaderButtons = () => {
  const { openLoginForm, setRegisterMode, setLoginMode, isRegisterMode } = useLoginForm();

  const handleOpenLoginForm = () => {
    setRegisterMode();
    openLoginForm();
  };

  const buttonStyles = {
    variant: "contained",
    color: "primary", 
    sx: {
      backgroundColor: colors.primaryColor, //colorsHeader.secondaryColorHover,
      color:'#000000',
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: colors.primaryColorHover,
        color: colors.whiteColor
      },
      whiteSpace: 'nowrap',
    },
  };
  

  const buttonStylesCreateAccount = {
    ...buttonStyles,
    sx: {
      ...buttonStyles.sx,
      color:'#000000',
      backgroundColor: colors.terciaryColor, //colorsHeader.primaryColor,
      '&:hover': {
        backgroundColor: colors.terciaryColorHover,
        color:'#ffffff'
      },
    },
  };

  return (
    <Box display="flex" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
      <Link to="/auth/login" style={{ textDecoration: 'none' }}>
        <Button
          {...buttonStyles}
          onClick={() => setLoginMode()}
        >
          Iniciar Sesión
        </Button>
      </Link>
      <Box sx={{ marginLeft: '16px' }}> {/* Agrega un espacio entre los botones */}
        <Link to="/auth/login" style={{ textDecoration: 'none' }}>
          <Button
            {...buttonStylesCreateAccount}
            onClick={handleOpenLoginForm}
          >
            Crear Cuenta
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
