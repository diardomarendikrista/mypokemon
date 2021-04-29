import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import MyPokemonCard from '../components/MyPokemonCard';
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from '../axios';

const baseURL = 'http://localhost:3000/';

export default function MyPokemon (props) {
  const myPokemons = useSelector(state => state.mypokemon.myPokemons);
  const loading = useSelector(state => state.mypokemon.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(_ => {
    fetchMyPokemon();
    document.title = "My Pokemon - Pokemon Master";
    // eslint-disable-next-line
  }, [])

  const fetchMyPokemon = async () => {
    try {
      dispatch({ type: 'loading/setLoading', payload: true });
      dispatch({ type: 'myPokemons/setMyPokemons', payload: [] });
      const { data } = await axios.get(baseURL + 'mypokemon');
      
      data.forEach(async (element) => {
        const { data } = await axios.get(element.url);
        const newData = {
          ...element,
          detail: data
        }
        dispatch({ type: 'myPokemons/addMyPokemons', payload: newData });
      });
      
      dispatch({ type: 'loading/setLoading', payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'loading/setLoading', payload: false });
    }
  }

  const goToHome = () => {
    history.push(`/`)
  }

  const emptyMyPokemon = () => {
    return (
      <div className="mypokemon-empty text-center">
        <h2 className="text-secondary">Oh noo...</h2>
        <h3 className="text-secondary">you have no pokemon yet</h3>
        <button onClick={() => goToHome()} className="btn btn-outline-secondary">get some pokemons</button>
      </div>
    )
  }

  return (
    <div className="container">
      <Navbar />
      <div>
        <p className="mypokemon-title">My Pokemon</p>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {
          loading ? <Loading /> :
          myPokemons.length === 0 ? emptyMyPokemon() :
          myPokemons.map(myPokemon => (
            <MyPokemonCard
              pokemon={myPokemon}
              key={myPokemon.id}
              refetch={fetchMyPokemon}
            />
          ))
        }
      </div>
    </div>
  )
}