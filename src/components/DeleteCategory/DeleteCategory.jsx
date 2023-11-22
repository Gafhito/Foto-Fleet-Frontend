import { useState } from 'react';
import { Modal, Box, Typography, Button, Snackbar } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';

export const DeleteCategory = ({ open, onClose, categoryId, onDelete }) => {
  const { user } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleClose = () => {
    onClose();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = async () => {

    console.log('CATEGORY ID EN EL HANDLEDELETE: ' + categoryId)
    try {
      const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error('Error:', response.status);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error al eliminar la categoría. Inténtalo de nuevo.');
      } else {
        setSnackbarSeverity('success');
        setSnackbarMessage('Categoría eliminada correctamente.');

        // Callback to update the category list in the parent component
        onDelete(categoryId);
      }

      setSnackbarOpen(true);

      if (response.ok) {
        handleClose();
      }
    } catch (error) {
      console.error('Network error:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error de red. Verifica tu conexión e inténtalo de nuevo.');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Eliminar Categoría
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ¿Estás seguro de que deseas eliminar esta categoría?
          </Typography>
          <Button variant="contained" onClick={handleDelete} sx={{ mr: 2, backgroundColor:'red', color:'black', '&:hover': { backgroundColor:'white', color:'black' } }}>
            Sí, Eliminar
          </Button>
          <Button variant="outlined" sx={{color:'blue'}}  onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};