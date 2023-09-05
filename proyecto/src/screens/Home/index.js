import React, { Component } from 'react'
import {options} from '../../utils/constants'
import './styles.css'
import CancionesverMas from '../../components/CancionesverMas/CancionesverMas';
import CancionesPopulares from '../../components/CancionesPopulares/CancionesPopulares';
import CancionesNuevas from '../../components/CancionesNuevas/CancionesNuevas';
import Fomulario from '../../components/Fomulario/Formulario'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import AlbumsverMas from '../../components/AlbumsverMas/AlbumsverMas';


// class index extends Component {
//   render() {
//     return (
//         <>
//         <section>
//             <Header/>
//             <Fomulario/>
//         </section>
//          <div>
//         <CancionesPopulares/>
//         <CancionesNuevas/>
        
        
//       </div>
//       <section>
//         <Footer/>
//       </section>
//         </>
     
//     )
//   }
// }
// export default index




class Home extends Component {
    constructor(){
        super();
        this.state = {
            songs: [],
            albums: []
        };
    }

componentDidMount(){
    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?index=0&limit=100")
    .then((response)=> response.json())
    .then((datos)=> 
    this.setState({
        songs: datos.data
    }))
    .catch(error => console.log(error));
     fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?index=0&limit=100")
     .then((response)=> response.json())
     .then((datos)=> 
     this.setState({
         albums: datos.data
     }))
     .catch(error => console.log(error));
}

// filtrarAlbumes(textoInput) {
//     let albumesFiltrados = this.state.albums.filter((album) => {
//       return album.title.toLowerCase().includes(textoInput.toLowerCase());
//     });
//     this.setState({
//       albums: albumesFiltrados
//     });
//   }

render(){
    console.log(this.state.songs)
    return(
        <> 
        <Header/>
        <Fomulario/>
        <h2>Canciones del Momento </h2>
        {
            this.state.songs.length == 0? 
            <h3>Loading ... </h3> : (<section>
                {this.state.songs.map((songs, i ) => (
                    <CancionesverMas key= {songs.id+i} songs={songs} />

            
          ))}
            </section>)
        }
        <h2>Albums Mas escuchados</h2>
        {
            this.state.albums.length == 0? 
            <h3>Loading ... </h3> : (<section>
                {this.state.albums.map((albums, i ) => (
                    <AlbumsverMas key= {albums.id+i} albums={albums} />

            
          ))}
            </section>)
        }

            <Footer/>

      </>
    )
}

}

export default Home;