import React from 'react'
import { Pokemon } from '../interface'
import PokemonList from './PokemonList'
import "./pokemon.css"

interface Props{
  pokemons: Pokemon[]
}
const PokemonCollections:React.FC<Props> = (props) => {
  const {pokemons} = props
  return (
    <div>
      <section className="collection-container">
        {pokemons.map((pokemon)=>{
          return(
            <div className="" >
              <PokemonList 
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.front_default}/>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default PokemonCollections