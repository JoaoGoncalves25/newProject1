window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function(){
    // JS, in the current tab is ggoing to refresh (reload) the page
    location.reload();
  });

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
          //case "ArrowLeft":
           //game.player.directionX = 0;
           // break;
          case " ":
            game.player.directionY = -2;
            break;
          //case "ArrowRight":
           // game.player.directionX = 0;
           // break;
         // case "ArrowDown":
           // game.player.directionY = -1;
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
          //case "ArrowLeft":
           // game.player.directionX = 0;
           // break;
          case " ":
            game.player.directionY = 1;
            break;
          //case "ArrowRight":
           // game.player.directionX = 0;
            //break;
          //case "ArrowDown":
           // game.player.directionY = 1;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
