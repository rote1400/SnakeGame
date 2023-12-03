console.log("Snake game starting");

// Define HTML elements
const dashboard = document.getElementById('game-dashboard');
const instructionText = document.getElementById('instruction-text')
const logo = document.getElementById('logo');
const scoreText = document.getElementById('score');
const highScoreText = document.getElementById('highScore')
console.log(dashboard);

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }]
let food = generateFood();
let direction = 'down';
let highScore = 0;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Create a snake for food div
function createGameElement(tag, classNameForDiv) {
    const element = document.createElement(tag);
    element.className = classNameForDiv;

    return element;
}

// Set position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Draw game map, snake, food
function draw() {
    dashboard.innerHTML = '';
    drawSnake();
    drawFood();
    updateCurrentScore();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div',
        'snake');

        setPosition(snakeElement, segment);
        dashboard.appendChild(snakeElement)
    });
}

// Draw food
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        dashboard.appendChild(foodElement);
    }
}

// Testing draw function
// draw();

// Generate food
function generateFood() {
    const x = Math.floor(1 + (Math.random() * gridSize));
    const y = Math.floor(1 + (Math.random() * gridSize));

    return {x, y};
}

// Moving the snake
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);

    // snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); // Clear past interval
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// Test moving
// setInterval(() => {
//     move(); // Move first
//     draw(); // Then draw again new position
// }, 200);

// Start game
function startSnakeGame() {
    gameStarted = true; // Check if game is running
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

// Space-Keypress event listener
function handleKeyPress(event) {
    if ( (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === '') ) {
        startSnakeGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
            resetSnakeGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x &&
            head.y === snake[i].y) {
                resetSnakeGame();
        }
    }
}

function resetSnakeGame() {
    updateHighScore();
    stopSnakeGame();
    snake = [{ x: 10, y: 10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateCurrentScore();
}

function updateCurrentScore() {
    const currentScore = snake.length - 1;
    scoreText.textContent = currentScore.toString()
        .padStart(3, '0');
}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString()
            .padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}

function stopSnakeGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}