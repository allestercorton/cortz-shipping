import React, { useContext, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Badge } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './Store';

const App: React.FC = () => {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar expand='lg'>
          <Container>
            <Navbar.Brand as={Link} to='/'>
              tsamazona
            </Navbar.Brand>
          </Container>
          <Nav className='ms-auto d-flex align-items-center gap-3'>
            <Button
              variant='link'
              onClick={switchModeHandler}
              className='d-flex bg-none align-items-center p-0'
              style={{ color: mode === 'light' ? 'black' : 'white' }}
            >
              {mode === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Link to='/cart' className='nav-link'>
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <a href='/signin' className='nav-link'>
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
  );
};

export default App;
