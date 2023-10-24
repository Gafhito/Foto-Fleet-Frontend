import { useState } from 'react';
import { TextField, Box, Grid, Typography, ThemeProvider, createTheme, styled } from '@mui/material';

import { Button } from '../common/button/Button';
import { colors } from '../../utils/constants';
import { Calendar } from '../common/calendar/Calendar';


const customTheme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.Mui-focused' : {
              '&::after': {
                borderBottom: `2px solid ${colors.textColor}`,
              },
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: `${colors.textColor}`,
            '&[data-shrink="false"]' : {
              transform: 'translate(10px, 36px) scale(1)',
            },
            '&[data-shrink="true"]': {
              color: `${colors.textColor}`,
              transform: 'translate(6px, 17px) scale(0.75)',
            },
          },
        },
      },
    },
  });
  
  
  
  const StyledTextField = styled(TextField)({
    paddingTop: '1rem',
  });
  
  
  export const Searcher = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleSearch = () => {
      // Falta desarrollar logica de busqueda por fecha
      console.log('Búsqueda realizada:');
      console.log('Búsqueda:', searchQuery);
      console.log('Fecha seleccionada:', selectedDate);
    };
  
    return (
      <ThemeProvider theme={customTheme}>
  
        <Grid sx={{margin: '9rem auto', backgroundColor: colors.primaryColor, display: 'flex', flexDirection:'column', justifyContent: 'space-around', alignItems:'center', height:'15rem', width: '90vw', borderRadius: '1rem'}}>
  
          <Typography variant='h3' sx={{fontWeight:'bolder', color:'White'}} >
              Hacé tu reserva!
          </Typography>
  
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'80%'}}>
  
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '40%' }}>
                <StyledTextField
                  id="filled-basic"
                  label="Buscar..."
                  variant="filled"
                  sx={{ width: '100%' }}
                />
            </Box>
  
            <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Calendar label={'Fecha Desde'}/>
                <Calendar label={'Fecha Hasta'}/>
            </Box>
  
            <Box display="flex" justifyContent="flex-end">
                <Button label={'Buscar'} backgroundColor={colors.backgroundColor} backgroundColorHover={colors.secondaryColor} color={colors.textColor}/>
            </Box>
  
          </Box>
  
        </Grid>
  
      </ThemeProvider>
      
    );
  };
  
