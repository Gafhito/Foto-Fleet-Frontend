import { colors } from '../../utils/constants';
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { EmojiEmotions, SportsSoccer, Work, Restaurant } from '@mui/icons-material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import { useAuth } from '../../utils/AuthContext';


// Agregar todos los iconos
library.add(fas);

export const iconOptions = Object.keys(fas).map((iconName) => ({
  label: iconName.replace(/([a-z])([A-Z])/g, '$1 $2'), // Agrega espacios entre palabras
  value: fas[iconName],
}));

export const AddCharacteristicForm = ({ onAddCharacteristic }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);
  const [severity, setSeverity] = useState('success')
  const [message, setMessgae] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const handleAddCharacteristic = async () => {
    try {
      const requestBody = {
        name: name,
        description: description,
        urlIcono: selectedIcon ? selectedIcon.label : '', // nombre del icono
      };

      const token = user ? user.token : null;

      if (!token) {
        console.error('No se encontró un token de autenticación.');
        return;
      }

      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/characteristics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const newCharacteristic = await response.json();
        onAddCharacteristic(newCharacteristic);
        setSeverity('success')
        setMessgae('Caracteristica agregada exitosamente')
        setModalOpen(true);
      } else {
        console.error('Error al agregar la caracteristica:', response.statusText);
        setSeverity('error')
        setMessgae('Error al registrar la caracterisitca. Intentalo de nuevo')
        setModalOpen(true);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error.message);
      setSeverity('error')
      setMessgae('Error en la peticion')
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalOpen(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [modalOpen]);


  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{marginBottom:'1rem'}}
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Icono:</label>
          {console.log('Selected Icon: ', selectedIcon)}
            <Select
            value={selectedIcon}
            onChange={(e) => setSelectedIcon(e.target.value)}
          >
            {iconOptions.map((option) => (
              <MenuItem key={option.label} value={option}>
                <FontAwesomeIcon icon={option.value} /> {option.label}
              </MenuItem>
            ))}
          </Select>
          <Button sx={{backgroundColor:colors.terciaryColor, color:colors.blackColor, marginTop:'1.5rem', '&:hover': {backgroundColor:colors.terciaryColorHover }}} onClick={handleAddCharacteristic}>Agregar</Button>

          <Dialog open={modalOpen} onClose={handleCloseModal}>
            <DialogTitle>{severity === 'success' ? 'Éxito' : 'Error'}</DialogTitle>
            <DialogContent>
              <p>{message}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>

        </div>
  );
};