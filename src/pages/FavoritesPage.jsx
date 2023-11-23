import { useState, useEffect } from 'react';
import { useProductContext } from '../utils/ProductContext';
import { ProductModal } from '../components/common/productModal/ProductModal';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { colors } from '../utils/constants';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const FavoritesPage = () => {
  const { products, favorites, setFavorites, isFavorite, addToFavorites, removeFromFavorites, initializeUserData, showSnackbar, snackbarMessage, } = useProductContext();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    initializeUserData();
  }, [initializeUserData, favorites]); 


  const handleFavoriteClick = async (productId, productName) => {
    const isCurrentlyFavorite = favorites.some((fav) => fav.productId === productId);
  
    if (isCurrentlyFavorite) {
      await removeFromFavorites(productId, productName);
 
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.productId !== productId));
    } else {
      await addToFavorites(productId, productName);

      setFavorites((prevFavorites) => [...prevFavorites, { productId, productName }]);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };
  return (
    <Box sx={{ marginTop: '8rem' }}>
      <Typography variant="h3" sx={{ color: colors.blackColor }}>
        Mis Favoritos
      </Typography>
      <Grid container spacing={3} sx={{ padding: '5rem' }}>
        {favorites?.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '345px', borderRadius: '.5rem', cursor: 'pointer', transition: 'all .3s', '&:hover': { transform: 'scale(.95)' }, position: 'relative', '&:hover .favorite-icon, &:hover .share-icon': { opacity: 1 }, }}>
              <CardMedia
                sx={{ height: '170px', backgroundSize: 'contain' }}
                image={product.images[0]?.url}
                title={product.name}
                onClick={() => handleOpenModal(product)}
              />
              <CardContent sx={{ maxHeight: '4rem' }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {product.description}
                </Typography>
                <IconButton
                  aria-label="add to favorites"
                  className="favorite-icon"
                  onClick={() => handleFavoriteClick(product.productId, product.name)}
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    color: favorites.some((fav) => fav.productId === product.productId) ? 'red' : '',
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  className='share-icon'
                  sx={{
                    position: 'absolute',
                    top: '45px',
                    right: '10px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <ShareIcon />
                </IconButton>
                <Link to={`/products/${product.productId}`} target='_blank'>Ver Detalles</Link>
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

      <Snackbar
        open={Boolean(snackbarMessage.open)}
        autoHideDuration={3000}
        onClose={() => showSnackbar('', '', false)} 
      >
        <Alert
          severity={snackbarMessage.severity}
          onClose={() => showSnackbar('', '', false)} 
        >
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
