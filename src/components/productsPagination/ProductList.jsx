import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';

export const ProductList = ({
  products,
  handleOpenModal,
  handleFavoriteClick,
  handleShare,
  isFavorite,
  anchorEl,
  setAnchorEl,
  setSelectedSocial,
  setSelectedProduct
}) => {

  console.log('SET SELECTED PRODUCT LIST: ', setSelectedProduct)

  return (
    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {products?.map((prod, index) => (
        <Grid item key={index} xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ProductCard
            product={prod}
            handleOpenModal={handleOpenModal}
            handleFavoriteClick={handleFavoriteClick}
            handleShare={handleShare}
            isFavorite={isFavorite}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            setSelectedSocial={setSelectedSocial}
            setSelectedProduct={setSelectedProduct}
          />
        </Grid>
      ))}
    </Grid>
  );
};

