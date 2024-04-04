import React, { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios'
import { Pokemon } from './interface';
import PokemonCollections from './components/PokemonCollections';
import "./components/pokemon.css"

interface Pokemons{
  name:string,
  url:string
}

export interface Detail{
  id: number,
  isOpened: boolean
}

const App:React.FC=()=> {
  const [pokemons, setPokemons]= useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  })

  useEffect(()=>{
    const getPokemon = async ()=>{
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")

      //lay them thong tin cua tung pokemon
      setNextUrl(res.data.next)
      res.data.results.forEach(async(pokemon:Pokemons)=>{
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p)=>[...p,poke.data])
        setLoading(false);
      })
    }
    getPokemon();
  },[])

  const nextPage = async () => {
    setLoading(true)
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setLoading(false)
    });
  }

  return (
    <div className="App">
      <div className="conatiner">
        <header className="pokemon-header">Pokemon Collection</header>
        <PokemonCollections pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail}/>
      </div>
      
      <div className="btn">
        <button onClick={nextPage}>{loading ? "loading" : "Load more"}{" "}</button>
      </div>
    </div>
  );
}

export default App;
