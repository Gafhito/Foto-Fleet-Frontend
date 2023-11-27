import { TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

export const CustomTextField = ({ label, value, onChange, onFocus, onBlur, error, helperText, xsw }) => {
  return (
    <div>
      <TextField
        sx={{ width: { xs: xsw ? xsw : '90%' }, margin:'0 0 2rem 0'}}
        className='form_input'
        id="filled-basic"
        label={label}
        variant="filled"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        error={Boolean(error)}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </div>
  );
};