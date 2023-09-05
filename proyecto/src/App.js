import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import NotFound from "./components/NotFound/NotFound"
import CancionesverMas from './components/CancionesverMas/CancionesverMas';

function App() {
  return(
    <>
    <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/songs/:id" component = {CancionesverMas}/>
        {/* <Route path="/albumes/:id" component = {DetalleAlbum}/>  */}
        <Route path="" component = {NotFound}/>
    </Switch>
    </>
  )
}

export default App;


