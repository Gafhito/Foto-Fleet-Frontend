import { useState, useEffect } from 'react';
import { useMediaQuery, Box, Typography, Snackbar, Alert } from '@mui/material';

import { Button } from '../common/button/Button';
import { ConfirmationModal } from '../common/confirmationModal/confirmationModal';
import { ProductForm } from '../productForm/ProductForm';
import { ProductListModal } from './ProductListModal';
import { RegisterProductModal } from './RegisterProductModal';
import { ManageCharacteristicsModal } from '../manageCharacteristicsModal/ManageCharacteristicsModal';
import { EditProductModal } from '../editProductModal/EditProductModal';
import { ManageRolesModal } from '../manageRoleModal/ManageRolesModal';

import { useProductContext } from '../../utils/ProductContext';
import { useRentalContext } from '../../utils/RentalContext';
import { PendingReservationsModal } from './PendingReservationModal';
import { colors } from '../../utils/constants';
import { useAuth } from '../../utils/AuthContext';

import './adminPanel.css';
import { RegisterCategory } from '../RegisterCategory/RegisterCategory';
import { DeleteCategoryList } from '../DeleteCategory/DeleteCategorylist';



export const AdminPanel = () => {

  const { products } = useProductContext();
  const isMobile = useMediaQuery('(max-width:850px)');
  //const [products, setProducts] = useState(productsContext);
  const [productToDelete, setProductToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getCategories, user } = useAuth();
  const { rentals } = useRentalContext();

  // Abrir modales
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Estado para el modal de registro de productos
  const [isListModalOpen, setIsListModalOpen] = useState(false); // Estado para el modal de listado de productos
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Estado para confirmación de DELETE
  const [isCharacteristicsModalOpen, setCharacteristicsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [isPendingReservationsModalOpen, setIsPendingReservationsModalOpen] = useState(false);


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

  const openRolesModal = () => {
    setIsRolesModalOpen(true);
  };

  const closeRolesModal = () => {
    setIsRolesModalOpen(false);
  };

  const openDeleteCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteCategoryModalOpen(true);  // Actualizar el estado para abrir el modal de categorías
  };

  const handleDeleteCategory = async (categoryId) => {

    const updatedCategories = await getCategories();
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
            <Button label={'Eliminar Categoría'} onClick={() => openDeleteCategoryModal(selectedCategory)} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor}/>
            <Button label={'Administrar Caracteristicas'} onClick={openCharacteristicsModal} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor} />
            <Button label={'Editar Producto'} onClick={openEditModal} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor} />
            <Button label={'Administrar Roles'} onClick={openRolesModal} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor}/>
            <Button label={'Mostrar Reservas'} backgroundColor={colors.terciaryColor} mt={'1rem'} backgroundColorHover={colors.secondaryColor} onClick={() => setIsPendingReservationsModalOpen(true)}/>
          </Box>
        </div>
      )}

      <ProductListModal open={isListModalOpen} onClose={closeModal} />
      <RegisterProductModal open={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      <RegisterCategory open={isCategoryModalOpen} onClose={closeCategoryModal} onCategorySubmit={handleCategorySubmit} />
      <PendingReservationsModal isOpen={isPendingReservationsModalOpen} onClose={() => setIsPendingReservationsModalOpen(false)} />

      {isDeleteCategoryModalOpen && (
        <DeleteCategoryList
          open={isDeleteCategoryModalOpen}
          onClose={() => setIsDeleteCategoryModalOpen(false)}  // Cerrar el modal de categorías
          onDeleteCategory={handleDeleteCategory}
        />
      )}

      <ManageCharacteristicsModal open={isCharacteristicsModalOpen} onClose={closeCharacteristicsModal} />
      <EditProductModal open={isEditModalOpen} onClose={closeEditModal} products={products} />
      <ManageRolesModal open={isRolesModalOpen} onClose={closeRolesModal}/>
      <ConfirmationModal open={ confirmationModalOpen } onClose={ closeConfirmationModal } onConfirm={ () => handleDeleteProduct( productToDelete ) } />
      <Snackbar open={ snackbarOpen } autoHideDuration={ 6000 } onClose={ () => setSnackbarOpen( false ) }>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
