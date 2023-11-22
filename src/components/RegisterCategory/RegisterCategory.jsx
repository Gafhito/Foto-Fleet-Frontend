import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import { colors } from '../../utils/constants';

export const RegisterCategory = ({ open, onClose }) => {
  const { user } = useAuth();
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCategoryInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleClose = () => {
    onClose();
    setCategoryData({
      name: '',
      description: '',
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(categoryData),
      });

      console.log('response: ', response)

      if (!response.ok) {
        console.error('Error:', response.status);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error al agregar la categoría. Inténtalo de nuevo.');
      } else {
        setSnackbarSeverity('success');
        setSnackbarMessage('Categoría agregada correctamente.');

        // Obtener el id de la categoría recién creada
        const responseData = await response.json();
        console.log('responseData: ', responseData)
        const categoryId = responseData.categoryId;
        console.log('categoryID: ' + categoryId)

        // Realizar el segundo POST con la imagen
        const formData = new FormData();
        formData.append('file', categoryData.image);

        // Aquí agregamos el código para inspeccionar el FormData
        for (let [key, value] of formData.entries()) {
          console.log('inspeccionando FORMDATA: ', key, value);
        }

        const imageResponse = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/categories/image?categoryId=${categoryId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
          body: formData,
        });

        if (!imageResponse.ok) {
          console.error('Error al agregar la imagen:', imageResponse.status);
          setSnackbarSeverity('error');
          setSnackbarMessage('Error al agregar la imagen. Inténtalo de nuevo.');
        } else {
          setSnackbarSeverity('success');
          setSnackbarMessage('Imagen agregada correctamente.');
        }
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
            Agregar Categoría
          </Typography>
          <TextField
            name="name"
            label="Nombre"
            fullWidth
            value={categoryData.name}
            onChange={handleCategoryInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Descripción"
            fullWidth
            value={categoryData.description}
            onChange={handleCategoryInputChange}
            sx={{ mb: 2 }}
          />

          <Box sx={{display:'flex', justifyContent:'start', alignItems:'center'}}>

            <input
              type="file"
              accept="image/*"
              name="image"
              id="image-input"
              style={{ display: 'none' }}
              onChange={(e) => setCategoryData({ ...categoryData, image: e.target.files[0] })}
            />
            <label htmlFor="image-input">
              <Button variant="contained" component="span" sx={{backgroundColor:colors.terciaryColor, color:colors.blackColor, '&:hover': {backgroundColor:colors.terciaryColorHover}}}>
                Subir Imagen
              </Button>
            </label>
            <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor:colors.terciaryColor, color:colors.blackColor, marginLeft:'1.5rem', '&:hover': {backgroundColor:colors.terciaryColorHover}}}>
              Guardar
            </Button>

          </Box>
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