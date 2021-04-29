import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonCard from '../components/PokemonCard';
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from '../axios';

export default function Home (props) {
  const pokemons = useSelector(state => state.pokemons);
  const next = useSelector(state => state.next);
  const loading = useSelector(state => state.loading);
  const loadingNext = useSelector(state => state.loadingNext);
  const dispatch = useDispatch();

  useEffect(_ => {
    fetchPokemon();
    document.title = "Pokemon Master";
    // eslint-disable-next-line
  }, [])

  const fetchPokemon = async () => {
    try {
      dispatch({ type: 'pokemons/setPokemons', payload: [] });
      dispatch({ type: 'loading/setLoading', payload: true });
      const { data } = await axios.get('pokemon');
      
      data.results.forEach(async (element) => {
        const { data } = await axios.get(element.url);
        const newData = {
          ...element,
          detail: data
        }
        dispatch({ type: 'pokemons/addPokemons', payload: newData });
        dispatch({ type: 'pokemon/setPokemon', payload: data });
      });

      dispatch({ type: 'next/setNext', payload: data.next });
      dispatch({ type: 'loading/setLoading', payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'loading/setLoading', payload: false });
    }
  }

  const fetchMore = async (url) => {
    try {
      dispatch({ type: 'loadingNext/setLoadingNext', payload: true });
      const { data } = await axios.get(url);
      data.results.forEach(async (element) => {
        const { data } = await axios.get(element.url);
        const newData = {
          ...element,
          detail: data
        }
        dispatch({ type: 'pokemons/addPokemons', payload: newData });
        dispatch({ type: 'loadingNext/setLoadingNext', payload: false });
      });
      dispatch({ type: 'next/setNext', payload: data.next });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'loadingNext/setLoadingNext', payload: false });
    }
  }

  return (
    <div className="container">
      <Navbar />
      <div className="d-flex flex-wrap justify-content-center">
        {
          loading ? <Loading /> :
          pokemons.map(pokemon => (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.url}
            />
          ))
        }
      </div>
      <div className="btn-see-more-container">
        {
          loadingNext || loading ? <></> : <button onClick={() => fetchMore(next)} className="btn btn-dark btn-see-more">continue journey</button>
        }
      </div>
    </div>
  )
}