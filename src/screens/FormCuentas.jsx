import React, { useEffect , useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormCuentas = ({ recargarCuentas }) => {
  const [cuenta, setCuenta] = useState({ numeroCuenta: '' , idCliente: '' , saldoCuenta: '' ,moneda:''});
  const [clientes, setClientes] = useState([]);
  const [filtroCedula, setFiltroCedula] = useState('');

  const resetForm = () => {
    setCuenta({numeroCuenta: '' , idCliente: '' , saldoCuenta: '' ,moneda:''});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "filtroCliente") {
      setFiltroCedula(value);
    } else {
      setCuenta({ ...cuenta, [name]: value });
    }
  };
  useEffect(() => {
    // Cargar los idClientes desde el backend al iniciar el componente
    fetch('http://127.0.0.1:3001/clientes-sql') // Asegúrate de tener esta ruta configurada en tu backend
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://127.0.0.1:3001/cuentas-sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cuenta)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Cuenta agregada:', data);
      alert("Cuenta creada de manera correcta");
      resetForm();
      recargarCuentas();
    })
    .catch(error => console.error('Error al agregar la cuenta:', error));
  };

  return (
    <ContenedorTabla>
      <h1>Crear Cuenta</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Cliente:</StyledLabel>
          <StyledInput
            type="text"
            name="filtroCliente"
            placeholder="Buscar por cédula"
            value={filtroCedula}
            onChange={(e) => setFiltroCedula(e.target.value)}
          
          />
          <StyledSelect
            name="idCliente"
            value={cuenta.idCliente}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes
              .filter(cliente => cliente.cedula.includes(filtroCedula))
              .map(cliente => (
                <option key={cliente.idCliente} value={cliente.idCliente}>
                  {`${cliente.cedula} - ${cliente.nombreCliente} ${cliente.apellidoCliente}`}
                </option>
              ))}
          </StyledSelect>



          <StyledLabel>Moneda:</StyledLabel>
          <StyledSelect
            name="moneda"
            value={cuenta.moneda}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una Moneda</option>
            <option value="Colones">Colones</option>
            <option value="Dolares">Dolares</option>
            <option value="Euros">Euros</option>
          </StyledSelect>

          <StyledLabel>Balance:</StyledLabel>
          <StyledInput
            type="text"
            name="saldoCuenta"
            value={cuenta.saldoCuenta}
            onChange={handleChange}
            required
          />
          <ContenedorBotones>
              <BotonAgregar type="submit">Guardar</BotonAgregar>
              <BotonCancelar as={Link} to="/RegCuenta">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormCuentas;



const ContenedorTabla = styled.div`
  padding:50px;

`;
const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;
const ContenedorBotones = styled.div`
  display:flex;
  flex-flow: row nowrap;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #f8f8f8;
  justify-content:center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  max-width:500px;
  flex-direction: column;
  gap: 15px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const StyledSelect = styled(StyledInput).attrs({ as: 'select' })``;

const BotonAccion = styled.button`
  text-decoration:none;
  font-weight:bold;
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BotonCancelar = styled(BotonAccion)`
  background-color: #FF6347; 
  color: white;

  &:hover {
    background-color: #E55347; 
  }
`;
const BotonAgregar = styled(BotonAccion)`
  background-color: #007bff; 
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
