import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Fomulario from '../../components/Fomulario/Formulario'
import Tarjeta from '../../components/Tarjeta/Tarjeta'
import Footer from '../../components/Footer/Footer'

export default class VerAlbums extends Component {
    constructor() {
        super();
        this.state = {

            albums: []
        };
    }

    componentDidMount() {

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

        <h2 className='titulo' > Todos Los Albums</h2>
        <div className='caja'>
            {
                this.state.albums.length === 0 ?
                    <h3>Loading ... </h3> : (<section>
                        {this.state.albums.map((album, i) => (
                            <Tarjeta key={album.id + i} id={album.id} imagen={album.cover} titulo={album.title} artista={album.artist.name} explicit_lyrics={album.explicit_lyrics.toString()} />
                        ))}
                    </section>)
            }
        </div>

        <Footer />
    </>
    
    )
  }
}
