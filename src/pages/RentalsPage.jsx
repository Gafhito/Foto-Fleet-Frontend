import { useEffect, useState } from 'react';
import { useRentalContext } from '../utils/RentalContext';
import { useProductContext } from '../utils/ProductContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { colors } from '../utils/constants';

export const Rentals = () => {
  const { rentals, loading } = useRentalContext();
  const { getProductById, getRatingsByProductId, sendReview,  showSnackbar, snackbarMessage, } = useProductContext();
  const [rentalDetails, setRentalDetails] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratedRentals, setRatedRentals] = useState([]);

  function formatarFecha(fecha) {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  const MAX_DESCRIPTION_LENGTH = 50;

  useEffect(() => {
    const fetchRatedRentals = async () => {
      try {
        const ratedRentalsData = await Promise.all(
          rentals.map(async (rental) => {
            try {
              const ratings = await getRatingsByProductId(rental.productId);
              return { rentalId: rental.rentalDetailId, isRated: ratings && ratings.length > 0 };
            } catch (error) {
              if (error.response && error.response.status === 404) {
                // El recurso no fue encontrado, lo consideramos como sin calificación
                return { rentalId: rental.rentalDetailId, isRated: false };
              }
              
              return { rentalId: rental.rentalDetailId, isRated: false };
            }
          })
        );
        setRatedRentals(ratedRentalsData);
      } catch (error) {
        console.error('Error al obtener información de puntuación:', error);
      }
    };

    fetchRatedRentals();
  }, [rentals, getRatingsByProductId]);

  console.log('RATEDRENTALS: ', ratedRentals)

  useEffect(() => {
    const fetchRentalDetails = async () => {
      const details = await Promise.all(
        rentals.map(async (rental) => {
          const productDetails = await getProductById(rental.productId);
          return { rental, productDetails };
        })
      );
      setRentalDetails(details);
    };

    fetchRentalDetails();
  }, [rentals, getProductById]);

  const handleRateButtonClick = (rental) => {
    setSelectedRental(rental);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRatingChange = (event) => {
    setRatingValue(Number(event.target.value));
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSendReview = async () => {
    await sendReview(selectedRental.productId, ratingValue, reviewText);
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <div style={{marginTop:'6rem'}}>
      <h2>Mis Reservas</h2>
      <Grid container spacing={4} sx={{display:'flex', justifyContent:'center', alignItems:'center', margin:'3rem auto'}}>
        {rentalDetails?.map(({ rental, productDetails }) => (
          <Grid item xs={12} sm={6} md={4} key={rental.rentalDetailId} sx={{width:'90vw', margin:'auto',  display:'flex', justifyContent:'center', alignItems:'center' }}>
            <Card sx={{ width: '20rem'}}>
              <CardMedia
                component="img"
                height="200"
                image={productDetails.images[0].url}
                alt={productDetails.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {productDetails.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descripción: {productDetails.description.length > MAX_DESCRIPTION_LENGTH ? `${productDetails.description.substring(0, MAX_DESCRIPTION_LENGTH)}...` : productDetails.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: U$S {productDetails.rentalPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de Inicio: {formatarFecha(rental.startDate)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fecha de Fin: {formatarFecha(rental.endDate)}
                </Typography>
                <Typography variant="body2" sx={{backgroundColor: rental.status == 'Pending' ? 'yellow' : rental.status === 'Canceled' ? 'red' : 'green', width:'fit-content', margin:' .5rem auto', color:'black', fontWeight:'bolder'}}>
                  Estado: {rental.status}
                </Typography>
                {rental.status === 'Completed' && !ratedRentals.find((ratedRental) => ratedRental.rentalId === rental.rentalDetailId)?.isRated && (
                  <Button variant="contained" onClick={() => handleRateButtonClick(rental)}>
                    Puntuar
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para enviar la revisión */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 'auto',
                      maxHeight: '70vh',
                      overflowY: 'hidden',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '2rem',
                      boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
                      display:'flex',
                      flexDirection:'column',
                      alignItems:'center',
                      justifyContent:'center'
            }}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:'1rem'}}>
            Puntuar Producto
          </Typography>
          <TextField sx={{marginBottom:'1rem'}}
            label="Calificación"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 5 } }}
            value={ratingValue}
            onChange={handleRatingChange}
          />
          <TextField sx={{marginBottom:'1rem'}}
            label="Comentario"
            multiline
            rows={4}
            value={reviewText}
            onChange={handleReviewTextChange}
          />
          <Button variant="contained" onClick={handleSendReview} >
            Calificar
          </Button>
        </div>
      </Modal>



      <Snackbar
          open={Boolean(snackbarMessage.open)}
          autoHideDuration={3000}
          onClose={() => showSnackbar('', '', false)} 
        >
          <Alert
            severity={snackbarMessage.severity}
            onClose={() => showSnackbar('', '', false)} 
          >
            {snackbarMessage.message}
          </Alert>
      </Snackbar>
    </div>
  );
};
