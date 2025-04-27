import { useEffect, useState } from "react";

function PokemonCards() {
  let [pokemons, setPokemons] = useState([]);
  let [score, setScore] = useState(0);
  let [bestScore, setBestScore] = useState(0);
  let [arr, setArr] = useState([]);
  let [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((res) => res.json())
      .then((data) => {
        const pokemonsWithId = data.results.map((pokemon) => {
          const urlParts = pokemon.url.split("/");
          const id = urlParts[urlParts.length - 2];
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

  const handleCardClick = (pokemonName) => {
    if (arr.length === 12) {
      setGameWon(true); // Set the game to won
      alert("You won!");
      return; // Prevent further clicks
    }

    // Handle score and arr separately to prevent the score from increasing by 2
    if (!arr.includes(pokemonName)) {
      setArr((prevSelected) => [...prevSelected, pokemonName]);
      setScore((prev) => prev + 1); // Increment the score correctly
    } else {
      if (bestScore < score) {
        setBestScore(score);
      }
      setScore(0); // Reset the score after a duplicate click
      setArr([]); // Reset the selected Pokémon array
    }

    setPokemons((prevPokemons) => shuffleArray(prevPokemons)); // Shuffle Pokémon after each click
  };

  const handleRestartGame = () => {
    setScore(0);
    setArr([]);
    setGameWon(false);
    setPokemons(shuffleArray(pokemons)); // Shuffle Pokémon again if restarted
  };

  return (
    <div className="pokemon-game-container">
      <div className="game-header">
        <h1>Pokemon Memory Game</h1>
        <p>Get points by clicking on an image but don't click on any more than once!</p>
      </div>
      <div className="score-board">
        <p>Score: {score}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      {gameWon && (
        <div className="game-won-message">
          <h2>Congratulations! You won!</h2>
          <button onClick={handleRestartGame}>Restart Game</button>
        </div>
      )}
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick={() => !gameWon && handleCardClick(pokemon.name)} // Prevent clicking if game is won
            className="pokemon-card"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              className="pokemon-img"
            />
            <h3 className="pokemon-name">{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCards;


