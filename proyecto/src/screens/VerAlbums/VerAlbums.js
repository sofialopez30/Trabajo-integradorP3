import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Fomulario from '../../components/Fomulario/Formulario'
// import Tarjeta from '../../components/Tarjeta/Tarjeta'
import Footer from '../../components/Footer/Footer'
import CardContainer from '../../components/CardContainer/CardContainer'
import './styles.css'

export default class VerAlbums extends Component {
    constructor() {
        super();
        this.state = {
            albums: [], 
            valorFiltro: '',
            filtroAlbums: [],
            cantidad: 5,
        };
    }

    componentDidMount() {

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    albums: datos.data
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

        let filtroAlbums = this.state.albums.filter(album => album.title.toLowerCase().includes(this.state.valorFiltro.toLowerCase()));

        this.setState({
            filtroAlbums: filtroAlbums,
        });
    }

    cargarMasCanciones() {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=${this.state.cantidad + 15}`)
            .then(res => res.json())
            .then(data => {
                // Quiero agregar las últimas 10 canciones que me llegan a las que tenemos en songs del estado
                let arrayCanciones = [];

                for (let i = this.state.cantidad; i < this.state.cantidad + 15; i++) {
                    arrayCanciones.push(data.data[i]);
                }

                let albumsNuevas = this.state.albums.slice(); // Crear una copia del array actual
                arrayCanciones.forEach(song => albumsNuevas.push(song)); // Agregar las nuevas canciones a la copia

                this.setState({
                    albums: albumsNuevas, // Actualizar el estado con la copia modificada
                    cantidad: this.state.cantidad + 15,
                });

               
                

            })
            .catch(err => console.log(err))
    }
  render() {
    return (
        <>
        <Header />
        <Fomulario />

        <h2 className='titulo' > Todos Los Albums</h2>
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
        <div className='caja'>
                {
                    this.state.albums.length === 0 ? (
                        <div className="loading-container">
                            <h3>Loading ... </h3>
                        </div>
                    ) : (
                        <div className="card-container">
                            <CardContainer value={this.state.albums} album={true} />
                        </div>
                    )
                }
        </div>
        <div>
                    <button className='search-button' onClick={() => this.cargarMasCanciones()}>Cargar más</button>

                </div>

        <Footer />
    </>
    
    )
  }
}
