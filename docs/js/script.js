window.onload = function () {
  let highScore = localStorage.getItem("highScore");
  let highScoreElement = document.getElementById("high-score");
  highScoreElement.innerHTML = highScore
  
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

///// Restart game using the Spacebar///////////////////////////////////////////////////
    restartButton.addEventListener("click", function(){
      game = new Game();
      game.start();
    });

    document.addEventListener("keydown", function(event) {
      if (event.code === "Space" && game.gameIsOver) {
        // JS, in the current tab is going to refresh (reload) the page
        game = new Game();
        game.start();
      }
    });
//////////////////////////////////////////////////////////////////////////////////////////

  function startGame() {
    // console.log("start game");
    game = new Game();
    game.start();
  }

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = [" "];

    if (possibleKeys.includes(key)) {
      event.preventDefault();
      if (game) {
        switch (key) {
          case " ":
            game.player.directionY = -1;
            const wingsSound = document.querySelector("#wings-sfx");
            wingsSound.play()
            break;
        }
      }
    }
  }

  function handleKeyup(event) {
    const key = event.key;
    const possibleKeys = [" "];

    if (possibleKeys.includes(key)) {
      event.preventDefault();
      if (game) {
        switch (key) {
          case " ":
            game.player.directionY = 1;
            break;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
