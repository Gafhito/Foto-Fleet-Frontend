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
  });

  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); // estado para trackear el ID de la categoria
  const [mainImage, setMainImage] = useState(null);
  const { getCategories, user } = useAuth();

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



const handleImageChange = (event, imageType, setNewProduct) => {
  const files = event.target.files;

  setNewProduct((prevProduct) => {
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
        secondaryImages: [...prevProduct.secondaryImages, ...files], // Append files to secondaryImages array
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
  } else {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }
};


useEffect(() => {
  const imageUploadRequest = new FormData();

  // Append primaryImage
  if (newProduct.primaryImage) {
    imageUploadRequest.append('primaryImage', newProduct.primaryImage);
    console.log('UE primaryImage: ', newProduct.primaryImage)
  }

  // Append secondaryImages
  if (newProduct.secondaryImages) {
    newProduct.secondaryImages.forEach((image, index) => {
      imageUploadRequest.append(`secondaryImages[${index}]`, image);
      console.log('UE secondaryImages: ', newProduct.secondaryImages)
    });
  }

  console.log('imageUploadRequest: ', imageUploadRequest);
}, [newProduct.primaryImage, newProduct.secondaryImages]);


const handleSubmit = async () => {
  try {
    // se crea el producto y devuelve ID
    const productId = await createProduct(newProduct, user.token);

    console.log('newProduct handleSubmit: ', newProduct);
    console.log('Subiendo IMG productID: ' + productId);

    // creamos FormData
    const imageUploadRequest = new FormData();

    console.log(`antes del for: \n length: ${newProduct.images.length} \n`, newProduct.images)

    for (let index = 0; index < newProduct.images.length; index++) {
      imageUploadRequest.append('images[]', newProduct.images[index]);
      console.log(`dentro del for: \n index: ${index} \n ${newProduct.images[index]}`)
    }

    console.log('imageUploadRequest: ', imageUploadRequest);

    const imageUploadResponse = await fetch(`http://ec2-52-91-182-42.compute-1.amazonaws.com/api/products/images?productId=${productId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
      body: imageUploadRequest,
    });

    console.log('body IMG request: ', imageUploadRequest);

    if (imageUploadResponse.status === 201) {
      console.log('Product and images created successfully!');
    } else {
      console.error(`Error uploading images: ${imageUploadResponse.status} - ${imageUploadResponse.statusText}`);
    }
  } catch (error) {
    console.error('Error creating product:', error);
  }
};


  
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
            onChange={(event) => handleImageChange(event, 'primaryImage', setNewProduct)}
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
            onChange={(event) => handleImageChange(event, 'secondaryImages', setNewProduct)}
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