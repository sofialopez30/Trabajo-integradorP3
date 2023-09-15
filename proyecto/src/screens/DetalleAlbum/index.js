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
            this.setState({
                favoritosAlbumes: favoritosArrayAlbum
            })
        }
    }
    agregarFavoritos(id) {
        let favoritosArray= this.state.favoritosAlbumes
        if (!favoritosArray.includes(id)) {
            favoritosArray.push(id);

            this.setState({
                favoritosAlbumes: favoritosArray,
                esFavorito: true
            }, ()=>{
                localStorage.setItem('album', JSON.stringify(favoritosArray));
            });

        }
    }

    //HAGO RESUMEN PARA NO MEZCLARME CON TODO
    //obtengo una copia del array de favs de álbumes actual desde el estado del componente. Verifico si el elemento con el id que busco
    // no está ya presente en la lista de favoritos. La condición !favoritosArray.includes(id) comprueba si el id no esta en la lista.
    // Si el id no estaba en la lista de favoritos, se agrega a favoritosArray con el push. Se actualiza la lista con el elemento incluido
    //Actualizco el estado con el nuevo id. Hago un callback donde se guarda en el estado del nav con 'album' y lo paso a string para gaurdarlo. 
    // ACORDAR DE DESPUES PASARLO A INT LOS ARRAYS EN EL NAV SE VE EN INTS. HAY QUE PARSEARLO

    quitarFavoritos(id) {
        let favoritosArray= this.state.favoritosAlbumes;
        let favsFiltrado = favoritosArray.filter((elm) => id !== elm);

        this.setState({
            favoritosAlbumes:favsFiltrado,
            esFavorito: false
        }, ()=>{
            localStorage.setItem('album', JSON.stringify(favsFiltrado));
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

                {
                    this.state.album !== "" ?
                    <section className="detalle">
                        <img src={this.state.album.cover} alt={this.state.album.title} />
                        <h2 className="nombre">{this.state.album.title}</h2>
                        <div className="">
                            <p>Artista: {this.state.album.artist.name}</p>
                            <p>Nombre del disco: {this.state.album.title}</p>
                            <p>Genero: {this.state.album.genres.data[0].name}</p>
                            <p>Publicación: {this.state.album.release_date}</p>

                        </div>

                            <p className="nombre">Listado de canciones:</p>
                        
                                <ul className="song-list">
                                    {this.state.album.tracks.data.map((cancion, i) => (
                                        <li key={cancion + i}>{cancion.title}</li>
                                    ))}
                                </ul>

                
                            
                        {
                            this.state.esFavorito ?
                            <button className="search-button" onClick={() => this.quitarFavoritos(parseInt(this.props.match.params.id))}>Quitar de favoritos</button> :
                            <button className="search-button" onClick={() => this.agregarFavoritos(parseInt(this.props.match.params.id))}>Agregar a favoritos</button>
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