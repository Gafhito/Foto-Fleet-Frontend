
import { Link } from "react-router-dom";
import { Box, Typography } from '@mui/material';

import logo from '../../../assets/img/Logo.png';

export const Logo = () => {
  return (
    <Link to='/' style={{textDecoration: 'none'}}>
        <Box sx={{display:'flex'}}>
            <img src={logo} alt="Logo" style={{ width: '7rem' }} />
            <Typography variant="h6" sx={{ display: { xs: 'flex', sm: 'none', md: 'flex'}, alignItems: 'center', marginLeft: { xs: '1.5rem', sm: '1rem' }, letterSpacing: '.8rem', color: '#fff', textDecoration: 'none'}}>
                Captura el momento
            </Typography>
        </Box>
    </Link>
  )
}
