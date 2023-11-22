import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, Modal, Box, Typography, Button as MuiButton } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { useProductContext } from '../../utils/ProductContext';
import { ConfirmationModal } from '../common/confirmationModal/confirmationModal';


import { colors } from '../../utils/constants';



const customModalTheme = createTheme({
    components: {
      MuiModal: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
  });

export const ProductListModal = ({ open, onClose}) => {

  const productContext = useProductContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const MAX_DESCRIPTION_LENGTH = 80;
  const MAX_CHARACTERISTICS_LENGTH = 80;



  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteClick = (productId) => {
    openModal(productId);
  };


  useEffect(() => {

    const updatedProducts = productContext.products;
  
  }, [productContext.lastUpdate]);


  useEffect(() => {
    if (selectedProductId) {
      // Manejar la actualización de la lista de productos después de eliminar
      const updatedProducts = productContext.products;
      const filteredProducts = updatedProducts.content.filter(
        (product) => product.productId !== selectedProductId
      );
  
      // Verificar si el estado actual es igual al nuevo estado
      const isSameState =
        JSON.stringify(updatedProducts.content) ===
        JSON.stringify(filteredProducts);
  
      // Actualizar el estado solo si es diferente
      if (!isSameState) {
        productContext.setProducts({
          ...updatedProducts,
          content: filteredProducts,
        });
      }
    }
  }, [selectedProductId, productContext]);


  // Función para truncar las características
  const truncateCharacteristics = (characteristics) => {
    const truncatedChars = characteristics
      .map(char => char.name)
      .join(', ')
      .slice(0, MAX_CHARACTERISTICS_LENGTH);

    return characteristics.length > MAX_CHARACTERISTICS_LENGTH
      ? `${truncatedChars}...`
      : truncatedChars || 'N/A';
  };



  return (
    <ThemeProvider theme={customModalTheme}>
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
            <Typography variant="h5" sx={{ marginBottom: '1rem', textAlign: 'center' }}>Lista de Productos</Typography>
            <table className='styled_table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Caracteristicas</th>
                  {/*<th>Acciones</th>*/}
                  <th>Eliminar Producto</th>
                </tr>
              </thead>
              <tbody>
                {productContext.products.content?.map(product => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.description.length > MAX_DESCRIPTION_LENGTH ? `${product.description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : product.description}</td>
                    <td>{truncateCharacteristics(product.characteristics)}</td>
                    {/*<td>{product.action}</td>*/}
                    <td>
                    <MuiButton
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(product.productId)}
                      >
                        Eliminar
                    </MuiButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Modal>
        {/* Confirmation Modal */}
        <ConfirmationModal
            open={isConfirmationModalOpen}
            onClose={() => setIsConfirmationModalOpen(false)}
            onConfirm={async () => {
              try {
                // Eliminamos el producto solo después de la confirmación
                await productContext.handleDelete(selectedProductId);
                
                // Actualizamos el estado solo después de confirmar
                setIsConfirmationModalOpen(false);
                
                const updatedProducts = productContext.products;
                const filteredProducts = updatedProducts.content.filter(
                  (product) => product.productId !== selectedProductId
                );

                // Verificamos si el estado actual es igual al nuevo estado
                const isSameState =
                  JSON.stringify(updatedProducts.content) ===
                  JSON.stringify(filteredProducts);

                // Actualizamos el estado solo si es diferente
                if (!isSameState) {
                  productContext.setProducts({
                    ...updatedProducts,
                    content: filteredProducts,
                  });
                }
              } catch (error) {
                console.error('Error handling deletion:', error);
              }
            }}
          />
      </ThemeProvider>
  )
}