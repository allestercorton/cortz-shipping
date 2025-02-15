import { useContext } from 'react';
import { Store } from '../Store';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const {
    state: { userInfo },
  } = useContext(Store);

  return userInfo ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoute;
