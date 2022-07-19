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

function AppCopy() {
  const navigate = useNavigate();
  const [pokemons, setPokemon] = React.useState([] as Array<Util>);
  const [searchInput, setInput] = React.useState("");
  const [loadMore, setLoadMore] = React.useState(true);

  const [pokemonSearch, setPokemonSearch] = React.useState([] as Array<Util>);

  useEffect(() => {
    getPokemonAll();
    console.log(pokemonSearch);
  }, []);

  const getPokemonAll = async () => {
    let ENDPOINT = `https://pokeapi.co/api/v2/pokemon?limit=10000`;

    try {
      const response = await axios(ENDPOINT);
      setPokemonSearch(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  // Api Call for Pokemon

  const getPokemons = async (page: number) => {
    const limit = 20;
    const offset = page * limit - limit;
    let ENDPOINT = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
      const response = await axios(ENDPOINT);
      setPokemon(pokemons.concat(response.data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const HandleInput = async (event: any) => {
    setInput(event.target.value);

    const searchedPokemonArray = pokemonSearch.filter((poke, i) =>
      poke.name.includes(event.target.value)
    );

    if (event.target.value.length <= 0) {
      setLoadMore(true);
    } else {
      setLoadMore(false);
    }

    console.log(searchedPokemonArray);
    setPokemon(searchedPokemonArray);
  };

  const searchPokemon = async () => {
    let ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;

    try {
      const response = await axios(ENDPOINT);
      if (response.data.id) {
        navigate(`/pokemon/${response.data.id}`);
      } else {
        <Alert />;
      }
    } catch (error) {
      console.log(error);
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
            value={searchInput.toLocaleLowerCase()}
            onChange={HandleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchPokemon();
              }
            }}
          ></input>
          <button
            className="searchBtnWrapper"
            id="searchButton"
            onClick={() => searchPokemon()}
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
            pokemons.map((pokemon: { url: string; name: string }, index) => {
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
}

export default AppCopy;
