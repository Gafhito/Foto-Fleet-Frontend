import React, { useEffect, useState } from 'react';
import { useRentalContext } from '../utils/RentalContext';
import { useProductContext } from '../utils/ProductContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const Rentals = () => {
  const { rentals, loading } = useRentalContext();
  const { getProductById } = useProductContext();
  const [rentalDetails, setRentalDetails] = useState([]);

  function formatarFecha(fecha) {
    const date = new Date(fecha);
  
    // Obtener día, mes y año
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const anio = date.getFullYear();
  
    // Formatear la fecha
    const fechaFormateada = `${dia}/${mes}/${anio}`;
  
    return fechaFormateada;
  }

  const MAX_DESCRIPTION_LENGTH = 50;

  console.log('RENTALS: ', rentals)

  useEffect(() => {
    const fetchRentalDetails = async () => {
      const details = await Promise.all(
        rentals.map(async (rental) => {
          const productDetails = await getProductById(rental.productId);

          console.log('PRODUCT DETAILS: ', productDetails)
          return { rental, productDetails };
        })
      );
      setRentalDetails(details);
      console.log('DETAILS: ', details)
    };

    fetchRentalDetails();
  }, [rentals, getProductById]);

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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
