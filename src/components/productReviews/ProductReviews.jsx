import React, { useEffect, useState } from 'react';
import { Typography, Paper, Rating, Box, Container } from '@mui/material';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useProductContext } from '../../utils/ProductContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ProductReviews = ({ productId, productName }) => {
  const { getRatingsByProductId } = useProductContext();
  const [reviews, setReviews] = useState([]);
  const [slider, setSlider] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getRatingsByProductId(productId);

        if (isMounted) {
          setReviews(fetchedReviews);
        }
      } catch (error) {
        console.error('Error al obtener reseñas:', error);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [productId, getRatingsByProductId]);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem', right: '-40px', zIndex: '1' }}
        onClick={onClick}
      >
        <ArrowForwardIos sx={{ color: 'black', width: '2rem', height: '2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' } }} />
      </div>
    );
  }

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem', left: '-40px', zIndex: '1' }}
        onClick={onClick}
      >
        <ArrowBackIos sx={{ color: 'black', width: '2rem', height: '2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' } }} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const scrollCarousel = (direction) => {
    if (slider) {
      const nextIndex = slider.slickCurrentSlide() + direction;

      if (nextIndex >= 0 && nextIndex < reviews.length) {
        slider.slickGoTo(nextIndex);
      }
    }
  };

  return (
    <Box sx={{ padding: '2rem', width: '85%', margin: 'auto' }}>
      <Typography variant='h6' sx={{ marginTop: '3rem' }}>Reseñas y Calificaciones</Typography>
      <Container sx={{ mt: '2rem' }}>
        <Slider {...settings} className='reviews-carousel'>
          {reviews.map((review) => (
            <Paper key={review.ratingId} elevation={3} className="review-card" sx={{boxShadow:'none', height:'10rem', padding:'.5rem', display:'flex', flexDirection:'columns', alignItems:'center', justifyContent:'center'}}>
              <Typography variant="subtitle2" sx={{fontWeight:'bold'}}>
                {review.userDto.firstName} {review.userDto.lastName}
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body1" sx={{width:'90%', textAlign:'center', margin:'auto'}}>{review.review}</Typography>
              <Typography variant="caption">{new Date(review.ratingDate).toLocaleString()}</Typography>
            </Paper>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};
