// Global variables

const container = document.getElementById('container');
const createGridBtn = document.getElementById('create-grid-button');
const clearGridBtn = document.getElementById('clear-grid-button');
const blackColorBtn = document.getElementById('black-color-button');
const randomColorBtn = document.getElementById('random-color-button');

let blackColorPicked = false;
let randomColorPicked = true;

let mouseButtonIsDown = 0;

// Core functions

buildGrid = size => {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size; i++) {
    for (let k = 0; k < size; k++) {
      let cell = document.createElement('div');
      container.appendChild(cell).className = 'cell';
      cell.addEventListener('mouseover', () => {
        if (mouseButtonIsDown === 1) {
          if (blackColorPicked === true) {
            cell.style.backgroundColor = 'black';
          } else if (randomColorPicked === true) {
            cell.style.backgroundColor = randomColor();
          }
        }
      });
    }
  }
};

buildNewGrid = () => {
  container.innerHTML = '';
  buildGrid(
    prompt('How many cells would you like? (Higher values may cause lag)', 50)
  );
  blackColorPicked = false;
  randomColorPicked = false;
};

randomColor = () => {
  let R = Math.floor(Math.random() * 255);
  let G = Math.floor(Math.random() * 255);
  let B = Math.floor(Math.random() * 255);
  let randomColor = `rgb(${R}, ${G}, ${B})`;
  return randomColor;
};

// Event handlers

document.onmousedown = () => ++mouseButtonIsDown;
document.onmouseup = () => --mouseButtonIsDown;

blackColorBtn.addEventListener('click', () => {
  blackColorPicked = true;
  randomColorPicked = false;
});

randomColorBtn.addEventListener('click', () => {
  randomColorPicked = true;
  blackColorPicked = false;
});

createGridBtn.addEventListener('click', buildNewGrid);

buildGrid(50);
