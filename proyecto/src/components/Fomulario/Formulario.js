import React, { Component } from "react";

import { Link } from "react-router-dom";

import './styles.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "", // Estado para almacenar el término de búsqueda
      resultados: [] // Estado para almacenar los resultados de la búsqueda
    };
  }

  evitarSubmit(evento) {
    evento.preventDefault()
  }

  controlarCambios(evento) {
    this.setState(
      {
        search: evento.target.value
      }
    );
  }


  render() {
    return (
      <div className="search-container">
        <form className="busqueda" onSubmit={(evento) => this.evitarSubmit(evento)} >
          <input className="search-input"
            type="text"
            placeholder="Buscar..."
            onChange={(evento) => this.controlarCambios(evento)} value={this.state.search}
          />
          {/* <input type= 'submit' value= 'Submit' /> */}
          <Link to={`/search/${this.state.search}`} className="search-button">Buscar</Link>
        </form>
      </div>

    );
  }


}

export default Search;
