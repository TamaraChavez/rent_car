import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FormClienteModificar = ({onActualizarCliente}) => {
  const [clienteModificar, setClienteModificar] = useState({ idCliente: '', nombreCliente: '', apellidoCliente: '' });
  const { idCliente } = useParams();

  useEffect(() => {
    cargarCliente(+idCliente); // Modificado: Pasar idCliente como argumento
    console.log("idCliente: "+idCliente)
  }, [idCliente]);

  const cargarCliente = (id) => {
    fetch(`http://127.0.0.1:3001/clientes-sql/${id}`)
      .then(response => response.json())
      .then(data => {
      
        if (data) {
          console.log(data);
          setClienteModificar({
            idCliente: data.idCliente,
            nombreCliente: data.nombreCliente,
            apellidoCliente: data.apellidoCliente,
            cedula: data.cedula 
          });

        }
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const handleChange = (e) => {
    setClienteModificar({ ...clienteModificar, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Asegúrate de validar correctamente los campos antes de enviar la petición.
    if (!clienteModificar.cedula || !clienteModificar.nombreCliente || !clienteModificar.apellidoCliente) {
      console.error('Todos los campos son obligatorios');
      return;
    }
  
    // Configura la petición PUT
    fetch(`http://127.0.0.1:3001/clientes/${clienteModificar.idCliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreCliente: clienteModificar.nombreCliente,
        apellidoCliente: clienteModificar.apellidoCliente,
        cedula: clienteModificar.cedula
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
   
      alert(data.message);
   
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar el error mostrando un mensaje al usuario, etc.
    });
  };
  

  return (
    <ContenedorTabla>
      <h1>Modificar Cliente</h1>
      <FormContainer>
        
        <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Identificación:</StyledLabel>
          <StyledInput
            type="text"
            name="cedula"
            value={clienteModificar.cedula}
            onChange={handleChange}
            placeholder="Identificación"
            required
          />
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="nombreCliente"
            value={clienteModificar.nombreCliente}
            onChange={handleChange}
            placeholder="Nombre Cliente"
            required
          />
          <StyledLabel>Apellido:</StyledLabel>
          <StyledInput
            type="text"
            name="apellidoCliente"
            value={clienteModificar.apellidoCliente}
            onChange={handleChange}
            placeholder="Apellido Cliente"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmClientes">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormClienteModificar;


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
  max-width:350px;
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
