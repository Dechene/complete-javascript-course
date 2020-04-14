/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, gameScoreSet;

gamePlaying = false;
gameScoreSet = false;
init();

// Roll dice click listener
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Gen a random Number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM1 = document.querySelector(".dice1");
    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";

    var diceDOM2 = document.querySelector(".dice2");
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";

    //Check for two 6's at once
    if (dice1 === 6 && dice2 === 6) {
      alert(
        "You rolled double Sixes! No points for you! Rolled: " +
          dice1 +
          " " +
          dice2
      );
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextTurn();
    }

    // 3. Update the roundscore IF rolled number is not a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //add to roundscore
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      alert(
        "You rolled a 1! That's your turn done! Rolled: " + dice1 + " " + dice2
      );
      nextTurn();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to players global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      //We have a winner!
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document.getElementById("inputScore").style.display = "block";

      gamePlaying = 0;
      document.getElementById("inputScore").style.display = "block";
      document.getElementById("winningScore").style.display = "none";
    } else {
      // Change turns
      nextTurn();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  winningScore = document.getElementById("inputScore").value;

  if (winningScore === "0" || winningScore == "") return;

  document.getElementById("inputScore").style.display = "none";
  document.getElementById("winningScore").textContent = winningScore;
  document.getElementById("winningScore").style.display = "block";

  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = 1;

  gameScoreSet = true;

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

function nextTurn() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}
