import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Products.css';
import { getProductsAction } from '../../actions/ProductsActions';

function Products({ products, getProducts }) {
  const history = useHistory();
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  function goToBuilding(productId) {
    history.push(`products/${productId}`);
  }
  return (
    <section className="products">
      {products.map(product => (
        <div
          className="icons"
          key={product.product_id}
          onClick={() => goToBuilding(product.product_id)}
        >
          <img
            src={product.product_photo}
            alt={product.product_name}
            className="image"
          ></img>
          <div>
            <p className="productName">{product.product_name}</p>
            <p className="productPrice">{product.price} GBD</p>
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
