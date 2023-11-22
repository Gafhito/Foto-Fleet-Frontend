import { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { colors } from '../../../utils/constants';

export const ProductModal = ({ open, onClose, product }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxHeight: '70vh',
            overflowY: 'scroll',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
            '&::-webkit-scrollbar': {
              width: '12px',
              height: '12px',
              /*borderRadius: '8px',*/
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: colors.blackColor,
              /*borderRadius: '8px',*/
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: colors.primaryColor,
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{product.name}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} sx={{backgroundColor:colors.backgroundColor}}>
            <Grid item xs={6}>
              <Card sx={{boxShadow:'none', backgroundColor:colors.backgroundColor}}>
                <CardMedia
                  component="img"
                  height="280px"
                  image={product.images[selectedImageIndex]?.url}
                  title={product.name}
                  sx={{ width: '100%', objectFit:'contain' }}
                  onClick={() => handleImageClick((selectedImageIndex + 1) % product.images.length)}
                />
                <CardContent sx={{ height: 'auto', }}>
                  <Typography variant="body2" color={colors.textColor} sx={{width:'90%', margin:'auto', textAlign:'center'}}>
                    {product.description}
                  </Typography>
                </CardContent>
              {/* Characteristics */}
              <Typography variant="h6" mt={2} sx={{textAlign:'center', marginBottom:'.5rem'}}>
                Características
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop:'1rem', width:'90%', margin:'auto', paddingBottom:'2rem' }}>
                <div style={{ columnCount: 2, columnGap: '16px' }}>
                  {product.characteristics.map((characteristic, index) => (
                    <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems:'center' }}>
                      <FontAwesomeIcon icon={characteristic.urlIcono.replace(/\s/g, '-').toLowerCase()} style={{marginRight:'.5rem'}}/>
                      <div>
                        <Typography variant="subtitle2">{characteristic.name}</Typography>
                        {/*<Typography variant="body2">{characteristic.description}</Typography>*/}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Imágenes adicionales</Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  padding:'0 2rem'
                }}
              >
                {product.images?.slice(0, showAllImages ? product.images.length : 4).map((image, index) => (
                  <Card key={index} sx={{boxShadow:'none'}}>
                    <CardMedia
                      component="img"
                      height="150px"
                      image={image.url}
                      title={`Imagen ${index + 1}`}
                      sx={{ width: '100%', cursor: 'pointer', objectFit:'contain' }}
                      onClick={() => handleImageClick(index)}
                    />
                  </Card>
                ))}
              </Box>
              {product.images.length > 4 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={() => setShowAllImages(!showAllImages)}>
                    {showAllImages ? 'Ver menos' : 'Ver más'}
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};