import { useEffect, useState } from "react";

function PokemonCards() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12") 
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
      });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        padding: "20px",
        justifyItems: "center", 
        alignItems: "center", 
      }}
    >
      {pokemons.map((pokemon, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "1.5rem",
            width: "220px",
            height: "320px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
            alt={pokemon.name}
            style={{ width: "140px", height: "140px", marginBottom: "1rem" }}
          />
          <h3 style={{ fontSize: "1.2rem", textTransform: "capitalize", margin: "0" }}>
            {pokemon.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default PokemonCards;

