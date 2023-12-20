import React from "react";
import PokemonList from "./components/PokemonList";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <h1>Pokemon App</h1>
      <PokemonList />
    </div>
  );
};

export default App;
