import { useState } from 'react';
import { Box } from '@mui/material';
import { NavLinks } from './NavLinks';
import { HeaderButtons } from './HeaderButtons';
import { useAuth } from '../../../utils/AuthContext';
import { Avatar } from '../../UserInfo/Avatar';
import { UserMenu } from '../../UserInfo/UserMenu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../utils/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { Cart } from '../cart/Cart';
import Badge from '@mui/material/Badge';



export const NavBar = () => {
  const { user } = useAuth();
  const { getCartItemCount } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  console.log("Item COUNT: ", getCartItemCount)

  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/perfil');
    handleClose();
  };

  const handleLogoutClick = () => {
    
  };

  const handleCheckoutClick = () => {

    navigate('/rental-confirmation', { state: { cartItems: cartItems } })
  };

  return (
    <Box sx={{ display: 'flex', alignItems: "center", justifyContent: { sm:"space-between", md: "space-around" }, width: { lg: '65%', sm: '85%' } }}>
      <NavLinks />
      <Box sx={{ display: 'flex' }}>
        {user ? (
          <div style={{ display:'flex'}}>
            <IconButton onClick={() => setCartOpen(true)} sx={{marginRight:'2rem'}}>
              <Badge badgeContent={getCartItemCount()} color="error">
                <ShoppingCartIcon sx={{color:'white'}} />
              </Badge> 
            </IconButton>
            <Avatar onClick={handleClick} />
            <UserMenu anchorEl={anchorEl} onClose={handleClose} onProfileClick={handleProfileClick} onLogoutClick={handleLogoutClick} />
          </div>
        ) : (
          <HeaderButtons />
        )}
      </Box>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} onCheckoutClick={handleCheckoutClick}/>
    </Box>
  );
};