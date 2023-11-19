import { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Modal } from '@mui/material';
import { Button } from '../common/button/Button';
import { ConfirmationModal } from '../common/confirmationModal/confirmationModal';
import { useAuth } from '../../utils/AuthContext';
import { colors } from '../../utils/constants';

export const ManageRolesModal = ({ open, onClose }) => {
  const { updateUserRole } = useAuth();
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  const handleConfirmClick = async () => {
    try {
      // Utiliza la función updateUserRole para modificar el rol
      const success = await updateUserRole(email, rol);

      if (success) {
        // Puedes realizar acciones adicionales si la modificación es exitosa
        console.log('Rol del usuario modificado con éxito');
      } else {
        // Puedes manejar errores o mostrar mensajes al usuario
        console.error('Error al modificar el rol del usuario');
      }

      // Cierra el modal independientemente del resultado
      onClose();
    } catch (error) {
      console.error('Error al confirmar la acción:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        maxHeight: '70vh',
        overflowY: 'scroll',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: `${colors.terciaryColor}`,
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: `${colors.secondaryColor}`,
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '8px'
        },
      }}>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Administrar Roles</Typography>
        <TextField label="Correo Electrónico" fullWidth value={email} onChange={handleEmailChange} sx={{ marginBottom: '1rem' }} />
        <TextField select label="Rol" fullWidth value={rol} onChange={handleRolChange} sx={{ marginBottom: '2rem' }}>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Moderator">Moderator</MenuItem>
          {/* más opciones de rol */}
        </TextField>
        <Button
          label="Cambiar"
          onClick={handleConfirmClick}
          backgroundColor={colors.terciaryColor}
          backgroundColorHover={colors.secondaryColor}
        />
      </Box>
    </Modal>
  );
};