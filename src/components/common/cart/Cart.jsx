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
import { useCart } from '../../../utils/CartContext';
import { colors } from '../../../utils/constants';
import { Button } from '../button/Button';


export const Cart = ({ cartItems, onClose, open, onCheckoutClick }) => {

    const { removeFromCart } = useCart();
  
    const handleRemoveItemClick = (cartItemId) => {
      removeFromCart(cartItemId);
    };

    const total = cartItems.reduce(
        (accumulator, item) => accumulator + item.rentalPrice,0
    );
  
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <List>
          <ListItem>
            <Typography variant="h6" sx={{ flexGrow: 1, color:colors.blackColor }}>
              Carrito de Compras
            </Typography>
            <IconButton onClick={onClose}>
              <ShoppingCartIcon sx={{color:colors.blackColor}}/>
            </IconButton>
          </ListItem>
          <Divider />
          {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
            <ListItem key={index}>
                <img
                    src={item?.image}
                    alt={item?.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px', objectFit:'contain' }}
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
          {/* Mostrar el precio total */}
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Total:</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {`$${total.toFixed(2)}`} {/* dos decimales */}
            </Typography>
            </ListItem>
          {/* Botón "Finalizar Reserva" */}
          <ListItem sx={{display:'flex', justifyContent:'center'}}>
            <Button label={'Finalizar Reserva'} backgroundColor={colors.primaryColor} backgroundColorHover={colors.primaryColorHover} color={colors.blackColor} onClick={onCheckoutClick}/>
          </ListItem>
        </List>
      </Drawer>
    );
};