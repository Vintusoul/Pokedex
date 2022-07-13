import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./navbar";
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
        <div className=" font-pokemon flex flex-col items-center m-5 rounded-lg border shadow-md md:flex-row  bg-pokemon-light-blue text-white lg:max-w-2xl">
          <div className="m-5 ">
            <h5 className="mb-2 flex justify-center text-2xl font-bold tracking-tight uppercase ">
              {pokemon.name}
            </h5>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt="pokemon"
              className="w-full border-2 border-slate-600 bg-slate-200 rounded"
            ></img>
          </div>
          <div className="flex flex-col w-full justify-between p-4 leading-normal">
            <div className="mb-3">
              <div className="font-semibold lg:text-lg mb-2 xl:text-xl">
                Types:
              </div>
              <div className=" mb-3 flex flew-row lg:text-lg  ">
                {pokemon.types?.map(
                  (
                    pokeType: {
                      type: {
                        name: string;
                      };
                    },
                    index
                  ) => {
                    switch (pokeType.type.name) {
                      case "water":
                        return (
                          <p
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base"
                          >
                            {pokeType.type.name}
                          </p>
                        );
                      case "fire":
                        return (
                          <p
                            key={index}
                            className="bg-red-800 text-red-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base "
                          >
                            {pokeType.type.name}
                          </p>
                        );
                      case "electric":
                        return (
                          <p
                            key={index}
                            className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base "
                          >
                            {pokeType.type.name}
                          </p>
                        );
                      case "grass":
                        return (
                          <p
                            key={index}
                            className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base"
                          >
                            {pokeType.type.name}
                          </p>
                        );
                      case "poison":
                        return (
                          <p
                            key={index}
                            className=" bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base"
                          >
                            {pokeType.type.name}
                          </p>
                        );
                      case "fairy":
                        return (
                          <p
                            key={index}
                            className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base "
                          >
                            {pokeType.type.name}
                          </p>
                        );
                      default:
                        return (
                          <p
                            key={index}
                            className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded lg:text-base"
                          >
                            {pokeType.type.name}
                          </p>
                        );
                    }
                  }
                )}
              </div>
              <h2 className=" font-semibold lg:text-lg xl:text-xl ">
                Abilities:
              </h2>
              <div className=" mb-2 flex flex-col lg:text-base  ">
                {pokemon.abilities?.map(
                  (pokeType: { ability: { name: string } }, index: any) => {
                    return (
                      <div key={index}>
                        {pokeType.ability.name.replace("-", " ")}
                        <br />
                      </div>
                    );
                  }
                )}
              </div>
              <h2 className=" font-semibold lg:text-lg xl:text-xl ">
                Base Experience:
              </h2>
              <dt className=" flex flex-row lg:text-base">
                {pokemon.base_experience}
              </dt>
              <h2 className=" font-semibold lg:text-lg xl:text-xl ">Weight:</h2>
              <dt className=" flex flex-row lg:text-base ">{pokemon.weight}</dt>
              <h2 className=" font-semibold lg:text-lg xl:text-xl">Height</h2>
              <dt className=" flex flex-row lg:text-base ">{pokemon.height}</dt>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Link to="/">
          <button className="mb-5 font-pokemon bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded xl:text-xl">
            Return to Pokedex
          </button>
        </Link>
      </div>
    </>
  );
};

export default PokeStats;
