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


import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';


export const ProductsPagination = ({ itemsPerPage }) => {
  const { products, addToFavorites, removeFromFavorites, isFavorite, currentPage, setCurrentPage, changePage } = useProductContext();

  const productsContent = products.content;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  {/* Compartir */}

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSocial, setSelectedSocial] = useState(null);


  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleFavoriteClick = (productId) => {
    isFavorite(productId) ? removeFromFavorites(productId) : addToFavorites(productId);
  };



  const handleShare = (social, productId) => {
    const productUrl = `${window.location.origin}/products/${productId}`;
  
    // Realiza la acción de compartir según la red social seleccionada
    switch (social) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
        break;
      case 'instagram':
        window.open(`https://www.instagram.com/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/share?url=${encodeURIComponent(productUrl)}`, '_blank');
        break;
      default:
        break;
    }
  
    // Cierra el menú después de compartir
    setAnchorEl(null);
  };
  
  

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
        Lista de Productos Aleatorios
      </Typography>
      <Grid container spacing={3} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        {productsContent?.map((product, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ width: '345px', borderRadius:'.5rem', cursor:'pointer', transition:'all .3s', '&:hover': { transform:'scale(.95)' }, position:'relative', '&:hover .favorite-icon, &:hover .share-icon': { opacity: 1 }, }}>
                <CardMedia
                  sx={{ height: '170px', backgroundSize:'contain' }}
                  image={product.images[0]?.url}
                  title={product.name}
                  onClick={() => handleOpenModal(product)}
                />
                <CardContent sx={{maxHeight: '6.5rem'}}>
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
                    onClick={(event) => setAnchorEl(event.currentTarget)}
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

                  <Menu  sx={{
                          '& .MuiPaper-root': {
                            borderRadius: '8px',
                            boxShadow:'none',
                            
                          },
                        }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={() => handleShare('facebook', product.productId)}>
                      <ListItemIcon>
                        <FacebookIcon />
                      </ListItemIcon>
                      Facebook
                    </MenuItem>
                    <MenuItem onClick={() => handleShare('instagram', product.productId)}>
                      <ListItemIcon>
                        <InstagramIcon />
                      </ListItemIcon>
                      Instagram
                    </MenuItem>
                    <MenuItem onClick={() => handleShare('twitter', product.productId)}>
                      <ListItemIcon>
                        <TwitterIcon />
                      </ListItemIcon>
                      Twitter
                    </MenuItem>
                  </Menu>


                  <Link to={`/products/${product.productId}`} target='_blank'>Ver Detalles</Link>
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
    </Container>
  );
};