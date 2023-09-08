import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";

class DetalleAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: [],
            favoritos: []
        }
    }

    componentDidMount() {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    album: datos
                }))
            .catch(error => console.log(error));
        
    }

    render() {
        return (
            <>
                {this.state.album.length === 0 ?
                    <h2>Cargando...</h2> : (<section>
                        <img src={this.state.album.cover} alt={this.state.album.title} />
                        <h2>{this.state.album.title}</h2>
                        <p>Artista: {this.state.album.artist.name}</p>
                        <p>Nombre del disco: {this.state.album.title}</p>
                        <p>Listado de canciones:</p>
                        {this.state.album.tracks.data.map((cancion, i) => (
                            <div key={cancion + i}>
                                <ul ><li >{cancion.title}</li></ul>
                            </div>

                        ))}
                        {/*  Agregar a favoritos*/}
                    </section>)}
                <Footer />

            </>
        )
    }

}

export default DetalleAlbum;