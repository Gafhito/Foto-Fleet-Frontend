// CategoryModal.jsx
import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export const RegisterCategory = ({ open, onClose, onCategorySubmit }) => {
  const [categoryData, setCategoryData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleCategoryInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      setCategoryData({
        ...categoryData,
        [name]: files[0],
      });
    } else {
      setCategoryData({
        ...categoryData,
        [name]: value,
      });
    }
  };

  const handleClose = () => {
    onClose();
    setCategoryData({
      title: '',
      description: '',
      image: null,
    });
  };

  const handleSubmit = () => {
    onCategorySubmit(categoryData);
    handleClose();
  };

  return (
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
          name="title"
          label="Título"
          fullWidth
          value={categoryData.title}
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
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image-input"
          style={{ display: 'none' }}
          onChange={handleCategoryInputChange}
        />
        <label htmlFor="image-input">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            endIcon={
              <InputAdornment position="end">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </InputAdornment>
            }
          >
            Subir Imagen
          </Button>
        </label>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

