import "./App.css";
import PokeCard, { Util } from "./components/pokeCard";
import axios from "axios";
import React from "react";
import Navbar from "./components/navbar";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./components/loader";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [pokemons, setPokemon] = React.useState([] as Array<Util>);
  const [searchInput, setInput] = React.useState("");

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

  const HandleInput = (event: any) => {
    setInput(event.target.value);
  };

  const searchPokemon = async () => {
    let ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;

    try {
      const response = await axios(ENDPOINT);
      if (response.data.id) {
        navigate(`/pokemon/${response.data.id}`);
      } else {
        alert("pokemon not found");
      }
    } catch (error) {
      console.log(error);
      alert("pokemon not found");
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="bg-gray-800 w-full flex justify-center border-cyan-50">
        <div className=" w-11/12 input-group relative flex items-stretch mb-4 rounded">
          <input
            id="searchInput"
            type="search"
            className=" lg:text-lg font-pokemon form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-800 focus:bg-white focus:border-blue-600 focus:outline-none"
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
            className="hover:bg-slate-500 cursor-grab bg-pokemon-light-blue input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
            id="searchButton"
            onClick={() => searchPokemon()}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FFFFFF"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Pokemon */}
      <InfiniteScroll
        pageStart={0}
        loadMore={getPokemons}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            <Loader />
          </div>
        }
      >
        <div className="wrapper">
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

export default App;
