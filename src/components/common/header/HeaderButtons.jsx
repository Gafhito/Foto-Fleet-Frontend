import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

import { useLoginForm } from '../../../utils/LoginFormContext';
import { colors } from '../../../utils/constants';

export const HeaderButtons = () => {
  const { openLoginForm } = useLoginForm();

  const handleOpenLoginForm = () => {
    openLoginForm();
  };

  const buttonStyles = {
    variant: "contained",
    color: "primary",
    sx: {
      backgroundColor: colors.secondaryColor,
      color: colors.textColor,
      padding: '8px 16px', // Ajusta el espaciado interno y reduce el tamaño
      '&:hover': {
        backgroundColor: colors.secondaryColorHover,
      },
      whiteSpace: 'nowrap', // Evita que el texto se divida en múltiples líneas
    },
  };

  const buttonStylesCreateAccount = {
    ...buttonStyles,
    sx: {
      ...buttonStyles.sx,
      backgroundColor: colors.primaryColor,
      '&:hover': {
        backgroundColor: colors.primaryColorHover,
      },
    },
  };

  return (
    <Box display="flex" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
      <Link to="/auth/login" style={{ textDecoration: 'none' }}>
        <Button
          {...buttonStyles}
          onClick={handleOpenLoginForm}
        >
          Iniciar Sesión
        </Button>
      </Link>
      <Box sx={{ marginLeft: '16px' }}> {/* Agrega un espacio entre los botones */}
        <Link to="/auth/register" style={{ textDecoration: 'none' }}>
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
