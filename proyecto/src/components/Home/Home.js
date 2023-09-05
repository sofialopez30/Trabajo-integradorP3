// import React, {Component} from "react";
// import Footer from "../Footer/Footer";
// import CancionesverMas from "../CancionesverMas/CancionesverMas";
// import AlbumsverMas from "../AlbumsverMas/AlbumsverMas";
// import Header from "../Header/Header";
// import Fomulario from '../Fomulario/Formulario'


// class Home extends Component {
//     constructor(){
//         super();
//         this.state = {
//             songs: [],
//             albums: []
//         };
//     }

// componentDidMount(){
//     fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks")
//     .then((response)=> response.json())
//     .then((datos)=> 
//     this.setState({
//         songs: datos.data
//     }))
//     .catch(error => console.log(error));
//      fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums")
//      .then((response)=> response.json())
//      .then((datos)=> 
//      this.setState({
//          albums: datos.data
//      }))
//      .catch(error => console.log(error));
// }

// render(){
//     console.log(this.state.songs)
//     return(
//         <> 
//         <Header/>
//         <Fomulario/>
//         <h2>Canciones del Momento </h2>
//         {
//             this.state.songs.length == 0? 
//             <h3>Loading ... </h3> : (<section>
//                 {this.state.songs.map((songs, i ) => (
//                     <CancionesverMas key= {songs.id+i} songs={songs} />

            
//           ))}
//             </section>)
//         }
//         <h2>Albums Mas escuchados</h2>
//         {
//             this.state.albums.length == 0? 
//             <h3>Loading ... </h3> : (<section>
//                 {this.state.albums.map((albums, i ) => (
//                     <AlbumsverMas key= {albums.id+i} albums={albums} />

            
//           ))}
//             </section>)
//         }

//             <Footer/>

//       </>
//     )
// }

// }

// export default Home;

