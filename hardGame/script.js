"use strict";

//landspace functionallity
let landspace = window.innerWidth > window.innerHeight;
//Checking if user is going to landspace or portrait
setInterval(() => {
  if (window.innerHeight > window.innerWidth && landspace) {
    location.reload();
  }
  if (window.innerWidth > window.innerHeight && !landspace) {
    location.reload();
  }
}, 250);

//isMobile
window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

// message the users
//Hinting the user to go landspace
if (screen.height > screen.width) {
  setTimeout(() => {
    document.querySelector(".landspace_message1").style.display = "flex";
  }, 500);
}

//Instructions for pc
if (!window.mobileAndTabletCheck()) {
  setTimeout(() => {
    document.querySelector(".landspace_message").style.display = "block";
  }, 500);
}

class HardGame {
  #GAME_CONTAINER_HEIGHT_IN_VH = 70;
  #GAME_CONTAINER_WIDTH_IN_VW = 70;
  #VW_IN_VH = window.innerHeight / window.innerWidth;
  #RENDER_SPEED = 15; //in milli seconds
  #SPEED = 1000;

  #score = 0;
  #scoreELEM = document.querySelector(".score");
  #gameoverELEM = document.querySelector(".gameover");
  #containerELEM = document.querySelector(".container");

  #ballObj = new Ball(
    this.#GAME_CONTAINER_HEIGHT_IN_VH,
    this.#GAME_CONTAINER_WIDTH_IN_VW
  );
  #catcherObj = new Catcher(
    this.#GAME_CONTAINER_HEIGHT_IN_VH,
    this.#GAME_CONTAINER_WIDTH_IN_VW,
    this.#containerELEM
  );
  #particlesContainerObj = new ParticlesContainer(
    this.#GAME_CONTAINER_HEIGHT_IN_VH,
    this.#GAME_CONTAINER_WIDTH_IN_VW,
    this.#ballObj
  );

  //Intervals
  #isBallTouchingCatcherInterval;
  #addParticlesInterval;
  #isParticleTouchedByBallInterval;
  #gravityInterval;
  #renderBallInterval;

  constructor() {
    //Adding indicators
  }

  ////////////////////////////////////////////////////////////////
  //Score functionality

  reset() {
    clearInterval(this.#gravityInterval);
    clearInterval(this.#renderBallInterval);
    clearInterval(this.#isParticleTouchedByBallInterval);
    clearInterval(this.#addParticlesInterval);
    clearInterval(this.#isBallTouchingCatcherInterval);

    this.#ballObj.reset();
    this.#catcherObj.reset();
    this.#particlesContainerObj.reset();
  }

  gameOver() {
    this.reset();
    this.#gameoverELEM.style.display = "block";
  }

  startGame() {
    //resetting score(updatescore adding 1 to score)
    this.#score = -1;
    this._updateScore();
    //hide Game over message
    this.#gameoverELEM.style.display = "none";

    this.#catcherObj.addingEvents();

    this.#renderBallInterval = setInterval(
      this.#ballObj.renderBall.bind(this.#ballObj),
      this.#RENDER_SPEED
    );

    this.#gravityInterval = setInterval(() => {
      this.#ballObj.gravity.call(this.#ballObj);
      if (this.#ballObj.wasBallDropped.call(this.#ballObj)) this.gameOver();
    }, this.#RENDER_SPEED);

    this.#addParticlesInterval = setInterval(
      this.#particlesContainerObj.addParticle.bind(this.#particlesContainerObj),
      this.#SPEED
    );

    this.#isParticleTouchedByBallInterval = setInterval(() => {
      this.#particlesContainerObj.handleHittedParticles.call(
        this.#particlesContainerObj,
        this._updateScore.bind(this)
      );
    }, this.#RENDER_SPEED * 5);

    this.#isBallTouchingCatcherInterval = setInterval(() => {
      if (this._ballIsTouchingCatcher.call(this)) this._bounceBall.call(this);
    }, this.#RENDER_SPEED);
  }
  //helpers
  _updateScore() {
    this.#score++;
    let highscoreText = "";
    if (localStorage) {
      if (localStorage.highscore) {
        if (localStorage.highscore < this.#score)
          localStorage.highscore = this.#score;
        else highscoreText = `( highscore: ${localStorage.highscore})`;
      } else {
        if (localStorage.highscore > 0)
          localStorage.setItem("highscore", this.#score);
      }
    }

    this.#scoreELEM.textContent = `${this.#score} ${highscoreText}`;
  }

  _ballIsTouchingCatcher() {
    const ballSides = this.#ballObj.getRectangle();
    const catcherSides = this.#catcherObj.getRectangle();
    if (ballSides.top + ballSides.height < catcherSides.top) return false; //Ball above
    if (ballSides.left + ballSides.width < catcherSides.left) return false; //From left
    if (ballSides.left > catcherSides.left + catcherSides.width) return false; //From right
    if (ballSides.top > catcherSides.top + catcherSides.height / 2)
      return false; //Below
    return true;
  }

  _bounceBall() {
    const catcherLeft = this.#catcherObj.getSize("left");
    const catcherWidth = this.#catcherObj.getSize("width");
    const ballLeft = this.#ballObj.getSize("left");
    const ballWidth = this.#ballObj.getSize("width");
    const relativeDistanceToLeft =
      (ballLeft + ballWidth / 2 - catcherLeft) / catcherWidth;
    this.#ballObj.horizontalBounce = (relativeDistanceToLeft - 0.5) / 5;
    let bounceSpeed = 1 + Math.abs(this.#ballObj.horizontalBounce);

    this.#ballObj.bounceBall(bounceSpeed, this.#RENDER_SPEED);
  }
}

const hard_game = new HardGame();
hard_game.startGame();
document.querySelector(".restart").addEventListener("click", () => {
  hard_game.reset();
  hard_game.startGame();
});