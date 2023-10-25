import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from '../../utils/constants';

import './productDetails.css';

export const ProductDetails = ({ product }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const toggleShowAllImages = () => {
    setShowAllImages((prevShowAllImages) => !prevShowAllImages);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: '7.5rem 0 0 0',
        height: 'auto',
      }}
    >
      {/* Sub header */}
      <Paper
        elevation={0}
        style={{
          width: '100%',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: colors.secondaryColor,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon sx={{ marginLeft: '1.5rem' }} />
        </Link>
        <Typography variant="h5" textAlign={'start'} sx={{ marginLeft: '1rem' }}>
          {product.title}
        </Typography>
      </Paper>

      {/* Contenido Principal */}
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} className='main_content_container'>
          {/* Imagen Principal */}
          <Card sx={{ marginLeft: '2rem' }}>
            <CardMedia component="img" height="300px" image={product.images[selectedImageIndex].img_url} alt={product.title} />
          </Card>
          <Grid item xs={12} sm={6}>
            {/* Descripcion */}
            <Box sx={
              {marginTop: '2rem'}
            }>
              <Typography variant="h6">Descripcion</Typography>
              <Typography variant="body2" color="textSecondary" textAlign={'left'} sx={{width:'100%'}}>
                {product.description}
              </Typography>
              <Typography variant="h6">Caracteristicas</Typography>
              <Typography variant="body2" color="textSecondary">
                {/* características */}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* img adicionales */}
            <Grid container spacing={1}>
              {product.images.slice(0, showAllImages ? product.images.length : 4).map((image, index) => (
                <Grid item xs={5} key={index} className='additional_img_container'>
                  <Card sx={{ marginLeft: '2rem', width: '75%'}} onClick={() => handleImageClick(index)}>
                    <CardMedia component="img" height="150" image={image.img_url} alt={`Additional Image ${index + 1}`}/>
                  </Card>
                </Grid>
              ))}
            </Grid>
          {product.images.length > 4 && (
            <ListItem>
              <Button onClick={toggleShowAllImages}>
                {showAllImages ? 'Ver menos' : 'Ver más'}
              </Button>
            </ListItem>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};