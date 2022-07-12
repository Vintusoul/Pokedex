import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../App.css";
import { Pokemon } from "./pokeCard";

const PokeStats = (): JSX.Element => {
  let { id } = useParams();

  const [pokemon, setPokemon] = React.useState({} as Pokemon);

  React.useEffect(() => {
    getPokemonDetails();
    // eslint-disable-next-line
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

  return (
    <>
      <Navbar />
      <div className="w-full h-auto flex justify-center ">
        <div className=" font-pokemon flex flex-col items-center m-5 bg-yellow-300 rounded-lg border shadow-md md:flex-row  hover:bg-pokemon-light-blue hover:text-white lg:max-w-2xl">
          <div className="m-5 ">
            <h5 className="mb-2 flex justify-center text-2xl font-bold tracking-tight ">
              {pokemon.name}
            </h5>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt="pokemon"
              className="w-full border-2 border-slate-600 bg-slate-200 rounded"
            ></img>
          </div>
          <div className="flex flex-col w-full justify-between p-4 leading-normal">
            <p className="mb-3">
              <div className="font-semibold ">Types:</div>
              <p className=" mb-3 flex flew-row ">
                {pokemon.types?.map(
                  (pokeType: {
                    type: {
                      name: string;
                    };
                  }) => {
                    switch (pokeType.type.name) {
                      case "water":
                        return (
                          <p className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                            {pokeType.type.name}
                          </p>
                        );
                      case "fire":
                        return (
                          <p className="bg-red-800 text-red-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded  ">
                            {pokeType.type.name}
                          </p>
                        );
                      case "electric":
                        return (
                          <p className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded  ">
                            {pokeType.type.name}
                          </p>
                        );
                      case "grass":
                        return (
                          <p className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                            {pokeType.type.name}
                          </p>
                        );
                      case "poison":
                        return (
                          <div className=" bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                            {pokeType.type.name}
                          </div>
                        );
                      case "fairy":
                        return (
                          <div className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                            {pokeType.type.name}
                          </div>
                        );
                      default:
                        return (
                          <div className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
                            {pokeType.type.name}
                          </div>
                        );
                    }
                  }
                )}
              </p>
              <h2 className=" font-semibold ">Abilities:</h2>
              <dt className=" mb-2  flex flex-row">
                {pokemon.abilities?.map(
                  (pokeType: { ability: { name: string } }, _: any) => {
                    return pokeType.ability.name.replace("-", " ");
                  }
                )}
              </dt>
              <h2 className=" font-semibold ">Base Experience:</h2>
              <dt className=" flex flex-row">{pokemon.base_experience}</dt>
              <h2 className=" font-semibold ">Weight:</h2>
              <dt className=" flex flex-row">{pokemon.weight}</dt>
              <h2 className=" font-semibold ">Height</h2>
              <dt className=" flex flex-row">{pokemon.height}</dt>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Link to="/">
          <button className="font-pokemon bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Return to Pokedex
          </button>
        </Link>
      </div>
    </>
  );
};

export default PokeStats;
