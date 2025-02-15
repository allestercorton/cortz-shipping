import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import { StoreProvider } from './Store.tsx';
import CartPage from './pages/CartPage.tsx';
import ShippingAddressPage from './pages/ShippingAddressPage.tsx';
import SigninPage from './pages/SigninPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import PaymentMethodPage from './pages/PaymentMethodPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PlaceOrder from './pages/PlaceOrder.tsx';
import OrderPage from './pages/OrderPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path='product/:slug' element={<ProductPage />} />
      <Route path='cart' element={<CartPage />} />
      <Route path='signin' element={<SigninPage />} />
      <Route path='signup' element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='shipping' element={<ShippingAddressPage />} />
        <Route path='payment' element={<PaymentMethodPage />} />
        <Route path='placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<OrderPage />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </StrictMode>
);
