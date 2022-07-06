import './App.css';
import PokeCard from './components/pokeCard';
import axios from "axios";
import React from "react";

function App() {
  const [pokemons, setPokemon] = React.useState([]);
  React.useEffect(() => {
    getAbilities();
  }, []);

  const getAbilities = () => {
    const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";
    axios(ENDPOINT)
      .then((response: any) => {
        //set state to false so it stops when u load it in
        setPokemon(response.data.results);
        console.log("Pokemon", response.data.results);
      })
      .catch((error) => {
        <button>SOMETHING WENT WRONG</button>;
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div className='wrapper'>
      <PokeCard img='' title=''/>
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
                  index + 1
                }.png`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
