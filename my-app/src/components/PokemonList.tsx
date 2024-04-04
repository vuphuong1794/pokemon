import React, { useEffect, useState } from "react";
import { Pokemon } from "../interface";
import "./pokemon.css";
import { Detail } from "../App";

interface Props {
  name: string;
  id: number;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  viewDetail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, viewDetail, setDetail, abilities } = props;
  const [isSelected, setSelected] = useState(false);
    useEffect(()=>{
        setSelected(id === viewDetail?.id)
    },[viewDetail])

    const handleClose = ()=>{
        setDetail({
            id: 0,
            isOpened: false
        })
    }
  return (
    <div>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={handleClose}>X</p>
            <div className="detail-info">
              <img src={image} alt="" className="detail-img" />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">abilities: </p>
              {abilities?.map((ab: any) => {
                return <div className=""> {ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt="" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
