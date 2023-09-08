import React, { Component } from "react";
import Tarjeta from "../../components/Tarjeta/Tarjeta";

import './styles.css';

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritos: []

        }
    }

    // componentDidMount() {
    //     // Obtener elementos favoritos desde localStorage
    //     const favoritosString = localStorage.getItem('favoritos');
    //     const favoritosArray = JSON.parse(favoritosString);

    //     if (favoritosArray) {
    //         this.setState({ favoritos: favoritosArray });
    //     }
    // }


    componentDidMount() {
        let storageFavs = localStorage.getItem('favoritos')

        if (storageFavs !== null) {
            let favsParseados = JSON.parse(storageFavs)
            Promise.all(
                favsParseados.map(id =>
                    fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/' + id)
                        .then(resp => resp.json())
                )
            )
                .then(data => this.setState({ favoritos: data }))
                .catch(err => console.log(err))
        }
    }

    actualizarState(id) {
        let stateActualizado = this.state.favoritos.filter(elm => elm.id !== id)
        this.setState({
            favoritos: stateActualizado
        })
    }
    render() {
        return (
            <div>
                <h1>Tus Favoritos</h1>
                {
                    this.state.favoritos.map((elm, i) =>
                        <Tarjeta key={elm + i} title={elm.title} id={elm.id} />

                    )
                }

            </div>
        )
    }
}

export default Favoritos;