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
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export const ProductModal = ({ open, onClose, product }) => {
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
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: 'lightgray',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Producto</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <Typography variant="h6">{product.title}</Typography>
                <CardMedia
                  component="img"
                  height="280px"
                  image={product.image}
                  title={product.title}
                  sx={{ width: '100%' }}
                />
                <CardContent sx={{ height: '8rem' }}>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Imágenes adicionales</Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                }}
              >
                {product.images.map((image, index) => (
                  <Card key={index}>
                    <CardMedia
                      component="img"
                      height="150px"
                      image={image.img_url}
                      title={`Imagen ${index + 1}`}
                      sx={{ width: '100%' }}
                    />
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};