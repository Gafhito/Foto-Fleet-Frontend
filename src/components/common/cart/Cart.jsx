import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../../utils/CartContext'; // Import the CartContext hook

export const Cart = ({ cartItems, onClose, open, onCheckoutClick }) => {
    const { removeFromCart } = useCart();
  
    const handleRemoveItemClick = (cartItemId) => {
      removeFromCart(cartItemId);
    };
  
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <List>
          <ListItem>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Carrito de Compras
            </Typography>
            <IconButton onClick={onClose}>
              <ShoppingCartIcon />
            </IconButton>
          </ListItem>
          <Divider />
          {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
            <ListItem key={index}>
                <img
                    src={item?.image}
                    alt={item?.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
              <ListItemText
                primary={item?.name}
                secondary={`Cantidad: ${item?.quantity}, Precio: ${item?.rentalPrice}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveItemClick(item.cartItemId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {/* Botón "Finalizar Reserva" */}
          <ListItem>
            <button onClick={onCheckoutClick}>Finalizar Reserva</button>
          </ListItem>
        </List>
      </Drawer>
    );
};