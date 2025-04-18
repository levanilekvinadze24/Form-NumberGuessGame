let secretNumber;
let score;
let guessCount;
let gameOver;
const maxAttempts = 10;

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  score = 10;
  guessCount = 0;
  gameOver = false;

  document.getElementById("score").textContent = score;
  document.getElementById("attempts").textContent = `${guessCount}/${maxAttempts}`;
  document.getElementById("feedback").textContent = '';
  document.getElementById("guess-input").value = '';
  document.getElementById("guess-input").disabled = false;
  document.getElementById("history-list").innerHTML = '';
  document.getElementById("input-error").textContent = '';
}

function checkGuess() {
  if (gameOver) return;

  const guessInput = document.getElementById("guess-input");
  const feedback = document.getElementById("feedback");
  const history = document.getElementById("history-list");
  const inputError = document.getElementById("input-error");
  const guess = Number(guessInput.value);

  if (guess < 1 || guess > 100 || isNaN(guess)) {
    inputError.textContent = "❗ Please enter a number between 1 and 100!";
    return;
  } else {
    inputError.textContent = '';
  }

  guessCount++;
  document.getElementById("attempts").textContent = `${guessCount}/${maxAttempts}`;

  const guessItem = document.createElement("li");
  guessItem.textContent = `Guess ${guessCount}: ${guess}`;
  history.appendChild(guessItem);

  if (guess === secretNumber) {
    feedback.textContent = "🎉 Correct!";
    guessInput.disabled = true;
    gameOver = true;
  } else {
    score--;
    document.getElementById("score").textContent = score;
    feedback.textContent = guess < secretNumber ? "📈 Too low!" : "📉 Too high!";
    
    if (guessCount >= maxAttempts) {
      feedback.textContent = `💥 Game Over! The number was ${secretNumber}`;
      guessInput.disabled = true;
      gameOver = true;
    }
  }
}

// Event listeners
document.getElementById("guess-btn").addEventListener("click", checkGuess);
document.getElementById("restart-btn").addEventListener("click", startGame);

// Start the game when page loads
startGame();