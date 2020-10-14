import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Product.css';
import { setErrorAction } from '../../actions/ErrorActions';
import {
  getProductAction,
  buyProductAction,
} from '../../actions/ProductsActions';

function Product({ user, get, product, buyProduct }) {
  let { productId } = useParams();

  useEffect(() => {
    get(productId);
  }, [productId, get]);

  if (!product.product_id) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <section className="product">
      <div>
        <img
          className="productPhoto"
          alt={product}
          src={product.product_photo}
        ></img>
      </div>

      <div className="product">
        <Typography variant="h2">{product.product_name}</Typography>
        <Typography variant="h5">{product.description}</Typography>
        <Typography variant="h4">{product.price + ' GBD'}</Typography>
        <div className="seller">
          <Typography variant="h6">Seller: </Typography>
          <Avatar alt="Profile Picture" src={product.seller_photo} />
          <Typography variant="h6">{product.seller_name}</Typography>
        </div>
        {product.buyer_id ? (
          <div className="seller">
            <Typography variant="h6">Buyer: </Typography>
            <Avatar alt="Profile Picture" src={user.photo_url} />
            <Typography variant="h6">{user.username}</Typography>
          </div>
        ) : null}
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            buyProduct(productId);
          }}
          disabled={product.buyer_id ? true : false}
        >
          Buy Product
        </Button>
      </div>
    </section>
  );
}

const mapStateToProps = ({ token, user, product }) => {
  return { token, user, product };
};

const mapDispatchToProps = dispatch => {
  return {
    get: productId => {
      return dispatch(getProductAction(productId));
    },
    buyProduct: productId => {
      return dispatch(buyProductAction(productId));
    },
    setError: error => {
      dispatch(setErrorAction(error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
