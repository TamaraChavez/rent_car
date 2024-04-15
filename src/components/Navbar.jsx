import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import logo from '../img/logo.png';
const links = [
  {
    name : "Administración de clientes",
    href : "/AdmClientes",
  },
  {
    name : "Registrar cuenta a cliente",
    href : "/RegCuenta",
  },
  {
    name : "Registrar tarjeta a cliente",
    href : "/RegTarjeta",
  },
  {
    name : "Usuarios",
    href : "/Usuarios",
  },
]


const NavBar = () => {
  return (
    <NavContainer>
      <ContenedorLogo>
        <Link to="/Principal" class="principal" ><img src={logo} alt="Logo" /></Link>
      
      </ContenedorLogo>
      <div>
        {links.map((x) => (
          <Link class='navigation' to={x.href}>{x.name}</Link>
        ))}
      </div>
    </NavContainer>
  );
};

export default NavBar
const ContenedorLogo = styled.div`
  display:flex;

`;
const NavContainer = styled.nav`
  padding: 0.5rem 50px;
  background-color: #273352;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  img{
    max-width:200px;
  }
  h2 {
    color: white;
    font-weight: 400;
    font-size: 1.5rem;
    span {
      font-weight: bold;
    }
  }

  div {
    display: flex;
    align-items: center;
  }
  

  .navigation {
    color: white;
    text-decoration: none;
    margin: 0 0.5rem; 
    padding: 5px; 
    font-size: 1rem;
    transition: color 0.3s ease; 
    font-weight: bold;
    &:hover {
      background-color: #3b83bd;
      
      border-radius:5px;
      color: #eff3f6; 
      
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    div {
      flex-direction: column;
      align-items: flex-start;
      width: 100%; /* Ajustar el ancho al contenedor para dispositivos móviles */
    }

    a {
      margin: 0.5rem 0; /* Aumentar el margen vertical en dispositivos móviles */
    }
  }
`;
