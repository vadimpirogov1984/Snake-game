let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

// Создаем фоновое изображение
const ground = new Image();
ground.src = "img/bg.png";

// Создаем изображение элемента ягоды
const foodImg = new Image();
foodImg.src = "img/berr.png";

// Задаем размер ячейки поля
let box = 25;
let score = 0;
let game = setInterval(drawGame, 150);

// Задаем случайное местоположение для ягоды
let food = {
  x: Math.floor(Math.random() * 16 + 1) * box,
  y: Math.floor(Math.random() * 14 + 3) * box
};
// Распологаем змею по середине поля
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// Настройка управления змейкой
let dir = undefined;
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
}
// Окончание игры в случае если змея поймала себя
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      alert("GAME OVER");
      location.reload();
    }
  }
}
// Отрисовка игры
function drawGame() {
  // Фон
  ctx.drawImage(ground, 0, 0);
  // Ягода
  ctx.drawImage(foodImg, food.x, food.y);
  // Змея
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "yellow";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  // Поле счета
  ctx.fillStyle = "white";
  ctx.font = "45px Arial";
  ctx.fillText(score, box * 2.9, box * 1.5);

  // Съесть элемент
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 16 + 1) * box,
      y: Math.floor(Math.random() * 14 + 3) * box
    };
  } else {
    snake.pop();
  }
  // Завершение игры
  if (
    snakeX < box ||
    snakeX > box * 16 ||
    snakeY < box * 3 ||
    snakeY > box * 16
  ) {
    clearInterval(game);
    alert("GAME OVER");
    location.reload();
  }
  // Действия при нажатии кнопок
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}
