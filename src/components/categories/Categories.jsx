import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';

import categoria1 from '../../assets/img/slide1.jpg';
import categoria2 from '../../assets/img/slide2.jpg';
import categoria3 from '../../assets/img/slide5.jpg';
import categoria4 from '../../assets/img/slide6.jpg';

const categoriesArr = [
  {
    nombre: 'Cámaras Digitales',
    imagen: categoria1,
  },
  {
    nombre: 'Luces',
    imagen: categoria2,
  },
  {
    nombre: 'Pantallas',
    imagen: categoria3,
  },
  {
    nombre: 'Lentes',
    imagen: categoria4,
  },
];

export const Categories = () => {
  return (

    <>

      <Typography variant='h3' sx={{marginTop:'3rem'}}>Nuestras Categorias</Typography>
      <Container sx={{mt:'2rem'}}>
        <Grid container spacing={3}>
            {categoriesArr.map((categorie, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ transition: 'transform 0.3s', '&:hover' : {transform: 'scale(1.05)'}}}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={categorie.imagen}
                    alt={categorie.nombre}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {categorie.nombre}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};