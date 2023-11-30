import { Box } from '@mui/material';
import { Button } from '../common/button/Button';
import { colors } from '../../utils/constants';
import { PaginationNumbers } from './PaginationNumbers';

export const Pagination = ({ currentPage, changePage, totalPages }) => {
  return (
    <Box sx={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button label={'Anterior'} backgroundColor={colors.primaryColor} colorHover={colors.primaryColorHover} color={colors.blackColor} onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </Button>
      <PaginationNumbers totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
      <Button label={'Siguiente'} backgroundColor={colors.primaryColor} colorHover={colors.primaryColorHover} color={colors.blackColor} onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
        Siguiente
      </Button>
    </Box>
  );
};
