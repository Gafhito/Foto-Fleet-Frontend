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

export const ProductForm = ({ onSubmit, categories }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    rentalPrice: '',
    stock: '',
    status: 'Disponible',
    imageUrl: '',
    additionalImages: [],
  });

  const [categoriesList, setCategoriesList] = useState(categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); // estado para trackear el ID de la categoria

  console.log('Estado categoriesList: ', categoriesList)
  console.log('Estado selectedCategoryID:' + selectedCategoryId)

  // Inicializamos el valor de categoria para el primer valor
  useEffect(() => {
    if (categories.length > 0) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        category: categories[0].name, // Set the default category value
      }));
      console.log('categories.lenght: ' + categories.length)
      console.log('categories[0].name: ' + categories[0].name)
      console.log('newProduct.category: ' + newProduct.category)
    }
  }, [categories]);


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

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    console.log('Selected value: ' + value)
    console.log('Selected name: ' + name)

    if (name === 'category') {
      // Buscamos la categoria que matchee con el valor seleccionado
      const selectedCategory = categories.find((category) => category.name === value);

      console.log('categories del prop: ', categories)
      console.log('selectedCategory: ' , selectedCategory)
      console.log('selectedCategory name del prop: ', selectedCategory.name)
      console.log('value: ' + value)
      
      if (selectedCategory) {

        const categoryID = mapCategoryToID(selectedCategory.name);
        console.log('categoryID de la categoria seleccionada es: ' + categoryID)
        // Set the category to the ID of the selected category
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          category: selectedCategory.name,
        }));
        setSelectedCategoryId(categoryID);

        console.log('newProduct en handleInoutChange: ' , newProduct)
      } else {
        console.error('La categoria no se encontro:', value);
      }
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      imageUrl,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const additionalImages = Array.from(files).map((file) => URL.createObjectURL(file));

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      additionalImages,
    }));
  };

  const handleSubmit = () => {
    // Agregar validación del formulario aquí

    // Construir el objeto requestBody
    const requestBody = {
      name: newProduct.title,
      description: newProduct.description,
      categoryId: mapCategoryToID(newProduct.category),
      rentalPrice: parseFloat(newProduct.rentalPrice), // Convertir a número si es necesario
      stock: parseInt(newProduct.stock, 10), // Convertir a número si es necesario
      status: newProduct.status,
      images: [
        {
          url: newProduct.imageUrl,
          primary: true,
        }
      ]
    };


    console.log('handleSubmit requestBody: ', requestBody)

    onSubmit(requestBody);
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
            name="title"
            value={newProduct.title}
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
            name="category"
            value={newProduct.category || ''}
            onChange={(event) => handleInputChange(event, 'category')} // Pass 'category' as the name
            required
          >
            <MenuItem value="">
              <em>Seleccionar categoría</em>
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category.name}>
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
            required // Agregar validación de requerido
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
            required // Agregar validación de requerido
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
          <input
            accept="image/*"
            id="main-image-file"
            type="file"
            style={{ display: 'none' }}
            onChange={handleMainImageChange}
          />
          <label htmlFor="main-image-file">
            <Button variant="contained" component="span">
              Subir Imagen Principal
            </Button>
          </label>
        </div>
        {newProduct.imageUrl && (
          <div>
            <Typography>{newProduct.imageUrl}</Typography>
          </div>
        )}
        <div>
          <input
            accept="image/*"
            id="additional-images-file"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="additional-images-file">
            <Button variant="contained" component="span">
              Subir Imágenes Adicionales
            </Button>
          </label>
        </div>
        {newProduct.additionalImages.map((image, index) => (
          <div key={index}>
            <Typography>{image}</Typography>
          </div>
        ))}
        <div>
          <Button variant="contained" onClick={handleSubmit}>
            Registrar
          </Button>
        </div>
      </form>
    </Container>
  );
};