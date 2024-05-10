import "./App.css";
import PokeCard, { Util } from "./components/pokeCard";
import axios from "axios";
import React, { useEffect } from "react";
import Logo from "./components/logoPng";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./components/loader";
import SearchSvg from "./components/searchSvg";
import Alert from "./components/alert";
// import Navbar from "./components/States/StickyNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pokemon } from "./components/pokeCard";

const LIMIT = 20;
const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

const AppCopy = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  const [searchInput, setInput] = useState<string>("");
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [pokemonSearch, setPokemonSearch] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemonAll(1);
    // eslint-disable-next-line
  }, []);

  const getPokemonAll = async (page: number) => {
    const offset = page * LIMIT - LIMIT;
    try {
      const response = await axios(
        `${ENDPOINT}?limit=${LIMIT}&offset=${offset}`
      );
      setPokemonSearch(response.data.results);
      setPokemon([...pokemons, ...response.data.results]);
    } catch (error) {
      console.error(error);
      <Alert />;
    }
  };

  const getPokemons = async (page: number) => {
    const offset = page * LIMIT - LIMIT;
    try {
      const response = await axios(
        `${ENDPOINT}?limit=${LIMIT}&offset=${offset}`
      );
      setPokemon([...pokemons, ...response.data.results]);
    } catch (error) {
      console.error(error);
      <Alert />;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLocaleLowerCase();
    setInput(value);

    const searchedPokemonArray = pokemonSearch.filter((poke) =>
      poke.name.includes(value)
    );

    setLoadMore(value.length <= 0);
    setPokemon(searchedPokemonArray);
  };

  const searchPokemon = async (pokemonName: string) => {
    try {
      await axios(`${ENDPOINT}/${pokemonName}`);
    } catch (error: any) {
      console.error(error);
      <Alert />;
    }
  };

  return (
    <div className="App">
      <Logo />
      {/* Searchbar */}
      <div className="searchContainer">
        <div className="searchWrapper">
          <input
            id="searchInput"
            type="search"
            placeholder="Search Pokemon"
            aria-label="Search"
            aria-describedby="button-addon2"
            value={searchInput}
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchPokemon(e.currentTarget.value);
              }
            }}
          ></input>
          <button
            className="searchBtnWrapper"
            id="searchButton"
            onClick={() => searchPokemon(searchInput)}
          >
            <SearchSvg />
          </button>
        </div>
      </div>

      {/* Pokemon */}
      <InfiniteScroll
        pageStart={0}
        loadMore={getPokemons}
        hasMore={loadMore || false}
        loader={
          <div className="loader" key={0}>
            <Loader />
          </div>
        }
      >
        <div className="pokemonCardGrid">
          {pokemons == null ? (
            <div className="w-full h-full">
              <button>SOMETHING WENT WRONG</button>
            </div>
          ) : (
            pokemons.map((pokemon: Pokemon, index) => {
              return (
                <PokeCard
                  key={index}
                  title={pokemon.name}
                  img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    pokemon.url.split("/")[6]
                  }.png`}
                  pokemonID={pokemon.url.split("/")[6]}
                />
              );
            })
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AppCopy;
