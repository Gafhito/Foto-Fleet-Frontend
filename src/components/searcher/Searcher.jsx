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
    };
  
    return (
      <ThemeProvider theme={customTheme}>
        <Grid sx={{margin: '3rem auto', paddingTop:'3rem', backgroundColor: colors.primaryColor, display: 'flex', flexDirection:'column', justifyContent: 'space-around', alignItems:'center', height:'15rem', width: '100%', borderRadius: '1rem', boxShadow: '0px 0px 5px -4px rgba(0, 0, 0, 1)'}}>
          <Typography variant='h3' sx={{fontWeight:'bolder', color: colors.blackColor}} >
              Encúentra lo que buscas!
          </Typography>
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'80%'}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '55%' }}>
                <StyledTextField
                  id="filled-basic"
                  label="Buscar..."
                  variant="filled"
                  sx={{ width: '100%', marginRight: '3rem' }}
                />
            </Box>
            {/*<Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Calendar label={'Fecha Desde'}/>
                <Calendar label={'Fecha Hasta'}/>
              </Box>*/}

                <Button label={'Buscar'} backgroundColor={colors.blackColor} backgroundColorHover={colors.secondaryColorHover} color={'#ffffff'} mt={'1rem'} minWidth={'100px'}/>

          </Box>
        </Grid>
      </ThemeProvider>     
    );
  };
  
