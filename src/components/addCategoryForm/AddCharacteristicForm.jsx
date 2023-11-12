import { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { EmojiEmotions, SportsSoccer, Work, Restaurant } from '@mui/icons-material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../utils/AuthContext';

export const availableIcons = [
  { label: 'Emojis', icon: <EmojiEmotions /> },
  { label: 'Soccer', icon: <SportsSoccer /> },
  { label: 'Work', icon: <Work /> },
  { label: 'Restaurant', icon: <Restaurant /> },
];


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

      console.log('Request Body Characteristic: ', requestBody)

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
      } else {
        console.error('Error al agregar la caracteristica:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error.message);
    }
  };

  return (
    <div>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <Button onClick={handleAddCharacteristic}>Agregar Caracteristica</Button>
    </div>
  );
};