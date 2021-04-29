const initialState = {
  myPokemons: [],
  loading: true,
  error: false
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "myPokemons/setMyPokemons") return { ...state, myPokemons: payload }
  if (type === "myPokemons/addMyPokemons") return { ...state, myPokemons: [...state.myPokemons, payload] }
  if (type === "loading/setLoading") return { ...state, loading: payload }
  if (type === "error/setError") return { ...state, error: payload }
  return state;
}