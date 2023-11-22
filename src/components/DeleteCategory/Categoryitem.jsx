import { useState } from 'react';
import { Button, ListItem, ListItemText } from '@mui/material';
import { DeleteCategory } from './DeleteCategory';

export const CategoryItem = ({ category, onDelete }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={category.name} />
        <Button sx={{color:'red', '&:hover': { backgroundColor:'red', color:'black' }}} onClick={handleDeleteClick}>
          Eliminar
        </Button>
      </ListItem>
      <DeleteCategory
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        categoryId={category.categoryId}
        onDelete={onDelete}
      />
    </>
  );
};
