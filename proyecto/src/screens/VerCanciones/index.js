import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Fomulario from '../../components/Fomulario/Formulario'
import CardContainer from '../../components/CardContainer/CardContainer';
import Filtro from '../../components/Filtro/Filtro';


class index extends Component {
    constructor() {
        super();
        this.state = {
            songs:[], 
            filtroCanciones: [],
            cantidad: 10,
            cargando: true,
        };
    }

    componentDidMount() {
        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    songs: datos.data,
                    cargando: false,
                }))
            .catch(error => console.log(error));
    }


    filtrarCanciones(valorFiltro) {
        let cancionesFiltradas= this.state.songs.filter((cancion) => cancion.title.toLowerCase().includes(valorFiltro.toLowerCase()));
        this.setState({
            filtroCanciones: cancionesFiltradas,
            
        });
       
    }

    cargarMasCanciones() {

        this.setState({
            cargando: true,
        });

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks?limit=${this.state.cantidad + 16}`)
            .then(res => res.json())
            .then(data => {
                let arrayCanciones = [];

                for (let i = this.state.cantidad; i < this.state.cantidad + 15; i++) {
                    arrayCanciones.push(data.data[i]);
                }

                let cancionesNuevas = this.state.songs.slice(); 
                cancionesNuevas = cancionesNuevas.concat(arrayCanciones);

                this.setState({
                    songs: cancionesNuevas, 
                    cantidad: this.state.cantidad + 15,
                });

                this.setState({
                    cargando: false,
                });

            
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <Header />
                <Fomulario />
                <Filtro filtro={(valorFiltro) => this.filtrarCanciones(valorFiltro)} />


                <h2 className='titulo'>Todas Las Canciones</h2>
                <div className='cajas'>
                {
                    this.state.cargando ?
                        <h3>Loading..</h3> :
                        this.state.filtroCanciones.length > 0 ?
                            <ul className="resultados">
                                <CardContainer value={this.state.filtroCanciones} album={false} />
                            </ul> :
                            <ul className="resultados">
                                <CardContainer value={this.state.songs} album={false} />
                            </ul>
                }
                </div>
                <div>

                </div>
                <div>
                    <button className='search-button2' onClick={() => this.cargarMasCanciones()}>Cargar más</button>

                </div>
                <Footer />
            </>

        )
    }
}
export default index;