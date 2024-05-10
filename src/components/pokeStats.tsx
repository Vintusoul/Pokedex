import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./logoPng";
import "../App.css";
import { Pokemon } from "./pokeCard";
import { useEffect, useState } from "react";

const PokeStats = (): JSX.Element => {
  let { id } = useParams();

  const [pokemon, setPokemon] = useState({} as Pokemon);

  useEffect(() => {
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
      {/* change background to type */}
      <div className="pokemonInfoContainer">
        <div className="pokemonInfoWrapper">
          <div className="pokemonInfoNameAndImageHolder ">
            <h5 className="pokemonInfoName">{pokemon.name}</h5>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt="pokemon"
              className="pokemonInfoImg"
            ></img>
          </div>
          <div className="pokemonInfoTextWrapper">
            <div className="mb-3">
              {/* Pokemon Types */}
              <div className="font-semibold lg:text-lg mb-2 xl:text-xl">
                Types:
              </div>
              <div className=" mb-3 flex flew-row lg:text-lg  ">
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
              </div>
              <div className=" font-semibold lg:text-lg xl:text-xl ">
                Abilities:
              </div>
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
              <div className=" font-semibold lg:text-lg xl:text-xl ">
                Base Experience:
              </div>
              <div className=" flex flex-row lg:text-base">
                {pokemon.base_experience}
              </div>
              <div className=" font-semibold lg:text-lg xl:text-xl ">
                Weight:
              </div>
              <div className=" flex flex-row lg:text-base ">
                {pokemon.weight}
              </div>
              <div className=" font-semibold lg:text-lg xl:text-xl">Height</div>
              <div className=" flex flex-row lg:text-base ">
                {pokemon.height}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Link to="/">
          <div className="returnToPokedexBtn">Return to Pokedex</div>
        </Link>
      </div>
    </>
  );
};

export default PokeStats;
