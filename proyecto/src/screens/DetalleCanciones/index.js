import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Fomulario from '../../components/Fomulario/Formulario'

class DetalleCanciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: '',
            favoritosCanciones: [],
            esFavorito: false
        }
    }

    componentDidMount() {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos
                }))
            .catch(error => console.log(error));

        let favoritosStringCancion = localStorage.getItem("cancion")
        
        let favoritosArrayCancion = JSON.parse(favoritosStringCancion)

        if (favoritosArrayCancion === null) {
            favoritosArrayCancion = []
        } else {
            if (favoritosArrayCancion.includes(parseInt(this.props.match.params.id))) {
                this.setState({
                    esFavorito: true
                })
            }
            this.setState({
                favoritosCanciones: favoritosArrayCancion
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
                {this.state.songs !== '' ?
                    <section>
                        <img src={this.state.songs.album.cover_medium} alt={this.state.songs.title} />
                        <h2>{this.state.songs.title}</h2>
                        <p>Artista: {this.state.songs.artist.name}</p>
                        <p>Nombre del disco: {this.state.songs.album.title}</p>
                        <audio controls>
                            <source src={this.state.songs.preview} />
                        </audio>
                        {
                            this.state.esFavorito ?
                                <button onClick={() => this.quitarFavoritos(this.props.id, "cancion")}>Quitar de favoritos</button> :
                                <button onClick={() => this.agregarFavoritos(this.props.id, "cancion")}>Agregar a favoritos</button>
                        }
                    </section> :
                    <h2> Loading...</h2>

                }
                <Footer />
            </>
        )
    }

}

export default DetalleCanciones;