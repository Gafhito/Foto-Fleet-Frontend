import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Container } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useTheme } from '@mui/system';
import { useAuth } from '../../utils/AuthContext';
import { useProductContext } from '../../utils/ProductContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { colors } from '../../utils/constants';

import './categories.css'

export const Categories = () => {
  const { getCategories } = useAuth();
  const [categoriesArr, setCategoriesArr] = useState([]);
  const theme = useTheme();
  const { searchProducts } = useProductContext();

  const [hoveredCategoryInfo, setHoveredCategoryInfo] = useState(null);
  const [hoveredCategoryProducts, setHoveredCategoryProducts] = useState({
    totalElements: 0,
  });


  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem', right: theme.breakpoints.down('xs') ? '-25px' : theme.breakpoints.down('md') ? '-50px' : '0', }}
        onClick={onClick}
      >
        <ArrowForward sx={{color:'black', width: '2rem', height:'2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' }, right: {xs:'-15px', md:'-50px'} }}/>
      </div>
    );
  }
  
const SamplePrevArrow = (props)  => {
    const { className, style, onClick } = props;
    return (
      <div
        className={` category_prev_arrow ${className}`}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem', left: theme.breakpoints.down('xs') ? '-25px' : theme.breakpoints.down('md') ? '-50px' : '0', }}
        onClick={onClick}
      >
        <ArrowBack sx={{color:'black', width: '2rem', height:'2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' } }}/>
      </div>
    );
  }


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
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerPadding:'150px',
    responsive: [
      {
        breakpoint: 1390,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCategoryClick = async (categoryName) => {
    try {
      const response = await searchProducts('""', categoryName);
      setCategoryProducts(response);
    } catch (error) {
      console.error('Error al buscar productos por categoría:', error);
    }
  };

  const handleCategoryHover = async (categoryName) => {
    try {
      const response = await searchProducts('""', categoryName);
      console.log('CATEGORY NAME: ', categoryName)
      console.log('RESPONSE: ', response)
      setHoveredCategoryInfo(response);

    } catch (error) {
      console.error('Error al buscar productos por categoría:', error);
    }
  };
  
  

  return (
    <Box sx={{padding:'2rem', width:'85%', margin:'auto'}}>
      <Typography variant='h3' sx={{ marginTop: '3rem' }}>Nuestras Categorias</Typography>
      <Container sx={{ mt: '2rem' }}>
        <Slider {...settings} className='category_slider'>
          {categoriesArr.map((category, index) => (
            <div key={index} className='category_card_container'>
              <Card className='category_card' 
                onClick={() => handleCategoryClick(category.name)} 
                onMouseEnter={() => handleCategoryHover(category.name)}
                sx={{ 
                backgroundImage:`url(${category.imageUrl})`, 
                backgroundSize:'cover', 
                backgroundRepeat:'no-repeat', 
                height:{xs: '150px', sm:'200px', lg:'250px'}, 
                width: {xs: '150px', sm:'200px', lg:'250px'},
                boxShadow:'none',
                borderRadius:'.5rem',
                position:'relative' }}>
                {/*<CardMedia sx={{backgroundSize:'cover', borderRadius:'.5rem .5rem 0 0'}}
                  component="img"
                  height="150"
                  image={category.imageUrl}
                  alt={category.name}
                  />*/}

                  <Typography variant="h6" component="div" className='category_title' sx={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height:'100%',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, .6)',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    '&:hover': { opacity: 1 },
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}>
                    {category.name}
                    {hoveredCategoryInfo && hoveredCategoryInfo.totalElements && (
                      <>
                        <br />
                        Productos: {hoveredCategoryInfo.totalElements}
                      </>
                    )}    
                  </Typography>
              </Card>
            </div>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};