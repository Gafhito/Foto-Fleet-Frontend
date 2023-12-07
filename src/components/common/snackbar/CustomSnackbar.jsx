import { Snackbar, Alert } from '@mui/material';

export const CustomSnackbar = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

