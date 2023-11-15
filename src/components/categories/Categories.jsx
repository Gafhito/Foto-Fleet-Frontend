import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Container } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Categories = () => {
  const { getCategories } = useAuth();
  const [categoriesArr, setCategoriesArr] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategoriesArr(categories);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategories();
  }, [getCategories]);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Typography variant='h3' sx={{ marginTop: '3rem' }}>Nuestras Categorias</Typography>
      <Container sx={{ mt: '2rem' }}>
        <Slider {...settings}>
          {categoriesArr.map((category, index) => (
            <div key={index}>
              <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={category.imageUrl}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};