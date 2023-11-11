import { useState, useEffect } from 'react';
import { useMediaQuery, Box, Typography, Snackbar, Alert } from '@mui/material';

import { Button } from '../common/button/Button';
import { ConfirmationModal } from '../common/confirmationModal/confirmationModal';
import { ProductForm } from '../productForm/ProductForm';
import { ProductListModal } from './ProductListModal';
import { RegisterProductModal } from './RegisterProductModal';
import { ManageCharacteristicsModal } from '../manageCharacteristicsModal/ManageCharacteristicsModal';
import { EditProductModal } from '../editProductModal/EditProductModal';

import { useProductContext } from '../../utils/productContext';
import { colors } from '../../utils/constants';

import './adminPanel.css';
import { RegisterCategory } from '../RegisterCategory/RegisterCategory';



export const AdminPanel = () => {

  const { products } = useProductContext();
  const isMobile = useMediaQuery('(max-width:850px)');
  //const [products, setProducts] = useState(productsContext);
  const [productToDelete, setProductToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Abrir modales
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Estado para el modal de registro de productos
  const [isListModalOpen, setIsListModalOpen] = useState(false); // Estado para el modal de listado de productos
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Estado para confirmación de DELETE
  const [isCharacteristicsModalOpen, setCharacteristicsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  /*useEffect(() => {
    // Simula una solicitud GET a la API para obtener los productos
    fetch('http://localhost:3001/cameras')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Actualiza la lista de productos con los datos de la API
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);*/

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openModal = (productId) => {
    if (productId == null) {
      setIsRegisterModalOpen(true);
      setIsListModalOpen(false);
      setConfirmationModalOpen(false);
    } else {
      setProductToDelete(productId);
      setConfirmationModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsRegisterModalOpen(false);
    setIsListModalOpen(false);
    setProductToDelete(null);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };


  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const openCharacteristicsModal = () => {
    setCharacteristicsModalOpen(true);
  };

  const closeCharacteristicsModal = () => {
    setCharacteristicsModalOpen(false);
  };

  const handleCategorySubmit = (categoryData) => {
    // Manejar el envío de la categoría -- enviar los datos al servidor.
    console.log(categoryData);
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
            <Button label={ 'Registrar Producto' } onClick={ () => setIsRegisterModalOpen( true ) } backgroundColor={ colors.terciaryColor } backgroundColorHover={ colors.secondaryColor }/>
            <Button label={ 'Listar Producto' } onClick={ () => setIsListModalOpen( true ) } mt={'1rem'} backgroundColor={ colors.terciaryColor } backgroundColorHover={ colors.secondaryColor }/>
            <Button label={'Agregar Categoría'} onClick={openCategoryModal} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor} />
            <Button label={'Administrar Caracteristicas'} onClick={openCharacteristicsModal} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor} />
            <Button label={'Editar Producto'} onClick={openEditModal} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor} />
          </Box>
        </div>
      )}

      <ProductListModal open={isListModalOpen} onClose={closeModal} />
      <RegisterProductModal open={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <RegisterCategory open={isCategoryModalOpen} onClose={closeCategoryModal} onCategorySubmit={handleCategorySubmit} />
      <ManageCharacteristicsModal open={isCharacteristicsModalOpen} onClose={closeCharacteristicsModal} />
      <EditProductModal open={isEditModalOpen} onClose={closeEditModal} products={products} />
      <ConfirmationModal open={ confirmationModalOpen } onClose={ closeConfirmationModal } onConfirm={ () => handleDeleteProduct( productToDelete ) } />
      <Snackbar open={ snackbarOpen } autoHideDuration={ 6000 } onClose={ () => setSnackbarOpen( false ) }>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};