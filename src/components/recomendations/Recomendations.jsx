
import foto1 from '../../assets/img/slide1.jpg';
import foto2 from '../../assets/img/slide2.jpg';
import foto3 from '../../assets/img/slide5.jpg';
import foto4 from '../../assets/img/slide6.jpg';
import foto5 from '../../assets/img/slide7.jpg';

import Slider from 'react-slick'; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import './recomendation.css';

const products = [
  {
    title: 'Producto 1',
    image: foto1,
    rating: 4.5,
    description: 'Descripción del producto 1',
    price: '$19.99',
  },
  {
    title: 'Producto 2',
    image: foto2,
    rating: 4.2,
    description: 'Descripción del producto 2',
    price: '$24.99',
  },
  {
    title: 'Producto 3',
    image: foto3,
    rating: 4.0,
    description: 'Descripción del producto 3',
    price: '$29.99',
  },
  {
    title: 'Producto 2',
    image: foto4,
    rating: 4.2,
    description: 'Descripción del producto 2',
    price: '$24.99',
  },
  {
    title: 'Producto 2',
    image: foto5,
    rating: 4.2,
    description: 'Descripción del producto 2',
    price: '$24.99',
  },
];


const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem', right: '-50px' }}
        onClick={onClick}
      >
        <ArrowForward sx={{color:'black', width: '2rem', height:'2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' }}}/>
      </div>
    );
  }
  
const SamplePrevArrow = (props)  => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem', left: '-50px' }}
        onClick={onClick}
      >
        <ArrowBack sx={{color:'black', width: '2rem', height:'2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' } }}/>
      </div>
    );
  }

export const Recomendations = () => {
 
    const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <>
    <Typography variant='h3'  sx={{marginTop:'3rem'}}>Nuestros Recomendados</Typography>
    <Slider {...settings} className='recomendaciones_container'>
        {products.map((product, index) => (
            <div key={index} className='recomendaciones_inner_container'>
            <Card sx={{width: '17rem', height: '17rem'}}>
                <img className='recomendacion_img' src={product.image} alt={product.title}/>
                <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2">{product.description}</Typography>
                    <Typography variant="subtitle1">{product.price}</Typography>
                </CardContent>
            </Card>
            </div>
        ))}
    </Slider> 
    </>
  );
};
