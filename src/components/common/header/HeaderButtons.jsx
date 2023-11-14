import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useLoginForm } from '../../../utils/LoginFormContext';
import { colorsHeader} from '../../../utils/constants';

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
      backgroundColor: colorsHeader.secondaryColor,
      color: colorsHeader.textColor,
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: colorsHeader.secondaryColorHover,
        color: colorsHeader.textColor,
      },
      whiteSpace: 'nowrap',
    },
  };
  

  const buttonStylesCreateAccount = {
    ...buttonStyles,
    sx: {
      ...buttonStyles.sx,
      backgroundColor: colorsHeader.primaryColor,
      '&:hover': {
        backgroundColor: colorsHeader.primaryColorHover,
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
