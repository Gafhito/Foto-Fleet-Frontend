import { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { ProductForm } from '../productForm/ProductForm';
import { useAuth } from '../../utils/AuthContext';
import { createProduct } from '../../utils/ProductService';

import { colors } from '../../utils/constants';

export const RegisterProductModal = ({ open, onClose }) => {

  const { user, getCategories } = useAuth();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, [getCategories]);

  const handleProductSubmit = async (newProduct) => {
    try {
      const token = user ? user.token : null;
      const data = await createProduct(newProduct, token);

      // Cierra el modal
      onClose();
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h5" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
          Registrar Producto
        </Typography>
        <ProductForm onSubmit={handleProductSubmit} categories={categories} />
      </Box>
    </Modal>
  )
}