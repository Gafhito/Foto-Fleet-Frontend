import { Box } from '@mui/material';
import { Link } from "react-router-dom";

import { useAuth } from '../../../utils/AuthContext';

import './navLinks.css';

export const NavLinks = () => {

    const { user } = useAuth();

  return (
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
        {user && user.role === 'Admin' && <Link to="/administracion" className='nav_link'>
            Administracion
        </Link>}
    </Box>
  )
}

