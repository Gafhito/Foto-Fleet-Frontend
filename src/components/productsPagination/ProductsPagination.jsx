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
import { useProductList } from '../../utils/getProductList';
import { colors } from '../../utils/constants';
import { ProductModal } from '../common/productModal/ProductModal';

export const ProductsPagination = ({ itemsPerPage }) => {

  const shuffledCameras = useProductList();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCameras = shuffledCameras.slice(startIndex, endIndex);

  const totalPages = Math.ceil(shuffledCameras.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          label={i}
          color={'black'}
          colorHover={colors.primaryColor}
          mr={'.5rem'}
          minWidth={'1rem'}
        >
        </Button>
      );
    }
    return pageNumbers;
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
    <Container>
      <Typography variant="h4" sx={{ marginBottom: '3rem' }}>
        Lista de Productos
      </Typography>
      <Grid container spacing={3}>
        {currentCameras.map((camera) => (
          <Grid item key={camera.id} xs={12} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ maxWidth: '345px' }}>
              <CardMedia
                sx={{ height: '140px' }}
                image={camera.image}
                title={camera.title}
                onClick={() => handleOpenModal(camera)}
              />
              <CardContent sx={{maxHeight: '8rem'}}>
                <Typography variant="h6">{camera.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {camera.description}
                </Typography>
                <Link to={`/${camera.id}`} target='_blank'>Ver Detalles</Link>
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
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem'
      }}>
        <Button
          label={'Anterior'}
          mr={'.5rem'}
          backgroundColor={colors.terciaryColor}
          backgroundColorHover={colors.secondaryColor}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
        </Button>
        {renderPageNumbers()}
        <Button
          label={'Siguiente'}
          mr={'0'}
          backgroundColor={colors.terciaryColor}
          backgroundColorHover={colors.secondaryColor}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
        </Button>
      </div>
    </Container>
  );
};