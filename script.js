'use strict';
//selecting elements
const diceImage = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0E1 = document.querySelector('.palyer--0');
const playerE1 = document.querySelector('.palyer--1');
//hiding these elements

//game states are1 saved here
let isplaying = true;
let currentScore = 0;
let activeplayer = 0;
let score = [0, 0];
diceImage.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

//function to switch player
const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

//event handler to roll the dice when clicked
const rollDice = function () {
  if (isplaying) {
    //generatign a random number betweeen 1 and 6
    const dice = Math.trunc(Math.random() * 6 + 1);

    //displaying the dice
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //adding the dice roll to the currentscore and displaying on the screen
      currentScore = currentScore + dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      switchplayer();
    }
  }
};

//event handler to add currentscore to total score
const holdScore = () => {
  if (isplaying) {
    //adding the current score to the activeplayer index index of the array
    score[activeplayer] = score[activeplayer] + currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];
    if (score[activeplayer] >= 10) {
      //finish game
      isplaying = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document.getElementById(`name--${activeplayer}`).textContent = 'WINNER';
    } else {
      switchplayer();
    }
  }
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
