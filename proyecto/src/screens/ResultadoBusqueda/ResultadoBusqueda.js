import React, { Component } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Fomulario from "../../components/Fomulario/Formulario"
import CardContainer from "../../components/CardContainer/CardContainer";

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

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.search !== this.props.match.params.search) {
            fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.props.match.params.search}`)
                .then((response) => response.json())
                .then((resultados_busqueda) =>
                    this.setState({
                        resultados: resultados_busqueda.data
                    }
                ))
                .catch(error => console.log(error));
        }
    }
    

    render() {
        return (
            <>
                <Header/>
                <Fomulario/>
                {
                    this.state.resultados.length > 0 ?
                        <ul className="resultados">
                            <CardContainer value={this.state.resultados} album={false}/>
                            <div>
                            <CardContainer value= {this.state.resultados} album={true}/>
                            </div>
                            
                        </ul> :
                        <h3>Loading..</h3>
                }
                <Footer/>
            </>
        )
    }
}

export default ResultadosBusqueda;