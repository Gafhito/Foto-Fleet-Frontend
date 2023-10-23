import { useState } from 'react';
import { Button, Container, TextField, Typography, Input } from '@mui/material';

export const ProductForm = ({ onSubmit }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    image: null,
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0]; // Solo se permite una imagen principal

    // Almacenar la imagen principal como un objeto con el campo 'img_url'
    const mainImageData = file
      ? {
          img_url: URL.createObjectURL(file),
        }
      : null;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: mainImageData,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);

    // almacenamos las imágenes adicionales como objetos con el campo 'img_url' para cada imagen
    const imagesData = imagesArray.map((image) => ({
      img_url: URL.createObjectURL(image),
    }));

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...imagesData],
    }));
  };

  const handleSubmit = () => {
    onSubmit(newProduct);
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        Registrar Producto
      </Typography>
      <form>
        <div>
          <TextField
            label="Título"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div>
          <TextField
            label="Descripción"
            name="description"
            value={newProduct.description}
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
        {newProduct.image && (
          <div>
            <Typography>{newProduct.image.img_url}</Typography>
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
        {newProduct.images.map((image, index) => (
          <div key={index}>
            <Typography>{image.img_url}</Typography>
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