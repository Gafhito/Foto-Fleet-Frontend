import { useState, useEffect } from 'react';

import slide1 from '../../assets/img/slide1.jpg';
import slide2 from '../../assets/img/slide2.jpg';
import slide4 from '../../assets/img/slide3.jpg';
import slide6 from '../../assets/img/slide4.jpg';
import slide7 from '../../assets/img/slide5.jpg';

import './carrousel.css';



const images = [
    slide1, // 0 + 1 = 1 % 5 = deja un residuo de 1.
    slide2, // 1 + 1 = 2 % 5 = 2
    slide4, // 2 + 1 = 3 % 5 = 3
    slide6, // 3 + 1 = 4 % 5 = 4
    slide7 // 4 + 1 = 5 % 5 = 0
];


// 0 - 1 = -1 + 5 = 4 % 5 = 4 -- vuelve a la ultima
// 1 - 1 = 0 + 5 = 5 % 5 = 0 -- vuelve a la primera
// 2 - 1 = 1 + 5 = 6 % 5 = 1
// 3 - 1 = 2 + 5 = 7 % 5 = 2
// 4 - 1 = 3 + 5 = 8 % 5 = 3


export const Carrousel = () => {
    
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const goToPrevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    useEffect(() => {
      const timeout = setTimeout(goToNextSlide, 5000); // Cambiamos de imagen cada 5 segundos
      return () => clearTimeout(timeout);
    }, [currentIndex]);
  
    return (
        <div className='overlay'>
            <div className="carousel">
                {/*<button onClick={goToPrevSlide} className="carousel-button prev">
                &#9664;
    </button>*/}
                {images.map((image, index) => (
                    <div key={index} className={`slide ${index === currentIndex ? 'active' : ''} fade slide_container`}style={{ background: `url(${image})`, backgroundSize: 'cover' }}></div>
                ))}
                {/*<button onClick={goToNextSlide} className="carousel-button next">
                &#9654;
                </button>*/}
            </div>
      </div>
    );
  };
