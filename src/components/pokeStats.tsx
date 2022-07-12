import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import "../App.css";
import { Pokemon } from "./pokeCard";

const PokeStats = (): JSX.Element => {
  let { id } = useParams();

  const [pokemon, setPokemon] = React.useState({} as Pokemon);

  // API Call
  React.useEffect(() => {
    getPokemonDetails();
  }, []);

  const getPokemonDetails = () => {
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios(ENDPOINT)
      .then((response: any) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        <button>SOMETHING WENT WRONG</button>;
        console.log(error);
      });
  };
  // Card styling and details
  return (
    <div className="w-full h-screen bg-red-200">
      <Navbar />
      {/* new idea */}
      <a
        href="/"
        className="flex flex-col items-center m-5 bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:max-w-2xl"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt="pokemon"
          className="w-full h-auto rounded-md"
        ></img>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pokemon.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div className="font-semibold ">Types:</div>
            <p className=" mb-3 ">
              {pokemon.types?.map(
                (pokeType: {
                  type: {
                    name: string;
                  };
                }) => {
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
                }
              )}
            </p>
            <h2 className=" font-semibold ">Abilities:</h2>
            <dt className=" mb-2 text-gray-600 flex flex-row">
              {pokemon.abilities?.map(
                (pokeType: { ability: { name: string } }, _: any) => {
                  return pokeType.ability.name.replace("-", " ");
                }
              )}
            </dt>
            <h2 className=" font-semibold ">Base Experience:</h2>
            <dt className="text-gray-600 flex flex-row">
              {pokemon.base_experience}
            </dt>
            <h2 className=" font-semibold ">Weight:</h2>
            <dt className="text-gray-600 flex flex-row">{pokemon.weight}</dt>
            <h2 className=" font-semibold ">Height</h2>
            <dt className="text-gray-600 flex flex-row">{pokemon.height}</dt>
          </p>
        </div>
      </a>
    </div>
  );
};

export default PokeStats;
