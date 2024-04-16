
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormTipoTarjeta= () => {
  const [tipoTarjeta, setTipoTarjeta] = useState({tipo: ''});



  const handleChange = (e) => {
    setCombustible({ ...tipoTarjeta, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!tipoTarjeta.tipo )  {
      console.error('Todos los campos son obligatorios');
      return;
    }
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarTipoTarjeta = (url, tipoTarjetaData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoTarjetaData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
  

    const datosTipoTarjeta = {
      tipo: tipoTarjeta.tipo,
    }

    // Primero intentar insertar en SQL Server
    insertarTipoTarjeta('http://127.0.0.1:3001/tipoTarjeta', datosTipoTarjeta)
      .then(data => {
        console.log('Tipo de Tarjeta agregado en SQL Server:', data);
        // Aquí capturamos el idCliente devuelto por el backend
        const idTipoTarjeta = data.idTipoTarjeta;
        console.log('ID del tipo de tarjeta agregado:', idTipoTarjeta);

        datosTipoTarjeta.idTipoTarjeta = idTipoTarjeta;
        // Luego, si el primero tiene éxito, intentar insertar en MySQL (ajusta según tu lógica)
        return insertarTipoTarjeta('http://127.0.0.1:3001/TipoTarjeta', datosTipoTarjeta);
      })
      .then(data => {
        console.log('Tipo de tarjeta agregado en MySQL:', data);
        alert('Combustible agregado con éxito en ambas bases de datos');
     
        resetForm(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el tipo de tarjeta. ' + error.message);
      });
  };
  
  


const resetForm = () => {
    setTipoTarjeta({ tipo: ''});
};


  return (
    <ContenedorTabla>
      <h1>Crear Tipo de tarjeta</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="nombre"
            value={tipoTarjeta.tipo}
            onChange={handleChange}
            placeholder="Nombre Tipo Tarjeta"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmTipoTarjeta">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormTipoTarjeta;



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
