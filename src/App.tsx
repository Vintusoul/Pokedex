import "./App.css";
import PokeCard from "./components/pokeCard";
import axios from "axios";
import React from "react";
import SearchBar from "./components/searchBar";
import Navbar from "./components/navbar";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./components/loader";

function App() {
  const [pokemons, setPokemon] = React.useState([]);

  const getPokemon = async (page: number) => {
    const limit = 50;
    const offset = page * limit;
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await axios(ENDPOINT);
      //set state to false so it stops when u load it in
      setPokemon(pokemons.concat(response.data.results));
      console.log("Pokemon", response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <InfiniteScroll
        pageStart={0}
        loadMore={getPokemon}
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
            pokemons.map((pokemon: { url: any; name: any }, index) => {
              return (
                <PokeCard
                  key={index}
                  title={pokemon.name}
                  img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
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
