import { Drawer, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export const HeaderDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Link to="/auth/login">
        <MenuItem onClick={onClose}>Iniciar Sesión</MenuItem>
      </Link>
      <Link to="/auth/registro">
        <MenuItem onClick={onClose}>Crear Cuenta</MenuItem>
      </Link>
      <Link to="/">
        <MenuItem onClick={onClose}>Home</MenuItem>
      </Link>
      <Link to="/productos">
        <MenuItem onClick={onClose}>Productos</MenuItem>
      </Link>
      <Link to="/contacto">
        <MenuItem onClick={onClose}>Contacto</MenuItem>
      </Link>
      <Link to="/sobre-nosotros">
        <MenuItem onClick={onClose}>Sobre Nosotros</MenuItem>
      </Link>
    </Drawer>
  );
};
