import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

interface PokeCardProps {
  img?: string;
  title?: string;
  pokemonID?: string;
}

export interface Util {
  name: string;
  url: string;
}

interface PokemonAbility {
  ability: Util;
  slot: number;
  is_hidden: boolean;
}

interface PokemonType {
  slot: number;
  type: Util;
}

export interface Pokemon {
  stats: any;
  abilities: Array<PokemonAbility>;
  base_experience: number;
  types: Array<PokemonType>;
  stat: [];
  results: Array<Util>;
  name: string;
  weight: number;
  height: number;
}

const PokeCard = (props: PokeCardProps): JSX.Element => {
  const [pokemon, setPokemon] = React.useState({} as Pokemon);

  React.useEffect(() => {
    getPokemonDetails();
    // eslint-disable-next-line
  }, []);

  // API Call
  const getPokemonDetails = () => {
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${props.pokemonID}`;
    axios(ENDPOINT)
      .then((response: any) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        <button>SOMETHING WENT WRONG</button>;
        console.log(error);
      });
  };

  return (
    <div className="pokemonCardContainer">
      <Link to={`/pokemon/${props.pokemonID}`} className="pokemonCardWrapper">
        {/* Pokemon Title */}
        <div>
          <div className="pokemonCardTitle">{props.title}</div>
        </div>
        {/* Pokemon Image */}
        <img src={props.img} alt="pokemon" className="pokemonCardImage"></img>
        <div className="mt-2">
          <div className="pokemonCardTypesWrapper">
            <div className="pokemonCardTypesHolder">
              <div className="pokemonCardTypesHeader">TYPES:</div>
              <div>
                {/* Pokemon Types */}
                <dt className="pokemonCardTypeBadgeContainer">
                  {pokemon.types?.map((pokeType, index) => {
                    switch (pokeType.type.name) {
                      case "water":
                        return (
                          <div key={index} className="waterBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      case "fire":
                        return (
                          <div key={index} className="fireBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      case "electric":
                        return (
                          <div key={index} className="electricBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      case "ground":
                        return (
                          <div key={index} className="groundBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      case "grass":
                        return (
                          <div key={index} className="grassBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      case "bug":
                        return (
                          <div key={index} className="grassBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      case "poison":
                        return (
                          <div key={index} className="poisonBadge">
                            {pokeType.type.name}
                          </div>
                        );

                      case "fairy":
                        return (
                          <div key={index} className="fairyBadge">
                            {pokeType.type.name}
                          </div>
                        );
                      default:
                        return (
                          <div key={index} className="defaultBadge">
                            {pokeType.type.name}
                          </div>
                        );
                    }
                  })}
                </dt>
              </div>
            </div>
            <div className="pokemonCardMoreInfo">Click for more info...</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokeCard;
