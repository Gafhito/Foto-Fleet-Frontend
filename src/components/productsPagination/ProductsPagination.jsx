import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';

import { Link } from 'react-router-dom';

import { Button } from '../common/button/Button';
import { useProductContext } from '../../utils/ProductContext';
import { colors } from '../../utils/constants';
import { ProductModal } from '../common/productModal/ProductModal';


import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

export const ProductsPagination = ({ itemsPerPage }) => {

  const {products} = useProductContext(); 


  console.log('Products desde Pagination: ', products)


  const productsContent = products.content;

  console.log('este es el productCOntent: ', productsContent)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleFavorite = () => {
    isFavorite ? setIsFavorite(false) : setIsFavorite(true);
  }


  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
        Lista de Productos Aleatorios
      </Typography>
      <Grid container spacing={3}>
        {productsContent?.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '345px', borderRadius:'.5rem', cursor:'pointer', transition:'all .3s', '&:hover': { transform:'scale(.95)' }, position:'relative', '&:hover .favorite-icon, &:hover .share-icon': { opacity: 1 }, }}>
              <CardMedia
                sx={{ height: '170px', backgroundSize:'contain' }}
                image={product.images[0]?.url}
                title={product.name}
                onClick={() => handleOpenModal(product)}
              />
              <CardContent sx={{maxHeight: '4rem'}}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',

                                                                    }}>
                  {product.description}
                </Typography>
                {console.log('product.productId: antes del link:', product.productId)}
                <IconButton aria-label="add to favorites" className="favorite-icon" onClick={handleFavorite}
                  sx={{
                    position: 'absolute',
                    top: '10px', // Ajusta la posición según sea necesario
                    right: '10px', // Ajusta la posición según sea necesario
                    opacity: 0, // Inicialmente oculto
                    transition: 'opacity 0.3s ease', // Agrega una transición suave
                    color: isFavorite ? 'red' : ''
                  }}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" className='share-icon'
                  sx={{
                      position: 'absolute',
                      top: '45px', // Ajusta la posición según sea necesario
                      right: '10px', // Ajusta la posición según sea necesario
                      opacity: 0, // Inicialmente oculto
                      transition: 'opacity 0.3s ease', // Agrega una transición suave
                    }}>
                  <ShareIcon />
                </IconButton>
                <Link to={`products/${product.productId}`} target='_blank'>Ver Detalles</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProduct && (
        <ProductModal
          open={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </Container>
  );
};