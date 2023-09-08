import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Fomulario from '../../components/Fomulario/Formulario'
import Tarjeta from '../../components/Tarjeta/Tarjeta'



class index extends Component {

    constructor() {
        super();
        this.state = {
            songs: [], // Inicializa songs como un array vacío
        };
    }

    componentDidMount(){
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?index=0&&limit=100")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos.data
                }))
            .catch(error => console.log(error));
    }
  render() {
    return (
        <>
         <Header />
                <Fomulario />

                <h2 className='titulo'>Todas Las Canciones</h2>
                <div className='cajas'>
                    {
                        this.state.songs.length === 0 ?
                            <h3>Loading ... </h3> : (<section>
                                {this.state.songs.map((song, i) => (
                                    <Tarjeta  key={song.id + i} 
                                    id={song.id} 
                                    imagen={song.album.cover} 
                                    titulo={song.title_short} 
                                    artista={song.artist.name} 
                                    duration={song.duration} 
                                    rank={song.rank} 
                                    explicit_lyrics={song.explicit_lyrics.toString()} />
                                ))}
                            </section>)
                    }
                </div>
        
        </>
    )
  }
}
export default index
