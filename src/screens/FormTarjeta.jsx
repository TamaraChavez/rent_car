import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormTarjeta = ({ recargarTarjetas }) => {
  const [tarjeta, setTarjeta] = useState({
    numeroTarjeta: '',
    PIN: '',
    fechaVencimiento: '',
    CVV: '',
    montoDisponible: '',
    estadoTarjeta: '',
    tipoTarjeta: '',
    idCuenta: '',
    idCliente: ''
  });
  const [clientes, setClientes] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [cuentasFiltradas, setCuentasFiltradas] = useState([]);
  const [filtroCedula, setFiltroCedula] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'filtroCliente') {
      // Actualiza el estado de filtroCedula en lugar de tarjeta
      setFiltroCedula(value);
    } else if (name === 'idCliente') {
      filtrarCuentasPorCliente(value);
      setTarjeta({ ...tarjeta, [name]: value });
    } else {
      // Manejo original, actualiza el estado tarjeta
      setTarjeta({ ...tarjeta, [name]: value });
    }
};

  useEffect(() => {
    // Cargar los clientes desde el backend
    fetch('http://127.0.0.1:3001/clientes-sql')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));

    // Cargar las cuentas desde el backend
    fetch('http://127.0.0.1:3001/cuentas-sql')
      .then(response => response.json())
      .then(data => setCuentas(data))
      .catch(error => console.error('Error al cargar las cuentas:', error));
  }, []);


  const filtrarCuentasPorCliente = (idCliente) => {
    // Filtramos las cuentas basándonos en el idCliente seleccionado
    const cuentasFiltradas = cuentas.filter(cuenta => +cuenta.idCliente === +idCliente);
    setCuentasFiltradas(cuentasFiltradas);
    // Reseteamos la selección de cuenta en el estado si el cliente cambia
    setTarjeta(prev => ({ ...prev, idCuenta: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:3001/tarjetas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarjeta)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Tarjeta agregada:', data);
      recargarTarjetas();
    })
    .catch(error => console.error('Error al agregar la tarjeta:', error));
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <ColumnContainer>
        
        <StyledLabel>Monto Disponible:</StyledLabel>
        <StyledInput
          type="number"
          name="montoDisponible"
          value={tarjeta.montoDisponible}
          onChange={handleChange}
          required
        />
        <StyledLabel>Tipo de Tarjeta:</StyledLabel>
        <StyledSelect
          name="tipoTarjeta"
          value={tarjeta.tipoTarjeta}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo</option>
          <option value="Debito">Débito</option>
          <option value="Credito">Crédito</option>
        </StyledSelect>
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
            value={tarjeta.idCliente}
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
        <StyledLabel>Cuenta Asociada:</StyledLabel>
        <StyledSelect
            name="idCuenta"
            value={tarjeta.idCuenta}
            onChange={handleChange}
            required
        >
            <option value="">Seleccione una cuenta</option>
            {cuentasFiltradas.map(cuenta => (
            <option key={cuenta.idCuenta} value={cuenta.idCuenta}>{cuenta.numeroCuenta}</option>
            ))}
        </StyledSelect>
       
        </ColumnContainer>
        <SubmitButton type="submit">Agregar Tarjeta</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default FormTarjeta;

// Reutilizamos los estilos de FormCuentas
const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const ColumnContainer = styled.div`
  display: flex;
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

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;


