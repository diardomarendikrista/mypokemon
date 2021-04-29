import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import axios from '../axios';
import TypeCard from '../components/TypeCard';
import MoveCard from '../components/MoveCard';
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import Swal from 'sweetalert2'

const baseURL = 'https://diardo-pokemon.herokuapp.com/';

export default function PokemonDetail (props) {
  const pokemon = useSelector(state => state.pokemon.pokemon);
  const loading = useSelector(state => state.pokemon.loading);
  const { name } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(_ => {
    getDetail();
    document.title = "Detail - Pokemon Master";
    // eslint-disable-next-line
  }, [])

  const getDetail = async () => {
    try {
      dispatch({ type: 'loading/setLoading', payload: true });
      dispatch({ type: 'pokemon/setPokemon', payload: {} });
      const { data } = await axios('pokemon/' + name)
      // console.log(data);
      dispatch({ type: 'pokemon/setPokemon', payload: data });
      dispatch({ type: 'loading/setLoading', payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'loading/setLoading', payload: false });
    }
  }

  const goToHome = () => {
    history.push(`/`)
  }

  const catchPokemon = async (pokemon) => {
    let random = Math.ceil(Math.random() * 2);
    if (random === 1) {
      const { value: pokemonAlias } = await Swal.fire({
        title: 'Enter the Pokemon name',
        input: 'text',
        inputLabel: 'cancel for using default name',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to name your pokemon!'
          }
        }
      })
      
      if (pokemonAlias) {
        const newPokemon = {
          alias: pokemonAlias,
          name: pokemon.name,
          url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon.name
        }
        // eslint-disable-next-line
        const { data } = await axios.post(baseURL + 'mypokemon', newPokemon)
        Swal.fire(
          'Success!',
          `${pokemonAlias} has been captured!`,
          'success'
        )
      } else {
        const newPokemon = {
          alias: pokemon.name,
          name: pokemon.name,
          url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon.name
        }
        // eslint-disable-next-line
        const { data } = await axios.post(baseURL + 'mypokemon', newPokemon)
        Swal.fire(
          'Success!',
          `${pokemon.name} has been captured!`,
          'success'
        )
      }
    } else {
      Swal.fire(
        'Failed!',
        `${name} fail to be captured!`,
        'error'
      )
    }
  }

  if (loading || !pokemon) {
    return (
      <div className="container-fluid detail-background">
        <div className="container detail-container text-center">
        <Navbar />
        <Loading />
        </div>
      </div>
    )
  }
  return(
    <div className="container-fluid detail-background">
      <div className="container detail-container">
        <Navbar />
        <div>
          <p className="detail-name-text">{pokemon.name.toUpperCase()}</p>
        </div>
        <div className="row mobile-center">
          <div className="col-lg-4 text-center">
            <div>
              <img className="detail-img" src={pokemon.sprites.other.dream_world.front_default} alt="gambar" />
            </div>
            <div>
              <button onClick={() => catchPokemon(pokemon)} className="btn btn-danger btn-catchretreat">catch!</button>
              <button onClick={() => goToHome()} className="btn btn-warning btn-catchretreat">retreat</button>
            </div>
          </div>
          <div className="col-lg-8">
            <hr className="mobile-hr"/>
            <p className="detail-sub-title">TYPE</p>
            <div className="d-flex flex-wrap type-div mobile-center">
            {
              pokemon.types.map(type => (
                <TypeCard
                  type={type.type}
                  key={type.type.name}
                />
              ))
            }
            </div>
            <hr className="mobile-hr"/>
            <p className="detail-sub-title">MOVES</p>
            <div className="d-flex flex-wrap mobile-center">
              {
                pokemon.moves.map(move => (
                  <MoveCard
                    type={pokemon.types[0].type}
                    move={move.move}
                    key={move.move.name}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}