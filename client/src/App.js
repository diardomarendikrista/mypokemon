import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import MyPokemon from './pages/MyPokemon'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/pokemon/:name">
          <PokemonDetail />
        </Route>
        <Route path="/mypokemon">
          <MyPokemon />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
