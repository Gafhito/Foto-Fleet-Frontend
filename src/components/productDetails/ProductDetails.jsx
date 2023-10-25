import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { Link } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { colors } from '../../utils/constants';
import { ArrowBack } from '@mui/icons-material';

export const ProductDetails = ({ product }) => {
  return (
    <Box sx={{minHeight: '100vh',display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: '5rem'}}>
      {/* Sub header */}
      <Paper
        elevation={0}
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem', backgroundColor: colors.secondaryColor, display: 'flex', alignItems: 'center'}}
      >
        <Link to='/' style={{display:'flex', alignItems:'center'}}>
          <ArrowBackIcon sx={{marginLeft: '1.5rem'}}/>
        </Link>
        <Typography variant="h5" textAlign={'start'} sx={{marginLeft:'1rem'}}>{product.title}</Typography>
      </Paper>

      {/* Main content */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Additional Images */}
          <Typography variant="h6">Additional Images</Typography>
          <List>
            {product.images.map((image, index) => (
              <ListItem key={index}>
                <img
                  src={image.img_url}
                  alt={`Additional Image ${index + 1}`}
                  style={{ width: '64px', height: '64px' }}
                />
                <ListItemText primary={`Image ${index + 1}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};