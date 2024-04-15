import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormTarjetaModificar = ({ tarjeta, onActualizarTarjeta }) => {
  const [tarjetaEdit, setTarjetaEdit] = useState({
    numeroTarjeta: '',
    PIN: '',
    CVV: '',
    fechaVencimiento: '',
    montoDisponible: '',
    tipoTarjeta: '',
    idCuenta: '',
    idCliente: ''
  });
  const [clientes, setClientes] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [cuentasFiltradas, setCuentasFiltradas] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarjetaEdit({ ...tarjeta, [name]: value });

    if (name === 'idCliente') {
      filtrarCuentasPorCliente(value);
    }
  };
  const filtrarCuentasPorCliente = (idCliente) => {
    // Filtramos las cuentas basándonos en el idCliente seleccionado
    const cuentasFiltradas = cuentas.filter(cuenta => +cuenta.idCliente === +idCliente);
    setCuentasFiltradas(cuentasFiltradas);
    // Reseteamos la selección de cuenta en el estado si el cliente cambia
    setTarjetaEdit(prev => ({ ...prev, idCuenta: '' }));
  };
  
  useEffect(() => {
    fetch('http://127.0.0.1:3001/clientes-sql')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));

    fetch('http://127.0.0.1:3001/cuentas-sql')
      .then(response => response.json())
      .then(data => setCuentas(data))
      .catch(error => console.error('Error al cargar las cuentas:', error));

    if (tarjeta) {
      setTarjetaEdit(tarjeta);
      
    }
    
  }, [tarjeta]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const actualizarTarjeta = async () => {
      try {
        const response = await fetch(`/tarjetas-sql/${tarjeta.idTarjeta}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tarjetaEdit),
        });

        if (!response.ok) {
          throw new Error('No se pudo actualizar la tarjeta');
        }

        const result = await response.json();
        onActualizarTarjeta(tarjetaEdit);
        console.log('Tarjeta actualizada con éxito:', result);
      } catch (error) {
        console.error('Error al actualizar la tarjeta:', error);
      }
    };

    actualizarTarjeta();
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
      <ColumnContainer>
        <FormColumn>
        <StyledLabel>Número de Tarjeta:</StyledLabel>
        <StyledInput
          type="text"
          name="numeroTarjeta"
          value={tarjeta.numeroTarjeta}
          onChange={handleChange}
          required
        />
        <StyledLabel>PIN:</StyledLabel>
        <StyledInput
          type="password"
          name="PIN"
          value={tarjeta.PIN}
          onChange={handleChange}
          required
        />
        <StyledLabel>Fecha de Vencimiento:</StyledLabel>
        <StyledInput
          type="month"
          name="fechaVencimiento"
          value={tarjeta.fechaVencimiento}
          onChange={handleChange}
          required
        />
        <StyledLabel>CVV:</StyledLabel>
        <StyledInput
          type="text"
          name="CVV"
          value={tarjeta.CVV}
          onChange={handleChange}
          required
        />
        </FormColumn>
        <FormColumn>
        <StyledLabel>Monto Disponible:</StyledLabel>
        <StyledInput
          type="number"
          name="montoDisponible"
          value={tarjeta.montoDisponible}
          onChange={handleChange}
          required
        />
        <StyledLabel>Estado Tarjeta:</StyledLabel>
        <StyledSelect
          name="estadoTarjeta"
          value={tarjeta.estadoTarjeta}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo</option>
          <option value="Activa">Activa</option>
          <option value="Inactiva">Inactiva</option>
        </StyledSelect>
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
        <StyledSelect
            name="idCliente"
            value={tarjeta.idCliente}
            onChange={handleChange}
            required
        >
            <option value="">Seleccione un cliente</option>
            {clientes.map(cliente => (
            <option key={cliente.idCliente} value={cliente.idCliente}>{`${cliente.cedula} - ${cliente.nombreCliente} ${cliente.apellidoCliente}`}</option>
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
        </FormColumn>
        </ColumnContainer>
        <SubmitButton type="submit">Actualizar Tarjeta</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default FormTarjetaModificar;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const StyledForm = styled.form`
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

const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

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
const StyledSelect = styled(StyledInput).attrs({ as: 'select' })``;

