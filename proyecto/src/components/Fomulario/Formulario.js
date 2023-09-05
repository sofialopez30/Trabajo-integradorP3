import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "" // Estado para almacenar el término de búsqueda
    };
  }

  evitarSubmit(evento){
    evento.preventDefault()
    }

    controlarCambios(evento){
        this.setState(
        {
            search: evento.target.value
        }
        );
    }


  render() {
    return (
      <form onSubmit={(evento)=> this.evitarSubmit(evento)} >
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(evento)=> this.controlarCambios(evento)} value={this.state.search}
        />
        <input type= 'submit' value= 'Submit' />
        {/* <button
          type="button"
          onClick={() => {
            // Aquí puedes realizar la acción de búsqueda con this.state.searchTerm
            alert("Realizar búsqueda con: " + this.state.search);
          }}
        >
          Buscar
        </button> */}
      </form>
    );
  }


}

export default Search;

