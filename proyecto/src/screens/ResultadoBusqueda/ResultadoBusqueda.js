import React, { Component } from "react";

import Tarjeta from "../../components/Tarjeta/Tarjeta";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Formulario from "../../components/Fomulario/Formulario"

import './styles.css';

class ResultadosBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.match.params.search,
            resultados: [],
        }
    }

    componentDidMount() {
        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.state.search}`)
            .then((response) => response.json())
            .then((resultados_busqueda) =>
                this.setState({
                    resultados: resultados_busqueda.data
                }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <Header/>
                <Formulario/>
                {
                    this.state.resultados.length > 0 ?
                        <ul className="resultados">
                        {
                            this.state.resultados.map((resultado, i) => 
                            <Tarjeta key={resultado.id + i} id={resultado.id} imagen={resultado.album.cover} titulo={resultado.title_short} artista={resultado.artist.name} duration={resultado.duration} rank={resultado.rank} explicit_lyrics={resultado.explicit_lyrics.toString()} />
                            )
                        }
                        </ul> :
                        <h3>Loading..</h3>
                }
                <Footer/>
            </>
        )
    }
}

export default ResultadosBusqueda;