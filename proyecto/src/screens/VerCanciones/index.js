import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Fomulario from '../../components/Fomulario/Formulario'
import CardContainer from '../../components/CardContainer/CardContainer';


class index extends Component {
    constructor() {
        super();
        this.state = {
            songs: [], 
            valorFiltro: '',
            filtroCanciones: [],
            cantidad: 10,
            cargando: true,
        };
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos.data,
                    cargando: false,
                }))
            .catch(error => console.log(error));
    }

    guardarFiltro(evento) { 
        this.setState({
            valorFiltro: evento.target.value,
        });
    }

    filtrarCanciones(evento) {
        evento.preventDefault();

        let filtroCanciones = this.state.songs.filter(songs => songs.title.toLowerCase().includes(this.state.valorFiltro.toLowerCase()));

        this.setState({
            filtroCanciones: filtroCanciones,
        });
    }

    cargarMasCanciones() {

        this.setState({
            cargando: true,
        });

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=${this.state.cantidad + 16}`)
            .then(res => res.json())
            .then(data => {
                // Quiero agregar las últimas 10 canciones que me llegan a las que tenemos en songs del estado
                let arrayCanciones = [];

                for (let i = this.state.cantidad; i < this.state.cantidad + 15; i++) {
                    arrayCanciones.push(data.data[i]);
                }

                let cancionesNuevas = this.state.songs.slice(); // Crear una copia del array actual
                cancionesNuevas = cancionesNuevas.concat(arrayCanciones);

                this.setState({
                    songs: cancionesNuevas, // Actualizar el estado con la copia modificada
                    cantidad: this.state.cantidad + 15,
                });

                this.setState({
                    cargando: false,
                });

            
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <Header />
                <Fomulario />
                <article className='form'>
                    <form className="search-form" onSubmit={(evento) => this.filtrarCanciones(evento)}>
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


                <h2 className='titulo'>Todas Las Canciones</h2>
                <div className='cajas'>
                {
                    this.state.cargando ?
                        <h3>Loading..</h3> :
                        this.state.filtroCanciones.length > 0 ?
                            <ul className="resultados">
                                <CardContainer value={this.state.filtroCanciones} album={false} />
                            </ul> :
                            <ul className="resultados">
                                <CardContainer value={this.state.songs} album={false} />
                            </ul>
                }
                </div>
                <div>

                </div>
                <div>
                    <button className='search-button' onClick={() => this.cargarMasCanciones()}>Cargar más</button>

                </div>
                <Footer />
            </>

        )
    }
}
export default index;