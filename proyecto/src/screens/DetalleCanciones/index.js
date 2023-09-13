import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Fomulario from '../../components/Fomulario/Formulario'

class DetalleCanciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: '',
            favoritosCanciones:[]
        
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

            let favoritosStringCancion = localStorage.getItem("favoritos-cancion")
            let favoritosArrayCancion = JSON.parse(favoritosStringCancion)
    
            if (favoritosArrayCancion === null) {
                favoritosArrayCancion = []
            } else {
                this.setState({
                    favoritosCanciones: favoritosArrayCancion
                })
            }
        }
    
        agregarFavoritos(id, tipo) {
            if (!this.state.favoritosCanciones.includes(id)) {
                let favoritosString = localStorage.getItem("favoritos-" + tipo)
                let favoritosArray = JSON.parse(favoritosString)
    
                if (favoritosArray === null) {
                    favoritosArray = []
                }
    
                favoritosArray.push(id)
    
                this.setState({
                    favoritosCanciones: favoritosArray
                })
    
                let favoritosStringNuevo = JSON.stringify(favoritosArray)
                localStorage.setItem("favoritos-" + tipo, favoritosStringNuevo)
    
                console.log(favoritosStringNuevo)
            }
        }
    
        quitarFavoritos(id, tipo) {
            if (this.state.favoritosCanciones.includes(id)) {
                let favoritosString = localStorage.getItem("favoritos-" + tipo)
                let favoritosArray = JSON.parse(favoritosString)
    
                if (favoritosArray === null) {
                    favoritosArray = []
                }
    
                let index = favoritosArray.indexOf(id)
                favoritosArray.splice(index, 1)
    
                this.setState({
                    favoritosCanciones: favoritosArray
                })
    
                let favoritosStringNuevo = JSON.stringify(favoritosArray)
                localStorage.setItem("favoritos-" + tipo, favoritosStringNuevo)
    
                console.log(favoritosStringNuevo)
            }
        }
    
    
    render() {
        return (
            <>
            <Header/>
            <Fomulario/>
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
                            this.state.favoritosCanciones.includes(this.props.id) ?
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