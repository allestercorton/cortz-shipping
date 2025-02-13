import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import { Product } from '../types/Product';
import Rating from './Rating';
import { Store } from '../Store';
import { CartItem } from '../types/Cart';
import { convertProductToCartItem } from '../utils';
import { toast } from 'react-toastify';

const ProductItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.warn('Sorry, product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    toast.success('Product added to cart');
  };

  return (
    <Card className='mb-3'>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={`Image of ${product.name}`}
          className='card-img-top'
          loading='lazy'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text as='h4'>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
