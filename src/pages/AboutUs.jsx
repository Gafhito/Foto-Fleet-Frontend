import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const customTheme = createTheme();

export const AboutUs = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Container sx={{ marginTop: '7rem' }}>
        <Typography variant="h2" sx={{ marginBottom: '2rem' }}>
          Bienvenidos a nuestro Proyecto: Sistema de Reservas Fotográficas
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
          Nos complace presentarles nuestro proyecto final para la carrera
          Certified Tech Developer de Digital House. Este proyecto representa
          la culminación de nuestros esfuerzos durante cuatro sprints de dos
          semanas cada uno. Nuestro equipo, compuesto por Nelson Pataquiva,
          Gonzalo Ferrari, Tomas Conesa, Erick Ramirez, Marcelo Fullana, Joel,
          Michael Armesto, y Ailén, ha trabajado arduamente para desarrollar
          una plataforma web dedicada a la reserva de equipos fotográficos y
          accesorios.
        </Typography>

        <Grid container spacing={3} sx={{marginTop:"3rem"}}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
                Objetivo del Proyecto
              </Typography>
              <Typography variant="body1">
                Nuestro objetivo principal fue crear una plataforma intuitiva y
                eficiente que permita a los usuarios reservar equipos
                fotográficos y accesorios de manera sencilla. Nos esforzamos
                por proporcionar una experiencia fluida desde la selección de
                productos hasta la confirmación de la reserva.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
                Tecnologías Utilizadas
              </Typography>
              <Typography variant="body1">
                En este proyecto, empleamos tecnologías de vanguardia.
                Además, implementamos Material-UI para el diseño y la
                interfaz de usuario, proporcionando una apariencia moderna y
                funcional.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ marginTop: '5rem' }}>
          Agradecemos la oportunidad de haber participado en este desafiante
          proyecto y esperamos que nuestra plataforma satisfaga las necesidades
          de los usuarios que buscan equipos fotográficos de alta calidad. Si
          tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto
          con nosotros. ¡Esperamos que disfrutes de la experiencia de reserva en
          nuestro sitio web!
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

