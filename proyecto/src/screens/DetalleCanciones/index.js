import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Fomulario from '../../components/Fomulario/Formulario'
import './styles.css'


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
            this.setState({
                favoritosCanciones: favoritosArrayCancion
            })
        }
    }

    agregarFavoritos(id) {
        let favoritosArray = this.state.favoritosCanciones; 
        if (!favoritosArray.includes(id)) {
            favoritosArray.push(id); 
            this.setState({
                favoritosCanciones: favoritosArray,
                esFavorito: true
            }, () => {
                localStorage.setItem("cancion", JSON.stringify(favoritosArray));
            });
        }
    }

    quitarFavoritos(id) {
        let favoritosArray = this.state.favoritosCanciones; 
        let favsFiltrado = favoritosArray.filter((elm) => id !== elm); 
        this.setState({
            favoritosCanciones: favsFiltrado, 
            esFavorito: false
        }, () => {
            localStorage.setItem("cancion", JSON.stringify(favsFiltrado));  
        });
    }
    // HAGO UN RESUMEN DE QUE HACE PARA NO MEZCLARME
    // obtengo una copia del array de favs desde el estado del componente. Con el filter creo un nuevo array donde voy a exluir el 
    //elemento con el id en especifico y se elimina. Despues actualizo el estado donde pongo a favoritosCanciones como nuevo array y 
    //ahi se elimina de la lista de favs. Despues de guardar en el local Storage, hago un callback donde paso a string xq el nav no puede verlo sino y se guarda.


    render() {
        return (
            <>
                <Header />
                <Fomulario />
                {this.state.songs !== '' ?
                    <section className="detalle">
                        <img src={this.state.songs.album.cover_medium} alt={this.state.songs.title} />
                        <h2 className="nombre">{this.state.songs.title}</h2>
                        <div className="art-nom">
                            <p>Artista: {this.state.songs.artist.name}</p>
                            <p>Nombre del disco: {this.state.songs.album.title}</p>
                        </div>

                        <audio controls>
                            <source src={this.state.songs.preview} />
                        </audio>
                        {
                            this.state.esFavorito ?
                                <button className="search-button" onClick={() => this.quitarFavoritos(parseInt(this.props.match.params.id))}>Quitar de favoritos</button> :
                                <button className="search-button" onClick={() => this.agregarFavoritos(parseInt(this.props.match.params.id))}>Agregar a favoritos</button>
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