import { useState, useEffect } from "react";
import "./App.css";

// Function to generate a random color
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate a set of 6 random colors
const generateColorSet = () => {
  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [showRules, setShowRules] = useState(false);

  // Initialize the game
  useEffect(() => {
    startNewGame();
  }, []);

  // Function to start a new game
  const startNewGame = () => {
    const newColors = generateColorSet();
    const randomColor = newColors[Math.floor(Math.random() * newColors.length)];
    setTargetColor(randomColor);
    setColors(newColors);
    setGameStatus("");
    setScore(0); // Reset score when starting a new game
  };

  // Function to handle color guess
  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("Correct! 🎉");
      // Update high score if the current score is higher
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    } else {
      setGameStatus("Wrong! Try again. ❌");
      setScore(0); // Reset score if the guess is wrong
    }

    // Clear the game status after 2 seconds
    setTimeout(() => {
      setGameStatus("");
    }, 2000);

    // Generate a new set of colors after each guess
    const newColors = generateColorSet();
    const randomColor = newColors[Math.floor(Math.random() * newColors.length)];
    setTargetColor(randomColor);
    setColors(newColors);
  };

  // Function to toggle rules visibility
  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="scores">
          <p data-testid="score">Score: <span>{score}</span></p>
          <p>High Score: <span>{highScore}</span></p>
        </div>
      </div>
      <div className="game-container">
        {/* Rules Icon */}
        <div className="rules-icon" onClick={toggleRules} data-testid="rulesIcon">
          ?
        </div>

        {/* Rules Modal */}
        {showRules && (
          <div className="rules-modal" data-testid="rulesModal">
            <h2>Game Rules</h2>
            <p>
              Guess the color that matches the target color displayed in the box.
              Each correct guess increases your score. If you guess wrong, your
              score resets. Try to beat your high score!
            </p>
            <button onClick={toggleRules}>Close</button>
          </div>
        )}

        {/* Target Color Box */}
        <div
          className="color-box"
          style={{ backgroundColor: targetColor }}
          data-testid="colorBox"
        ></div>

        {/* Game Instructions */}
        <p className="game-instructions" data-testid="gameInstructions">
          Guess the correct color!
        </p>

        {/* Color Options */}
        <div className="color-options">
          {colors.map((color, index) => (
            <button
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              data-testid="colorOption"
            ></button>
          ))}
        </div>

        {/* Game Status */}
        {gameStatus && (
          <p className="game-status" data-testid="gameStatus">
            {gameStatus}
          </p>
        )}

        {/* New Game Button */}
        <button
          className="new-game-button"
          onClick={startNewGame}
          data-testid="newGameButton"
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;