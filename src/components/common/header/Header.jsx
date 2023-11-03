import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Link as MuiLink, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from '../../login/Login';
import { useLoginForm } from '../../../utils/LoginFormContext';
import { useAuth } from '../../../utils/AuthContext';

import { Link } from "react-router-dom";

import logo from '../../../assets/img/Logo.png';
import { Button } from '../button/Button';
import { colors } from '../../../utils/constants';


import './header.css';


export const Header = () => {

  const { openLoginForm } = useLoginForm(); // obtenemos la función openLoginForm desde el contexto
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { user, login, logout } = useAuth(); // Accedemos al usuario autenticado desde el contexto
  
  
  const toggleDrawer = (event) => {
    setAnchorEl(event.currentTarget);
    setDrawerOpen(!drawerOpen);
    };
  
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

const handleOpenLoginForm = () => {
  openLoginForm(); // Utiliza la función openLoginForm del contexto
};

const handleCloseLoginForm = () => {
  closeLoginForm();
};
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div>
        <AppBar position='fixed' sx={{ backgroundColor: colors.terciaryColor, top: '0', zIndex:'999' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: { md: 'space-around', sm: 'space-around'} }}>
            <Box sx={{ width: 'fit-content', display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                color="inherit"
                sx={{ display: { xs: 'block', sm: 'none' } }}
                onClick={ toggleDrawer }
              >
                <MenuIcon />
              </IconButton>
            </Box>
              <Link to='/' style={{textDecoration: 'none'}}>
                  <Box sx={{display:'flex'}}>
                    <img src={logo} alt="Logo" style={{ width: '7rem' }} />
                    <Typography variant="h6" sx={{ display: { xs: 'flex', sm: 'none', md: 'flex'}, alignItems: 'center', marginLeft: { xs: '1.5rem', sm: '1rem' }, letterSpacing: '.8rem', color: '#fff', textDecoration: 'none'}}>
                      Captura el momento
                    </Typography>
                  </Box>
              </Link>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: {sm: 'space-between', md:'space-around'}, alignItems: {sm:'center'}, width: { lg: '65%', sm:'85%'} }}>
              <Box>
                <Link to="/" className='nav_link'>
                  Home
                </Link>
                <Link to="/productos" className='nav_link'>
                  Productos
                </Link>
                <Link to="/contacto" className='nav_link'>
                  Contacto
                </Link>
                <Link to="/sobre-nosotros" className='nav_link'>
                  Sobre Nosotros
                </Link>
                <Link to="/administracion" className='nav_link'>
                  Administracion
                </Link>
              </Box>
              <Box sx={{display: 'flex'}}>
                {user ? ( // Verifica si el usuario está autenticado
                  <div className="avatar">
                    {user.rol.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <>
                    <Link to="/auth/login">
                      <Button label={'Iniciar Sesión'} backgroundColor={colors.backgroundColor} backgroundColorHover={colors.secondaryColor} color={colors.textColor} onClick={handleOpenLoginForm} />
                    </Link>
                    <Button label={'Crear Cuenta'} backgroundColor={colors.backgroundColor} backgroundColorHover={colors.secondaryColor} color={colors.textColor} onClick={handleOpenLoginForm} />
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="top" open={drawerOpen} onClose={ toggleDrawer }>
          <MenuItem onClick={ toggleDrawer }>Iniciar Sesión</MenuItem>
          <MenuItem onClick={ toggleDrawer }>Crear Cuenta</MenuItem>
          <Link to="/">
            <MenuItem onClick={ toggleDrawer }>Home</MenuItem>
          </Link>
          <Link to="/productos">
            <MenuItem onClick={ toggleDrawer }>Productos</MenuItem>
          </Link>
          <Link to="/contacto" color="inherit">
            <MenuItem onClick={ toggleDrawer }>Contacto</MenuItem>
          </Link>
          <Link to="/sobre-nosotros" >
            <MenuItem onClick={ toggleDrawer }>Sobre Nosotros</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  };