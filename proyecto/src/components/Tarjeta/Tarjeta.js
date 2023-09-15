import React, { Component } from "react";

import { Link } from "react-router-dom";

import './styles.css';

class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verMas: false,
            texto: "Ver más",
            esFavorito: false
        };
    }

    componentDidMount() {
        let favoritosString = localStorage.getItem(this.props.tipo)
        let favoritosArray = JSON.parse(favoritosString)

        if (favoritosArray === null) {
            favoritosArray = []
        } else {
            if (favoritosArray.includes(this.props.id)) {
                this.setState({
                    esFavorito: true
                })
            }
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

        let favoritosString = localStorage.getItem(this.props.tipo)
        let favoritosArray = JSON.parse(favoritosString)
        if (favoritosArray === null) {
            favoritosArray = [id]
            let favoritosStringNuevo = JSON.stringify(favoritosArray)
            localStorage.setItem(this.props.tipo, favoritosStringNuevo)
        } else {
            favoritosArray.push(id)
            let favoritosStringNuevo = JSON.stringify(favoritosArray)
            localStorage.setItem(this.props.tipo, favoritosStringNuevo)
        }
        this.setState({
            esFavorito: true
        })
    }

    quitarFavoritos(id) {
            let favoritosString = localStorage.getItem(this.props.tipo)
            let favoritosArray = JSON.parse(favoritosString)

            if (favoritosArray === null) {
                favoritosArray = []
                let favoritosStringNuevo = JSON.stringify(favoritosArray)
                localStorage.setItem(this.props.tipo, favoritosStringNuevo)
            } else {
                let favsFiltrado = favoritosArray.filter((elm) => id !== elm)
                let favoritosStringNuevo = JSON.stringify(favsFiltrado)
                localStorage.setItem(this.props.tipo, favoritosStringNuevo)
            }
       
            this.setState({
                esFavorito: false
            })
    

    }

    render() {
        return (
            <article className="article">
                <img
                    className="article-image"
                    src={this.props.imagen}
                    alt={"Foto album " + this.props.titulo}
                />

                <h2 className="article-title">{this.props.titulo}</h2>
                <p className="article-artist">Artista: {this.props.artista}</p>

                {this.state.verMas ? (
                    <>
                        <p className="article-description">Descripción:</p>
                        {this.props.duration !== null ? (
                            <>
                                <p>Duración: {this.props.duration}</p>
                                <p>Ranking: {this.props.rank}</p>
                                <p></p>
                            </>
                        ) : (
                            <p></p>
                        )}
                    </>
                ) : null}

                <button onClick={() => this.verMas()} className="article-button">
                    {this.state.texto}
                </button>
                <Link to={`/detalle/${this.props.tipo}/${this.props.id}`}>
                    <button className="article-button">Ir a detalle</button>
                </Link>
                {this.state.esFavorito ? (
                    <button onClick={() => this.quitarFavoritos(this.props.id)} className="article-button">
                        Quitar de favoritos
                    </button>
                ) : (
                    <button onClick={() => this.agregarFavoritos(this.props.id)} className="article-button">
                        Agregar a favoritos
                    </button>
                )}
            </article>
        )
    }

}

export default Tarjeta;