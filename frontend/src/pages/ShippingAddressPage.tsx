import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';

const ShippingAddressPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='text'
              name='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete='name'
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete='street-address'
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete='address-level2'
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              name='postalCode'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              autoComplete='postal-code'
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='country'>
            <Form.Label>country</Form.Label>
            <Form.Control
              type='text'
              name='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              autoComplete='country'
              required
            ></Form.Control>
          </Form.Group>
          <div className='mb-3'>
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
