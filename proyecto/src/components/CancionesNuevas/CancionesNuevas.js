import React, { Component } from "react";

class CancionesNuevas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: []
        };
    }

    componentDidMount() {
        this.traerCanciones()
    }

    traerCanciones() {
        // Realizar una solicitud al endpoint de canciones nuevas
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=10`) // Puedes ajustar el límite según tus necesidades
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({ albums: data.data });
            })
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <>

                {
                    this.state.albums && this.state.albums.length !== 0 ?  //chekea si existe con this.state.albums y de ahi se fija la lenght
                    this.state.albums.map((album) => {
                        return (<article key={album.id}>
                                    <h3>{album.title}</h3>
                                    <img src={album.cover_medium} alt={album.title} />
                                    <p>Artista: {album.artist.name}</p>
                                </article>)
                    })
                    :
                    <h3>Cargando...</h3>
                }


            </>

        );
    }
}

export default CancionesNuevas;