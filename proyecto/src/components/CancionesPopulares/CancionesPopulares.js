import React, { Component } from "react";

class CancionesPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  componentDidMount() {
   this.traerCanciones()
  }

  traerCanciones(){
     // Realizar una solicitud al endpoint de canciones populares
     fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=10")
     .then((response) => response.json())
     .then((data) => {
       this.setState({ songs: data.data });
     })
     .catch((error) => console.error(error));
  }
  render() {
    return (
        <> 
        {
            this.state.songs.length == 0? 
            <h3>Loading ... </h3> : (<section>
                {this.state.songs.map((song) => (
                <p key={song.id}>
                <h3>{song.title}</h3>
                <img src={song.album.cover_medium} alt={song.title} />
                <p>Artista: {song.artist.name}</p>
                <p>Nombre del disco: {song.album.title}</p>
                <audio controls>
                    <source src= {song.preview}/>
                </audio>
                {/* Agrega más detalles según sea necesario */}
              </p>
            
          ))}
            </section>)
        }
            
        

      </>
    )
  }
}

export default CancionesPopulares;