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
  // API Call
  React.useEffect(() => {
    getPokemonDetails();
    // eslint-disable-next-line
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
        className=" hover:animate-wiggle font-pokemon text-md block p-4 rounded-lg shadow-md bg-yellow-300 shadow-pokemon-light-blue hover:bg-pokemon-light-blue hover:text-white "
      >
        <div>
          <dd className="font-bold uppercase lg:text-xl">{props.title}</dd>
        </div>
        <img
          src={props.img}
          alt="pokemon"
          className="w-full h-auto border-2	 border-slate-600 bg-slate-200 rounded  "
        ></img>
        <div className="mt-2">
          <div className="sm:text-xs flex flex-col mt-6 lg:text-base">
            <div className="sm:ml-3 inline-flex flex-row sm:shrink-0">
              <div className="font-semibold">TYPES:</div>
              <div className="sm:inline-flex ">
                <dt className="ml-3 flex flex-row w-full justify-around ">
                  {pokemon.types?.map((pokeType, index) => {
                    switch (pokeType.type.name) {
                      case "water":
                        return (
                          <div
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                      case "fire":
                        return (
                          <div
                            key={index}
                            className="bg-red-800 text-red-100 text-sm font-bold mr-2 px-2.5 py-0.5 rounded  "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                      case "electric":
                        return (
                          <div
                            key={index}
                            className="bg-yellow-100 text-yellow-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                      case "grass":
                        return (
                          <div
                            key={index}
                            className="bg-green-100 text-green-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                      case "poison":
                        return (
                          <div
                            key={index}
                            className=" bg-purple-100 text-purple-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                      case "fairy":
                        return (
                          <div
                            key={index}
                            className="bg-pink-100 text-pink-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                      default:
                        return (
                          <div
                            key={index}
                            className="bg-gray-100 text-gray-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded "
                          >
                            {pokeType.type.name}
                          </div>
                        );
                    }
                  })}
                </dt>
              </div>
            </div>
            <div className="sm:inline-flex sm:items-center sm:mt-3 sm:shrink-0"></div>
            <div className="mt-4 font-semibold ">Click for more info...</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokeCard;
