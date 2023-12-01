import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; 
import { colors } from '../../utils/constants';
import { Link } from 'react-router-dom';

export const ProductCard = ({
  product,
  handleOpenModal,
  handleFavoriteClick,
  handleShare,
  isFavorite,
  anchorEl,
  setAnchorEl,
  setSelectedSocial,
}) => {
  const isMenuOpen = Boolean(anchorEl);


  console.log('PRODUCT PROP DEL PRODUCTCARD: ', product)


  return (
    <Card
      sx={{
        width: '345px',
        borderRadius: '.5rem',
        cursor: 'pointer',
        transition: 'all .3s',
        '&:hover': { transform: 'scale(.95)' },
        position: 'relative',
        '&:hover .favorite-icon, &:hover .share-icon': { opacity: 1 },
      }}
    >
      <CardMedia
        sx={{ height: '170px', backgroundSize: 'contain' }}
        image={product.images?.[0]?.url || ''}
        title={product.name}
        onClick={() => handleOpenModal(product)}
      />
      <CardContent
        sx={{ maxHeight: '6.5rem', position: 'relative' }}
      >
        <Typography variant="h6" sx={{ color: colors.blackColor }}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.description?.substring(0, 100)}...
        </Typography>
        <IconButton
          aria-label="add to favorites"
          className="favorite-icon"
          onClick={() =>
            handleFavoriteClick(product.productId, product.name)
          }
          sx={{
            position: 'absolute',
            top: '-150px',
            right: '15px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            color: isFavorite(product.productId) ? 'red' : '',
          }}
        >
          <FavoriteIcon />
        </IconButton>

        <IconButton
          aria-label="share"
          className="share-icon"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setSelectedSocial(product.productId);
          }}
          sx={{
            position: 'absolute',
            top: '-115px',
            right: '15px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ShareIcon />
        </IconButton>

        <Menu
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '8px',
              boxShadow: 'none',
            },
          }}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={() => {
            setAnchorEl(null);
            setSelectedSocial(null);
          }}
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
          <MenuItem onClick={() => handleShare('whatsapp', product.productId)}>
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
          WhatsApp
        </MenuItem>
        </Menu>

        <Link to={`/products/${product.productId}`} target="_blank">
          Ver Detalles
        </Link>
      </CardContent>
    </Card>
  );
};
