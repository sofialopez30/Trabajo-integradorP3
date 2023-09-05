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
      nombre:'Ver todas',
      ruta:'/vertodas',
    }
  ]
  export default function Header() {
    return (
      <nav>
          <ul className="main-nav">
              {
                navegacion.map((elm) => <li className="list">
                  <Link to={elm.ruta}>
                    {elm.nombre}
                  </Link>
                </li> )
              }
          </ul> 
          <img className="foto-logo" src='./img/Logo.png' alt="logo"></img>
          <article className="header">
              <img  className= 'header' src='./img/Header.png'></img>  
          </article>
          
           <ul className="user">
              {/* <li>
                  Nombre usuario 
              </li> */}
          </ul>  
      </nav>
    )
  }