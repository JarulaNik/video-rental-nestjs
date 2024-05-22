// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { removeFromCart, clearCart } from '../store/cartReducer.jsx'; // Update the path according to your project structure

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.rentalPrice[item.selectedRentalPeriod] || 0); // Use selected rental period for price
  }, 0);

  const handleRemoveFromCart = (movieId) => {
    dispatch(removeFromCart(movieId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    setOpenConfirmationDialog(true);
  };

  const handleConfirmCheckout = () => {
    // TODO: Implement logic to proceed with checkout process
    // For example, send data to backend for order processing
    setOpenConfirmationDialog(false);
    handleClearCart();
    navigate('/profile'); // Redirect to profile page after successful checkout
  };

  const handleCancelCheckout = () => {
    setOpenConfirmationDialog(false);
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ paddingTop: '50px' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.title}
                      secondary={`${item.selectedRentalPeriod}: $${item.rentalPrice[item.selectedRentalPeriod] || 0}`} // Display selected rental period and price
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Typography variant="body1">
                  Total: ${totalPrice}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleCheckout}>
                  Checkout
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearCart}
                  style={{ marginLeft: '10px' }}
                >
                  Clear Cart
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      {/* Confirmation Dialog */}
      <Dialog open={openConfirmationDialog} onClose={handleCancelCheckout}>
        <DialogTitle>Confirm Checkout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed with checkout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCheckout}>Cancel</Button>
          <Button onClick={handleConfirmCheckout} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Cart;