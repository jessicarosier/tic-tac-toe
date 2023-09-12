//targets the element where text is displayed
const turnDisplay = $("#turn-display");
//holds html that will be displayed in above element
let whosTurnHtml = "";
//holds player one game board values
let firstPlayer = ["one"];
//holds player two game board values
let secondPlayer = ["two"];
//holds the data-id attribute value of the clicked game square
let valueId = "";
//holds the value of all clicked spaces, if this array length eis equal to the number of game squares, then it's a draw
let tie = [];
//boolean, only false when there is a winner or it's a draw. Prevents game squares from being clickable after the game has ended.
let playing = true;
//holds all possible winning combos
let winningCombos = [
  //horizontal winning combos
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  //vertical winning combos
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  //diagonal winning combos
  ["1", "5", "9"],
  ["3", "5", "7"],
];

function endGame(player) {
  turnDisplay.text(`Player ${player[0]} Won!`);
  turnDisplay.removeClass("default-style");
  turnDisplay.addClass("end-style");
  playing = false;
}

function compareBoard(player) {
  for (let i = 0; i < winningCombos.length; i++) {
    if (
      player.includes(winningCombos[i][0]) &&
      player.includes(winningCombos[i][1]) &&
      player.includes(winningCombos[i][2])
    ) {
      return true;
    }
  }
}

function checkScore() {
  //if all game squares contain a value, then it's a tie
  tie = firstPlayer.concat(secondPlayer).length;

  //checks to see if player one has a winning combo
  if (compareBoard(firstPlayer)) {
    endGame(firstPlayer);
    return;
    //checks to see if player two has a winning combo
  } else if (compareBoard(secondPlayer)) {
    endGame(secondPlayer);
    return;
  } else if (tie === 11) {
    turnDisplay.addClass("end-style");
    turnDisplay.text("It's a draw!");
    playing = false;
    return;
  }
}

//reloads the page
$("#reset-button").on("click", function () {
  location.reload();
});

//updates the text displays indicating player turn
function renderPlayerOneTurn() {
  whosTurnHtml = `Player One's turn`;
  turnDisplay.text(whosTurnHtml);
  checkScore();
}
function renderPlayerTwoTurn() {
  whosTurnHtml = `Player Two's turn`;
  turnDisplay.text(whosTurnHtml);
  checkScore();
}

//TODO: Refactor function below D.R.Y
$(".game-squares").on("click", function () {
  while (playing) {
    if ($(this).text().length >= 1) {
      return;
    } else if (turnDisplay.text() === "Player One Start") {
      $(this).text("X");
      $(this).css("background-color", "#a825ae");
      valueId = this.getAttribute("data-id");
      firstPlayer.push(valueId);
      renderPlayerTwoTurn();
    } else if (turnDisplay.text() === "Player Two's turn") {
      $(this).text("O");
      $(this).css("background-color", "#dcfdf5");
      valueId = this.getAttribute("data-id");
      secondPlayer.push(valueId);
      renderPlayerOneTurn();
    } else if (turnDisplay.text() === "Player One's turn") {
      $(this).text("X");
      $(this).css("background-color", "#a825ae");
      valueId = this.getAttribute("data-id");
      firstPlayer.push(valueId);
      renderPlayerTwoTurn();
    }
  }
});
