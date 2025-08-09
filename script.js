"use strict";

let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Oyuna Dön !";
});

window.addEventListener("focus", () => {
  document.title = docTitle;
});

const player0 = document.querySelector(".player__0");
const player1 = document.querySelector(".player__1");
const score0 = document.querySelector("#score__0");
const score1 = document.querySelector("#score__1");
const current0 = document.querySelector("#current__0");
const current1 = document.querySelector("#current__1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn__new");
const btnRoll = document.querySelector(".btn__roll");
const btnHold = document.querySelector(".btn__hold");

let scores, currentScore, activePlayer, playing, diceRolled;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceRolled = false;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.src = "dice.png";
  player0.classList.add("player__active");
  player1.classList.remove("player__active");

  const name0 = document.querySelector("#name__0");
  const name1 = document.querySelector("#name__1");

  name0.classList.remove("animate__animated", "animate__tada");
  name1.classList.remove("animate__animated", "animate__tada");

  document.querySelector(".label-0").innerText = "Gelen Zar";
  document.querySelector(".label-1").innerText = "Gelen Zar";
};

init();

const switchPlayer = function () {
  document.getElementById(`current__${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  diceRolled = false;
  player0.classList.toggle("player__active");
  player1.classList.toggle("player__active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceRolled = true;

    document.querySelector(".dice").src = `dices/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current__${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing && diceRolled) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score__${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      dice.src = "cong.png";
      playing = false;

      const winner = document.querySelector(`#name__${activePlayer}`);
      const loser = document.querySelector(`#name__${activePlayer}`);

      winner.classList.add("animate__animated", "animate__tada");

      document.querySelector(`.label-${activePlayer}`).innerText =
        "Tebrikler !!";
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
