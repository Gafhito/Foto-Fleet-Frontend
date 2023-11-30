// RentalCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

export const RentalCard = ({ rental, productDetails, ratedRentals, selectedRental, setSelectedRental, setIsModalOpen }) => {

    const isRated = ratedRentals.find((ratedRental) => ratedRental.rentalId === rental.rentalDetailId)?.isRated;

    const MAX_DESCRIPTION_LENGTH = 100;

    function formatarFecha(fecha) {
        const date = new Date(fecha);
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const anio = date.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }


    const handleRateButtonClick = (rental) => {
        setSelectedRental(rental);
        setIsModalOpen(true);
    };

  return (
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
            {rental.status === 'Completed' && (
                <Button variant="contained" onClick={() => handleRateButtonClick(rental)}>
                    Puntuar
                    </Button>
                )}
        </CardContent>
    </Card>
  );
};

