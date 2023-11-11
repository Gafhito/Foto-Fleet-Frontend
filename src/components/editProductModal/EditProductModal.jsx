import { useState, useEffect } from 'react';
import { Modal, Select, MenuItem, Button, Typography, Box, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useProductContext } from '../../utils/productContext';
import { colors } from '../../utils/constants';

export const EditProductModal = ({ open, onClose, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  // campos editables
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCategoryId, setEditedCategoryId] = useState(0); 
  const [editedRentalPrice, setEditedRentalPrice] = useState(0); 
  const [editedStock, setEditedStock] = useState(null);
  const [editedStatus, setEditedStatus] = useState('Active');

  const productsContext = useProductContext();

  console.log('productsContext: ',productsContext)

  useEffect(() => {
    console.log('DENTRO DLE UE DE EDIT')
    const fetchProductDetails = async () => {
      if (selectedProduct) {
        console.log('antes del try: ', selectedProduct)
        try {
          const details = await productsContext.getProductById(54);// cambiar el 54 por selectedProduct
          setProductDetails(details);

          // actualizo los TextField con detalles del producto
        setEditedName(details.name || '');
        setEditedDescription(details.description || '');
        setEditedCategoryId(details.categoryId || 0);
        setEditedRentalPrice(details.rentalPrice || 0);
        setEditedStock(details.stock || 0);
        setEditedStatus(details.status || '');

          console.log('details: ', details)
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }else{
        console.log('selectedProduct es null: ', selectedProduct)
      }
    };

    fetchProductDetails();
  }, [selectedProduct, productsContext]);

  const handleProductChange = (event) => {
    console.log('Selected Product:', event.target.value);
    setSelectedProduct(event.target.value);
  };

  const handleEditProduct = async () => {
    try {
      const editedProduct = {
        name: editedName,
        description: editedDescription,
        categoryId: editedCategoryId,
        rentalPrice: editedRentalPrice,
        stock: editedStock,
        status: editedStatus,
      };


      console.log('PRODUCTO EDITAD: ', editedProduct)
        // cambiar el 54 por selectedProduct
      await productsContext.updateProduct(54, editedProduct);



      openSnackbar('Producto editado exitosamente');
  
      onClose();
    } catch (error) {
      console.error('Ocurrio un error al editar el producto:', error);
    }
  };


  const handleFieldChange = (event, field) => {
    switch (field) {
      case 'name':
        setEditedName(event.target.value);
        break;
      case 'description':
        setEditedDescription(event.target.value);
        break;
      case 'categoryId':
        setEditedCategoryId(event.target.value);
        break;
      case 'rentalPrice':
        setEditedRentalPrice(event.target.value);
        break;
      case 'stock':
        setEditedStock(event.target.value);
        break;
      case 'status':
        setEditedStatus(event.target.value);
        break;
      default:
        break;
    }
  };

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
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
                borderRadius: '8px',
                },
            }}>
                <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Editar Producto</Typography>
                <Select value={selectedProduct || ''} onChange={handleProductChange} sx={{ marginBottom: '1rem', width: '50%' }}>
                {products.map((product) => (
                    <MenuItem key={product.name} value={product.categoryId}>
                    {product.name}
                    </MenuItem>
                ))}
                </Select>

                {productDetails && (
                <div>
                    <Typography variant="subtitle1" sx={{ marginBottom: '0.5rem' }}>Detalles del Producto:</Typography>
                    <TextField
                    label="Nombre"
                    value={editedName || ''}
                    onChange={(event) => handleFieldChange(event, 'name')}
                    fullWidth
                />
                <TextField
                    label="Descripción"
                    value={editedDescription || ''}
                    onChange={(event) => handleFieldChange(event, 'description')}
                    fullWidth
                />
                <TextField
                    label="Categoría"
                    value={editedCategoryId || ''}
                    onChange={(event) => handleFieldChange(event, 'categoryId')}
                    fullWidth
                />
                <TextField
                    label="Precio"
                    value={editedRentalPrice || ''}
                    onChange={(event) => handleFieldChange(event, 'rentalPrice')}
                    fullWidth
                />
                <TextField
                    label="Stock"
                    value={editedStock || ''}
                    onChange={(event) => handleFieldChange(event, 'stock')}
                    fullWidth
                />
                <TextField
                    label="Estado"
                    value={editedStatus || ''}
                    onChange={(event) => handleFieldChange(event, 'status')}
                    fullWidth
                />
                </div>
                )}

                <Button onClick={handleEditProduct} variant="contained" color="primary" sx={{ marginRight: '1rem' }}>
                Editar
                </Button>
                <Button onClick={onClose} variant="contained" color="secondary">
                Cancelar
                </Button>
            </Box>
        </Modal>
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={() => setSnackbarOpen(false)}
        >
        <SnackbarContent
            message={snackbarMessage}
            style={{ backgroundColor: 'green' }} // Adjust the background color as needed
        />
        </Snackbar>
    </>
   
  );
};