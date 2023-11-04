import { Modal, Box, Typography } from '@mui/material';
import { ProductForm } from '../productForm/ProductForm';

import { colors } from '../../utils/constants';


const handleDeleteProduct = (productId) => {
    if (productToDelete !== null) {
      fetch(`http://localhost:3001/cameras/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 204) {
            // -- No Content -
  
            // Actualizamos lista
            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
  
            closeConfirmationModal();
          } else if (response.status === 404) {
            console.error('La cámara no se encontró en la base de datos');
          } else {
            console.error('Error al eliminar la cámara:', response.status, response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error al eliminar la cámara:', error);
        });
    }
  };

const handleProductSubmit = (newProduct) => {
    // corroboramos que el nombre no exista con la funcion some - si un elemento del array cumple con la condicion devuelve true

    const productExists = products.some((product) => product.title === newProduct.title);
  
    if (productExists) {
      // seteamos error
      setErrorMessage('El nombre del producto ya se encuentra en uso. Por favor elige otro.');
      setSnackbarOpen(true);
    } else {
      fetch('http://localhost:3001/cameras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizamos la lista de productos con el nuevo producto
          setProducts([...products, data]);
          setIsRegisterModalOpen(false); // Cerramos el modal de registro de productos
        })
        .catch((error) => {
          console.error('Error al crear el producto:', error);
        });
    }
  };


export const RegisterProductModal = ({ open, onClose }) => {
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
            <ProductForm onSubmit={handleProductSubmit} />
        </Box>
      </Modal>
  )
}

