import axios from "axios";
import { useState, useEffect } from "react";
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
  url: any;
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
  const [pokemon, setPokemon] = useState({} as Pokemon);

  useEffect(() => {
    getPokemonDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetches the details of a pokemon
   * @returns void
   */
  const getPokemonDetails = async () => {
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${props.pokemonID}`;

    try {
      const response = await axios(ENDPOINT);
      setPokemon(response.data);
    } catch (error) {
      <button>SOMETHING WENT WRONG</button>;
      console.log(error);
    }
  };

  return (
    <div
      id="background"
      className="pokemonCardContainer rounded-xl shadow-lg overflow-hidden"
    >
      <Link to={`/pokemon/${props.pokemonID}`} className="pokemonCardWrapper">
        {/* Pokemon Image */}
        <div className="w-full h-48 flex items-center justify-center">
          <img
            src={props.img}
            alt="pokemon"
            className="pokemonCardImage w-32 h-32"
          ></img>
        </div>
        {/* Pokemon */}
        <div>
          <div className="pokemonCardTitle">{props.title}</div>
        </div>
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
