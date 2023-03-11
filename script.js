'use strict';
//Creating instance for DOM
const newButton = document.querySelector('.btn--new');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

const section1 = document.querySelector(`.player--0`);
const section2 = document.querySelector(`.player--1`);

const currentScore1Box = document.getElementById('current--1');
const currentScore0Box = document.getElementById('current--0');

const score0Box = document.getElementById('score--0');
const score1Box = document.getElementById('score--1');

const diceImg = document.querySelector('.dice'); 

// let currentScore = 0;
// let activePlayer = 0;
// const score = [0, 0];
// let isPlaying = true;

let currentScore, activePlayer;
let score = [0, 0];
let isPlaying = true;

//Players Name Input
const player1Name = prompt("Player 1 name")
const player2Name = prompt("Player 1 name")

document.getElementById('name--0').innerText = player1Name
document.getElementById('name--1').innerText = player2Name


//=================================All Functions===========================
function checkForWinner() {
  if (score[activePlayer] >= 100) {
    const winnerName = (activePlayer == 0) ? player1Name:player2Name
    document.getElementById(`name--${activePlayer}`).innerText = winnerName+" Won 🥳"
    console.log(`${activePlayer} wins`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);

    isPlaying = false;
  }
}

function switchPlayer() {
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}

//TODO: 1. Initial condition of game
function initilaState() {
  score0Box.innerText = 0;
  score1Box.innerText = 0;
  currentScore0Box.innerText = 0;
  currentScore1Box.innerText = 0;
  diceImg.classList.add('hidden');

  section1.classList.remove('player--winner');
  section2.classList.remove('player--winner');

  section1.classList.add('player--active');
  section2.classList.remove('player--active');

  activePlayer = 0;
  isPlaying = true;
  score[0] = 0;
  score[1] = 0;
  currentScore = 0;
}
initilaState();

//=============================Event Listenrs================================
//TODO: 2 Clicking ROLL DICE button
rollButton.addEventListener('click', () => {
  if (!isPlaying) {
    return;
  }

  //Find a randome number
  let dice = Math.trunc(Math.random() * 6) + 1;

  //Display on web page
  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${dice}.png`;

  //Display Current Score and check for 1
  if (dice === 1) {
    document.getElementById(`current--${activePlayer}`).innerText = 0;

    //Switch the Players (by adding or removing the player--active class)
    switchPlayer();
  } else {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).innerText =
      currentScore;
  }
});

// TODO: 3. Clicking HOLD BUTTON
holdButton.addEventListener('click', () => {
  if (!isPlaying) {
    return;
  }

  //Update the Score Box
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).innerText =
    score[activePlayer];

  //Check for win condition
  checkForWinner();

  //Set Current Score to 0
  document.getElementById(`current--${activePlayer}`).innerText = 0;

  //Switch the Player
  switchPlayer();
});

//TODO: 4. Click END GAME
newButton.addEventListener('click', () => {
  initilaState();
});
