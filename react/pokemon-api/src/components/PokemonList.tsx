import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon/";

interface Pokemon {
  name: string;
}

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(url);
        const list = response.data.results.map((pokemon: { name: string }) => ({
          name: pokemon.name,
        }));
        setPokemonList(list);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSort = () => {
    setIsSortedAsc(!isSortedAsc);
  };

  const filteredPokemonList = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (isSortedAsc) return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="main-content">
      <h2 className="text-center mb-4">Pokemon List</h2>
      <div className="input-group flex-nowrap mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokemon"
          aria-label="Search Pokemon"
          aria-describedby="addon-wrapping"
          onChange={handleSearch}
        />
      </div>
      <div className=" mb-3">
        <input
          type="checkbox"
          checked={isSortedAsc}
          onChange={handleSort}
          className="ml-2"
        />
        <label className="sort-text ml-4 mb-0">Sort by Name</label>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="pokemon-list">
          {filteredPokemonList.length === 0 ? (
            <p>No results found.</p>
          ) : (
            filteredPokemonList.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default PokemonList;
