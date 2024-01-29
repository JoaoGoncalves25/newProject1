class Game {
  constructor() {
    // Get all Game Screens.
    // gameScreen and gameEndScreen are initially not displayed.
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    // I am going to create a player in the future. For this moment of the code-along, I'll leave it to null.
    this.player = new Player(
      this.gameScreen,200,500,100,150,"./images/pidgeon.png");


    // Style for the Game Board
    this.height = 563;
    this.width = 822;

    // Obstacles
    this.obstacles = [];

    this.clouds = [];

    // Score
    this.score = 0;

    // Lives
    this.lives = 1;

    // Variable to Check If I'm in the Process of Creating an Obstacle
    this.isPushingObstacle = false;
    this.isPushingCloud = false;

    // Variable to Check if the Game is Over
    this.gameIsOver = false;
  }

  start() {
    //Sets the height and width of the game screen.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    //Hides the start screen.
    this.startScreen.style.display = "none";

    //Shows the game screen.
    this.gameScreen.style.display = "block";

    //Starts the game loop
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    /* Score, Lives ScoreBoard */
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    /* Every Frame of the Game, I want to check if the car is moving */
    this.player.move();

    // Iterate over the obstacles array and make them move
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();

        this.obstacles.splice(i, 1);

        this.lives--;

      } else if (obstacle.left === - 300) {
        this.score++;

        // Remove the Obstacle HTML Element from the HTML.
        obstacle.element.remove();

        // Remove the Obstacle from the Game Class'obstacles array.
        this.obstacles.splice(i, 1);
      }
    }

/*     for (let i = 0; i < this.clouds.length; i++) {
      const cloud = this.clouds[i];
      cloud.move();

      if (this.player.didCollide(cloud)) {
        cloud.element.removecloud
        this.clouds.splice(i, 1);

        this.lives--;

      } else if (cloud.left === - 500) {
        this.score++;

        // Remove the Obstacle HTML Element from the HTML.
        cloud.element.remove();

        // Remove the Obstacle from the Game Class'obstacles array.
        this.clouds.splice(i, 1);
      }

      if(this.lives === 0){
        this.endGame();
      }

    // If there are no obstacles, push a new one after 1second and half.
    else if (!this.obstacles.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.isPushingObstacle = false;
      }, 10);

    }

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  } */
}

  endGame(){
    //Change the gameIsOver status, if it's true, remmeber that this is going to break the animation loop
    this.gameIsOver = true;
    // Remove Player
    this.player.element.remove();
    // Remove all obstacles
    this.obstacles.forEach((obstacle)=>{
    // Remove the Obstacle from JS
    
    // Remove the obstacle from HTML
    obstacle.element.remove()
    });

/*     this.clouds.forEach((cloud)=>{
      // Remove the Obstacle from JS
      
      // Remove the obstacle from HTML
      cloud.element.remove()
      }); */

    // Hide the current game screen
    this.gameScreen.style.display = "none";
    // In order, to display the game end screen
    this.gameEndScreen.style.display = "block";
  }
  }