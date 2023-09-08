import React from "react";
import { Link } from 'react-router-dom'
import './styles.css'


let navegacion = [
    {
      nombre:'Home',
      ruta:'/',
    },
    {
      nombre:'Favoritos',
      ruta:'/favoritos',
    },
    {
      nombre:'Todas Canciones',
      ruta:'/vercanciones',
    },
    {
        nombre: 'Todos Albums',
        ruta:'/veralbums'

    }
  ]
  export default function Header() {
    return (
      <nav>
          <ul className="main-nav">
              {
                navegacion.map((elm, i) => <li className="list" key={i}>
                  <Link to={elm.ruta}>
                    {elm.nombre}
                  </Link>
                </li> )
              }
          </ul> 
          <img className="foto-logo" src='./img/Logo.png' alt="logo"></img>
          <article className="header">
              <img className= 'header' src='./img/Header.png' alt="Logo de la web"></img>  
          </article>
          
           <ul className="user">
              {/* <li>
                  Nombre usuario 
              </li> */}
          </ul>  
      </nav>
    )
  }