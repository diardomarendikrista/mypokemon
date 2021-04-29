const initialState = {
  pokemons: [],
  pokemon: {},
  next: {},
  loadingNext: false,
  loading: true,
  error: false
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "pokemons/addPokemons") return { ...state, pokemons: [...state.pokemons, payload] }
  if (type === "pokemons/setPokemons") return { ...state, pokemons: payload }
  if (type === "pokemon/setPokemon") return { ...state, pokemon: payload }
  if (type === "next/setNext") return { ...state, next: payload }
  if (type === "loadingNext/setLoadingNext") return { ...state, loadingNext: payload }
  if (type === "loading/setLoading") return { ...state, loading: payload }
  if (type === "error/setError") return { ...state, error: payload }
  return state;
}