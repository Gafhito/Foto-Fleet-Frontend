import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useProductContext } from '../../utils/ProductContext';
import { ProductModal } from '../common/productModal/ProductModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ProductList } from './ProductList';
import { Pagination } from './Pagination';
import { MetaData } from '../../utils/MetaData';

export const ProductsPagination = ({ itemsPerPage }) => {
  const {
    products,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    currentPage,
    setCurrentPage,
    changePage,
    showSnackbar,
    snackbarMessage,
  } = useProductContext();
  const productsContent = products.content;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compartir
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSocial, setSelectedSocial] = useState(null);


  const handleOpenModal = (product) => {
    console.log('PRODUCTO SELECCIONADO EN HANDLEOPENMODAL: ', product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleFavoriteClick = (productId, productName) => {
    isFavorite(productId) ? removeFromFavorites(productId, productName) : addToFavorites(productId, productName);
  };

  const handleShare = (social, productId) => {
    const product = productsContent.find((p) => p.productId === productId);

    if (!product) {
      return;
    }
  
    setSelectedProduct(product);  
    const shareUrl = generateShareUrl(social, selectedProduct);
    window.open(shareUrl, '_blank');

    setAnchorEl(null);
    setSelectedSocial(null);
  };


  const generateShareUrl = (social, product) => {

    console.log('PRODUCT ID EN EL GENERATESHAREURL: ', product.productId);
    const productUrl = `http://1023c07-grupo3.s3-website-us-east-1.amazonaws.com/products/${product.productId}`;
    const shareText = `¡Mira este increíble producto: ${product.name} - ${product.description.substring(0, 100)}...!`;
    const imageUrl = product.images[0]?.url || '';

    switch (social) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(shareText)}`;
      case 'instagram':
        return `https://www.instagram.com/sharer.php?u=${encodeURIComponent(productUrl)}&title=${encodeURIComponent(product.name)}&summary=${encodeURIComponent(product.description)}&url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(imageUrl)}`;
      case 'twitter':
        return `https://twitter.com/share?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}&media=${encodeURIComponent(imageUrl)}`;
      case 'whatsapp':
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + productUrl)}`;
        return window.innerWidth <= 768 ? whatsappUrl : whatsappUrl.replace('api.whatsapp.com', 'web.whatsapp.com');
      default:
        return '';
    }
  };



  console.log('SELECTED PRODUCT: ', selectedProduct)

  return (
    <Container>
      <MetaData product={productsContent} />
      <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
        Lista de Productos Aleatorios
      </Typography>
      <ProductList
        products={productsContent}
        handleOpenModal={handleOpenModal}
        handleFavoriteClick={handleFavoriteClick}
        handleShare={handleShare}
        isFavorite={isFavorite}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setSelectedSocial={setSelectedSocial}
        setSelectedProduct={setSelectedProduct}
      />
      <Pagination currentPage={currentPage} changePage={changePage} totalPages={products.totalPages} />

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
