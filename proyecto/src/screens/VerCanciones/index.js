import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Tarjeta from '../../components/Tarjeta/Tarjeta';
import Fomulario from '../../components/Fomulario/Formulario'
// import CardContainer from '../../components/CardContainer/CardContainer';


class index extends Component {
    constructor() {
        super();
        this.state = {
            songs: [], 
            valorFiltro: '',
            filtroCanciones: [],
            cantidad: 5,
        };
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos.data,
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
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=${this.state.cantidad + 15}`)
            .then(res => res.json())
            .then(data => {
                // Quiero agregar las últimas 10 canciones que me llegan a las que tenemos en songs del estado
                let arrayCanciones = [];

                for (let i = this.state.cantidad; i < this.state.cantidad + 15; i++) {
                    arrayCanciones.push(data.data[i]);
                }

                let cancionesNuevas = this.state.songs.slice(); // Crear una copia del array actual
                arrayCanciones.forEach(song => cancionesNuevas.push(song)); // Agregar las nuevas canciones a la copia

                this.setState({
                    songs: cancionesNuevas, // Actualizar el estado con la copia modificada
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
                {this.state.filtroCanciones.length === 0 ? (
                        <>
                            {this.state.songs.map((song, i) => {
                                if (song) { // Verifica si song no es undefined
                                    return (
                                        <Tarjeta
                                            key={song.id + i}
                                            id={song.id}
                                            imagen={song.album.cover}
                                            titulo={song.title_short}
                                            artista={song.artist.name}
                                            duration={song.duration}
                                            rank={song.rank}
                                            explicit_lyrics={song.explicit_lyrics.toString()}
                                            tipo=  'cancion'
                                        />
                                    );
                                }
                                return null; // Ignora canciones undefined
                            })}
                        </>
                    ) : (
                        <section>
                            {this.state.filtroCanciones.map((song, i) => {
                                if (song) { // Verifica si song no es undefined
                                    return (
                                        <Tarjeta
                                            key={song.id + i}
                                            id={song.id}
                                            imagen={song.album.cover}
                                            titulo={song.title_short}
                                            artista={song.artist.name}
                                            duration={song.duration}
                                            rank={song.rank}
                                            explicit_lyrics={song.explicit_lyrics.toString()}
                                            tipo= 'cancion'
                                        />
                                    );
                                }
                                return null; // Ignora canciones undefined
                            })}
                        </section>
                    )}
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