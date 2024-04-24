import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FormvehiculoModificar = ({onActualizarVehiculo}) => {
  const [vehiculoModificar, setVehiculoModificar] = useState({  idTipo: '', idColor: '', idCombustible: '', año:'', idMarca:'', estado:'', idTransmision: ''});
  const { idVehiculo } = useParams();

  useEffect(() => {
    cargarvehiculo(+idVehiculo); // Modificado: Pasar idCliente como argumento
    console.log("idVehiculo: "+idVehiculo)
  }, [idvehiculo]);

  const cargarVehiculo = (idvehiculo) => {
    fetch(`http://127.0.0.1:3001/vehiculos-sql/${idvehiculo}`)
      .then(response => response.json())
      .then(data => {
      
        if (data) {
          console.log(data);
          setVehiculoModificar({
            idVehiculo:vehiculo.idVehiculo,
            idTipoVehiculo: vehiculo.idTipoVehiculo,
            idColor: vehiculo.idColor,
            idCombustible: vehiculo.idCombustible,
            año: vehiculo.año,
            idMarca: vehiculo.idMarca, 
            estado: vehiculo.estado,
            idTransmision: vehiculo.idTransmision,
          });

        }
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const handleChange = (e) => {
    setVehiculoModificar({ ...vehiculoModificar, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Asegúrate de validar correctamente los campos antes de enviar la petición.
    if (!cliente.identificacion|| !cliente.nombre || !cliente.apellidos || !cliente.telefono || !cliente.telefono|| !cliente.paisResidencia || !cliente.direccion || !cliente.numeroTarjeta || !cliente.tipoTarjeta || !cliente.tipoCliente) {
      console.error('Todos los campos son obligatorios');
      return;
    }
  
    // Configura la petición PUT
    fetch(`http://127.0.0.1:3001/clientes/${vehiculoModificar.idVehiculo}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idTipoVehiculo: vehiculo.idTipoVehiculo,
        idColor: vehiculo.idColor,
        idCombustible: vehiculo.idCombustible,
        año: vehiculo.año,
        idMarca: vehiculo.idMarca, 
        estado: vehiculo.estado,
        idTransmision: vehiculo.idTransmision,
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
      <h1>Modificar vehiculo</h1>
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

export default FormvehiculoModificar;


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
