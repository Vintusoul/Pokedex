import axios from "axios";
import React from "react";

interface PokeCardProps {
  className?: string;
  img?: string;
  title?: string;
  onClick?: (event: React.MouseEvent) => void;
  pokemonID?: string;
}

interface Util {
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

interface Pokemon {
  abilities: Array<PokemonAbility>;
  base_experience: number;
  types: Array<PokemonType>;
  stat: [];
}

const PokeCard = (props: PokeCardProps): JSX.Element => {
  const [pokemon, setPokemon] = React.useState({} as Pokemon);
  const className = () => {
    if (props.className) {
      return props.className;
    } else {
      return "";
    }
  };

  // API Call
  React.useEffect(() => {
    getPokemonDetails();
  }, []);

  const getPokemonDetails = () => {
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${props.pokemonID}`;
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
      <a href="/" className="block p-4 rounded-lg shadow-sm shadow-indigo-100">
        <img
          src={props.img}
          alt="pokemon"
          className="w-full h-56 rounded-md"
        ></img>

        <div className="mt-2">
          <div>
            <dd className="font-medium">{props.title}</dd>
          </div>

          <div>
            <dd className="font-light">
              {pokemon.types?.map((pokeType, _) => {
                return pokeType.type.name;
              })}
            </dd>
          </div>

          <dl className="flex items-center mt-6 space-x-8 text-xs">
            <div className="sm:inline-flex sm:items-center sm:shrink-0">
              <svg
                className="w-4 h-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>

              <div className="sm:ml-3 mt-1.5 sm:mt-0">
                <dt className="text-gray-500">Class</dt>
              </div>
            </div>

            <div className="sm:inline-flex sm:items-center sm:shrink-0">
              <svg
                className="w-4 h-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

              <div className="sm:ml-3 mt-1.5 sm:mt-0">
                <dt className="text-gray-500">
                  {pokemon.abilities?.map((pokeType, _) => {
                    return pokeType.ability.name;
                  })}
                </dt>
              </div>
            </div>
          </dl>
        </div>
      </a>
    </div>
  );
};

export default PokeCard;
