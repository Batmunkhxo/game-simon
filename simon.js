// ****************** togloomiin css n enees ehlene **************
// Тоглоомын үндсэн container
const gameContainer = document.getElementById("gameContainer");
// Дүрснүүдийн мэдээлэл
const animals = [
  {
    id: "dove",
    image: "dove.png",
    x: 42,
    y: 25,
  },
  {
    id: "rabbit",
    image: "rabbit1.gif",
    x: 42,
    y: 40,
  },
  {
    id: "monkey",
    image: "monkey.gif",
    x: 42,
    y: 55,
  },
  {
    id: "elephant",
    image: "elephant.png",
    x: 42,
    y: 70,
  },
];
// Дүрснүүдийг үүсгэж, байрлуулах функц
animals.forEach((animal) => {
  // Animal wrapper
  const animalDiv = document.createElement("button");
  animalDiv.classList.add("animal");
  animalDiv.style.left = `${animal.x}%`;
  animalDiv.style.top = `${animal.y}%`;
  // Зураг нэмэх
  const img = document.createElement("img");
  img.src = animal.image;
  img.alt = animal.name;
  animalDiv.id = animal.id;
  animalDiv.appendChild(img);
  gameContainer.appendChild(animalDiv);
});
// start button iin id bolon neej ogow
const startButton = document.createElement("button");
startButton.className = "startButton";
startButton.textContent = "START";
gameContainer.appendChild(startButton);
const numberSpan = document.createElement("span");
numberSpan.className = "number";
numberSpan.textContent = "0";
const topControls = document.createElement("div");
topControls.className = "top-controls";

const scoreDiv = document.createElement("div");
scoreDiv.className = "score";

const soundButton = document.createElement("div");
soundButton.className = "circle-button sound-button";

const soundIcon = document.createElement("img");
soundIcon.src = "soundicon.png";
soundIcon.alt = "sound"; //sound hiih ystoi

soundButton.appendChild(soundIcon);

const closeButton = document.createElement("div");
closeButton.className = "circle-button close-button";

const closeIcon = document.createElement("img");
closeIcon.src = "closeicon.png";
closeIcon.alt = "Close";

closeButton.appendChild(closeIcon);

const soundClose = document.createElement("div");
soundClose.className = "soundClose";
soundClose.appendChild(soundButton);
soundClose.appendChild(closeButton);

const noteSpan = document.createElement("span");
noteSpan.className = "note";
noteSpan.innerHTML = "&#9835;"; // Нот дүрс

//game over

const gameOver = document.createElement("div");
gameOver.className = "gameOver";
gameOver.textContent = "Game Over!";
gameContainer.appendChild(gameOver);

const gameOverCancel = document.createElement("img");
gameOverCancel.src = "closeicon.png";
gameOverCancel.className = "close";

gameContainer.appendChild(gameOverCancel);
scoreDiv.appendChild(noteSpan);
scoreDiv.appendChild(numberSpan);
topControls.appendChild(soundClose);
topControls.appendChild(scoreDiv);
gameContainer.appendChild(topControls);

//*****************togloomiin css n duussan  */

// togloomiin ajillah functionii bichiglel uunees ehelsen

// Initialize variables
let sequence = [];
let playerSequence = [];
let level = 0;
playSoundArray=[];

const zoo = ["dove", "rabbit", "monkey", "elephant"];

// Start the game
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextLevel();
  playSoundArray=[];
}

// Generate the next sequence
function nextLevel() {
  level++;
  numberSpan.innerHTML = level;
  playerSequence = [];
  const nextAnimal = zoo[Math.floor(Math.random() * zoo.length)];
  sequence.push(nextAnimal);
  playSequence();
  playSound(nextAnimal)
}
function playSound(animal){
  const monkeyAud= document.createElement("audio");
  monkeyAud.src="monkeyAud.wav";
  monkeyAud.id="monkey"
  
  if(animal== monkeyAud.id){
    monkeyAud.play()
  }
  const rabbitAud= document.createElement("audio");
  rabbitAud.src="rabbitAud.wav";
  rabbitAud.id="rabbit"

  if(animal== rabbitAud.id){
    rabbitAud.play()
  }
  const elephantAud= document.createElement("audio");
  elephantAud.src="elephantAud.wav";
  elephantAud.id="elephant"

  if(animal== elephantAud.id){
    elephantAud.play()
  }
  const birdAud= document.createElement("audio");
  birdAud.src="birdAud.wav";
  birdAud.id="dove"

  if(animal== birdAud.id){
    birdAud.play()
  }
playSoundArray.push(animal);
console.log(playSoundArray);
}
// Play the current sequence
function playSequence() {
  sequence.forEach((animal, index) => {
    playSound();
    setTimeout(() => {
      flashAnimal(animal);
    }, (index + 1) * 1000);
  });
}

// Flash the animal on the screen
function flashAnimal(animal) {
  const button = document.getElementById(animal);
  button.style.animation = "ajillah 1s linear";
  playSound();
  setTimeout(() => {
    button.style.animation = "none";
  }, 1000);
}

// Handle player input
function handlePlayerInput(animal) {
  playerSequence.push(animal);
  flashAnimal(animal);
  playSound();
  checkPlayerInput();
}

// Check if the player's input is correct
function checkPlayerInput() {
  const currentIndex = playerSequence.length - 1;

  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    gameOver.style.display = "block";
    gameOverCancel.style.display = "block";
    startGame();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextLevel, 1000);
  }
}

gameOverCancel.addEventListener("click", () => {
  gameOver.style.display = "none";
  gameOverCancel.style.display = "none";
});

startButton.addEventListener("click", startGame);
document.querySelectorAll(".animal").forEach((button) => {
  button.addEventListener("click", () => {
    handlePlayerInput(button.id);
  });
});