import React from 'react';
import { Card } from 'react-bootstrap';
import "../custom-css/product.css"
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
      <Card className='my-3 p-3 rounded product-card'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>
        <Card.Body className='product-card-body'>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div' className='product-title'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div' className='product-rating'>
            <div className='my-3'>
              {product.rating} from {product.numReviews} reviews
            </div>
          </Card.Text>

          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>

          <Card.Text as='h3' className='product-price'>
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

export default Product;
