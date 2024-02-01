class Game {
  constructor() {
    // Get all Game Screens.
    // gameScreen and gameEndScreen are initially not displayed.
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    // I am going to create a player in the future. For this moment of the code-along, I'll leave it to null.
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./docs/images/sub.png"
    );

    // Style for the Game Board
    this.height = 563;
    this.width = 822;

    // Obstacles
    this.trams = [];
    this.clouds = [];
    this.bonuses = [];

    // Score
    this.score = 0;

    // Time
    this.time = 0;

    // Lives
    this.lives = 3;

    // Variable to Check If I'm in the Process of Creating an Obstacle
    this.isPushingTram = false;
    this.isPushingCloud = false;
    this.isPushingBonus = false;

    // Variable to Check if the Game is Over
    this.gameIsOver = false;

    // Sound
    this.backgroundMusic = document.querySelector("#background-music");
    this.tramSound = document.querySelector("#hit-sfx");
    this.hawkSound = document.querySelector("#hawk");
    this.bonusSound = document.querySelector("#bonus");
  }

  createTram() {
    this.trams.push(new Tram(this.gameScreen));
  }

  createCloud() {
    this.clouds.push(new Cloud(this.gameScreen));
  }

  createBonus() {
    this.bonuses.push(new Bonus(this.gameScreen));
  }

  start() {

    //Sets the height and width of the game screen.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startTimer();

    //Hides the start screen.
    this.startScreen.style.display = "none";
    this.gameEndScreen.style.display = "none";

    //Shows the game screen.
    this.gameScreen.style.display = "block";

    //Background music
   this.backgroundMusic.play();

    //Starts the game loop
    this.gameLoop();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency)

// Bonus
    setInterval(() => {
      this.bonuses.push(new Bonus(this.gameScreen));
      this.isPushingBonus = false;
    }, 1250);
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
 
    this.getMinutes();
    this.getSeconds();
    this.update();
    this.updateStats();

    if(this.lives===-1){
      this.endGame();
    }

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId)
    }
  }

  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;

    if (this.lives === 0) {
      this.endGame();
    }
    
    this.player.move();

   // Iterate over the obstacles array and make them move
   for (let i = 0; i < this.trams.length; i++) {
    const tram = this.trams[i];
    tram.move();

    // Tram touch
    if (this.player.didCollide(tram)) {
      this.tramSound.play();
      tram.element.remove();
      this.trams.splice(i, 1);
      this.lives--;
    } else if (tram.left === -300) {

    // Remove the Obstacle HTML Element from the HTML.
      tram.element.remove();

     // Remove the Obstacle from the Game Class'obstacles array.
      this.trams.splice(i, 1);
    }
  }

    // Generate new obstacle periodically
     if (!this.isPushingTram) {
      this.isPushingTram = true;
       setTimeout(() => {
       this.createTram();
        this.isPushingTram = false;
      }, 1200);
  }

    // Cloud touch
    for (let i = 0; i < this.clouds.length; i++) {
      const singleCloud = this.clouds[i];
      singleCloud.move();
          
      if (this.player.didCollide(singleCloud)) {
            
       // music for the cloud
        this.hawkSound.loop= false;
        this.hawkSound.play();
            
       // remove the obstacle from the DOM
         singleCloud.element.remove();
    
      // remove the obstacle from the array
        this.clouds.splice(i, 1);
    
      // reduce lives by one
        this.lives--;
    
      // check if the obstacle id off the screen at the bottom
         } else if (singleCloud.left === -300) {

      // remove the obstacle from the HTML
            singleCloud.element.remove();
            
      // remove the obstales from the array of obstacles
        this.clouds.splice(i, 1);
        }
      }
    
      //The function below checks if there is no obstacle being pushed (false) and that no obstacles are currently on the screen (this.obstacles = 0) If these are true, then the following happens (the flag to true, a new Object class of obstacle is created and added to the this.obstacles array, and the flag is turned back to false)
       if (!this.isPushingCloud) {
        this.isPushingCloud = true;
        setTimeout(() => {
        this.createCloud();
        this.isPushingCloud = false;
      }, 1500);
    }
        
    // Bonus touch

    for (let i = 0; i < this.bonuses.length; i++) {
      const singleBonus = this.bonuses[i];
      singleBonus.move();

      if (this.player.didCollide(singleBonus)) {
        if (this.bonuses) {

      // music for the bonus
        this.bonusSound.play();

      //remove obstacle from DOM
        singleBonus.element.remove();

      // remove obstacle from array
        this.bonuses.splice(i, 1);

        this.score++;
      }else if (singleBonus.left === -50) {

      // remove the obstacle from the HTML
        singleBonus.element.remove();
            
      // remove the obstales from the array of obstacles
        this.bonuses.splice(i, 1);
        }
      }
    }
  }
    
  endGame() {
    //Change the gameIsOver status, if it's true, remember that this is going to break the animation loop
    this.gameIsOver = true;

    // Remove Player
    this.player.element.remove();

    // Remove the tram from JS
    this.trams.forEach((tram) => {
  
    // Remove the tram from HTML
      tram.element.remove();
    });

    // Remove the cloud from JS
    this.clouds.forEach((cloud) => {

    // Remove the cloud from HTML
        cloud.element.remove();
      });

    // Remove the bonus from JS
    this.bonuses.forEach((bonus) => {
  
    // Remove the bonus from HTML
        bonus.element.remove();
      });

    // Stop background music  
    this.backgroundMusic.pause();

    // Stop timer
    this.stopTimer();
  
    // Hide the current game screen
    this.gameScreen.style.display = "none";

    // In order, to display the game end screen
    this.gameEndScreen.style.display = "block";

    // Display High Score
    let highScore = localStorage.getItem("highScore");
    let highScoreElement = document.getElementById("high-score");
    
    if (!highScore || highScore && this.score > highScore) {
      localStorage.setItem("highScore", this.score);
      highScoreElement.innerHTML = this.score; 
    
    }
  }

    // update inner texts of Stats: time & score
    updateStats() {
      const time = document.getElementById('time');
      const score = document.getElementById('score');
      time.innerText = `${this.timeInMinutes}:${this.timeInSeconds}`;
     score.innerText = this.score;
    }

  // function to count time
    startTimer() {
      this.intervalId = setInterval(() => {
  // increment the time by 1 second
      this.time += 1;
    }, 1000);

    return this.time;
  }

  getMinutes() {
    this.minutes = Math.floor(this.time / 60);
    return (this.timeInMinutes = this.computeTwoDigitNumber(this.minutes));
  }

  getSeconds() {
    this.remainingSeconds = Math.floor(this.time % 60);
    return (this.timeInSeconds = this.computeTwoDigitNumber(
      this.remainingSeconds
    ));
  }

  // convert any number into a two-digits string representation
    computeTwoDigitNumber(value) {
      if (value < 10) {
      return '0' + value.toString();
      } else {
      return value.toString();
      }
    }

  // clear the existing interval timer
    stopTimer() {
    clearInterval(this.intervalId);
    }
  }

