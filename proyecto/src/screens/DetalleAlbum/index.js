import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Fomulario from '../../components/Fomulario/Formulario'

class DetalleAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: "",
            favoritosAlbumes: [],
            esFavorito: false
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

        let favoritosStringAlbum = localStorage.getItem('album')
        let favoritosArrayAlbum = JSON.parse(favoritosStringAlbum)

        if (favoritosArrayAlbum === null) {
            favoritosArrayAlbum = []
        } else {
            if (favoritosArrayAlbum.includes(parseInt(this.props.match.params.id))) {
                this.setState({
                    esFavorito: true
                })
            }
            this.setState({
                favoritosAlbumes: favoritosArrayAlbum
            })
        }
    }
    agregarFavoritos(id) {

        let favoritosString = localStorage.getItem(this.props.tipo)
        let favoritosArray = JSON.parse(favoritosString)
        // if (!favoritosArray.includes(id)) {
        if (favoritosArray === null) {
            favoritosArray = [id]
            let favoritosStringNuevo = JSON.stringify(favoritosArray)
            localStorage.setItem(this.props.tipo, favoritosStringNuevo)
        } else {
            favoritosArray.push(id)
            let favoritosStringNuevo = JSON.stringify(favoritosArray)
            localStorage.setItem(this.props.tipo, favoritosStringNuevo)
        }
        this.setState({
            esFavorito: true
        })
    }

    quitarFavoritos(id) {

        // if (this.state.favoritos.includes(id)) {
            let favoritosString = localStorage.getItem(this.props.tipo)
            let favoritosArray = JSON.parse(favoritosString)

            if (favoritosArray === null) {
                favoritosArray = []
                let favoritosStringNuevo = JSON.stringify(favoritosArray)
                localStorage.setItem(this.props.tipo, favoritosStringNuevo)
            } else {
                let favsFiltrado = favoritosArray.filter((elm) => id !== elm)
                let favoritosStringNuevo = JSON.stringify(favsFiltrado)
                localStorage.setItem(this.props.tipo, favoritosStringNuevo)
            }

            // let index = favoritosArray.indexOf(id)
            // favoritosArray.splice(index, 1)
            
            this.setState({
                esFavorito: false
            })
    
        // }

    }

    render() {
        return (
            <>
                <Header />
                <Fomulario />

                {
                    this.state.album !== "" ?
                    <section>
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
                        {
                            this.state.esFavorito ?
                            <button onClick={() => this.quitarFavoritos(this.props.id, "album")}>Quitar de favoritos</button> :
                            <button onClick={() => this.agregarFavoritos(this.props.id, "album")}>Agregar a favoritos</button>
                        }
                    </section> :
                    <h2>Loading...</h2>
                }
                <Footer />

            </>
        )
    }

}

export default DetalleAlbum;