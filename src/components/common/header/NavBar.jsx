import { Box } from '@mui/material';
import { NavLinks } from './NavLinks';
import { HeaderButtons } from './HeaderButtons';

import { useAuth } from '../../../utils/AuthContext';

export const NavBar = () => {

    const { user } = useAuth(); // Accedemos al usuario autenticado desde el contexto
    return (
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: {sm: 'space-between', md:'space-around'}, alignItems: {sm:'center'}, width: { lg: '65%', sm:'85%'} }}>
            <NavLinks />
            <Box sx={{display: 'flex'}}>
                {user ? ( // Verifica si el usuario está autenticado
                    <div className="avatar">
                        {user.rol.charAt(0).toUpperCase()}
                    </div>
                ) : (
                    <HeaderButtons />
                )}
            </Box>
        </Box>
    )
}
