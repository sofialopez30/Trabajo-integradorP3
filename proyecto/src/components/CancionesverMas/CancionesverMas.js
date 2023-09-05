import React, {Component} from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

class CancionesverMas extends Component{
    constructor(props){
        super(props);
        this.state = {
            verMas: false, 
            texto: "Ver más"
        };
    }

verMas(){
    if(this.state.verMas === false){
        this.setState({
            verMas: true,
            texto: "Ver menos"
        });
    }else{
        this.setState({
            verMas: false, 
            texto: "Ver más"
        });
    }
}

render(){
    return(
       <>
       {this.props.songs.position <= 8 ? <article>
        <img src={this.props.songs.album.cover} alt={this.props.songs.title} />
        <h2>{this.props.songs.title}</h2>
        <p>Artista: {this.props.songs.artist.name}</p>
        <button onClick={() => this.verMas()}>{this.state.texto}</button>
        <section className={this.state.verMas ? "show": "hide"}> </section>
        <Link to={`/songs/${this.props.songs.id}`}>
            <button>Ir a detalle</button>
        </Link>
       </article>: ""}
    {/* Link, botón o ícono "agregar/ quitar de favoritos". */}

       </>
    )
}
}

export default CancionesverMas; 