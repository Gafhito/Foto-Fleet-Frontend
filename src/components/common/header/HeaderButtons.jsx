import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

import { useLoginForm } from '../../../utils/LoginFormContext';
import { colorsHeader} from '../../../utils/constants';

export const HeaderButtons = () => {
  const { openLoginForm } = useLoginForm();

  const handleOpenLoginForm = () => {
    openLoginForm();
  };

  const buttonStyles = {
    variant: "contained",
    color: "primary", // You can change this to "default" or remove it since "default" is the default color.
    sx: {
      backgroundColor: colorsHeader.secondaryColor,
      color: colorsHeader.textColor, // Set the text color explicitly
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: colorsHeader.secondaryColorHover,
        color: colorsHeader.textColor, // Set the hover text color explicitly
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
