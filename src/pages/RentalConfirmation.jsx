import { Card, CardContent, Typography, Button as MuiButton, Grid, CardMedia, FormControlLabel, Checkbox, Paper, Divider, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { Button } from '../components/common/button/Button';

import { colors } from '../utils/constants';
import { useAuth } from '../utils/AuthContext';

export const RentalConfirmation = ({ location }) => {

    const { cartItems } = location?.state || { cartItems: [] };
    const { user, getUserData } = useAuth();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);

    /* Snackbar */
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleBackToCart = () => {
        navigate(-1);
    };

    const handleCheckboxChange = () => {
        setIsAgreed((prevIsAgreed) => !prevIsAgreed);
    };

    useEffect(() => {
        // Llamar a getUserData cuando el componente se monta y actualizar userData
        const fetchUserData = async () => {
        try {
            const data = await getUserData();
            setUserData(data);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
        };

        fetchUserData();
    }, [getUserData]);


    console.log('USER DATA: ', userData)



    const handleReserveClick = async () => {

        const token = user ? user.token : null;

        if (!token) {

        setSnackbarMessage('Por favor, inicia sesión o regístrate para reservar un producto');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        // El usuario no está autenticado, redirige a la página de inicio de sesión o registro
        setTimeout(() => {
            navigate('/auth/login');
        }, 2000); 
        return;
        }

        if (!isAgreed) {
        setSnackbarMessage('Debes aceptar los términos y condiciones antes de reservar.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
        }


        try {
    
        console.log('JWT: ', token);
    
        const rentalData = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            startDate: item.startDate,
            endDate: item.endDate,
        }));
    
        console.log('RENTAL DATA: ', rentalData);
    
        const response = await fetch('http://ec2-52-91-182-42.compute-1.amazonaws.com/api/rental', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
    };


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

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString();
    };

    const total = cartItems.reduce(
        (accumulator, item) => accumulator + item.rentalPrice,0
    );


  return (
    <Box>
        <Paper
        elevation={0}
        sx={{
          width: '100%',
          padding: {xs: '0', sm:'1rem', md:'3rem'},
          height: {xs:'5rem', sm:'auto'},
          margin: '2rem 0',
          backgroundColor: colors.primaryColor,
          display: 'flex',
          alignItems: 'center',
        }}>
        <ArrowBackIcon sx={{ marginRight: '1.5rem', color: colors.blackColor, cursor: 'pointer', fontSize:'2rem' }} onClick={handleBackToCart}/>
        <Typography variant="h3" textAlign={'center'} >
          Ya casi!
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{padding:'2rem'}}>
        {cartItems.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia sx={{objectFit:"contain"}}
                component="img"
                alt={item.name}
                height="140"
                image={item.image}
              />
              <CardContent>
                <Divider sx={{width:'90%', margin:'auto'}}/>
                <Typography variant='h6' sx={{fontWeight:'bold'}}>Detalles de reserva: </Typography>
                <Typography variant="h6">Producto: {item.name}</Typography>
                <Typography variant="h6">Cantidad: {item.quantity}</Typography>
                <Typography variant="h6">Precio: U$S {item.rentalPrice}</Typography>
                <Typography variant="h6">Fecha de Inicio: {formatDate(item.startDate)}</Typography>
                <Typography variant="h6">Fecha de Fin: {formatDate(item.endDate)}</Typography>

                {/*  datos del usuario */}
                {userData && (
                  <Box>
                    <Divider sx={{width:'90%', margin:'auto'}}/>
                    <Typography variant="h6" sx={{fontWeight:'bold'}}>Datos del Usuario:</Typography>
                    <Typography variant="body1">Nombre: {userData.firstName} {userData.lastName}</Typography>
                    <Typography variant="body1">Email: {userData.email}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{width:'90%', margin:'auto'}}/>
      <Box sx={{marginTop:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
        <Typography variant="h4">Total de la reserva:</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {`$${total.toFixed(2)}`} {/* dos decimales */}
            </Typography>
        <FormControlLabel
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
            />
        <Button label={'Reservar'} mt={'1.5rem'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.primaryColorHover} variant="contained" onClick={handleReserveClick} />
      </Box>
      {renderSnackbar()}
    </Box>
  );
};




