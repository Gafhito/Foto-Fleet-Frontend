import { Box, IconButton, useMediaQuery} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { breakpoints } from '../../../utils/constants';

export const MobileMenuIcon = ({ onClick }) => {
  const isWideScreen = useMediaQuery(`(min-width: ${breakpoints.md})`);

  return (
    <Box sx={{ flex: '0 0 auto', width: 'fit-content', display: isWideScreen ? 'none' : 'block' }}>
      <IconButton
        color="inherit"
        sx={{ display: isWideScreen ? 'none' : 'block' }}
        onClick={onClick}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};
