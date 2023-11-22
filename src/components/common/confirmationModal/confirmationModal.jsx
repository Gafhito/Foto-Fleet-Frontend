import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: '16px' }}>
        <Typography variant="h6">Confirmar Eliminación</Typography>
        <Typography>¿Estás seguro de que deseas eliminar este producto?</Typography>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="outlined" color="secondary">
          Confirmar
        </Button>
      </div>
    </Dialog>
  );
}
