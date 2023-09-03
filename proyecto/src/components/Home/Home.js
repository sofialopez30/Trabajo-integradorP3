import React, { Component } from "react";
import CancionesNuevas from "../CancionesNuevas/CancionesNuevas";
import CancionesPopulares from "../CancionesPopulares/CancionesPopulares";

class Canciones extends Component {
    render() {
      return (
        <div>
          <h1>Página de Inicio</h1>
          
          {/* Agregar el componente PopularSongs */}
          <CancionesPopulares />
  
          {/* Agregar el componente NewSongs */}
          <CancionesNuevas />
          
          {/* Otras secciones o contenido de la página */}
        </div>
      );
    }
  }
  
  export default Canciones;