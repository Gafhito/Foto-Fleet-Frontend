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
  Button,
} from '@mui/material';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from '../../utils/constants';
import Slider from 'react-slick'; // Importar el componente Slider
import 'slick-carousel/slick/slick.css'; // Importar estilos del carrusel
import 'slick-carousel/slick/slick-theme.css'; // Importar estilos del carrusel

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
  <Box sx={{
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

      
      {!isSmallScreen ? (
        <>
          <Grid container spacing={2} className='main_content_grid_container' sx={{marginLeft: '3rem',justifyContent:'start', alignItems:'center', height:'30rem'}}>
            <Grid item xs={12} sm={6} className='main_content_container'>
              <Card>
                <CardMedia component="img" height="300px" image={product.images[selectedImageIndex].img_url} alt={product.title} />
              </Card>
              <Grid item xs={12} sm={6} sx={{display: {xs: 'none', md:'block'}, maxWidth:'90%'}} className='detail_description_container'>
                <Box sx={
                    {marginTop: '2rem', width:'100%'}
                }>
                  <Typography variant="h6" textAlign={'left'}>Descripcion</Typography>
                  <Typography variant="body2" color="textSecondary" textAlign={'left'}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" textAlign={'left'}>Caracteristicas</Typography>
                  <Typography variant="body2" textAlign={'left'} color="textSecondary">
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        <Grid item xs={12} sm={6} sx={{maxWidth:'40%', marginTop: {md: '-29.5rem', lg:'-28.5rem'}, marginLeft: {md: '55vw' ,lg:'50vw'}}}>
          <Grid container spacing={1}>
            {product.images.slice(0, showAllImages ? product.images.length : 4).map((image, index) => (
              <Grid item xs={5} key={index} className='additional_img_container'>
                <Card sx={{ marginLeft: '2rem', width: '75%' }} onClick={() => handleImageClick(index)}>
                  <CardMedia component="img" height="150" image={image.img_url} alt={`Additional Image ${index + 1}`} />
                </Card>
              </Grid>
            ))}
          </Grid>
          {product.images.length > 4 && (
            <ListItem sx={{display: {xs: 'none', md: 'block'}}}>
              <Button onClick={toggleShowAllImages}>
                {showAllImages ? 'Ver menos' : 'Ver más'}
              </Button>
            </ListItem>
          )}
        </Grid>
      </>
      ) : 
      (
          <Box sx={{marginTop:'5rem'}}>
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardMedia component="img" height="300px" image={product.images[selectedImageIndex].img_url} alt={product.title} />
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Slider {...settings} className='slider_custom' style={{margin: '2rem auto', width: '50%'}}>
                {product.images.map((image, index) => (
                  <Card key={index} onClick={() => handleImageClick(index)} className='img_slider_container'> 
                    <CardMedia component="img" height='75' image={image.img_url} alt={`Additional Image ${index + 1}`} sx={{width:'100px'}}/>
                  </Card>
                ))}
              </Slider>
              <Box sx={
                {margin: '2rem auto', display:'flex', flexDirection:'column', alignItems:'start', width:'60%'}
                  }>
                <Typography variant="h6">Descripcion</Typography>
                <Typography variant="body2" color="textSecondary" textAlign={'left'} sx={{width:'100%'}}>
                  {product.description}
                </Typography>
                <Typography variant="h6">Caracteristicas</Typography>
                <Typography variant="body2" color="textSecondary"></Typography>
              </Box>
           </Grid>
         </Box>
        )}
    </Box>
  );
};