import React, { Component } from "react";

class CancionesPopulares extends Component {
  constructor() {
    super();
    this.state = {
      songs: []
    };
  }

  componentDidMount() {
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
      <div>
        <h2>Canciones más populares</h2>
        <ul>
          {this.state.songs.map((song) => (
            <li key={song.id}>
            <h3>{song.title}</h3>
            <p>Artista: {song.artist.name}</p>
            <img src={song.album.cover_medium} alt={song.title} />
            {/* Agrega más detalles según sea necesario */}
          </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CancionesPopulares;