import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Fomulario from '../../components/Fomulario/Formulario'
import Footer from '../../components/Footer/Footer'
import CardContainer from '../../components/CardContainer/CardContainer'
import Filtro from '../../components/Filtro/Filtro'
import './styles.css'

export default class VerAlbums extends Component {
    constructor() {
        super();
        this.state = {
            albums: [], 
            valorFiltro: '',
            filtroAlbums: [],
            cantidad: 5,
            cargando: true
        };
    }

    componentDidMount() {

        fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums")
            .then((response) => response.json())
            .then((datos) =>
                this.setState({
                    albums: datos.data,
                    cargando: false
                }))
            .catch(error => console.log(error));


        
    }


    filtrarAlbums(valorFiltro) {
        let Albumsfiltrados = this.state.albums.filter((album) => album.title.toLowerCase().includes(valorFiltro.toLowerCase()));
        this.setState({
            filtroAlbums: Albumsfiltrados
        });
    }
    

    cargarMasAlbums() {

        this.setState({
            cargando: true,
        })

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums?limit=${this.state.cantidad + 15}`)
            .then(res => res.json())
            .then(data => {
            
                let arrayAlbums = [];

                for (let i = this.state.cantidad; i < this.state.cantidad + 15; i++) {
                    arrayAlbums.push(data.data[i]);
                }

                let albumsNuevas = this.state.albums.slice();
                albumsNuevas = albumsNuevas.concat(arrayAlbums);

                this.setState({
                    albums: albumsNuevas,
                    cantidad: this.state.cantidad + 15,
                });
                this.setState({
                    cargando: false,
                })

               
                

            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <Header />
                <Fomulario />
                <Filtro filtro={(evento) => this.filtrarAlbums(evento)} />

                <h2 className='titulo' > Todos Los Albums</h2>
                <div className='cajas'>
                    {
                        this.state.cargando ?

                            <h3>Loading ... </h3>

                            :

                            this.state.filtroAlbums.length > 0 ?
                                <ul className="resultados">
                                    <CardContainer value={this.state.filtroAlbums} album={true} />
                                </ul> :
                                <ul className="resultados">
                                    <CardContainer value={this.state.albums} album={true} />
                                </ul>



                    }
                </div>
                <div>
                    <button className='search-button2' onClick={() => this.cargarMasAlbums()}>Cargar más</button>

                </div>

                <Footer />
    </>
    
    )
  }
}
