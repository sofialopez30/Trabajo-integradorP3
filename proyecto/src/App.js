import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home/index';
import NotFound from "./screens/NotFound/index"
import DetalleCanciones from './screens/DetalleCanciones/index';
import Favoritos from './screens/Favoritos/Favoritos';
import ResultadosBusqueda from './screens/ResultadoBusqueda/ResultadoBusqueda';
import VerCanciones from './screens/VerCanciones/index'
import VerAlbums from './screens/VerAlbums/VerAlbums';
import DetalleAlbum from './screens/DetalleAlbum';

function App() {
  return(
    <>
    <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/detalle/cancion/:id" component = {DetalleCanciones}/> 
        <Route path="/detalle/album/:id" component = {DetalleAlbum}/>       
        <Route path="/favoritos" component = {Favoritos}/> 
        <Route path="/search/:search" component = {ResultadosBusqueda}/>
        <Route path='/vercanciones' component={VerCanciones}/>
        <Route path='/veralbums' component={VerAlbums}/>
        <Route component = {NotFound}/>
    </Switch>
    </>
  )
}

export default App;


