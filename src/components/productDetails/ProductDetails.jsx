import { useState, useContext, useEffect } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../utils/constants';
import Slider from 'react-slick'; // Importar el componente Slider
import 'slick-carousel/slick/slick.css'; // Importar estilos del carrusel
import 'slick-carousel/slick/slick-theme.css'; // Importar estilos del carrusel

import './productDetails.css';
import { useProductContext } from '../../utils/ProductContext';

export const ProductDetails = ({ product }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { getProductById } = useProductContext();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleShowAllImages = () => {
    setShowAllImages((prevShowAllImages) => !prevShowAllImages);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };


  console.log('Product pasado por prop: ', product)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log('product.id del PD: ', product.productId)
        const details = await getProductById(product.productId);
        console.log('Detalles del producto:', details);
      } catch (error) {
        console.error('Error al obtener detalles del producto', error);
      }
    };

    fetchProductDetails();
  }, [getProductById, product.id]);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
  <Box sx={{
      width: '100%',
      margin: '3.5rem 0 0 0',
      height: 'auto',
      }}
    >
      {/* Sub header */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          padding: {xs: '0', sm:'1rem', md:'3rem'},
          height: {xs:'5rem', sm:'auto'},
          marginBottom: '1rem',
          backgroundColor: colors.primaryColor,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon sx={{ marginLeft: '1.5rem' }} />
        </Link>
        <Typography variant="h5" textAlign={'start'} sx={{ marginLeft: '1rem' }}>
          {product.name}
        </Typography>
      </Paper>

      
      {!isSmallScreen ? (
        <>
          <Grid container spacing={2} className='main_content_grid_container' sx={{marginLeft: '3rem',justifyContent:'start', alignItems:'center', height:'30rem'}}>
            <Grid item xs={12} sm={6} className='main_content_container'>
              <Card sx={{boxShadow:'none', background:'transparent'}}>
                <CardMedia component="img" height="300px" image={product.images[selectedImageIndex]?.url} alt={product.name} />
              </Card>
              <Grid item xs={12} sm={9} sx={{ display: {xs: 'none', md:'block'} }} className='detail_description_container'>
                <Box sx={
                    {marginTop: '2rem', width:'100%'}
                }>
                  <Typography variant="h6" textAlign={'left'} sx={{marginBottom:'.5rem'}}>Descripción</Typography>
                  <Typography variant="body2" color="textSecondary" textAlign={'left'} sx={{width:'100%'}}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" textAlign={'left'} sx={{margin:'1rem'}}>Características</Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop:'1rem', width:'100%', margin:'auto', paddingBottom:'2rem', textAlign: 'left' }}>
                    <div style={{ columnCount: 2, columnGap: '16px' }}>
                      {product.characteristics?.map((characteristic, index) => (
                        <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems:'center' }}>
                          <FontAwesomeIcon icon={characteristic.urlIcono.replace(/\s/g, '-').toLowerCase()} style={{marginRight:'.5rem'}}/>
                          <div>
                            <Typography variant="subtitle2">{characteristic.name}</Typography>
                            {/*<Typography variant="body2">{characteristic.description}</Typography>*/}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        <Grid item xs={12} sm={6} sx={{maxWidth:'40%', marginTop: {md: '-29.5rem', lg:'-28.5rem'}, marginLeft: {md: '55vw' ,lg:'50vw'}}}>
          <Grid container spacing={1}>
            {product.images?.slice(0, showAllImages ? product.images.length : 4).map((image, index) => (
              <Grid item xs={5} key={index} className='additional_img_container'>
                <Card sx={{ marginLeft: '2rem', width: '13rem', boxShadow:'none', padding:'.5rem', borderRadius:'.5rem', cursor:'pointer', height: {xs: '75px', sm:'100px', md:'100px'} }} onClick={() => handleImageClick(index)}>
                  <CardMedia component="img" height="150" image={image.url} alt={`Additional Image ${index + 1}`} sx={{height: {xs: '75px', sm:'100px', md:'100px'}, objectFit:'contain'}}  />
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
            <Grid container spacing={2} sx={{display:'flex', justifyContent:'center', width: { xs:'75%' }, margin:'auto'}}>
              <Grid item xs={12} sm={6}>
                <Card sx={{boxShadow:'none', backgroundColor:'transparent' }}>
                  <CardMedia component="img" height="300px" image={product.images[selectedImageIndex].url} alt={product.title} />
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Slider {...settings} className='slider_custom' style={{margin: '2rem auto', width: '50%'}}>
                {product.images.map((image, index) => (
                  <Card key={index} onClick={() => handleImageClick(index)} className='img_slider_container' sx={{boxShadow:'none', backgroundColor:'transparent'}}> 
                    <CardMedia component="img" height='75' image={image.url} alt={`Additional Image ${index + 1}`} sx={{width:'100px'}}/>
                  </Card>
                ))}
              </Slider>
              <Box sx={
                {margin: '2rem auto', display:'flex', flexDirection:'column', alignItems:'start', width:'60%'}
                  }>
                <Typography variant="h6" sx={{marginBottom:'.5rem'}}>Descripcion</Typography>
                <Typography variant="body2" color="textSecondary" textAlign={'left'} sx={{width:'100%'}}>
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{marginTop:'1.5rem'}}>Caracteristicas</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop:'2rem', width:'100%', margin:'auto', paddingBottom:'2rem', textAlign: 'left' }}>
                    <div style={{ columnCount: 1 }}>
                      {product.characteristics.map((characteristic, index) => (
                        <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems:'center' }}>
                          <FontAwesomeIcon icon={characteristic.urlIcono.replace(/\s/g, '-').toLowerCase()} style={{marginRight:'.5rem'}}/>
                          <div>
                            <Typography variant="subtitle2">{characteristic.name}</Typography>
                            {/*<Typography variant="body2">{characteristic.description}</Typography>*/}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </Box>
           </Grid>
         </Box>
        )}
    </Box>
  );
};