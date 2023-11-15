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

  console.log('Estado categoriesList: ', categoriesList)
  console.log('Estado selectedCategoryID:' + selectedCategoryId)

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
    console.log('CHARACTERISTICA VALUE: ', value);
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
    console.log('UE primaryImage: ', newProduct.primaryImage)
    console.log('UE newProduct: ', newProduct)
    console.log('imageUploadRequest dentro del 1ry: ', imageUploadRequest)
  }

  // Agregar secondaryImages si existen
  if (newProduct.secondaryImages && newProduct.secondaryImages.length > 0) {
    newProduct.secondaryImages.forEach((image, index) => {
      imageUploadRequest.append(`secondaryImages`, image);
      console.log('UE secondaryImages: ', newProduct.secondaryImages)
      console.log('UE newProduct: ', newProduct)
      console.log('imageUploadRequest dentro del 2dry: ', imageUploadRequest)
    });
  }
  return imageUploadRequest;
};

  const handleSubmit = async () => {
    try {
      //  Crear el producto y obtener el ID
      const productId = await createProduct(newProduct, user.token);

      console.log('newProduct handleSubmit: ', newProduct);
      console.log('Subiendo IMG productID: ' + productId);

      //. Construir el FormData para las imágenes
      const imageUploadRequest = buildImageUploadRequest();

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
        console.log('Product and images created successfully!');

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
            console.log('Characteristics registered successfully!');
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



  console.log('CHARACTERISTICS:' , characteristics)
  
  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        Registrar Producto
      </Typography>
      <form>
        <div>
          <TextField
            label="Nombre del Producto"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
            required // Agregar validación de requerido
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
          />
        </div>
        <div>
        {console.log('Categories prop antes del FormControl:', categories)}
        {console.log('newProduct.category: ' + newProduct.category)}
        <FormControl fullWidth>
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
        </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel>Características</InputLabel>
            <Select
              name="characteristics"
              multiple
              value={selectedCharacteristics}
              onChange={(event) => {
                const { value } = event.target;
                console.log('EVENT.TARGET:', event.target)
                setSelectedCharacteristics(value);
                setNewProduct((prevProduct) => ({
                  ...prevProduct,
                  characteristics: value,
                }));
              }}
            >
              {console.log('SELECTED CHARACTERISTIC EN EL DIV: ', selectedCharacteristics)}
              {characteristics.map((characteristic) => (
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
          />
        </div>
        <div>
          <TextField
            label="Estado"
            name="status"
            value={newProduct.status}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div>
          {/* primaryImage */}
          <input
            accept="image/*"
            id="main-image-file"
            type="file"
            style={{ display: 'none' }}
            onChange={(event) => handleImageChange(event, 'primaryImage')}
          />
          <label htmlFor="main-image-file">
            <Button variant="contained" component="span">
              Subir Imagen Principal
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
            <Button variant="contained" component="span">
              Subir Imágenes Adicionales
            </Button>
          </label>
        </div>
        <div>
          <Button variant="contained" onClick={handleSubmit}>
            Registrar
          </Button>
        </div>
      </form>
    </Container>
  );
};