import React from 'react';
import releasepokemon from '../assets/images/release.png'
import Swal from 'sweetalert2'
import axios from '../axios';

const baseURL = 'https://diardo-pokemon.herokuapp.com/';

export default function PokemonCard (props) {
  const { pokemon } = props;

  const deletePokemon = (pokemon) => {
    Swal.fire({
      title: `Are you sure release ${pokemon.alias} ?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        // eslint-disable-next-line
        const { data } = await axios.delete(baseURL + 'mypokemon/' + pokemon.id)
        props.refetch();
        Swal.fire(
          'Released!',
          `${pokemon.alias} already released.`,
          'success'
        )
      }
    })
  }

  return (
    <div className="card card-pokemon card-mypokemon">
      <div className="card-img-container">
        <img className="card-img-top" src={pokemon.detail.sprites.other.dream_world.front_default} alt="Card cap" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{pokemon.alias.toUpperCase()}</h5>
      </div>
      <img onClick={() => deletePokemon(pokemon)} className="mypokemon-delete-btn" src={releasepokemon} alt="release" />
    </div>
  )
}