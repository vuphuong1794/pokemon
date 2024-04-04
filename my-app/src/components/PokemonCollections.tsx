import React, { useEffect } from "react";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollections: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setDetail } = props;

  const selectedPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setDetail({
        id: id,
        isOpened: true,
      });
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when viewDetail is opened
    if (viewDetail.isOpened) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [viewDetail.isOpened]);

  return (
    <>
      <section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
      {viewDetail.isOpened ? (
          <div className="overlay"></div>
        ) : (
          <div className=""></div>
        )}
        {pokemons.map((pokemon) => {
          return (
            <div
              onClick={() => {
                selectedPokemon(pokemon.id);
              }}
            >
              <PokemonList
                viewDetail={viewDetail}
                setDetail={setDetail}
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
                abilities={pokemon.abilities}
                image={pokemon.sprites.front_default}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default PokemonCollections;
