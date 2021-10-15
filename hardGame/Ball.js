class Ball {
  //consts
  #GAME_CONTAINER_HEIGHT_IN_VH;
  #GAME_CONTAINER_WIDTH_IN_VW;
  #VW_IN_VH = window.innerHeight / window.innerWidth;
  #BALL_VH = 3;
  //Ball
  #ballELEM = document.querySelector(".ball");
  #ballTranslate = [0, 0];
  horizontalBounce = 0;
  #gravitySpeed = 1;
  constructor(GAME_CONTAINER_HEIGHT_IN_VH, GAME_CONTAINER_WIDTH_IN_VW) {
    this.#GAME_CONTAINER_WIDTH_IN_VW = GAME_CONTAINER_WIDTH_IN_VW;
    this.#GAME_CONTAINER_HEIGHT_IN_VH = GAME_CONTAINER_HEIGHT_IN_VH;
  }
  //Ball movement

  bounceBall(bounceSpeed, RENDER_SPEED) {
    this.#gravitySpeed = 0;
    const bounceSpeedPercent = bounceSpeed / 100;
    const bounceInterval = setInterval(() => {
      this.#ballTranslate[1] -= 0.5 * bounceSpeed;
      this.#ballTranslate[0] += this.horizontalBounce * bounceSpeed;
      bounceSpeed -= bounceSpeedPercent;
      if (bounceSpeed <= 0 || this.#ballTranslate[1] < 0) {
        clearInterval(bounceInterval);
        this.#gravitySpeed = 1;
      }
    }, RENDER_SPEED);
  }

  gravity() {
    this.#ballTranslate[0] += this.horizontalBounce * this.#gravitySpeed;
    this.#ballTranslate[1] += 0.3 * this.#gravitySpeed;
    this.#gravitySpeed += 0.0075;
  }

  renderBall() {
    this.#ballELEM.style.transform = `translate(${this.#ballTranslate[0]}vw,${
      this.#ballTranslate[1]
    }vh)`;
    this._checkForBall();
  }
  _checkForBall() {
    if (
      this.#ballTranslate[0] <= -(this.#GAME_CONTAINER_WIDTH_IN_VW / 2) ||
      this.#ballTranslate[0] >=
        this.#GAME_CONTAINER_WIDTH_IN_VW / 2 - this.#BALL_VH * this.#VW_IN_VH
    )
      this.horizontalBounce *= -1;
  }

  wasBallDropped() {
    return this.#ballTranslate[1] > this.#GAME_CONTAINER_HEIGHT_IN_VH;
  }

  getRectangle() {
    return this.#ballELEM.getBoundingClientRect();
  }
  getSize(property) {
    return this.#ballELEM.getBoundingClientRect()[property];
  }

  reset() {
    this.horizontalBounce = this.#ballTranslate[0] = this.#ballTranslate[1] = 0;
    this.#gravitySpeed = 1;
  }
}
