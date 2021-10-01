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

  addingEvents() {
    window.addEventListener("keydown", (e) =>
      this._moveCatcherUsingKeyboard.call(this, e)
    );

    //on mouse drag
    this.#catcherELEM.addEventListener("dragstart", (e) =>
      this._startDragWithMouse.call(this, e)
    );

    this.#catcherELEM.addEventListener("dragend", (e) =>
      this._moveCatcherWithMouse.call(this, e)
    );

    //ontouch drag
    this.#catcherELEM.addEventListener("touchstart", (e) =>
      this._startDragWithTouch.call(this, e)
    );

    this.#catcherELEM.addEventListener("touchmove", (e) =>
      this._moveCatcherWithTouchDrag.call(this, e)
    );

    //ontouch the bottom of the conatiner
    this.#containerELEM.addEventListener("touchstart", (e) =>
      this._moveCatcherWithTouch.call(this, e)
    );
  }

  _moveCatcherUsingKeyboard(e) {
    if (e.keyCode === 37) {
      //left
      if (this.#catcherTranslateX <= -200) return;
      this.#catcherTranslateX -= 10;
      this.#catcherELEM.style.transform = `translateX(${
        this.#catcherTranslateX
      }%)`;
    }
    if (e.keyCode === 39) {
      //right
      if (this.#catcherTranslateX >= 200) return;
      this.#catcherTranslateX += 10;
      this.#catcherELEM.style.transform = `translateX(${
        this.#catcherTranslateX
      }%)`;
    }
  }

  _startDragWithMouse(e) {
    this.#lastMouseXcoord = e.clientX;
  }
  _moveCatcherWithMouse(e) {
    const original = this.#catcherTranslateX;
    this.#catcherTranslateX += (e.clientX - this.#lastMouseXcoord) / 2;
    if (this.#catcherTranslateX <= -200 || this.#catcherTranslateX >= 200) {
      this.#catcherTranslateX = original;
      return;
    }
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
  }
}
