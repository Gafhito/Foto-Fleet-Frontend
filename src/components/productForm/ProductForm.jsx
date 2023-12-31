import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { createProduct } from '../../utils/ProductService';
import { useAuth } from '../../utils/AuthContext';
import { useProductContext } from '../../utils/ProductContext';
import { colors } from '../../utils/constants';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



export const ProductForm = ({ onSubmit, categories }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    categoryId: '',
    rentalPrice: '',
    stock: '',
    status: 'Disponible',
    images: [],
    primaryImage: null,
    secondaryImages: [],
    characteristics: [],
  });

  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); // estado para trackear el ID de la categoria
  const [mainImage, setMainImage] = useState(null);
  const { getCategories, user } = useAuth();
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([]);
  const { characteristics, setCharacteristics } = useProductContext();

  const [imageThumbnails, setImageThumbnails] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  

  // Inicializamos el valor de categoria para el primer valor
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategoriesList(fetchedCategories);

        if (fetchedCategories.length > 0) {
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            category: fetchedCategories[0].name,
          }));
          const categoryID = mapCategoryToID(fetchedCategories[0].name);
          setSelectedCategoryId(categoryID);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [getCategories]);


  // mapping para setear el ID de las categorias basado en su nombre
  const mapCategoryToID = (categoryName) => {
    switch (categoryName) {
      case 'Lighting':
        return 3;
      case 'Cameras':
        return 1;
      case 'Toto':
        return 6;
      case 'Accessories':
        return 4;
      case 'Camaras':
        return 5;
      case 'Lenses':
        return 2;
      default:
        return 0;
    }
  };



  const handleImageChange = async (event, imageType) => {
    const files = event.target.files;

  await setNewProduct((prevProduct) => {
    if (imageType === 'primaryImage') {
      return {
        ...prevProduct,
        images: [files[0], ...prevProduct.images.slice(1)],
        primaryImage: files[0],
      };
    } else if (imageType === 'secondaryImages') {
      return {
        ...prevProduct,
        images: [...prevProduct.images, ...files],
        secondaryImages: [...prevProduct.secondaryImages, ...files], // Append archivos a secondaryImages array
      };
    }
    return prevProduct;
  });

  if (imageType === 'primaryImage') {
    setImageThumbnails([files[0], ...imageThumbnails.slice(1)]);
  } else if (imageType === 'secondaryImages') {
    setImageThumbnails([...imageThumbnails, ...files]);
  }
};

  const handleInputChange = (event) => {
    const { value, name } = event.target;

  if (name === 'categoryId') {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: value,
    }));
    setSelectedCategoryId(value);
  } else if (name === 'characteristics') {
    // Actualiza el estado de las características seleccionadas
    setSelectedCharacteristics(value);
    // Actualiza el estado del producto con las características seleccionadas
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      characteristics: value,
    }));
  } else {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }
};





  const buildImageUploadRequest = () => {
    const imageUploadRequest = new FormData();

  // Agregar primaryImage si existe
  if (newProduct.primaryImage) {
    imageUploadRequest.append('primaryImage', newProduct.primaryImage);
  }

  // Agregar secondaryImages si existen
  if (newProduct.secondaryImages && newProduct.secondaryImages.length > 0) {
    newProduct.secondaryImages.forEach((image, index) => {
      imageUploadRequest.append(`secondaryImages`, image);

    });
  }

    return imageUploadRequest;
  };

  const handleSubmit = async () => {
    try {
      //  Crear el producto y obtener el ID
      const productId = await createProduct(newProduct, user.token);


      //. Construir el FormData para las imágenes
      const imageUploadRequest = buildImageUploadRequest();

     { /*console.log('imageUplodRequest :');
        for (const entry of imageUploadRequest.entries()) {
          console.log(entry);
        }*/}

      //  Subir imágenes
      const imageUploadResponse = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/images?productId=${productId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
        body: imageUploadRequest,
      });

      //  Verificar la respuesta de la subida de imágenes
      if (imageUploadResponse.status === 201) {

        //  Si hay características seleccionadas, registrarlas
        if (selectedCharacteristics.length > 0) {
          const characteristicsRequest = selectedCharacteristics.map((characteristicId) => ({
            characteristicsId: characteristicId,
          }));

          const characteristicsResponse = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/characteristics/${productId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify(characteristicsRequest),
          });

          if (characteristicsResponse.status === 200) {
            handleSnackbarOpen();
          } else {
            console.error(`Error registering characteristics: ${characteristicsResponse.status} - ${characteristicsResponse.statusText}`);
          }
        } else {
          console.log('No characteristics to register.');
        }
      } else {
        console.error(`Error uploading images: ${imageUploadResponse.status} - ${imageUploadResponse.statusText}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };



  useEffect(() => {
    const fetchCharacteristics = async () => {
      try {
        console.log("CHARACTERISTICS EN EL UE: ", characteristics)
        setCharacteristics(characteristics);
      } catch (error) {
        console.error('Error fetching characteristics:', error);
      }
    };

    fetchCharacteristics();
  }, [characteristics]);



  const textFieldStyle = {
    marginBottom: '1rem',
  };

  return (
    <>
      <Container>
        <form>
          <div>
            <TextField
              label="Nombre del Producto"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              required // Agregar validación de requerido
              sx={textFieldStyle}
            />
          </div>
          <div>
            <TextField
              label="Descripción"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
              required // Agregar validación de requerido
              sx={textFieldStyle}
            />
          </div>
          <div>
          <FormControl fullWidth sx={textFieldStyle}>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoryId"
              value={newProduct.categoryId || ''}
              onChange={(event) => handleInputChange(event, 'categoryId')} // 'categoryId' como name
              required
            >
              <MenuItem value="">
                <em>Seleccionar categoría</em>
              </MenuItem>
              {categoriesList.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl >
          </div>
          <div>
            <FormControl fullWidth sx={textFieldStyle}>
              <InputLabel>Características</InputLabel>
              <Select
                name="characteristics"
                multiple
                value={selectedCharacteristics}
                onChange={(event) => {
                  const { value } = event.target;
                  setSelectedCharacteristics(value);
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    characteristics: value,
                  }));
                }}
              >
                {characteristics
                .slice() 
                .sort((a, b) => a.name.localeCompare(b.name)) 
                .map((characteristic) => (
                  <MenuItem key={characteristic.characteristicsId} value={characteristic.characteristicsId}>
                    {characteristic.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField
              label="Precio de Alquiler"
              name="rentalPrice"
              type="number"
              value={newProduct.rentalPrice}
              onChange={handleInputChange}
              fullWidth
              required
              sx={textFieldStyle}
            />
          </div>
          <div>
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={newProduct.stock}
              onChange={handleInputChange}
              fullWidth
              required
              sx={textFieldStyle}
            />
          </div>
          <div>
            <TextField
              label="Estado"
              name="status"
              value={newProduct.status}
              onChange={handleInputChange}
              fullWidth
              sx={textFieldStyle}
            />
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            {/* primaryImage */}
            <input
              accept="image/*"
              id="main-image-file"
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => handleImageChange(event, 'primaryImage')}
            />
            <label htmlFor="main-image-file">
              <Button variant="contained" component="span" sx={{backgroundColor:colors.terciaryColor, color:colors.blackColor, '&:hover': { backgroundColor:colors.terciaryColorHover }}}>
                Imagen Principal
              </Button>
            </label>

            {/* secondaryImages */}
            <input
              accept="image/*"
              id="additional-images-file"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={(event) => handleImageChange(event, 'secondaryImages')}
            />
            <label htmlFor="additional-images-file">
              <Button sx={{marginLeft:'1rem', backgroundColor:colors.terciaryColor, color:colors.blackColor, '&:hover': { backgroundColor:colors.terciaryColorHover }}} variant="contained" component="span">
                Imágenes Adicionales
              </Button>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            {imageThumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={URL.createObjectURL(thumbnail)}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
            ))}
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Button sx={{marginRight:'2rem', marginTop:'1.5rem', backgroundColor:colors.primaryColor, color:colors.blackColor, '&:hover': { backgroundColor:colors.primaryColorHover }}} variant="contained" onClick={handleSubmit}>
              Registrar
            </Button>
          </div>
        </form>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          ¡Producto registrado exitosamente!
        </MuiAlert>
      </Snackbar>
   </>
  );
};