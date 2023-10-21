import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Link as MuiLink, Box, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";

import logo from '../../../assets/img/Logo.png';
import { Button } from '../button/Button';
import { colors } from '../../../utils/constants';


import './header.css';


export const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
  
  
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
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', marginLeft: { xs: '1.5rem' }}}>
              <Link to='/'>
                <img src={logo} alt="Logo" style={{ width: '7rem' }} />
              </Link>
              <Box sx={{
                marginLeft: {
                  xs: '2rem',
                  sm: '1rem',
                },
                letterSpacing: '.8rem',
                display: {xs: 'flex', sm: 'none', md: 'flex'},
              }}>
                Captura el momento
              </Box>
            </Typography>
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
                  <Button label={'Iniciar Sesion'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.secondaryColor}/>
                  <Button label={'Crear Cuenta'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.secondaryColor}/>
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