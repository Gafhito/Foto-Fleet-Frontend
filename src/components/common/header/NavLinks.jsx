import { Box } from '@mui/material';
import { Link } from "react-router-dom";
import { useAuth } from '../../../utils/AuthContext';
import { routes } from '../../../utils/constants';
import './navLinks.css';

export const NavLinks = () => {
    const { user } = useAuth();

    return (
        <Box>
            <Link to={routes.home} className='nav_link'>
                <span className="desktop-link">Home</span>
            </Link>
            <Link to={routes.contact} className='nav_link'>
                <span className="desktop-link">Contacto</span>
            </Link>
            <Link to={routes.about} className='nav_link'>
                <span className="desktop-link">Sobre Nosotros</span>
            </Link>
            <Link to={routes.politics} className='nav_link'>
                <span className="desktop-link">Políticas</span>
            </Link>
            {user && user.role === 'Admin' && (
                <Link to={routes.administration} className='nav_link'>
                    <span className="desktop-link">Administración</span>
                </Link>
            )}
        </Box>
    );
}