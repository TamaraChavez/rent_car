import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userToken'); // Cambia según tu lógica de autenticación
  return isAuthenticated ? children : <Navigate to="/login" />;
};
export default PrivateRoute;