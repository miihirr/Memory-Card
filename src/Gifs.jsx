import { useEffect, useState } from "react";

function PokemonCards() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((res) => res.json())
      .then((data) => {
        const pokemonsWithId = data.results.map((pokemon) => {
          // extract ID from URL
          const urlParts = pokemon.url.split("/");
          const id = urlParts[urlParts.length - 2]; // get second last part
          return { ...pokemon, id };
        });
        setPokemons(shuffleArray(pokemonsWithId));
      });
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = () => {
    setPokemons((prevPokemons) => shuffleArray(prevPokemons));
  };

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
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          onClick={handleCardClick}
          style={{
            cursor: "pointer",
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
            transition: "transform 0.2s ease",
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
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
