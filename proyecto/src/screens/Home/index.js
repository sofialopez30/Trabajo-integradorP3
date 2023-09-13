import React, { Component } from 'react'

import './styles.css'

import Header from '../../components/Header/Header'
import Fomulario from '../../components/Fomulario/Formulario'
// import Tarjeta from '../../components/Tarjeta/Tarjeta'
import Footer from '../../components/Footer/Footer'
import CardContainer from '../../components/CardContainer/CardContainer'
class Home extends Component {
    constructor() {
        super();
        this.state = {
            songs: [],
            albums: []
        };
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?index=0&limit=5")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos.data
                }))
            .catch(error => console.log(error));

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?index=0&limit=5")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    albums: datos.data
                }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <>
                <Header />
                <Fomulario />
                <h2 className='titulo'>Canciones del Momento </h2>
                <section className='inicio'>
                    <div className='tarjetas-container'>
                        {this.state.songs.length === 0 ? (
                            <h3>Loading ... </h3>
                        ) : (
                            <div className='tarjetas-scroll'>
                                <CardContainer value={this.state.songs} album={false}/>
                            </div>
                        )}
                    </div>
                </section>


                <h2 className='titulo' >Albums Mas escuchados</h2>
                <section className='inicio'>
                    <div className='tarjetas-container'>
                        {
                            this.state.albums.length === 0 ?
                                <h3>Loading ... </h3> : (
                                    <div className='tarjetas-scroll'>
                                        <CardContainer value={this.state.albums} album={true}/>
                                    </div>
                                )
                        }

                    </div>
                </section>


                <Footer />
            </>
        )
    }

}

export default Home;