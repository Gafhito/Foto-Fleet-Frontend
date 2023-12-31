import { Link } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import logo from '../../../assets/img/Logo (1).png';

export const Logo = () => {
  const isSmScreen = useMediaQuery('(max-width:1100px)'); // Define el punto de quiebre para ocultar el texto

  return (
    <Link to='/' style={{ textDecoration: 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '3rem' }} />
        {isSmScreen ? null : (
          <Typography variant="h7" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '1.5rem', letterSpacing: '.3rem', color: '#fff', textDecoration: 'none' }}>
            Captura el momento
          </Typography>
        )}
      </Box>
    </Link>
  );
}
