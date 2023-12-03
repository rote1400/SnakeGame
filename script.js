console.log("Snake game starting");

// Define HTML elements
const board = document.getElementById('game-dashboard');
console.log(board);

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }]
let food = generateFood();
let direction = 'right';

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
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div',
        'snake');

        setPosition(snakeElement, segment);
        board.appendChild(snakeElement)
    });
}

// Draw food
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Testing draw function
draw();

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

    snake.pop();
}

// Test moving
setInterval(() => {
    move(); // Move first
    draw(); // Then draw again new position
}, 200);