import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

import { addProductAction } from '../../actions/ProductsActions';
import { setErrorAction } from '../../actions/ErrorActions';

function SellProductBox({ open, setOpen, sell, setError }) {
  const [product_name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo_url, setPhotoUrl] = useState('');
  const [price, setPrice] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const sellClickOn = () => {
    if (!product_name || !description || !photo_url || price) {
      setError('All fields are required');
    }
    setPrice(parseInt(price));
    if (!price || !(Number.isInteger(price) && price > 0)) {
      setError('Price must be whole number');
    } else {
      sell(product_name, description, photo_url, price);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Sell Product</DialogTitle>
      <DialogContent>
        <DialogContentText>Please provide product details.</DialogContentText>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            required
            id="name"
            label="Name"
            type="text"
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={4}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="photo"
            label="Photo"
            type="url"
            onChange={e => {
              setPhotoUrl(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            pattern="[0-9]{1,10}"
            title="Whole numbers only"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={e => {
              setPrice(e.target.value);
            }}
            required
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          type="submit"
          className="TroopUpgradeBTN"
          onClick={sellClickOn}
          color="primary"
        >
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SellProductBox.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    sell: (product_name, description, photo_url, price) => {
      dispatch(addProductAction(product_name, description, photo_url, price));
    },
    setError: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellProductBox);
