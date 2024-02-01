class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    // gameScreen HTML element
    this.gameScreen = gameScreen;

    // Position Values
    this.left = 75;
    this.top = top/2 + 25;

    // Player Dimension Values
    this.width = 150;
    this.height = 50;

    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.directionX = 0;
    this.directionY = 0;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    // Handle the right side of the screen: car stops at the right border
    if(this.left + this.width > this.gameScreen.offsetWidth){
      this.left = this.gameScreen.offsetWidth - this.width;
    }
    // Handle the left side of the screen: car stops at the end border
    else if( this.left <= 0){
      this.left = 0;
    }
    // Handle the bottom of the screen: car stops at the bottom border
    if( this.top + this.height > this.gameScreen.offsetHeight){
      this.top = this.gameScreen.offsetHeight - this.height;
    }
    // Handle the top of the screen: car stops at the top border
   else if(this.top <=0){
    this.top = 0;
   }
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    // If part of my blueCar is inside the redCar, then I have a collision.
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

}
