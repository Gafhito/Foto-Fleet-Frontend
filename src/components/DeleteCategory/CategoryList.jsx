import { useEffect, useState } from 'react';
import { List, Typography, Box } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import { CategoryItem } from './Categoryitem';

import { colors } from '../../utils/constants';

export const CategoryList = ({ onDeleteCategory }) => {
  const { getCategories } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, [getCategories]);

  const handleCategoryDelete = async (categoryId) => {
    

    console.log('CATEGORY ID PROP EN HANDLECATEGORYDELTE: ' + categoryId)
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);

    // Callback to update the category list in the parent component
    onDeleteCategory(categoryId);
  };

  return (
    <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        maxHeight: '70vh',
        overflowY: 'scroll',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: `${colors.terciaryColor}`,
          borderRadius: '6px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: `${colors.secondaryColor}`,
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '8px'
        },
      }}>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
        Lista de Categorías
      </Typography>
      <List>
        {categories.map((category) => (
          <CategoryItem key={category.categoryId} category={category} onDelete={() => handleCategoryDelete(category.categoryId)} />
        ))}
      </List>
    </Box>
  );
};
