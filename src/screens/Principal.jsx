import React from 'react'
import styled from 'styled-components';
import clientes from '../img/clientes.webp';
import cuentas from '../img/cuentas.webp';
import tarjetas from '../img/tarjetas.webp';
import usuarios from '../img/usuarios.webp';
import { Link } from 'react-router-dom';

const Principal = () => {
  return (
    <ContenedorPrincipal>
      <ContenedorTitulo>

        <h2>Bienvenido a la pagina administrativa del Banco ABC</h2>

      </ContenedorTitulo>
      <Contenedor>
        <ImgPrincipal src={clientes} alt="" />
        <div>
          <h3>Administracion de clientes</h3>
          <p>Esta función permite gestionar la información de los clientes de manera eficiente y ordenada. Al usarla,
            podrás ver un listado completo de tus clientes con detalles como su ID, nombre y apellido. Si necesitas
            agregar un nuevo cliente, simplemente usa el botón “Nuevo” para ingresar sus datos en un formulario.
            También puedes editar la información de cualquier cliente haciendo clic en su ID, lo que te llevará
            a una pantalla donde podrás modificar sus datos y guardar los cambios. Además, si necesitas eliminar
            un cliente, esta función te ofrece una manera segura de hacerlo, solicitándote confirmación para evitar
            borrados accidentales. En caso de que el cliente no pueda ser eliminado por tener datos asociados,
            la función te informará, garantizando así la integridad de tu base de datos.</p>
          <BotonNavegar as={Link} to="/AdmClientes">IR</BotonNavegar>
        </div>

      </Contenedor>
      <Contenedor>


        <div>
          <h3>Registrar cuenta a cliente</h3>
          <p>Esta función es una herramienta de administración de cuentas diseñada para facilitar
            el manejo eficaz de la información financiera de los clientes. Permite visualizar un
            listado detallado de todas las cuentas, incluyendo el número de cuenta, saldo actual,
            ID del cliente y su nombre completo. Ofrece una opción para agregar nuevas cuentas a
            través de un botón “Nuevo”, donde se puede registrar una cuenta automáticamente generando
            su número, definir un monto de depósito inicial, y vincularla a un cliente mediante su ID,
            mostrando también el nombre del cliente para confirmación. Las cuentas existentes se pueden
            editar fácilmente mediante un enlace en su número, con opciones para guardar los cambios o
            cancelar. Además, se facilita la eliminación de cuentas con un botón específico que solicita
            confirmación para proceder, asegurando la eliminación solo si no existen datos asociados que
            lo impidan, garantizando así la integridad de la gestión de cuentas.</p>
          <BotonNavegar as={Link} to="/AdmClientes">IR</BotonNavegar>
        </div>
        <ImgPrincipal src={cuentas} alt="" />

      </Contenedor>
      <Contenedor>

        <ImgPrincipal src={tarjetas} alt="" />
        <div>
          <h3>Registrar tarjeta a cliente</h3>
          <p>Esta función permite gestionar la información de los clientes de manera eficiente y ordenada. Al usarla,
            podrás ver un listado completo de tus clientes con detalles como su ID, nombre y apellido. Si necesitas
            agregar un nuevo cliente, simplemente usa el botón “Nuevo” para ingresar sus datos en un formulario.
            También puedes editar la información de cualquier cliente haciendo clic en su ID, lo que te llevará
            a una pantalla donde podrás modificar sus datos y guardar los cambios. Además, si necesitas eliminar
            un cliente, esta función te ofrece una manera segura de hacerlo, solicitándote confirmación para evitar
            borrados accidentales. En caso de que el cliente no pueda ser eliminado por tener datos asociados,
            la función te informará, garantizando así la integridad de tu base de datos.</p>
          <BotonNavegar as={Link} to="/AdmClientes">IR</BotonNavegar>
        </div>
      </Contenedor>
      <Contenedor>


        <div>
          <h3>Usuarios</h3>
          <p>Esta función permite gestionar la información de los clientes de manera eficiente y ordenada. Al usarla,
            podrás ver un listado completo de tus clientes con detalles como su ID, nombre y apellido. Si necesitas
            agregar un nuevo cliente, simplemente usa el botón “Nuevo” para ingresar sus datos en un formulario.
            También puedes editar la información de cualquier cliente haciendo clic en su ID, lo que te llevará
            a una pantalla donde podrás modificar sus datos y guardar los cambios. Además, si necesitas eliminar
            un cliente, esta función te ofrece una manera segura de hacerlo, solicitándote confirmación para evitar
            borrados accidentales. En caso de que el cliente no pueda ser eliminado por tener datos asociados,
            la función te informará, garantizando así la integridad de tu base de datos.</p>
          <BotonNavegar as={Link} to="/AdmClientes">IR</BotonNavegar>
        </div>
        <ImgPrincipal src={usuarios} alt="" />
      </Contenedor>
    </ContenedorPrincipal>
  )
}

export default Principal

const BotonNavegar = styled.button`
  background-color: #273352; 
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
const ImgPrincipal = styled.img`
  max-width:350px;
`;
const ContenedorPrincipal = styled.div`
padding:50px;
`;

const ContenedorTitulo = styled.div`
  display:flex;
  justify-content:center;
`;

const Contenedor = styled.div`
  margin-top:50px;
  display:flex;
  flex-flow: row nowrap;
  div{
    margin:50px;
  }
`;