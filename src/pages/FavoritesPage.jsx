
import { useState } from 'react';
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

export const FavoritesPage = () => {
  const { products, favorites, isFavorite, addToFavorites, removeFromFavorites, } = useProductContext();

  const favoriteProducts = products.content.filter((product) => favorites.includes(product.productId));


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('FAVORITES: ', favorites)

  console.log('favoritesProducts: ', favoriteProducts)


  const handleFavoriteClick = (productId) => {
    isFavorite(productId) ? removeFromFavorites(productId) : addToFavorites(productId);
  };


  const handleOpenModal = (product) => {
    console.log('se trigerea:', product)
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };



  return (
    <Box sx={{marginTop:'8rem'}}>
        <Typography variant="h3" sx={{color:colors.blackColor}}>Mis Favoritos</Typography>
      <Grid container spacing={3} sx={{padding:'5rem'}}>
        {favoriteProducts?.map((product, index) => {
            return (
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
                    <IconButton
                        aria-label="add to favorites"
                        className="favorite-icon"
                        onClick={() => handleFavoriteClick(product.productId)}
                        sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        color: isFavorite(product.productId) ? 'red' : '',
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
            );
            })}
        </Grid>

        {selectedProduct && (
        <ProductModal
          open={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};
