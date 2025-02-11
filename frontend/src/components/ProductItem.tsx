import { Product } from '../types/Product';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card className='mb-3'>
      <Link to={`product/${product.slug}`}>
        <img
          src={product.image}
          alt={`Image of ${product.name}`}
          className='card-img-top'
          loading='lazy'
        />
      </Link>
      <Card.Body>
        <Link to={`product/${product.slug}`}>
          <Card.Title as='h5'>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text as='h4'>${product.price}</Card.Text>
        <Button
          variant={product.countInStock === 0 ? 'light' : 'primary'}
          disabled={product.countInStock === 0}
        >
          {product.countInStock === 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
