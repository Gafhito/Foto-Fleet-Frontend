import { useState, useEffect } from 'react';
import { Modal, Select, MenuItem, Button, Typography, Box, TextField, FormControl, InputLabel } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useProductContext } from '../../utils/ProductContext';
import { colors } from '../../utils/constants';
import { useAuth } from '../../utils/AuthContext';

export const EditProductModal = ({ open, onClose, products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const authContext = useAuth();


  console.log('authContext: ', authContext)


  // campos editables
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCategoryId, setEditedCategoryId] = useState(0);
  const [editedRentalPrice, setEditedRentalPrice] = useState(0);
  const [editedStock, setEditedStock] = useState(null);
  const [editedStatus, setEditedStatus] = useState('Active');
  const [productCharacteristics, setProductCharacteristics] = useState([]); // Características del producto
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]); // Características seleccionadas en el formulario

  const productsContext = useProductContext();

  const productsContent = productsContext.products.content;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await authContext.getCategories();
        setCategories(fetchedCategories);
        console.log('fetchedCategories: ', fetchedCategories)

        // si tenemos categoria ID seteamos
        if (productDetails && productDetails.categoryId) {
          const selectedCategory = fetchedCategories.find(category => category.categoryId === productDetails.categoryId);
          setSelectedCategory(selectedCategory);
          setEditedCategoryId(selectedCategory?.categoryId || 0);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }

      console.log('selectedCategory.ID', selectedCategory?.categoryId)
    };

    fetchCategories();
  }, [authContext, productDetails]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedProduct) {
        console.log('antes del try: ', selectedProduct);
        try {
          const details = await productsContext.getProductById(selectedProduct);
          setProductDetails(details);

          // actualizo los TextField con detalles del producto
          setEditedName(details.name || '');
          setEditedDescription(details.description || '');
          setEditedCategoryId(details.categoryId || 0);
          setEditedRentalPrice(details.rentalPrice || 0);
          setEditedStock(details.stock || 0);
          setEditedStatus(details.status || '');


          // Actualizo el estado de las características seleccionadas
          setSelectedCharacteristics(details.characteristics || []);

          console.log('details: ', details);
          console.log('SelectedCharacteristics: ', selectedCharacteristics)
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      } else {
        console.log('selectedProduct es null: ', selectedProduct);
      }
    };

    fetchProductDetails();
  }, [selectedProduct, productsContent]);


  const handleProductChange = (event) => {

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
        //characteristics: selectedCharacteristics, // Añade las características seleccionadas
      };

      // cambiar el 54 por selectedProduct

      console.log('EDITED PRODUCT DEL EDIT: ', editedProduct)
      console.log('SELECTED PRODUCT DEL EDIT: ', selectedProduct)
      console.log('SELECTED CHARACTERISTICS: ', selectedCharacteristics)
      await productsContext.updateProduct(selectedProduct, editedProduct);



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

  const textFieldStyle = {
    marginBottom: '1rem',
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
            {products.content?.map((product) => (
              <MenuItem key={product.productId} value={product.productId}>
                {product.name}
              </MenuItem>
            ))}
          </Select>

          {productDetails && (
            <div>
              <Typography variant="subtitle1" sx={textFieldStyle}>Detalles del Producto:</Typography>
              <TextField
                label="Nombre"
                value={editedName || ''}
                onChange={(event) => handleFieldChange(event, 'name')}
                fullWidth
                sx={textFieldStyle}
              />
              <TextField sx={textFieldStyle}
                label="Descripción"
                value={editedDescription || ''}
                onChange={(event) => handleFieldChange(event, 'description')}
                fullWidth
              />
              <Select
                value={editedCategoryId || ''}
                onChange={(event) => {
                  setEditedCategoryId(event.target.value);
                }}
                fullWidth
                sx={textFieldStyle}
              >
                {categories.map((category) => (
                  <MenuItem key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>

              <FormControl fullWidth sx={textFieldStyle}>
                <InputLabel>Características</InputLabel>
                <Select
                  name="characteristics"
                  multiple
                  value={selectedCharacteristics}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSelectedCharacteristics(value);
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      characteristics: value,
                    }));
                  }}
                >
                  {productsContext.characteristics
                    .slice() 
                    .sort((a, b) => a.name.localeCompare(b.name)) 
                    .map((characteristic) => (
                      <MenuItem key={characteristic.characteristicsId} value={characteristic.characteristicsId}>
                        {characteristic.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>


              <TextField sx={textFieldStyle}
                label="Precio"
                value={editedRentalPrice || ''}
                onChange={(event) => handleFieldChange(event, 'rentalPrice')}
                fullWidth
              />
              <TextField sx={textFieldStyle}
                label="Stock"
                value={editedStock || ''}
                onChange={(event) => handleFieldChange(event, 'stock')}
                fullWidth
              />
              <TextField sx={textFieldStyle}
                label="Estado"
                value={editedStatus || ''}
                onChange={(event) => handleFieldChange(event, 'status')}
                fullWidth
              />
            </div>
          )}

          <Button onClick={handleEditProduct} variant="contained" sx={{ marginRight: '1rem', marginLeft: '1rem', backgroundColor: colors.terciaryColor, color: colors.blackColor, '&:hover': { backgroundColor: colors.terciaryColorHover } }}>
            Editar
          </Button>
          <Button onClick={onClose} variant="contained" sx={{ backgroundColor: colors.terciaryColor, color: colors.blackColor, '&:hover': { backgroundColor: colors.terciaryColorHover } }}>
            Cancelar
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // ajustar duracion 
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: 'green' }} // ajustar color 
        />
      </Snackbar>
    </>

  );
};