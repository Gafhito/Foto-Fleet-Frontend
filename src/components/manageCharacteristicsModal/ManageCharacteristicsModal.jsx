import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AddCategoryForm } from '../addCategoryForm/AddCategoryForm';

export const ManageCharacteristicsModal = ({ open, onClose }) => {
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(null);
  const [isAddingCharacteristic, setIsAddingCharacteristic] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState(false);

  const handleEditCharacteristic = (characteristic) => {
    setSelectedCharacteristic(characteristic);
    setIsAddingCharacteristic(false);
    setCategoryName(characteristic.name);
    setCategoryIcon(characteristic.icon);
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
    setCategoryName('');
    setCategoryIcon('');
  };

  const openAddCategoryForm = () => {
    setSelectedCharacteristic(null);
    setIsAddingCharacteristic(true);
    clearForm();
    setIsAddCategoryFormOpen(true); // Asegúrate de establecer isAddCategoryFormOpen en true aquí
  };

  const handleAddCategory = (newCategory) => {
    setCharacteristics([...characteristics, newCategory]);
    setIsAddCategoryFormOpen(false);
    clearForm();
  };

  const handleSaveCategory = () => {
    if (selectedCharacteristic && categoryName.trim() && categoryIcon.trim()) {
      const updatedCategory = {
        id: selectedCharacteristic.id,
        name: categoryName,
        icon: categoryIcon,
      };
      setCharacteristics((prevCharacteristics) => {
        // Mapea las características anteriores y actualiza solo la seleccionada
        return prevCharacteristics.map((char) =>
          char.id === selectedCharacteristic.id ? updatedCategory : char
        );
      });
      clearForm();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Administrar Características</DialogTitle>
      <DialogContent>
        <Button
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
              <TableCell>Icono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characteristics.map((characteristic) => (
              <TableRow key={characteristic.id}>
                <TableCell>
                  {selectedCharacteristic === characteristic &&
                  !isAddingCharacteristic ? (
                    <TextField
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  ) : (
                    characteristic.name
                  )}
                </TableCell>
                <TableCell>
                  {selectedCharacteristic === characteristic &&
                  !isAddingCharacteristic ? (
                    <TextField
                      value={categoryIcon}
                      onChange={(e) => setCategoryIcon(e.target.value)}
                    />
                  ) : (
                    characteristic.icon
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
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};