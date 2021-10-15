class Catcher {
  #GAME_CONTAINER_HEIGHT_IN_VH;
  #GAME_CONTAINER_WIDTH_IN_VW;
  #VW_IN_VH = window.innerHeight / window.innerWidth;

  #catcherELEM = document.querySelector(".catcher");
  #catcherTranslateX = 0;
  #lastMouseXcoord;
  #catcherWidthInPercentages = 20;
  #landspace = window.innerWidth > window.innerHeight;
  #containerELEM;

  #gameIsOn = true;

  constructor(
    GAME_CONTAINER_HEIGHT_IN_VH,
    GAME_CONTAINER_WIDTH_IN_VW,
    containerELEM
  ) {
    this.#GAME_CONTAINER_WIDTH_IN_VW = GAME_CONTAINER_WIDTH_IN_VW;
    this.#GAME_CONTAINER_HEIGHT_IN_VH = GAME_CONTAINER_HEIGHT_IN_VH;
    this.#containerELEM = containerELEM;
  }
  _updateCatcherWidth() {
    this.#catcherELEM.style.width = landspace ? "20%" : "30%";
    this.#catcherWidthInPercentages = landspace ? 20 : 30;
  }
  getRectangle() {
    return this.#catcherELEM.getBoundingClientRect();
  }
  getSize(property) {
    return this.#catcherELEM.getBoundingClientRect()[property];
  }
  initiliazeCatcher() {
    this.#gameIsOn = true;
    this.#catcherTranslateX = 0;
    this.#catcherELEM.style.transform = `translateX(${
      this.#catcherTranslateX
    }%)`;
    this._addingEvents();
  }
  _addingEvents() {
    //Updating

    window.addEventListener(
      "keydown",
      (e) => this.#gameIsOn && this._moveCatcherUsingKeyboard.call(this, e)
    );

    //on mouse drag
    this.#catcherELEM.addEventListener(
      "dragstart",
      (e) => this.#gameIsOn && this._startDragWithMouse.call(this, e)
    );

    this.#catcherELEM.addEventListener(
      "dragend",
      (e) => this.#gameIsOn && this._moveCatcherWithMouse.call(this, e)
    );

    //ontouch drag
    this.#catcherELEM.addEventListener(
      "touchstart",
      (e) => this.#gameIsOn && this._startDragWithTouch.call(this, e)
    );

    this.#catcherELEM.addEventListener(
      "touchmove",
      (e) => this.#gameIsOn && this._moveCatcherWithTouchDrag.call(this, e)
    );

    //ontouch the bottom of the conatiner
    this.#containerELEM.addEventListener(
      "touchstart",
      (e) => this.#gameIsOn && this._moveCatcherWithTouch.call(this, e)
    );
  }

  _moveCatcherUsingKeyboard(e) {
    if (e.keyCode === 37) {
      //left
      this.#catcherTranslateX -= 5;
      this.#catcherTranslateX = +Math.max(this.#catcherTranslateX, -200);
    }
    if (e.keyCode === 39) {
      //right
      this.#catcherTranslateX += 5;
      this.#catcherTranslateX = +Math.min(this.#catcherTranslateX, 200);
    }
    this.#catcherELEM.style.transform = `translateX(${
      this.#catcherTranslateX
    }%)`;
  }

  _startDragWithMouse(e) {
    this.#lastMouseXcoord = e.clientX;
  }
  _moveCatcherWithMouse(e) {
    const catcherWidth = this.getSize("width");
    const distanceInPxFromLastMouseXCoord = e.clientX - this.#lastMouseXcoord;
    const differnceInPercents =
      (100 * (distanceInPxFromLastMouseXCoord / 2)) / catcherWidth;
    this.#catcherTranslateX += differnceInPercents;
    this.#catcherTranslateX = +Math.max(-200, this.#catcherTranslateX);
    this.#catcherTranslateX = +Math.min(200, this.#catcherTranslateX);
    this.#catcherELEM.style.transform = `translateX(${
      this.#catcherTranslateX
    }%)`;
  }
  _startDragWithTouch(e) {
    this.#lastMouseXcoord = e.touches[0].pageX;
  }
  _moveCatcherWithTouchDrag(e) {
    const original = this.#catcherTranslateX;
    this.#catcherTranslateX +=
      ((e.touches[0].pageX - this.#lastMouseXcoord) * 1.1) /
      this.#catcherELEM.getBoundingClientRect().width;
    if (this.#catcherTranslateX <= -200 || this.#catcherTranslateX >= 200) {
      this.#catcherTranslateX = original;
      return;
    }

    this.#catcherELEM.style.transform = `translateX(${
      this.#catcherTranslateX
    }%)`;
  }

  _moveCatcherWithTouch(e) {
    const containerSides = this.#containerELEM.getBoundingClientRect();
    //Checking that user is not touching container
    if (e.target.outerHTML === this.#catcherELEM.outerHTML) return;

    //Checking that the user is touching the catcher line
    if (e.touches[0].pageY < containerSides.top + containerSides.height * 0.85)
      return;

    const touchDistanceToTheLeft = e.touches[0].pageX - containerSides.left;

    this.#catcherTranslateX =
      (touchDistanceToTheLeft / containerSides.width - 0.5) * 400;
    this.#catcherELEM.style.transform = `translateX(${
      this.#catcherTranslateX
    }%)`;
  }

  _removingEvents() {}

  reset() {
    this.#catcherTranslateX = 0;
    this._removingEvents();
    this.#gameIsOn = false;
  }
}
