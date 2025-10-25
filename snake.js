const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 20;
canvas.width = canvasSize * box;
canvas.height = canvasSize * box;

let snake;
let direction;
let food;
let score;
let game; // interval ID

function randomPosition() {
  return {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
  };
}

function startGame() {
  snake = [{ x: 10 * box, y: 10 * box }];
  direction = "RIGHT";
  food = randomPosition();
  score = 0;

  document.addEventListener("keydown", changeDirection);

  if (game) clearInterval(game);
  game = setInterval(draw, 150);
}

function changeDirection(event) {
  const key = event.key.toLowerCase();

  if ((key === "arrowleft" || key === "a") && direction !== "RIGHT") direction = "LEFT";
  else if ((key === "arrowup" || key === "w") && direction !== "DOWN") direction = "UP";
  else if ((key === "arrowright" || key === "d") && direction !== "LEFT") direction = "RIGHT";
  else if ((key === "arrowdown" || key === "s") && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar serpiente
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#00ff00"; // verde intenso
    ctx.beginPath();
    ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Dibujar comida
  ctx.fillStyle = "#a8ff60"; // verde manzana claro
  ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
  ctx.fill();

  // Movimiento
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Colisión
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width || headY >= canvas.height ||
    collision(headX, headY, snake)
  ) {
    clearInterval(game);
    alert("Juego terminado. Puntuación: " + score);
    return;
  }

  let newHead = { x: headX, y: headY };

  // Comer
  if (headX === food.x && headY === food.y) {
    score++;
    food = randomPosition();
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  document.getElementById("score").innerText = score;
}

function collision(x, y, array) {
  return array.some(segment => segment.x === x && segment.y === y);
}
let isPaused = false;

function togglePause() {
  if (isPaused) {
    game = setInterval(draw, 150);
    document.getElementById("pauseBtn").innerText = "Pausar";
  } else {
    clearInterval(game);
    document.getElementById("pauseBtn").innerText = "Reanudar";
  }
  isPaused = !isPaused;
}

function simulateKey(key) {
  const event = new KeyboardEvent('keydown', { key });
  document.dispatchEvent(event);
}
// Mostrar el modal al cargar la página
window.onload = function () {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
};

// Nueva función para cerrar el modal y comenzar el juego
function initGame() {
  closeModal();
  startGame(); // Tu función original
}

// Dejar tu función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
