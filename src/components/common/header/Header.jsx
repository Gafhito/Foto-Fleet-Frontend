import { useState, useEffect } from 'react';
import { AppBar, Toolbar, useMediaQuery, useTheme } from '@mui/material';
// componentes locales.
import { HeaderDrawer } from './HeaderDrawer';
import { NavLinks } from './NavLinks';
import { HeaderButtons } from './HeaderButtons';
import { MobileMenuIcon } from './MobileMenuIcon';
import { Logo } from './Logo';
import { NavBar } from './NavBar';

import { colors , breakpoints} from '../../../utils/constants';

export const Header = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(`(max-width: ${breakpoints.sm})`);

  const [anchorEl, setAnchorEl] = useState(null); // Almacena el ancla para el menú desplegable.
  const [drawerOpen, setDrawerOpen] = useState(false); // Indica si el drawer está abierto o cerrado.
  const [isSticky, setIsSticky] = useState(false); // Indica si el header se encuentra fijo en la parte superior de la página.

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
    // remueve el listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <AppBar position='fixed' sx={{ backgroundColor: colors.blackColor, top: '0', zIndex: '999', height: '64px', overflowX: 'hidden' }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: 1,
          maxWidth: '100%', 
        }}>
          <MobileMenuIcon onClick={toggleDrawer} />
          <Logo />
          <NavBar />
        </Toolbar>
      </AppBar>
      <HeaderDrawer open={drawerOpen} onClose={toggleDrawer} />
    </div>
  );
};
