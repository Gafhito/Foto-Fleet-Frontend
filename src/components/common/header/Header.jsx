import { useState, useEffect } from 'react';
import { AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
// componentes locales.
import { HeaderDrawer } from './HeaderDrawer';
import { NavLinks } from './NavLinks';
import { HeaderButtons } from './HeaderButtons';
import { MobileMenuIcon } from './MobileMenuIcon';
import { Logo } from './Logo';
import { NavBar } from './NavBar';
import { Cart } from '../cart/Cart';

{/*import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';*/}
{/*import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../utils/CartContext';*/}


import { colors , breakpoints} from '../../../utils/constants';

export const Header = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(`(max-width: ${breakpoints.sm})`);

  const [anchorEl, setAnchorEl] = useState(null); 
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [isSticky, setIsSticky] = useState(false);

 {/* const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();
const navigate = useNavigate();*/}

  const toggleDrawer = (event) => {
    setAnchorEl(event.currentTarget); // Establece el ancla para el menú desplegable.
    setDrawerOpen(!drawerOpen); 
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true); // Si el desplazamiento vertical es mayor que 0, el header se vuelve sticky.
    } else {
      setIsSticky(false); // Si el desplazamiento vertical es 0 o menor, el encabezado deja de ser sticky.
    };
  };

  // escuchamos el evento scroll.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  {/*const handleCheckoutClick = () => {

    navigate('/rental-confirmation', { state: { cartItems: cartItems } })
  };*/}

  return (
    <div>
      <AppBar position='fixed' sx={{ backgroundColor: colors.blackColor, top: '10', zIndex: '999', height: '65px', overflowX: 'hidden' }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent:"space-between",
          alignItems: 'center',
          flex: 1,
          maxWidth: '93%', 
          
        }}>
          <MobileMenuIcon onClick={toggleDrawer} />
          <Logo />
          <NavBar />
          {/* Botón del carrito */}
          {/*<IconButton onClick={() => setCartOpen(true)}>
            <ShoppingCartIcon sx={{color:'white'}} />
          </IconButton>*/}
        </Toolbar>
      </AppBar>
      <HeaderDrawer open={drawerOpen} onClose={toggleDrawer} />

      {/*<Cart open={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} onCheckoutClick={handleCheckoutClick}/>*/}
    </div>
  );
};
