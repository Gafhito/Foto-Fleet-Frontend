import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box
} from '@mui/material';

import { Link } from 'react-router-dom';

import { Button } from '../common/button/Button';
import { useProductContext } from '../../utils/ProductContext';
import { colors } from '../../utils/constants';
import { ProductModal } from '../common/productModal/ProductModal';
import { PaginationNumbers } from './PaginationNumbers';
import { useAuth } from '../../utils/AuthContext';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const ProductsPagination = ({ itemsPerPage }) => {
  const { products, currentPage, setCurrentPage, changePage, isFavorite, addToFavorites, removeFromFavorites, showSnackbar, snackbarMessage, initializeUserData } = useProductContext();
  const { getUserData } = useAuth();

  const productsContent = products.content;

  const [userData, setUserData] = useState(null);

  const [ userFavorites, setUserFavorites ] = useState([]);


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await initializeUserData(); 
        const userData = await getUserData();
        setUserData(userData);

        setUserFavorites(userData.favorites || []);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [initializeUserData, getUserData]);


  console.log('USER DATA: ', userData)
  console.log('USER FAVORITES: ', userFavorites);



  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleFavoriteClick = async (productId, productName) => {
    const isCurrentlyFavorite = userFavorites.some((fav) => fav.productId === productId);
  
    if (isCurrentlyFavorite) {
      await removeFromFavorites(productId, productName);
    } else {
      await addToFavorites(productId, productName);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
        Lista de Productos Aleatorios
      </Typography>
      <Grid container spacing={3} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        {productsContent?.map((product, index) => {
          console.log('PRODUCT ID: ', product.productId )
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
                  <Typography variant="h6" sx={{color:colors.blackColor}}>{product.name}</Typography>
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
                      color: userFavorites.some((fav) => fav.productId === product.productId) ? 'red' : '',
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
                  <Link to={`products/${product.productId}`} target='_blank'>Ver Detalles</Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{marginTop:'4rem', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Button label={'Anterior'} backgroundColor={colors.primaryColor} colorHover={colors.primaryColorHover} color={colors.blackColor} onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </Button>
      <PaginationNumbers totalPages={products.totalPages} currentPage={currentPage} changePage={setCurrentPage}/>
      <Button label={'Siguiente'} backgroundColor={colors.primaryColor} colorHover={colors.primaryColorHover} color={colors.blackColor} onClick={() => changePage(currentPage + 1)} disabled={currentPage === products.totalPages}>
        Siguiente
      </Button>
      </Box>

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
    </Container>
  );
};