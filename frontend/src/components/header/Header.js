import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import ProductBox from '../products/ProductBox';
import Error from '../Error';
import { getUserAction } from '../../actions/UserActions';

const Header = ({ user, token, get }) => {
  const loggedIn = { link: `Hi ${user.username}!`, route: '/products' };
  const loggedOut = { link: 'Hi! Login', route: '/login' };
  const [open, setOpen] = React.useState(false);

  let greeting;

  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (token) {
      get();
    }
  }, [token, get]);

  token ? (greeting = loggedIn) : (greeting = loggedOut);

  return (
    <nav className="header">
      <Link className="header" to={greeting.route}>
        {greeting.link}
      </Link>
      {token ? (
        <div className="sell" onClick={handleClickOpen}>
          Sell
        </div>
      ) : null}
      <ProductBox open={open} setOpen={setOpen} />
      <Error />
    </nav>
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
