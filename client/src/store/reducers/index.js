import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';
import mypokemonReducer from './mypokemonReducer';

const reducer = combineReducers({
  pokemon: pokemonReducer,
  mypokemon: mypokemonReducer
})

export default reducer;