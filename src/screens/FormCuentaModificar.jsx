import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FormCuentaModificar = ({onActualizarCuenta}) => {

  const [cuenta, setCuenta] = useState({ moneda: '', numeroCuenta: '', saldoCuenta: '' });
  const [clientes, setClientes] = useState([]);

  const [filtroCedula, setFiltroCedula] = useState('');
  const { idCuenta } = useParams();

  useEffect(() => {
    fetch('http://127.0.0.1:3001/clientes-sql') // Asegúrate de tener esta ruta configurada en tu backend
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
      console.log(idCuenta);
      cargarCuenta(+idCuenta);
  }, [cuenta, idCuenta]);
 
  const cargarCuenta = (id) => {
    fetch(`http://127.0.0.1:3001/cuentas-sql/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("CargarCuenta");
        console.log(data);
        if (data) {
          console.log(data);
          setCuenta({
            idCuenta: data.idCuenta,
            numeroCuenta: data.numeroCuenta,
            idCliente: data.idCliente,
            moneda: data.moneda,
            saldoCuenta: data.saldoCuenta 
          });

        }
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const handleChange = (e) => {
    setCuenta({ ...cuenta, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();



    const actualizarCuenta = async () => {
      try {
        const response = await fetch(`/cuentas-sql/${cuenta.numeroCuenta}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numeroCuenta: cuenta.numeroCuenta,
            idCliente: cuenta.idCliente,
            saldoCuenta: cuenta.saldoCuenta,
            moneda: cuenta.moneda
          }),
        });

        if (!response.ok) {
          throw new Error('No se pudo actualizar la cuenta');
        }

        const result = await response.json();
       
        console.log('Cuenta actualizada con éxito:', result);
      } catch (error) {
        console.error('Error al actualizar la cuenta:', error);
      }
    };

    actualizarCuenta();
  };

  return (
    <ContenedorTabla>
    <h1>Modificar Cuenta</h1>
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="saldoCuenta">Numero Cuenta:</StyledLabel>
        <StyledInput
            id="numeroCuenta"
            type="text"
            value={cuenta.numeroCuenta}
            onChange={handleChange}
            required
        />
        <StyledLabel>Cliente:</StyledLabel>
          <StyledInput
            type="text"
            name="filtroCliente"
            placeholder="Buscar por cédula"
            value={filtroCedula}
            onChange={handleChange}
          
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
        <StyledLabel htmlFor="saldoCuenta">Saldo:</StyledLabel>
          <StyledInput
            id="saldoCuenta"
            type="text"
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

export default FormCuentaModificar;

// Definiciones de Styled Components...

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
