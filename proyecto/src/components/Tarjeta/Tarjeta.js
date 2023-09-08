import React, { Component } from "react";

import { Link } from "react-router-dom";

import './styles.css';

class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            texto: "Ver más",
            favoritos: []
        };
    }

    componentDidMount() {
        let favoritosString = localStorage.getItem("favoritos")
        let favoritosArray = JSON.parse(favoritosString)

        if (favoritosArray === null) {
            favoritosArray = []
        } else {
            this.setState({
                favoritos: favoritosArray
            })
        }
    }

    verMas() {
        if (this.state.verMas === false) {
            this.setState({
                verMas: true,
                texto: "Ver menos"
            });
        } else {
            this.setState({
                verMas: false,
                texto: "Ver más"
            });
        }
    }

    agregarFavoritos(id) {

        if (!this.state.favoritos.includes(id)) {
            let favoritosString = localStorage.getItem("favoritos")
            let favoritosArray = JSON.parse(favoritosString)

            if (favoritosArray === null) {
                favoritosArray = []
            }

            favoritosArray.push(id)

            this.setState({
                favoritos: favoritosArray
            })

            let favoritosStringNuevo = JSON.stringify(favoritosArray)
            localStorage.setItem("favoritos", favoritosStringNuevo)

            console.log(favoritosStringNuevo)
        }

    }

    quitarFavoritos(id) {

        if (this.state.favoritos.includes(id)) {
            let favoritosString = localStorage.getItem("favoritos")
            let favoritosArray = JSON.parse(favoritosString)

            if (favoritosArray === null) {
                favoritosArray = []
            }

            let index = favoritosArray.indexOf(id)
            favoritosArray.splice(index, 1)

            this.setState({
                favoritos: favoritosArray
            })

            let favoritosStringNuevo = JSON.stringify(favoritosArray)
            localStorage.setItem("favoritos", favoritosStringNuevo)

            console.log(favoritosStringNuevo)
        }

    }

    render() {
        return (
            <article className="">
                <img src={this.props.imagen} alt={"Foto album " + this.props.titulo} />

                <h2>{this.props.titulo}</h2>
                <p>Artista: {this.props.artista}</p>


                {
                    this.state.verMas ?
                        <>
                            <p>Descripción:</p>
                            {
                                this.props.duration !== null ?
                                    <>
                                        <p>Duración: {this.props.duration}</p>
                                        <p>Ranking: {this.props.ranking}</p>
                                        <p>Explicit lyrics: {this.props.explicit_lyrics}</p>
                                    </> :
                                    <p>Explicit lyrics: {this.props.explicit_lyrics}</p>
                            }
                        </> :
                        null
                }

                <button onClick={() => this.verMas()}>{this.state.texto}</button>
                <Link to={`/detalle/${this.props.tipo}/${this.props.id}`}>
                    <button>Ir a detalle</button>
                </Link>
                {
                    this.state.favoritos.includes(this.props.id) ?
                        <button onClick={() => this.quitarFavoritos(this.props.id)}>Quitar de favoritos</button> :
                        <button onClick={() => this.agregarFavoritos(this.props.id)}>Agregar a favoritos</button>
                }
            </article>
        )
    }

}

export default Tarjeta;