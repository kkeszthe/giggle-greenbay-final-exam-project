import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import './Header.css';
import TopUpBox from '../user/TopUpBox';
import SellProductBox from '../products/SellProductBox';
import Error from '../Error';
import { getUserAction } from '../../actions/UserActions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ user, token, get }) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSellProduct, setOpenSellProduct] = React.useState(false);
  const [openTopUp, setOpenTopUp] = React.useState(false);

  const handleClickOpenSellProduct = () => {
    setOpenSellProduct(true);
  };
  const handleClickOpenTopUp = () => {
    setOpenTopUp(true);
  };
  useEffect(() => {
    if (token) {
      get();
    }
  }, [token, get]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            GreenBay
          </Typography>

          {
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {token ? (
                  <Avatar alt="Profile Picture" src={user.photo_url} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              {token ? (
                <>
                  <Typography variant="overline">{user.username}</Typography>
                  <Typography variant="overline" className={'balance'}>
                    {user.balance + ' GBD'}
                  </Typography>
                </>
              ) : null}

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {token ? (
                  [
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleClickOpenTopUp();
                      }}
                      key={1}
                    >
                      Top-up account
                    </MenuItem>,
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        handleClickOpenSellProduct();
                      }}
                      key={2}
                    >
                      Sell product
                    </MenuItem>,
                  ]
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      history.push('/login');
                    }}
                  >
                    Login
                  </MenuItem>
                )}
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
      <TopUpBox open={openTopUp} setOpen={setOpenTopUp} />
      <SellProductBox open={openSellProduct} setOpen={setOpenSellProduct} />
      <Error />
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = ({ user, token }) => {
  return { user, token };
};

const mapDispatchToProps = dispatch => {
  return {
    get: () => {
      return dispatch(getUserAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
