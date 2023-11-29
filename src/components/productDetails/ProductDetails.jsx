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
  Button as MuiButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../utils/constants';

/* Carrousel imports */
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import './productDetails.css';
import { useProductContext } from '../../utils/ProductContext';
import { CustomCalendar } from '../common/calendar/Calendar';
import { Button } from '../common/button/Button';
import { ProductReviews } from '../productReviews/ProductReviews';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Helmet } from 'react-helmet-async';

import { Cart } from '../common/cart/Cart';
import { useCart } from '../../utils/CartContext';




export const ProductDetails = ({ product }) => {

  /* detalle de producto */
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { getProductById } = useProductContext();
  /* Reservas */
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rentalPrice, setRentalPrice] = useState(product.rentalPrice);
  /* Snackbar */
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  /* Politicas */
  const [isAgreed, setIsAgreed] = useState(false);


  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart, getCartItemCount, cartItems } = useCart();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleShowAllImages = () => {
    setShowAllImages((prevShowAllImages) => !prevShowAllImages);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getProductById(product.productId);
  

        const defaultStartDate = new Date();
        const defaultEndDate = new Date();
        defaultEndDate.setDate(defaultEndDate.getDate() + 1);

        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
      } catch (error) {
        console.error('Error al obtener detalles del producto', error);
      }
    };
  
    fetchProductDetails();
  }, [getProductById, product.id]);


  const calculateRentalPrice = (quantity, startDate, endDate) => {
   
    const basePrice = product.rentalPrice; 
    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const updatedRentalPrice = basePrice * quantity * numberOfDays;
  
    return updatedRentalPrice;
  };

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

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
  
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
      const updatedPrice = calculateRentalPrice(newQuantity, startDate, endDate);
      setRentalPrice(updatedPrice);
    } else {
      console.log('Invalid Quantity');
    }
  };

  const handleStartDateChange = (newStartDate) => {
    // validacion
    if (newStartDate > endDate) {
      setSnackbarMessage('La fecha de inicio no puede ser posterior a la fecha de fin');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    setStartDate(newStartDate);
    const updatedPrice = calculateRentalPrice(quantity, newStartDate, endDate);
    setRentalPrice(updatedPrice);
  };
  
  const handleEndDateChange = (newEndDate) => {
    // validacion
    if (startDate > newEndDate) {
      setSnackbarMessage('La fecha de fin no puede ser anterior a la fecha de inicio');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    setEndDate(newEndDate);
    const updatedPrice = calculateRentalPrice(quantity, startDate, newEndDate);
    setRentalPrice(updatedPrice);
  };


  /*const handleCheckboxChange = () => {
    setIsAgreed((prevIsAgreed) => !prevIsAgreed);
  };*/
  
  

  /*const handleReserveClick = async () => {

    const jwt = localStorage.getItem('token');

    if (!jwt) {

      setSnackbarMessage('Por favor, inicia sesión o regístrate para reservar un producto');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      // El usuario no está autenticado, redirige a la página de inicio de sesión o registro
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000); 
      return;
    }

    if (startDate > endDate) {
      setSnackbarMessage('La fecha de inicio no puede ser posterior a la fecha de fin');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (!isAgreed) {
      setSnackbarMessage('Debes aceptar los términos y condiciones antes de reservar.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }


    try {
  
      console.log('JWT: ', jwt);
  
      const rentalData = {
        productId: product.productId,
        quantity: quantity,
        startDate: startDate,
        endDate: endDate,
      };
  
      console.log('RENTAL DATA: ', rentalData);
  
      const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/rental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify([rentalData]),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse.message);
        setSnackbarMessage(`Error al reservar: ${errorResponse.message}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
  
        return;
      }
  
      const result = await response.json();
      setSnackbarMessage('Reserva exitosa');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al reservar:', error);
      setSnackbarMessage('API Error al reservar');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };*/


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };
  
  const renderSnackbar = () => (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
      {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );


  const handleAddToCartClick = () => {
    const newCartItem = {
      productId: product.productId,
      name: product.name,
      quantity: quantity,
      rentalPrice: rentalPrice,
      startDate: startDate,
      endDate: endDate,
      image: product.images[0]?.url || '',
    };

    if (startDate > endDate) {
      setSnackbarMessage('La fecha de inicio no puede ser posterior a la fecha de fin');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    addToCart(newCartItem);
  
    // Actualizar la cantidad de elementos en el carrito
    getCartItemCount();

    setSnackbarMessage('Producto agregado correctamente!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  
    console.log('Cart Items:', newCartItem);
  };


  const renderCartSnackbar = () => (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
  
  


  /*const handleOpenCart = () => {
    setCartOpen(true);
    console.log("Carrito Open");
    console.log("Cart Items:", cartItems); // Verifica que cartItem tenga los elementos correctos
  };
  
  const handleCloseCart = () => {
    setCartOpen(false);
  };*/
  
  
  
  

  return (
    <>
    

      <Helmet>
        <title>{product.name} - Foto Fleet</title>
        <meta name="description" content={product.description} />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.images[0]?.url || ''} />
      </Helmet>

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

                  <ProductReviews productId={product.productId} productName={product.name} />
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
              <MuiButton onClick={toggleShowAllImages}>
                {showAllImages ? 'Ver menos' : 'Ver más'}
              </MuiButton>
            </ListItem>
          )}

      <Box sx={{ marginTop: '2rem', marginLeft: '3rem' }}>
        <FormControl sx={{ minWidth: 120, marginRight: '1rem' }}>
          <InputLabel id="quantity-label"></InputLabel>
          <Select
            labelId="quantity-label"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {[...Array(product.stock).keys()].map((index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* CALENDARIOS  */}

        <Box sx={{display:'flex', marginTop:'2rem'}}>

          
          <CustomCalendar
            label={'Fecha Desde'}
            value={startDate}
            onChange={handleStartDateChange}
            rentedDates={product.rentalDate}
          />
          <CustomCalendar
            label={'Fecha Hasta'}
            value={endDate}
            onChange={handleEndDateChange}
            rentedDates={product.rentalDate}
          />

        </Box>

         {/* CALENDARIOS  */}

         <Typography  variant="h6" textAlign={'left'} sx={{ margin: '1.5rem auto', width:'fit-content' }}>
          Precio de alquiler: US$ {rentalPrice}
        </Typography>


        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          {/*<FormControlLabel
            control={<Checkbox checked={isAgreed} onChange={handleCheckboxChange} />}
            label={
              <>
                Acepto los{' '}
                <Link
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  to={'/politicas'}
                  target='_blank'
                >
                  términos y condiciones
                </Link>
              </>
            }
            sx={{ marginTop: '1rem' }}
          />*/}

          <Button label={'Añadir al carrito'} mt={'1.5rem'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.primaryColorHover} variant="contained" onClick={handleAddToCartClick} />
          {/*<Button label={'Ver carrito'} mt={'1.5rem'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.primaryColorHover} variant="contained" onClick={handleOpenCart} />
          <Button label={'Reservar'} mt={'1.5rem'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.primaryColorHover} variant="contained" onClick={handleReserveClick} />*/}
        </Box>

      </Box>
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
        {renderSnackbar()}
        {/*<Cart cartItems={cartItems} open={cartOpen} onClose={handleCloseCart} />*/}
    </Box>
  </>
  );
  
};