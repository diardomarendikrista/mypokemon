import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../assets/images/logo.png'

export default function Navbar () {
  const history = useHistory();
  
  const goToHome = (event) => {
    event.preventDefault();
    history.push(`/`)
  }

  const goToMyPokemon = (event) => {
    event.preventDefault();
    history.push(`/mypokemon`)
  }

  return (
    <div className="text-center">
      <div>
        <img className="navbar-img" src={logo} alt="logo"/>
      </div>
      <div className="navbar-menu">
        <a onClick={(event) => goToHome(event)} className="navbar-home-btn" href="/#">Home</a>
        <a onClick={(event) => goToMyPokemon(event)} href="/#">My Pokemon</a>
      </div>
      <hr />
    </div>
  )
}