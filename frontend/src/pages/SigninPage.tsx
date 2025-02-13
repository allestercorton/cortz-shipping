import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import { Store } from '../Store';
import { useSigninMutation } from '../hooks/userHooks';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import LoadingBox from '../components/LoadingBox';

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isPending } = useSigninMutation();

  const submitHandler = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const data = await signin({ email, password });
        dispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/');
      } catch (error) {
        toast.error(getError(error as ApiError));
      }
    },
    [email, password, signin, dispatch, navigate, redirect]
  );

  useEffect(() => {
    if (!userInfo) return;
    navigate(redirect);
  }, [navigate, redirect, userInfo]);

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
            required
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit' disabled={isPending}>
            Sign In
          </Button>
          {isPending && <LoadingBox />}
        </div>
        <div className='mb-3'>
          New Customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SigninPage;
