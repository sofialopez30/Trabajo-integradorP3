import React, { Component } from 'react';
import Header from '../Header/Header';
import Fomulario from '../Fomulario/Formulario';
import CardContainer from '../CardContainer/CardContainer'; // Importa el componente CardContainer
import Footer from '../Footer/Footer';

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
                <Header />
                <Fomulario />
                {
                    this.state.resultados.length > 0 ?
                        <ul className="resultados">
                            <CardContainer
                                album={false}
                                value={this.state.resultados.map(resultado => ({
                                    id: resultado.id,
                                    cover: resultado.album.cover,
                                    title: resultado.title_short,
                                    artist: {
                                        name: resultado.artist.name
                                    },
                                    duration: resultado.duration,
                                    rank: resultado.rank,
                                    explicit_lyrics: resultado.explicit_lyrics.toString(),
                                    tipo: 'cancion'
                                }))}
                            />
                        </ul> :
                        <h3>Loading..</h3>
                }
                <Footer />
            </>
        )
    }
}

export default ResultadosBusqueda;