

import Slider from 'react-slick'; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem' }}
        onClick={onClick}
      >
        <ArrowForward sx={{color:'black', width: '2rem', height:'2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' } }}/>
      </div>
    );
  }
  
const SamplePrevArrow = (props)  => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", width: '2rem', height: '2rem' }}
        onClick={onClick}
      >
        <ArrowBack sx={{color:'black', width: '2rem', height:'2rem', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.5)' } }}/>
      </div>
    );
  }

export const ProductAdditionalImagesCarrousel = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
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
                <Card sx={{width: '20rem', height: '20rem'}}>
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
}
