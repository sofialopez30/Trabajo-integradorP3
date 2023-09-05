import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './screens/Home/index';
import NotFound from "./screens/NotFound/index"
import CancionesverMas from './components/CancionesverMas/CancionesverMas';

function App() {
  return(
    <>
    <Switch>
        <Route path="/" exact={true} component={Home}/>
        {/* <Route path="/songs/:id" component = {Detalle}/> */}
        {/* <Route path="/albumes/:id" component = {Favorito}/>  */}
        <Route component = {NotFound}/>
    </Switch>
    </>
  )
}

export default App;


