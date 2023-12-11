
import { useState } from 'react';
import { Modal, Backdrop, Fade, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useRentalContext } from '../../utils/RentalContext';
import { colors } from '../../utils/constants';

export const PendingReservationsModal = ({ isOpen, onClose }) => {
  const { getPendingRentalsByEmail, getActiveRentalsByEmail } = useRentalContext();
  const [email, setEmail] = useState('');
  const [pendingRentals, setPendingRentals] = useState([]);
  const [activeRentals, setActiveRentals] = useState([]);
  const [showPending, setShowPending] = useState(true);

  const handleGetReservations = async () => {
    try {
      if (showPending) {
        const rentals = await getPendingRentalsByEmail(email);
        setPendingRentals(rentals);
      } else {
        const rentals = await getActiveRentalsByEmail(email);
        setActiveRentals(rentals);
      }
    } catch (error) {
      console.error('Error al obtener reservas:', error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            maxHeight: '70vh',
            overflowY: 'scroll',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
            '&::-webkit-scrollbar': {
              width: '12px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: `${colors.terciaryColor}`,
              borderRadius: '6px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: `${colors.secondaryColor}`,
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '8px'
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Ingresar Email para Reservas
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowPending(!showPending)}
          >
            Mostrar {showPending ? 'Reservas Activas' : 'Reservas Pendientes'}
          </Button>

          {/* Mostrar la lista de reservas */}
          {showPending ? (
            <List>
              {pendingRentals.map((reservation) => (
                <ListItem key={reservation.rentalDetailId}>
                  <ListItemText
                    primary={`Producto ID: ${reservation.productId}`}
                    secondary={`Cantidad: ${reservation.quantity}, Precio: ${reservation.rentalPrice}, Estado: ${reservation.status}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <List>
              {activeRentals.map((reservation) => (
                <ListItem key={reservation.rentalDetailId}>
                  <ListItemText
                    primary={`Producto ID: ${reservation.productId}`}
                    secondary={`Cantidad: ${reservation.quantity}, Precio: ${reservation.rentalPrice}, Estado: ${reservation.status}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

