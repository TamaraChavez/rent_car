
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormVehiculo = () => {
  const [vehiculo, setVehiculo] = useState({ idTipo: '', idColor: '', idCombustible: '', año:'', idMarca:'', estado:'', idTransmision: ''});



  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!vehiculo.idTipoVehiculo|| !vehiculo.idColor || !vehiculo.idCombustible || !vehiculo.año || !vehiculo.idMarca|| !vehiculo.estado || !vehiculo.idTransmision )  {
      console.error('Todos los campos son obligatorios');
      return;
    }

    if (!/^\d{10}$/.test(vehiculo.idVehiculo)) {
      alert("La Identificación debe tener exactamente 10 dígitos y solo debe contener números");
      return;
    }
  
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarVehiculo = (url, vehiculoData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehiculoData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
  

    const datosVehiculo = {
      idTipoVehiculo: vehiculo.idTipoVehiculo,
      idColor: vehiculo.idColor,
      idCombustible: vehiculo.idCombustible,
      año: vehiculo.año,
      idMarca: vehiculo.idMarca, 
      estado: vehiculo.estado,
      idTransmision: vehiculo.idTransmision,
    };
  
    // Primero intentar insertar en SQL Server
    insertarVehiculo('http://127.0.0.1:3001/vehiculos-sql', datosVehiculo)
      .then(data => {
        console.log('Vehiculo agregado en SQL Server:', data);
        // Aquí capturamos el idCliente devuelto por el backend
        const idVehiculo = data.idVehiculo;
        console.log('ID del vehiculo agregado:', idVehiculo);
  
        // Si necesitas usar el idCliente para la siguiente inserción en MySQL o para otro propósito
        // Asegúrate de incluir el idCliente en el objeto datosCliente si es necesario para la inserción en MySQL
        // Esto depende de cómo esté configurado tu backend para manejar estas inserciones
        datosVehiculo.idVehiculo = idVehiculo;
  
        // Luego, si el primero tiene éxito, intentar insertar en MySQL (ajusta según tu lógica)
        return insertarVehiculo('http://127.0.0.1:3001/vehiculos-mysql', datosVehiculo);
      })
      .then(data => {
        console.log('Vehiculo agregado en MySQL:', data);
        alert('Vehiculo agregado con éxito en ambas bases de datos');
     
        resetForm(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el vehiculo. ' + error.message);
      });
  };
  
  


const resetForm = () => {
    setVehiculo({ idTipoVehiculo: '', idColor: '', idCombustible: '', año:'', idMarca:'', estado:'', idTransmision: ''});
};


  return (
    <ContenedorTabla>
      <h1>Crear Vehiculo</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>idVehiculo:</StyledLabel>
          <StyledInput
            type="text"
            name="idVehiculo"
            value={vehiculo.idVehiculo}
            onChange={handleChange}
            placeholder="idVehiculo"
            required
          />
          <StyledLabel>id Tipo Vehiculo:</StyledLabel>
          <StyledInput
            type="text"
            name="tipoVehiculo"
            value={vehiculo.idTipoVehiculo}
            onChange={handleChange}
            placeholder="Tipo Vehiculo"
            required
          />
          <StyledLabel>id Color:</StyledLabel>
          <StyledInput
            type="text"
            name="idColor"
            value={vehiculo.idColor}
            onChange={handleChange}
            placeholder="Color"
            required
          />
          <StyledLabel>id Combustible:</StyledLabel>
          <StyledInput
            type="text"
            name="idCombustible"
            value={vehiculo.idCombustible}
            onChange={handleChange}
            placeholder="Combustible"
            required
          />
          <StyledLabel>Año:</StyledLabel>
          <StyledInput
            type="text"
            name="año"
            value={vehiculo.año}
            onChange={handleChange}
            placeholder="año"
            required
          />
          <StyledLabel>idMarca:</StyledLabel>
          <StyledInput
            type="text"
            name="idMarca"
            value={vehiculo.idMarca}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
          <StyledLabel>Estado:</StyledLabel>
          <StyledInput
            type="text"
            name="estado"
            value={vehiculo.estado}
            onChange={handleChange}
            placeholder="estado"
            required
          />
          <StyledLabel>id Transmision:</StyledLabel>
          <StyledInput
            type="text"
            name="idTransmision"
            value={vehiculo.idTransmision}
            onChange={handleChange}
            placeholder="Transmision"
            required
          />

          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmVehiculos">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormVehiculo;



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
