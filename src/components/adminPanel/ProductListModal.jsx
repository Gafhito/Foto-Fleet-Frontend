import { useState } from 'react';
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

  const { products, handleDelete } = useProductContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);



  const openModal = (productId) => {
    console.log('ProductID pasado en el openModal: ', productId)
    setSelectedProductId(productId);
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteClick = (selectedProductId) => {
    console.log('selectedProductID before setting: ', selectedProductId);
    setSelectedProductId(selectedProductId); // Wait for state to update
    console.log('selectedProductID after setting: ', selectedProductId);
    openModal(selectedProductId);
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
                  <th>Acciones</th>
                  <th>Eliminar Producto</th>
                </tr>
              </thead>
              <tbody>
                {products.content?.map(product => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.action}</td>
                    <td>
                      <MuiButton variant="outlined" color="error" size="small" onClick={() => handleDeleteClick(product.productId)}>
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
        onConfirm={() => {
          handleDelete(selectedProductId);
          setIsConfirmationModalOpen(false);
        }}
      />
      </ThemeProvider>
  )
}