import React, { Component } from 'react'

export default class Filtro extends Component {
    constructor() {
        super();
        this.state = {
            albums: [],
            valorFiltro: '',
            filtroAlbums: [],

        };
    }
    
    controlarEnvio(evento){
        evento.preventDefault();
        this.props.filtro(this.state.valorFiltro)
    }
    


    guardarFiltro(evento) {
        this.setState({
            valorFiltro: evento.target.value,
        });
    }



    render() {
        return (
            <>
                <article className='form'>
                    <form className="search-form" onSubmit={(evento) => this.controlarEnvio(evento)}>
                        <input
                            className='search-input'
                            onChange={(evento) => this.guardarFiltro(evento)}
                            type="text"
                            placeholder="Buscar..."
                            value={this.state.valorFiltro} 
                        />
                        <button className="search-button" type="submit">Filtrar</button>
                    </form>
                </article>
            </>
        )
    }
}
