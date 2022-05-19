
const playArea = document.querySelector("#container");
const allSquares = playArea.childNodes;

//function to highlight squares when mouse over
function highlightSquares(e) {
  e.srcElement.style.backgroundColor = "rgb(0,0,0)";
}


//function to highlight squares with rgb value to eventually go black

function rainbowSquares(e){
  const rgb = e.srcElement.style.backgroundColor;

  //this function will convert "rgb(255, 255, 255)" string into an array of 3 numbers
  const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);
  let rgbArr = toRGBArray(rgb);

  e.srcElement.style.backgroundColor = `rgb(${rgbArr[0] - Math.floor(Math.random()*50)},
                                            ${rgbArr[1] - Math.floor(Math.random()*50)},
                                            ${rgbArr[2] - Math.floor(Math.random()*50)})`;
}


//funtion that will remove all "highlight" class from highlight squares
function resetGrid() {
  allSquares.forEach(square => square.style.backgroundColor = "rgb(255,255,255)");
}

//function taht will take 2 arguments height and width to create the grid and add hover event listeners to each square created
function createGrid(height, width) {

//wipe previous grid off the page
  while (playArea.firstChild) {
  playArea.removeChild(playArea.firstChild);
}

  const numOfSquares = height * width;
  for(let i = 0; i < numOfSquares; i++) {

    let squares = document.createElement("div");
    squares.classList.add("squares");
    playArea.style.gridTemplateRows = `repeat(${height}, 25px)`;
    playArea.style.gridTemplateColumns = `repeat(${width}, 25px)`;
    playArea.appendChild(squares);
  }

  allSquares.forEach(square => square.style.backgroundColor = "rgb(255,255,255)");
  allSquares.forEach(square => square.addEventListener("mouseover", highlightSquares));
}

//this prompts user for 2 numbers height/width to call createGrid funtion
function setGrid() {
const gridHeight = window.prompt("enter height of grid(recommended 30 to start with!):");
const gridWidth = window.prompt("enter width of grid(recommended 30 to start with!):");

if(gridHeight > 99 | gridWidth > 99){
  window.alert("Woops! Height or Width is too big! please re-enter value below 99");
  setGrid();
}else{
  createGrid(gridHeight, gridWidth);
}
}

//replace black pen with rainbow pen
function rainbowPen() {
  allSquares.forEach(square => square.removeEventListener("mouseover", highlightSquares));
  allSquares.forEach(square => square.addEventListener("mouseover", rainbowSquares));
}

function normalPen() {
  allSquares.forEach(square => square.removeEventListener("mouseover", rainbowSquares));
  allSquares.forEach(square => square.addEventListener("mouseover", highlightSquares));
}

//set grid button and its event listener
const setGridBtn = document.querySelector("#gridBtn");
setGridBtn.addEventListener("click", setGrid);

//wipe button to wipe the grid
const resetGridBtn = document.querySelector("#resetBtn");
resetGridBtn.addEventListener("click", resetGrid);

//rainbow button, makes pen rainbow
const rainbowBtn = document.querySelector("#rainbowBtn");
rainbowBtn.addEventListener("click", rainbowPen);

//normal black pen button
const normalBtn = document.querySelector("#normalBtn");
normalBtn.addEventListener("click", normalPen);
