
  
  
  
  
  

// class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       elemento: {}
//     };
//   }

//   componentDidMount() {
//     fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/302127")
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           elemento: data
//         })
//       )
//       .catch(e => console.log(e));
//   }

//   componentDidUpdate() {}

//   render() {
//     return (
//       <section>
//         <p>Título del Álbum: {this.state.elemento.title}</p>
//         <p>Artista: {this.state.elemento.artist ? this.state.elemento.artist.name : 'Cargando...'}</p>
//       </section>
//     );
//   }
// }

// export default Home;