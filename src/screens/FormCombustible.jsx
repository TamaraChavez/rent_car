
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormCombustible= () => {
  const [combustible, setCombustible] = useState({nombreCombustible: ''});



  const handleChange = (e) => {
    setCombustible({ ...combustible, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!combustible.nombreCombustible )  {
      console.error('Todos los campos son obligatorios');
      return;
    }
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarCombustible = (url, combustibleData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combustibleData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
  

    const datosCombustible = {
      nombreCombustible: combustible.nombreCombustible,
    }
    // Primero intentar insertar en SQL Server
    insertarColor('http://127.0.0.1:3001/combustible', datosCombustible)
      .then(data => {
        console.log('Combustible agregado en SQL Server:', data);
        // Aquí capturamos el idCliente devuelto por el backend
        const idCombustible = data.idCombustible;
        console.log('ID del combustible agregado:', idCombustible);

        datosCombustible.idCombustible = idCombustible;
        // Luego, si el primero tiene éxito, intentar insertar en MySQL (ajusta según tu lógica)
        return insertarCombustible('http://127.0.0.1:3001/combustibles', datoscombustible);
      })
      .then(data => {
        console.log('Combustible agregado en MySQL:', data);
        alert('Combustible agregado con éxito en ambas bases de datos');
     
        resetForm(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el combustible. ' + error.message);
      });
  };
  
  


const resetForm = () => {
    setCombustible({ nombreCombustible: ''});
};


  return (
    <ContenedorTabla>
      <h1>Crear combustible</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="nombre"
            value={combustible.nombreCombustible}
            onChange={handleChange}
            placeholder="Nombre Combustible"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmCombustibles">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormCombustible;



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
