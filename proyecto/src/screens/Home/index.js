import React, { Component } from 'react'

import './styles.css'

import Header from '../../components/Header/Header'
import Fomulario from '../../components/Fomulario/Formulario'
import Tarjeta from '../../components/Tarjeta/Tarjeta'
import Footer from '../../components/Footer/Footer'
class Home extends Component {
    constructor() {
        super();
        this.state = {
            songs: [],
            albums: []
        };
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?index=0&limit=5")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos.data
                }))
            .catch(error => console.log(error));

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?index=0&limit=5")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    albums: datos.data
                }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <Header />
                <Fomulario />

                <h2 className='titulo'>Canciones del Momento </h2>
                <div className='cajas'>
                    {
                        this.state.songs.length === 0 ?
                            <h3>Loading ... </h3> : (<section>
                                {this.state.songs.map((song, i) => (
                                    <Tarjeta  key={song.id + i} 
                                    id={song.id} 
                                    imagen={song.album.cover} 
                                    titulo={song.title_short} 
                                    artista={song.artist.name} 
                                    duration={song.duration} 
                                    rank={song.rank} 
                                    explicit_lyrics={song.explicit_lyrics.toString()}
                                    tipo= 'cancion' />
                                ))}
                            </section>)
                    }
                </div>

                <h2 className='titulo' >Albums Mas escuchados</h2>
                <div className='caja'>
                    {
                        this.state.albums.length === 0 ?
                            <h3>Loading ... </h3> : (<section>
                                {this.state.albums.map((album, i) => (
                                    <Tarjeta key={album.id + i} id={album.id} imagen={album.cover} titulo={album.title} artista={album.artist.name} explicit_lyrics={album.explicit_lyrics.toString()} tipo= 'album' />
                                ))}
                            </section>)
                    }
                </div>

                <Footer />
            </>
        )
    }

}

export default Home;