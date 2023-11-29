import { useEffect, useState } from 'react';
import { useRentalContext } from '../utils/RentalContext';
import { useProductContext } from '../utils/ProductContext';
import { RentalCard } from '../components/common/rentalCard/RentalCards';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';


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

  const [hover, setHover] = useState(-1);


  const pendingRentals = rentalDetails.filter(({ rental }) => rental.status === 'Pending');
  const canceledRentals = rentalDetails.filter(({ rental }) => rental.status === 'Canceled');
  const completedRentals = rentalDetails.filter(({ rental }) => rental.status === 'Completed');

  const labels = {
    0.5: '0.5 Estrellas',
    1: '1 Estrella',
    1.5: '1.5 Estrellas',
    2: '2 Estrellas',
    2.5: '2.5 Estrellas',
    3: '3 Estrellas',
    3.5: '3.5 Estrellas',
    4: '4 Estrellas',
    4.5: '4.5 Estrellas',
    5: '5 Estrellas',
  };



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


  const renderRentalCards = (rentals, title) => (
    <Accordion key={title} sx={{padding:'2rem', margin:'1rem auto', backgroundColor:colors.secondaryColor, boxShadow:'none'}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ margin:'auto'}}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className='accordion-details' sx={{ margin:'auto', backgroundColor:colors.backgroundColor}}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
          {rentals.map(({ rental, productDetails }) => (
            <Grid item xs={12} sm={6} md={4} key={rental.rentalDetailId} sx={{ width: '90vw', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <RentalCard rental={rental} productDetails={productDetails} ratedRentals={ratedRentals} selectedRental={selectedRental} setSelectedRental={setSelectedRental} setIsModalOpen={setIsModalOpen}/>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );


  return (
    <div style={{marginTop:'6rem'}}>
      <h2>Mis Reservas</h2>
      {renderRentalCards(pendingRentals, 'Pendientes')}
      {renderRentalCards(canceledRentals, 'Canceladas')}
      {renderRentalCards(completedRentals, 'Completadas')}

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
          <Rating sx={{marginBottom:'2.5rem'}}
            name="hover-feedback"
            value={ratingValue}
            precision={0.5}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover === -0.5 ? 0.5 : newHover);
            }}
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
