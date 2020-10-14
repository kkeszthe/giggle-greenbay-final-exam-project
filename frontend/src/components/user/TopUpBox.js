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

import { updateUserBalanceAction } from '../../actions/UserActions';
import { setErrorAction } from '../../actions/ErrorActions';

function TopUpBox({ open, setOpen, topUp, setError }) {
  const [amount, setAmount] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const topUpClickOn = () => {
    if (!amount) {
      setError('Amount is required.');
    }
    if (!(Number.isInteger(parseInt(amount)) || parseInt(amount) < 0)) {
      setError('Amount must be whole number');
    } else {
      topUp(amount);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Top-up Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide amount you want to top-up your account with.
        </DialogContentText>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            pattern="[0-9]{1,10}"
            title="Whole numbers only"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={e => {
              setAmount(e.target.value);
            }}
            required
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={topUpClickOn} color="primary">
          Top-up
        </Button>
      </DialogActions>
    </Dialog>
  );
}

TopUpBox.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    topUp: amount => {
      dispatch(updateUserBalanceAction(amount));
    },
    setError: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopUpBox);
