import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Asumiendo que FormTarjeta y FormTarjetaModificar están implementados correctamente
import FormTarjeta from './FormTarjeta';
import FormTarjetaModificar from './FormTarjetaModificar';

const RegTarjeta = () => {
  
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] = useState(false);
  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);
  const [tarjetaParaEditar, setTarjetaParaEditar] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [cuentas, setCuentas] = useState([]);

  const cargarTarjetas = () => {
    fetch('http://127.0.0.1:3001/tarjetas')
      .then(response => response.json())
      .then(data => setTarjetas(data))
      .catch(error => console.error("Error al obtener los datos de tarjetas:", error));
  };
  const cargarCuentas = () => {
    fetch('http://127.0.0.1:3001/cuentas-sql')
      .then(response => response.json())
      .then(data => setCuentas(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  };
  const cargarClientes = () => {
    fetch('http://127.0.0.1:3001/clientes-sql')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  };

  useEffect(() => {
    cargarTarjetas();
    cargarClientes();
    cargarCuentas();
  }, []);

   // Función para manejar el cambio de visibilidad del formulario nuevo
  const toggleFormularioNuevo = () => {
    setMostrarFormularioNuevo(!mostrarFormularioNuevo);
  };


  const handleActualizarTarjeta = (tarjetaActualizada) => {
    const tarjetasActualizadas = tarjetas.map(tarjeta =>
      tarjeta.idTarjeta === tarjetaActualizada.idTarjeta ? tarjetaActualizada : tarjeta
    );
    setTarjetas(tarjetasActualizadas);
    setMostrarFormularioEditar(false);
    setTarjetaParaEditar(null);
  };

  const handleDesactivar = (idTarjeta) => {
    const confirmar = window.confirm("¿Realmente desea desactivar la tarjeta seleccionada?");
  
    if (confirmar) {
      const url = `http://127.0.0.1:3001/tarjetas/${idTarjeta}`;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoTarjeta: 'Desactivada' }) // Asegúrate de enviar el estado deseado
      };
  
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            console.log(data.message);
            // Actualizar el estado de las tarjetas en el frontend si es necesario
            setTarjetas(prevTarjetas => prevTarjetas.map(tarjeta => 
              tarjeta.idTarjeta === idTarjeta ? { ...tarjeta, estadoTarjeta: 'Desactivada' } : tarjeta
            ));
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };
  
 

  return (
    <ContenedorTabla>
      <h1>Registrar tarjeta a cuenta</h1>
      <BotonAgregar onClick={toggleFormularioNuevo}>Nuevo</BotonAgregar>
      {mostrarFormularioNuevo && (
        <ModalContainer>
          <FormTarjeta recargarTarjetas={cargarTarjetas} />
          <BotonCerrar onClick={toggleFormularioNuevo}>X</BotonCerrar>
        </ModalContainer>
      )}
      {mostrarFormularioEditar && tarjetaParaEditar && (
        <ModalContainer>
          <FormTarjetaModificar tarjeta={tarjetaParaEditar} onActualizarTarjeta={handleActualizarTarjeta} />
          <BotonCerrar onClick={() => {
            setTarjetaParaEditar(null);
            setMostrarFormularioEditar(false);
          }}>X</BotonCerrar>
        </ModalContainer>
      )}
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Numero Tarjeta</Th>
            <Th>PIN</Th>
            <Th>CVV</Th>
            <Th>Fecha Vencimiento</Th>
            <Th>Monto Disponible</Th>
            <Th>Estado</Th>
            <Th>Tipo</Th>
            <Th># Cuenta</Th>
            <Th>Cliente</Th>
            <Th>Acciones</Th>
          </Tr>
        </thead>
        <tbody>
          
        {tarjetas.map((tarjeta) => {
          console.log(tarjeta);
            const clienteCorrespondiente = clientes.find(cliente => cliente.idCliente === tarjeta.idCliente);
            const cuentaCorrespondiente = cuentas.find(cuenta => cuenta.idCliente === tarjeta.idCliente);
            return (
              <Tr key={tarjeta.idTarjeta}>
                <Td>{tarjeta.idTarjeta}</Td>
                <Td>{tarjeta.numeroTarjeta}</Td>
                <Td>{tarjeta.PIN}</Td>
                <Td>{tarjeta.CVV}</Td>
                <Td>{tarjeta.fechaVencimiento}</Td>
                <Td>{tarjeta.montoDisponible}</Td>
                <Td>{tarjeta.estadoTarjeta}</Td>
                <Td>{tarjeta.tipoTarjeta}</Td>
                <Td>
                {cuentaCorrespondiente
                    ? `${cuentaCorrespondiente.numeroCuenta}`
                    : 'Cuenta no encontrado'}
                </Td>
                <Td>
                  {clienteCorrespondiente
                    ? `${clienteCorrespondiente.cedula} - ${clienteCorrespondiente.nombreCliente} ${clienteCorrespondiente.apellidoCliente}`
                    : 'Cliente no encontrado'}
                </Td>
       
                <Td>
                  <BotonAccionDesactivar onClick={() => handleDesactivar(tarjeta.idTarjeta)}>Desactivar</BotonAccionDesactivar>

                </Td>
              </Tr>
            );
          })}

        </tbody>
      </Table>
    </ContenedorTabla>
  );
};

export default RegTarjeta;

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

const BotonAccionDesactivar = styled(BotonAccion)`
  background-color: #8614b3; 
  color: white;

  &:hover {
    background-color: #cc8400; /* Un naranja un poco más oscuro al pasar el mouse */
  }
`;const BotonCerrar = styled.button`
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
  }
`;
