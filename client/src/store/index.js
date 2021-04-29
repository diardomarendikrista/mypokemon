import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  pokemons: [],
  pokemon: {},
  myPokemons: [],
  next: {},
  loadingNext: false,
  loading: true,
  error: false
}

function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "pokemons/addPokemons") return { ...state, pokemons: [...state.pokemons, payload] }
  if (type === "pokemons/setPokemons") return { ...state, pokemons: payload }
  if (type === "myPokemons/setMyPokemons") return { ...state, myPokemons: payload }
  if (type === "myPokemons/addMyPokemons") return { ...state, myPokemons: [...state.myPokemons, payload] }
  if (type === "pokemon/setPokemon") return { ...state, pokemon: payload }
  if (type === "next/setNext") return { ...state, next: payload }
  if (type === "loadingNext/setLoadingNext") return { ...state, loadingNext: payload }
  if (type === "loading/setLoading") return { ...state, loading: payload }
  if (type === "error/setError") return { ...state, error: payload }
  return state;
} 

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
