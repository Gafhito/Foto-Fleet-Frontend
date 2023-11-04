import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const MobileMenuIcon = ({ onClick }) => {
  return (
    <Box sx={{ width: 'fit-content', display: { xs: 'block', sm: 'none' } }}>
        <IconButton
            color="inherit"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={ onClick }
        >
            <MenuIcon />
        </IconButton>
    </Box>
  )
}

