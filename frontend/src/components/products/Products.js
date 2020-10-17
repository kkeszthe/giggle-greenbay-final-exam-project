import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import './Products.css';
import { getProductsAction } from '../../actions/ProductsActions';

function Products({ products, getProducts }) {
  const history = useHistory();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  function gotToProduct(productId) {
    history.push(`/products/${productId}`);
  }
  if (products.length === 0) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <section className="products">
      {products.map(product => (
        <div
          className="icons"
          key={product.id}
          onClick={() => gotToProduct(product.id)}
        >
          <img
            src={product.product_photo}
            alt={product.product_name}
            className="image"
          ></img>
          <div>
            <Typography variant="body1">{product.product_name}</Typography>
            <Typography variant="body1">{product.price} GBD</Typography>
          </div>
        </div>
      ))}
    </section>
  );
}

const mapStateToProps = ({ products }) => {
  return { products };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      return dispatch(getProductsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
