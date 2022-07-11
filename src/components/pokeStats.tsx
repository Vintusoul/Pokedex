import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

interface Util {
  name: string;
  url: string;
}

const PokeStats = (): JSX.Element => {
  let { id } = useParams();

  const [pokemon, setPokemon] = React.useState({} as any);
  const className = () => {
    return "";
  };

  // API Call
  React.useEffect(() => {
    getPokemonDetails();
  }, []);

  const getPokemonDetails = () => {
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios(ENDPOINT)
      .then((response: any) => {
        setPokemon(response.data);
        console.log("Pokemon", response.data.results);
      })
      .catch((error) => {
        <button>SOMETHING WENT WRONG</button>;
        console.log(error);
      });
  };
  // Card styling and details
  return (
    <div className={`${className()}`}>
      <a href="/" className="w-full h-full flex justify-center">
        <div className=" m-6 block p-4 rounded-lg shadow-sm bg-red-200 shadow-red-700 md:max-w-md">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt="pokemon"
            className="h-56 rounded-md"
          ></img>
          <div className="mt-2">
            <div>
              <dd className="font-medium uppercase">{pokemon.name}</dd>
            </div>
            <div className="sm: text-xs flex flex-col mt-6 lg: text-m">
              <div className="sm:inline-flex flex flex-row sm:shrink-0">
                <div>TYPES:</div>

                <div className="sm:ml-3 sm:inline-flex mt-1.5 sm:mt-0">
                  <dt className="text-gray-500">
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
                              <p className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 ">
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
                  </dt>
                </div>
              </div>

              <div className="sm:inline-flex sm:items-center sm:mt-3 sm:shrink-0">
                <div className="sm:ml-3 mt-1.5 sm:mt-0">
                  {" "}
                  Abilities:
                  <dt className="text-gray-600 mb-1.5 flex flex-row">
                    {pokemon.abilities?.map(
                      (pokeType: { ability: { name: string } }, _: any) => {
                        return pokeType.ability.name.replace("-", " ");
                      }
                    )}
                  </dt>
                  Stats:
                  <dt className="text-gray-600 flex flex-row">
                    {pokemon.base_experience}
                  </dt>
                  Weight:
                  <dt className="text-gray-600 flex flex-row">
                    {pokemon.weight}
                  </dt>
                  Height:
                  <dt className="text-gray-600 flex flex-row">
                    {pokemon.height}
                  </dt>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-white font-bold">Click to return</div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PokeStats;
