import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

import { colors } from '../../../utils/constants';


const customTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.terciaryColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: `${colors.terciaryColor}`,
          '&[data-shrink="false"]' : {
          },
          '&[data-shrink="true"]': {
            color: `${colors.terciaryColor}`,
          },
        },
      },
    },
  },
});

const StyledDatePicker = styled(DatePicker)({
    //Estilos extras
});

export const Calendar = ({label}) => {

  return (
    <ThemeProvider theme={customTheme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ marginRight: '1rem', paddingTop: '1rem' }}>
        <StyledDatePicker label={label} />
      </DemoContainer>
    </LocalizationProvider>
  </ThemeProvider>
  )
}