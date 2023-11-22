import { TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

export const CustomTextField = ({ label, value, onChange, onFocus, onBlur, error, helperText, xsw }) => {
  return (
    <TextField 
                        sx={{ width: { xs: xsw ? xsw : '90%' }, margin:'0 0 2rem 0'}} 
                        className='form_input' 
                        id="filled-basic" 
                        label={label} 
                        variant="filled" 
                        value={value}
                        onChange={onChange} // Actualiza el estado local de email
                        onFocus={onFocus}
                        onBlur={onBlur}
                        error={Boolean(error)}  // Agregado para manejar el estado de error
                        helperText={<FormHelperText>{helperText}</FormHelperText>}  // Agregado para mostrar el mensaje de error
                    />
  )
}

