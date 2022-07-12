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
  // API Call
  React.useEffect(() => {
    getPokemonDetails();
  }, []);

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
    <div>
      <Link
        to={`/pokemon/${props.pokemonID}`}
        className=" block p-4 rounded-lg shadow-sm bg-red-200 shadow-red-700"
      >
        <img
          src={props.img}
          alt="pokemon"
          className="w-full h-auto rounded-md"
        ></img>
        <div className="mt-2">
          <div>
            <dd className="font-medium uppercase">{props.title}</dd>
          </div>
          <div className="sm:text-xs flex flex-col mt-6 lg:text-m">
            <div className="sm:inline-flex flex flex-row sm:shrink-0">
              <div>TYPES:</div>
              <div className="sm:ml-3 sm:inline-flex mt-1.5 sm:mt-0">
                <dt className="text-gray-500">
                  {/* Pokemon Types */}
                  {pokemon.types?.map((pokeType, _) => {
                    switch (pokeType.type.name) {
                      case "water":
                        return (
                          <p className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                            {pokeType.type.name}
                          </p>
                        );
                      case "fire":
                        return (
                          <p className="bg-red-800 text-red-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-200 ">
                            {pokeType.type.name}
                          </p>
                        );
                      case "electric":
                        return (
                          <p className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900 ">
                            {pokeType.type.name}
                          </p>
                        );
                      case "grass":
                        return (
                          <p className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 ">
                            {pokeType.type.name}
                          </p>
                        );
                      case "poison":
                        return (
                          <div className=" bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
                            {pokeType.type.name}
                          </div>
                        );
                      case "fairy":
                        return (
                          <div className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
                            {pokeType.type.name}
                          </div>
                        );
                      default:
                        return (
                          <div className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            {pokeType.type.name}
                          </div>
                        );
                    }
                  })}
                </dt>
              </div>
            </div>
            <div className="sm:inline-flex sm:items-center sm:mt-3 sm:shrink-0"></div>
            <div className="mt-4 ">
              <a href="/" className="text-white font-bold ">
                Click for more info...
              </a>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokeCard;
