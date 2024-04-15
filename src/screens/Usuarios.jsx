// En /screens/AdmClientes.js
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import FormCliente from './FormCliente.jsx';
import FormClienteModificar from './FormClienteModificar.jsx';

const Usuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteParaEditar, setClienteParaEditar] = useState(null);
  // Nuevos estados para controlar la visibilidad de los formularios
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);

 
  const toggleFormularioNuevo = () => {
    setMostrarFormularioNuevo(!mostrarFormularioNuevo);
    // Cuando cierras el formulario nuevo (pasando de true a false)
  if (mostrarFormularioNuevo) {
    cargarClientes(); // Recarga los clientes al cerrar el formulario
  }
    // Asegurarse de que el formulario de edición se cierre si el de nuevo se abre
    if (mostrarFormularioEditar) {
      setMostrarFormularioEditar(false);
    }
  };
  const cargarClientes = () => {
    fetch('http://127.0.0.1:3001/clientes-sql')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Esto debería mostrar los datos en la consola
        setClientes(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  useEffect(() => {
    cargarClientes();
  }, []);
 


  const handleDelete = (idCliente) => {
    const confirmar = window.confirm("¿Realmente desea eliminar el registro seleccionado?");
  
    if (confirmar) {
      // Función auxiliar para realizar la eliminación en una base de datos
      const eliminarEnBaseDeDatos = (url) => {
        return fetch(url, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Falló la solicitud de eliminación');
          }
          return response.json();
        });
      };
  
      // Eliminar en SQL Server
      eliminarEnBaseDeDatos(`http://127.0.0.1:3001/clientes-sql/${idCliente}`)
        .then(data => {
          if (data.success) {
            console.log(data.message); // "Usuario eliminado con éxito."
            // Opcional: Actualizar el estado aquí si es necesario
          } else {
            console.warn(data.message); // "No es posible eliminar el usuario..."
          }
        })
        .catch(error => console.error('Error al eliminar en SQL Server:', error));
      // Actualizar el estado de clientes en la UI
      // Nota: Esto asume que las eliminaciones son independientes y no necesitas confirmar que ambas fueron exitosas
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.idCliente !== idCliente));
    }
  };
  
  const handlePrepararEdicion = (idCliente) => {
    const clienteSeleccionado = clientes.find(cliente => cliente.idCliente === idCliente);
    setClienteParaEditar(clienteSeleccionado);
    setMostrarFormularioEditar(true); // Muestra el formulario de edición
    setMostrarFormularioNuevo(false); // Asegúrate de cerrar el otro formulario
  };
  const handleActualizarCliente = (clienteActualizado) => {
    // Función auxiliar para realizar la actualización en una base de datos
    const actualizarEnBaseDeDatos = (url) => {
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteActualizado),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el cliente');
        }
        return response.json();
      });
    };
  
    // Actualizar en SQL Server
    actualizarEnBaseDeDatos(`http://127.0.0.1:3001/clientes-sql/${clienteActualizado.idCliente}`)
      .then(() => {
        console.log('Cliente actualizado en SQL Server');
        
      })
      .catch(error => console.error('Error al actualizar en SQL Server:', error));
  
    // Actualizar en MySQL
    actualizarEnBaseDeDatos(`http://127.0.0.1:3001/clientes-mysql/${clienteActualizado.idCliente}`)
      .then(() => {
        console.log('Cliente actualizado en MySQL');
        
      })
      .catch(error => console.error('Error al actualizar en MySQL:', error));
  
    // Opcional: actualiza el estado de la lista de clientes si ambas operaciones son independientes
    // y no necesitas confirmar que ambas fueron exitosas para actualizar el estado
    const indice = clientes.findIndex(cliente => cliente.idCliente === clienteActualizado.idCliente);
    const clientesActualizados = [...clientes];
    clientesActualizados[indice] = clienteActualizado;
    setClientes(clientesActualizados);
  };
  

  return (
    <ContenedorTabla>
      <BotonAgregar onClick={toggleFormularioNuevo}>+ Nuevo Usuario</BotonAgregar>
      {mostrarFormularioNuevo && (
        <ModalContainer>
          <FormCliente />
          <BotonCerrar onClick={toggleFormularioNuevo}>X</BotonCerrar>
        </ModalContainer>
      )}
      {mostrarFormularioEditar && clienteParaEditar && (
        <ModalContainer>
          <FormClienteModificar cliente={clienteParaEditar} onActualizarCliente={handleActualizarCliente} />
          <BotonCerrar onClick={() => {
            setClienteParaEditar(null);
            setMostrarFormularioEditar(false);
          }}>X</BotonCerrar>
        </ModalContainer>
      )}
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Usuario</Th>
            <Th>Contraseña</Th>
            <Th>Tipo</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Tr key={cliente.idCliente}>
              <Td>{cliente.idCliente}</Td>
              <Td>{cliente.nombreCliente}</Td>
              <Td>{cliente.apellidoCliente}</Td>
              <Td>{cliente.cedula}</Td>
              <Td>
                <BotonAccionEliminar  onClick={() => handleDelete(cliente.idCliente)}>Eliminar</BotonAccionEliminar >
                <BotonAccionModificar onClick={() => handlePrepararEdicion(cliente.idCliente)}>Modificar</BotonAccionModificar>
              </Td>
              
            </Tr>
          ))}
        </tbody>
      </Table>
    </ContenedorTabla>
  );
};

export default Usuarios;

// Styled-components para la tabla, ajusta según tus necesidades
// Estilos de los componentes
const BotonAccion = styled.button`
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

const BotonAccionEliminar = styled(BotonAccion)`
  background-color: #FF6347; /* Rojo */
  color: white;

  &:hover {
    background-color: #E55347; /* Un rojo un poco más oscuro al pasar el mouse */
  }
`;

const BotonAccionModificar = styled(BotonAccion)`
  background-color: #FFA500; /* Naranja */
  color: white;

  &:hover {
    background-color: #cc8400; /* Un naranja un poco más oscuro al pasar el mouse */
  }
`;
const BotonCerrar = styled.button`
  background-color: #FF6347; /* Rojo */
  color: white; /* Texto blanco */
  padding: 10px 20px; /* Espaciado interno */
  border: none; /* Sin borde */
  cursor: pointer; /* Cursor de mano al pasar sobre el botón */
  font-size: 24px; /* Tamaño del texto */
  font-weight: bold; /* Hacer la 'X' más gruesa */
  
  &:hover {
    opacity: 0.8;
  }
`;
const BotonAgregar = styled.button`
  background-color: #4CAF50; /* Verde */
  color: white; /* Texto blanco */
  padding: 5px 10px; /* Espaciado interno */
  margin:5px;
  border: none; /* Sin borde */
  border-radius:5px;
  cursor: pointer; /* Cursor de mano al pasar sobre el botón */
  font-size: px; /* Tamaño del texto */
  &:hover {
    opacity: 0.8;
  }
`;
const ModalContainer = styled.div`
  position: fixed; /* o absolute, dependiendo de tu layout */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparente */
  z-index: 1000; /* Asegúrate de que sea mayor que el resto de tu contenido */

  > div {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
const ContenedorTabla = styled.div`
  padding:50px;

`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border:1px solid #7c7c7c;
  border-radius: 25px;

`;

const Th = styled.th`
  text-align: left;
  background-color: #f2f2f2;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
  text-align: left;
`;

const Tr = styled.tr`

  &:nth-child(even) {
    background-color: #f9f9f9;
    border-bottom: 1px solid #7c7c7c inherit;
  }
`;
