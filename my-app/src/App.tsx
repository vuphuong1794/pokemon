import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios'
import { Pokemon } from './interface';
import PokemonCollections from './components/PokemonCollections';

interface Pokemons{
  name:string,
  url:string
}
const App:React.FC=()=> {
  const [pokemons, setPokemons]= useState<Pokemon[]>([])

  useEffect(()=>{
    const getPokemon = async ()=>{
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
      res.data.results.forEach(async(pokemon:Pokemons)=>{
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p)=>[...p,poke.data])
      })
    }
    getPokemon();
  },[])

  return (
    <div className="App">
      <div className="conatiner">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollections pokemons={pokemons}/>
      </div>
    </div>
  );
}

export default App;
