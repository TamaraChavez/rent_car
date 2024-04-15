
import './App.css';

import Navbar from './components/Navbar';
import AdmClientes from './screens/AdmClientes';
import RegCuenta from './screens/RegCuenta';
import RegTarjeta from './screens/RegTarjeta';
import Usuarios from './screens/Usuarios';
import Login from './screens/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import FormCliente from './screens/FormCliente';
import FormClienteModificar from './screens/FormClienteModificar';
import Principal from './screens/Principal';
import FormCuentas from './screens/FormCuentas';
import FormCuentaModificar from './screens/FormCuentaModificar';
import FormTarjeta from './screens/FormTarjeta';
import FormTarjetaModificar from './screens/FormClienteModificar';
import PrivateRoute from './components/PrivateRoute';

function AppWrapper() {
  const location = useLocation();

  return (
    <div>
      {/* Condición para no mostrar Navbar en la ruta de login */}
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
          <Route path="/" element={localStorage.getItem('userToken') ? <Navigate replace to="/Principal" /> : <Navigate replace to="/login" />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Principal' element={<Principal/>} />  
          <Route path='/AdmClientes' element={<AdmClientes/>} />
          <Route path='/RegCuenta' element={<RegCuenta/>} />
          <Route path='/RegCuenta/FormCuenta' element={<FormCuentas/>} />
          <Route path='/RegCuenta/FormCuenta/:idCuenta' element={<FormCuentaModificar/>} />
          <Route path='/RegTarjeta' element={<RegTarjeta/>} />
          <Route path='/RegTarjeta/FormTarjeta/' element={<FormTarjeta/>} />
          <Route path='/RegTarjeta' element={<FormTarjetaModificar/>} />
          <Route path='/Usuarios' element={<Usuarios/>} />
          <Route path="/AdmClientes/FormCliente" element={<FormCliente/>} />
          <Route path="/AdmClientes/FormClienteModificar/:idCliente" element={<FormClienteModificar/>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
