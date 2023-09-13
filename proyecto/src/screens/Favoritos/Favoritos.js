import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import CardContainer from '../../components/CardContainer/CardContainer';
import Footer from '../../components/Footer/Footer';

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritosCanciones: [],
      favoritosAlbums: [],
      albums: [],
      songs: [],
      esFavorito: false
    };
  }

  componentDidMount() {
    // aca estoy obteniendo los favoritos almacenados en el almacenamiento local
    let favoritosStringCancion = localStorage.getItem("cancion")
    let favoritosArrayCancion = JSON.parse(favoritosStringCancion)
    
    let favoritosStringAlbum = localStorage.getItem("album")
    let favoritosArrayAlbum = JSON.parse(favoritosStringAlbum)

    if (favoritosArrayCancion === null) {
        favoritosArrayCancion = []
    }

    if (favoritosArrayAlbum === null) {
        favoritosArrayAlbum = []
    }

    Promise.all(
      favoritosArrayCancion.map((id) => 
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks/" + id)
        .then((response) => response.json())
      )
    ).then((datos) => {
      this.setState({
        favoritosArrayCancion: datos
      })
    })
    .catch(error => console.log(error));

    Promise.all(
      favoritosArrayAlbum.map((id) => 
      fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/album/" + id)
        .then((response) => response.json())
      )
    ).then((datos) => {
      this.setState({
        favoritosArrayAlbum: datos
      })
    })
    .catch(error => console.log(error));

    
  }
       

  render() {
    return (
      <>
        <Header />
        <div>
          <h1>Tus Favoritos</h1>
          <section>
            <h3>Canciones Favoritas</h3>
            <div className='tarjetas-container'>
              {this.state.songs.length === 0 ? (
                <h3>Loading ... </h3>
              ) : (
                <div className='tarjetas-scroll'>
                  <CardContainer value={this.state.songs} album={false} />
                </div>
              )}
            </div>
          </section>

          <section>
            <h3>Albumes Favoritos</h3>
            <div>
              {this.state.albums.length === 0 ? (
                <h3>Loading ... </h3>
              ) : (
                <div className='tarjetas-scroll'>
                  <CardContainer value={this.state.albums} album={true} />
                </div>
              )}
            </div>
          </section>
        </div>
        <Footer/>
      </>
    );
  }
}

export default Favoritos;