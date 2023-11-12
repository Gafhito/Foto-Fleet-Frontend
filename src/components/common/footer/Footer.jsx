import { Box, Container, Typography } from '@mui/material';
import logo from '../../../assets/img/Logo.png';
import './footer.css';


const currentYear = new Date().getFullYear();

export const Footer = () => {
    return (
        <Box component="footer" className="footer">
        <Container maxWidth="lg">
            <div className="footer-content">
            <img className='logo_footer' src={logo} alt="logo empresa" />
            <Typography variant="body2" component="span">
                &copy; {currentYear} FotoFleet
            </Typography>
            </div>
        </Container>
        </Box>
  );
}