import { useState } from 'react';
import {
  TextField,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { Button } from '../components/common/button/Button';
import { colors } from '../utils/constants';


export const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
      <Container sx={{ marginTop: '10rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
          Contacto
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mensaje"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button
            label={'Enviar'}
            backgroundColor={colors.secondaryColor}
            backgroundColorHover={colors.secondaryColorHover}
            color={colors.blackColor}
            mt={'2rem'}
          />
        </Box>
      </Container>
  );
};
