import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const RegCuenta = () => {
  const [cuentas, setCuentas] = useState([]);
  const [cuentasFiltradas, setCuentasFiltradas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [filtroCedula, setFiltroCedula] = useState('');

  // Función para cargar las cuentas desde el servidor
  const cargarCuentas = () => {
    fetch('http://127.0.0.1:3001/cuentas-sql')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Esto debería mostrar los datos en la consola
        setCuentas(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarClientes = () => {
    fetch('http://127.0.0.1:3001/clientes-sql') // Asegúrate de tener esta ruta configurada en tu backend
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  }
  useEffect(() => {
    cargarCuentas();
    cargarClientes();
  }, []);

  useEffect(() => {
    // Filtra clientes basándote en la cédula
    const filtrados = clientes.filter(cliente =>
      cliente.cedula.includes(filtroCedula)
    );
    setClientesFiltrados(filtrados);

    // Filtra cuentas basándote en los clientes filtrados
    const cuentasDeClientesFiltrados = cuentas.filter(cuenta =>
      filtrados.some(cliente => cliente.idCliente === cuenta.idCliente)
    );
    setCuentasFiltradas(cuentasDeClientesFiltrados);
  }, [filtroCedula, cuentas, clientes]);




  const handleDelete = (numeroCuenta) => {
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
      eliminarEnBaseDeDatos(`http://127.0.0.1:3001/cuentas-sql/${numeroCuenta}`)
        .then(data => {
          if (data.success) {
            console.log(data.message);

          } else {
            console.warn(data.message);
          }
        })
        .catch(error => console.error('Error al eliminar en SQL Server:', error));


      // Actualizar el estado de clientes en la UI

      setCuentas(prevCuentas => prevCuentas.filter(cuentas => cuentas.numeroCuenta !== numeroCuenta));
    }
  };


  return (
    <ContenedorTabla>
      <h1>Registrar cuenta a cliente</h1>
      <BotonAgregar as={Link} to="/RegCuenta/FormCuenta">Nuevo</BotonAgregar>
      <StyledInput
        type="text"
        placeholder="Identificación"
        value={filtroCedula}
        onChange={(e) => setFiltroCedula(e.target.value)}
      />
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Numero Cuenta</Th>
            <Th>Cliente</Th>
            <Th>Saldo</Th>
            <Th>Moneda</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {cuentasFiltradas.map((cuenta) => {
            const clienteCorrespondiente = clientes.find(cliente => cliente.idCliente === cuenta.idCliente);
            return (
              <Tr key={cuenta.idCuenta}>
                <Td>{cuenta.idCuenta}</Td>
                <Td><Link to={`/RegCuenta/FormCuenta/${cuenta.idCuenta}`}>{cuenta.numeroCuenta}</Link></Td>
                <Td>
                  {clienteCorrespondiente
                    ? `${clienteCorrespondiente.cedula} - ${clienteCorrespondiente.nombreCliente} ${clienteCorrespondiente.apellidoCliente}`
                    : 'Cliente no encontrado'}
                </Td>
                <Td>{cuenta.saldoCuenta}</Td>
                <Td>{cuenta.moneda}</Td>
                <Td>
                  <BotonAccionEliminar onClick={() => handleDelete(cuenta.numeroCuenta)}>Eliminar</BotonAccionEliminar>

                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </ContenedorTabla>
  );
};

export default RegCuenta;

// Estilos de los componentes
const StyledInput = styled.input`
padding: 10px;
border-radius: 4px;
border: 1px solid #ccc;
margin:10px;
&:focus {
  border-color: #007bff;
  outline: none;
}
`;
const BotonAccion = styled.button`
padding: 5px 10px;
text-decoration:none;
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
background-color: #FF6347;
color: white;

&:hover {
  background-color: #E55347; 
}
`;



const BotonAgregar = styled.a`
background-color: #4CAF50; 
text-decoration:none;
color: white; 
padding: 7px 15px;
margin:10px;
border: none; 
border-radius:5px;
cursor: pointer; 
font-size: 1rem; 
&:hover {
  opacity: 0.8;
}
`;

const ModalContainer = styled.div`
position: fixed; 
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5); 
z-index: 1000;

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
