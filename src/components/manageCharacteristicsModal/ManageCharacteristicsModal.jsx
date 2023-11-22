import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCharacteristicForm } from '../addCategoryForm/AddCharacteristicForm';
import { useAuth } from '../../utils/AuthContext';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconOptions } from '../addCategoryForm/AddCharacteristicForm';
import { colors } from '../../utils/constants';

export const ManageCharacteristicsModal = ({ open, onClose }) => {
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(null);
  const [isAddingCharacteristic, setIsAddingCharacteristic] = useState(false);
  const [characteristicName, setCharacteristicName] = useState('');
  const [characteristicIcon, setCharacteristicIcon] = useState('');
  const [characteristicDescription, setCharacteristicDescription] = useState('');
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        const token = user ? user.token : null;

        if (!token) {
          console.error('No se encontró un token de autenticación.');
          return;
        }

        const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/characteristics', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });


        if (response.ok) {
          const fetchedCharacteristics = await response.json();

          setCharacteristics(fetchedCharacteristics);
        } else {
          console.error('Error al obtener las características:', response.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud GET de características:', error.message);
      }
    };

    fetchCharacteristics();
  }, []);

  const handleEditCharacteristic = (characteristic) => {
    setSelectedCharacteristic(characteristic);
    setIsAddingCharacteristic(false);
    setCharacteristicName(characteristic.name);
    setCharacteristicIcon(characteristic.urlIcon);
    setCharacteristicDescription(characteristic.description)
  };

  const handleDeleteCharacteristic = (characteristic) => {
    setCharacteristics((prevCharacteristics) =>
      prevCharacteristics.filter((char) => char.id !== characteristic.id)
    );
    clearForm();
  };

  const clearForm = () => {
    setSelectedCharacteristic(null);
    setIsAddingCharacteristic(false);
    setCharacteristicName('');
    setCharacteristicIcon('');
    setCharacteristicDescription('');
  };

  const openAddCategoryForm = () => {
    setSelectedCharacteristic(null);
    setIsAddingCharacteristic(true);
    clearForm();
    setIsAddCategoryFormOpen(true);
  };

  const handleAddCharacteristic = (newCharacteristic) => {
    setCharacteristics([...characteristics, newCharacteristic]);
    setIsAddCategoryFormOpen(false);
    clearForm();
  };

  const handleSaveCategory = async () => {
    if (selectedCharacteristic && characteristicName.trim() && characteristicIcon.trim()) {
      const updatedCharacteristic = {
        name: characteristicName,
        description: characteristicDescription,
        urlIcono: characteristicIcon,
      };

      try {
        const token = user ? user.token : null;

        if (!token) {
          console.error('No se encontró un token de autenticación.');
          return;
        }

        const response = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/characteristics/${selectedCharacteristic.characteristicsId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCharacteristic),
        });

        if (response.ok) {
          setCharacteristics((prevCharacteristics) => {
            return prevCharacteristics.map((char) =>
              char.characteristicsId === selectedCharacteristic.characteristicsId ? updatedCharacteristic : char
            );
          });
          clearForm();
        } else {
          console.error('Error al actualizar la característica:', response.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud PUT de características:', error.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Administrar Características</DialogTitle>
      <DialogContent>
        <Button sx={{backgroundColor:colors.terciaryColor, color:colors.blackColor, '&:hover' : { backgroundColor:colors.terciaryColorHover }}}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddCategoryForm}
        >
          Agregar Nueva
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Icono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characteristics?.map((characteristic) => (
              <TableRow key={characteristic.characteristicsId}>
                <TableCell>
                  {selectedCharacteristic === characteristic &&
                  !isAddingCharacteristic ? (
                    <TextField
                      value={characteristicName}
                      onChange={(e) => setCharacteristicName(e.target.value)}
                    />
                  ) : (
                    characteristic.name
                  )}
                </TableCell>
                <TableCell>
                  {selectedCharacteristic === characteristic &&
                  !isAddingCharacteristic ? (
                    <TextField
                      value={characteristicDescription}
                      onChange={(e) => setCharacteristicDescription(e.target.value)}
                    />
                  ) : (
                    characteristic.description
                  )}
                </TableCell>
                <TableCell>
                {selectedCharacteristic === characteristic &&
                  !isAddingCharacteristic ? (
                    <Select
                      value={characteristicIcon}
                      onChange={(e) => setCharacteristicIcon(e.target.value)}
                    >
                      {iconOptions.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          <FontAwesomeIcon icon={option.value} /> {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <FontAwesomeIcon icon={iconOptions.find(option => option.label === characteristic.urlIcono)?.value} />
                  )}
                </TableCell>
                <TableCell>
                  {selectedCharacteristic === characteristic &&
                  !isAddingCharacteristic ? (
                    <>
                      <Button variant="contained" onClick={handleSaveCategory}>
                        Guardar
                      </Button>
                      <Button variant="contained" onClick={clearForm}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditCharacteristic(characteristic)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCharacteristic(characteristic)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={isAddCategoryFormOpen} onClose={() => setIsAddCategoryFormOpen(false)}>
          <DialogTitle>Agregar Nueva Caracteristica</DialogTitle>
          <DialogContent>
            <AddCharacteristicForm onAddCharacteristic={handleAddCharacteristic} />
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};