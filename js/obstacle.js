class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    // Random Position
    this.top = 425;

    this.left = 822;
    this.width = 400;
    this.height = 175;

    // create the HTML element and create default styling
    this.element = document.createElement("img");
    this.element.src = "./images/tramCropped.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Move obstacle down
    this.left -= 3;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
