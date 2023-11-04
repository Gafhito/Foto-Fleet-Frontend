import { Menu, MenuItem } from '@mui/material';

import { useAuth } from '../../utils/AuthContext';

export const UserMenu = ({ anchorEl, onClose }) => {

    const { logout } = useAuth();

    const handleLogout = () => {
      logout(); // Llama a la función logout cuando se hace clic en "Cerrar Sesión"
      onClose(); // Cierra el menú al hacer clic en Cerrar Sesión 
    };
  
    return (
      <Menu
          anchorEl={anchorEl} // Define la posición del menú
          open={Boolean(anchorEl)} // Abre el menú si anchorEl no es nulo
          onClose={onClose} // Cierra el menú cuando se hace clic en cualquier elemento del menú
      >
          <MenuItem onClick={onClose}>Perfil</MenuItem> 
          <MenuItem onClick={onClose}>Mis Reservas</MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    );
  }

