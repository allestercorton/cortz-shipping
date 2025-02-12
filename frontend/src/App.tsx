import React, { useContext, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Store } from './Store';
import { Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const {
    state: { mode },
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
      <header>
        <Navbar expand='lg'>
          <Container>
            <Navbar.Brand>tsamazona</Navbar.Brand>
            <Nav className='ms-auto d-flex align-items-center gap-3'>
              <Button
                variant='link'
                onClick={switchModeHandler}
                className='d-flex bg-none align-items-center p-0'
              >
                {mode === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              <a href='/cart' className='nav-link'>
                Cart
              </a>
              <a href='/signin' className='nav-link'>
                Sign In
              </a>
            </Nav>
          </Container>
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
