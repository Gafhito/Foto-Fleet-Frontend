import { useState, useEffect } from 'react';
import { TextField, Box, Grid, Typography, ThemeProvider, createTheme, styled,  MenuItem, Select, InputLabel, FormControl, Autocomplete, } from '@mui/material';

import { Button } from '../common/button/Button';
import { colors } from '../../utils/constants';

import { useProductContext } from '../../utils/ProductContext';
import { useAuth } from '../../utils/AuthContext';


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
    const { searchProducts, fetchProductSuggestions } = useProductContext();
    const { getCategories } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
  
    useEffect(() => {
      const fetchCategories = async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      };
  
      fetchCategories();
    }, [getCategories]);



    // Debounce 
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  
    const handleSearch = () => {
      console.log('SearchQuery: ' + searchQuery + ' selectedCategory: ' + selectedCategory)
      searchProducts(searchQuery || '""', selectedCategory || '""');
    };

    const handleInputChange = debounce(async (event, params) => {
      if (!params) {
        return;
      }
  
      const { inputProps } = params;
  
      if (!inputProps) {
        return;
      }
  
      const { value } = inputProps;
  
      setSearchQuery(value);
  
      try {
        console.log('VALUE: ' + value);
        const suggestions = await fetchProductSuggestions(value);
        setSuggestedProducts(suggestions);
        console.log('SUGGESTIONS: ', suggestions);
      } catch (error) {
        console.error('Error fetching product suggestions', error);
      }
    }, 450); // Adjust the delay as needed


    const handleSelect = (event, newValue) => {
      if (newValue && newValue.label) {
        setSearchQuery(newValue.label);
      }
    };
  
    return (
      <ThemeProvider theme={customTheme}>
        <Grid sx={{margin: '3rem auto', paddingTop:'3rem', backgroundColor: colors.primaryColor, display: 'flex', flexDirection:'column', justifyContent: 'space-around', alignItems:'center', height:'15rem', width: '100%', borderRadius: '1rem', boxShadow: '0px 0px 5px -4px rgba(0, 0, 0, 1)'}}>
          <Typography variant='h3' sx={{fontWeight:'bolder', color: colors.blackColor}} >
              Encúentra lo que buscas!
          </Typography>
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'80%'}}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '40%' }}>
          <Autocomplete
      sx={{ width: '80%' }}
      id="search-input"
      options={suggestedProducts}
      getOptionLabel={(option) => option.label || ''}
      freeSolo
      value={{ label: searchQuery }}
      onChange={handleSelect}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label="Buscar..."
          variant="filled"
          sx={{ width: '100%', marginRight: '1.5rem' }}
          onChange={(e) => handleInputChange(e, params)}
        />
              )}
            />
          </Box>

            <FormControl variant="filled" className='searcher_select' sx={{ marginRight: '3rem', width:'15%', paddingTop:'1rem', fontSize:'.8rem' }}>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select sx={{height:'3rem'}}
              labelId="category-label"
              id="category-select"
              value={selectedCategory}
              label="Categoría"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

            {/*<Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Calendar label={'Fecha Desde'}/>
                <Calendar label={'Fecha Hasta'}/>
              </Box>*/}

                <Button label={'Buscar'} backgroundColor={colors.blackColor} backgroundColorHover={colors.secondaryColorHover} color={'#ffffff'} mt={'1rem'} minWidth={'100px'} onClick={handleSearch}/>

          </Box>
        </Grid>
      </ThemeProvider>     
    );
  };
  
