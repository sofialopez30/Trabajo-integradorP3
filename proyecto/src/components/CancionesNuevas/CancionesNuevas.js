import React, { Component } from "react";

class CancionesNuevas extends Component {
  constructor() {
    super();
    this.state = {
      songs: []
    };
  }

  componentDidMount() {
    // Realizar una solicitud al endpoint de canciones nuevas
    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=10") // Puedes ajustar el límite según tus necesidades
      .then((response) => response.json())
      .then((data) => {
        this.setState({ songs: data.data });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <h2>Canciones más nuevas</h2>
        <ul>
          {this.state.songs.map((song) => (
            <li key={song.id}>
            <h3>{song.title}</h3>
            <p>Artista: {song.artist.name}</p>
            <img src={song.cover_medium} alt={song.title} />
            {/* Agrega más detalles según sea necesario */}
          </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CancionesNuevas;