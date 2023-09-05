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
         <img className="foto-logo" src='./img/SoundWave.png' alt="logo"></img>
          <ul className="main-nav">
              {
                navegacion.map((elm) => <li>
                  <Link to={elm.ruta}>
                    {elm.nombre}
                  </Link>
                </li> )
              }
          </ul> 
           <ul className="user">
              <li>
                  Nombre usuario 
              </li>
          </ul>  
      </nav>
    )
  }