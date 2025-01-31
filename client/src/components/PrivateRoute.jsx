import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists or any other method
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export  default PrivateRoute
