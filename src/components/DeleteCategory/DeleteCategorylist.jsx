import { Modal, Box, Typography } from '@mui/material';

import { DeleteCategory } from './DeleteCategory';
import { CategoryList } from './CategoryList';

export const DeleteCategoryList = ({ open, onClose, onDeleteCategory }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          // Styling for the modal box
        }}
      >
        <CategoryList onDeleteCategory={onDeleteCategory} />
      </Box>
    </Modal>
  );
};