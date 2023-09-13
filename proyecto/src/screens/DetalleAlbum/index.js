// import React, { Component } from "react";
// import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
// import Fomulario from '../../components/Fomulario/Formulario'

// class DetalleAlbum extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             album: "",
//             favoritosAlbumes: []
//         }
//     }

//     componentDidMount() {
//         fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${this.props.match.params.id}`)
//             .then((response) => response.json())
//             .then((datos) =>
//                 this.setState({
//                     album: datos
//                 }))
//             .catch(error => console.log(error));

//         let favoritosStringAlbum = localStorage.getItem("favoritos-album")
//         let favoritosArrayAlbum = JSON.parse(favoritosStringAlbum)

//         if (favoritosArrayAlbum === null) {
//             favoritosArrayAlbum = []
//         } else {
//             this.setState({
//                 favoritosAlbumes: favoritosArrayAlbum
//             })
//         }
//     }

//     agregarFavoritos(id, tipo) {
//         if (!this.state.favoritosAlbumes.includes(id)) {
//             let favoritosString = localStorage.getItem("favoritos-" + tipo)
//             let favoritosArray = JSON.parse(favoritosString)

//             if (favoritosArray === null) {
//                 favoritosArray = []
//             }

//             favoritosArray.push(id)

//             this.setState({
//                 favoritosAlbumes: favoritosArray
//             })

//             let favoritosStringNuevo = JSON.stringify(favoritosArray)
//             localStorage.setItem("favoritos-" + tipo, favoritosStringNuevo)

//             console.log(favoritosStringNuevo)
//         }
//     }

//     quitarFavoritos(id, tipo) {
//         if (this.state.favoritosAlbumes.includes(id)) {
//             let favoritosString = localStorage.getItem("favoritos-" + tipo)
//             let favoritosArray = JSON.parse(favoritosString)

//             if (favoritosArray === null) {
//                 favoritosArray = []
//             }

//             let index = favoritosArray.indexOf(id)
//             favoritosArray.splice(index, 1)

//             this.setState({
//                 favoritosAlbumes: favoritosArray
//             })

//             let favoritosStringNuevo = JSON.stringify(favoritosArray)
//             localStorage.setItem("favoritos-" + tipo, favoritosStringNuevo)

//             console.log(favoritosStringNuevo)
//         }
//     }

//     render() {
//         return (
//             <>
//                 <Header />
//                 <Fomulario />

//                 {
//                     this.state.album !== "" ?
//                     <section>
//                         <img src={this.state.album.cover} alt={this.state.album.title} />
//                         <h2>{this.state.album.title}</h2>
//                         <p>Artista: {this.state.album.artist.name}</p>
//                         <p>Nombre del disco: {this.state.album.title}</p>
//                         <p>Listado de canciones:</p>
//                         {this.state.album.tracks.data.map((cancion, i) => (
//                             <div key={cancion + i}>
//                                 <ul ><li >{cancion.title}</li></ul>
//                             </div>
//                         ))}
//                         {
//                             this.state.favoritosAlbumes.includes(this.props.id) ?
//                             <button onClick={() => this.quitarFavoritos(this.props.id, "album")}>Quitar de favoritos</button> :
//                             <button onClick={() => this.agregarFavoritos(this.props.id, "album")}>Agregar a favoritos</button>
//                         }
//                     </section> :
//                     <h2>Cargando...</h2>
//                 }
//                 <Footer />

//             </>
//         )
//     }

// }

// export default DetalleAlbum;