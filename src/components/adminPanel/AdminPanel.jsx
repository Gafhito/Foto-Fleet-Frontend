import { useState, useEffect } from 'react';
import { useMediaQuery, Box, Typography, Modal, Button as MuiButton, createTheme, ThemeProvider } from '@mui/material';

import { colors } from '../../utils/constants';
import { Button } from '../common/button/Button';
import { ConfirmationModal } from '../common/confirmationModal/confirmationModal';

import './adminPanel.css';


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

export const AdminPanel = () => {


  const isMobile = useMediaQuery('(max-width:600px');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  // Nuevo estado para el modal de confirmación
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    // Simula una solicitud GET a la API para obtener los productos
    fetch('http://localhost:3001/cameras')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Actualiza la lista de productos con los datos de la API
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  const openModal = (productId) => {
    if(productId == null) {
      setIsModalOpen(true);
      setConfirmationModalOpen(false);
    }else {
      setProductToDelete(productId);
      setConfirmationModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const closeConfirmationModal = () => {
    // Cierra el modal de confirmación
    setConfirmationModalOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    if (productToDelete !== null) {
      // Simulamos solicitud a API
      fetch(`http://localhost:3001/cameras/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 200) {
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

  return (
    <div>
      {isMobile ? (
        <Typography variant="h5" sx={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          No está disponible en dispositivos móviles
        </Typography>
      ) : (
        <div
          style={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid black',
            width: '20vw',
            borderRadius: '12px',
            margin: '10rem 0 5rem 1rem',
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ marginBottom: '3rem' }}>Panel de Administración</Typography>
            <Button label={'Registrar Producto'} backgroundColor={colors.terciaryColor} backgroundColorHover={colors.secondaryColor} />
            <Button label={'Listar Producto'} mt={'1rem'} backgroundColor={colors.terciaryColor} backgroundColorHover={colors.secondaryColor} onClick={ () => openModal(null)} />
          </Box>
        </div>
      )}
      <ThemeProvider theme={customModalTheme}>
        <Modal open={isModalOpen} onClose={closeModal}>
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
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.action}</td>
                    <td>
                      <MuiButton variant="outlined" color="error" size="small" onClick={() => openModal(product.id)}>
                        Eliminar
                      </MuiButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Modal>
      </ThemeProvider>
      <ConfirmationModal
            open={confirmationModalOpen} // Usar el nuevo estado para el modal de confirmación
            onClose={closeConfirmationModal}
            onConfirm={() => handleDeleteProduct(productToDelete)}
        />
    </div>
  );
};