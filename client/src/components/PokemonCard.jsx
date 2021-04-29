import React from 'react';
import { useHistory } from "react-router-dom";

export default function MyPokemonCard (props) {
  const { pokemon } = props;
  const history = useHistory();
  
  const goToDetail = (name) => {
    history.push(`/pokemon/${name}`)
  }

  return (
    <div onClick={() => goToDetail(pokemon.name)} className="card card-pokemon">
      <div className="card-img-container">
        <img className="card-img-top" src={pokemon.detail.sprites.other.dream_world.front_default} alt="Card cap" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{pokemon.detail.name.toUpperCase()}</h5>
      </div>
    </div>
  )
}