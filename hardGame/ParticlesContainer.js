class ParticlesContainer {
  #GAME_CONTAINER_HEIGHT_IN_VH;
  #GAME_CONTAINER_WIDTH_IN_VW;
  #VW_IN_VH = window.innerHeight / window.innerWidth;

  #particlesContainer = document.querySelector(".particles");
  #particlesArray = [];
  #particlesIndexesArray = [];

  #ballObj;
  constructor(
    GAME_CONTAINER_HEIGHT_IN_VH,
    GAME_CONTAINER_WIDTH_IN_VW,
    ballObj
  ) {
    this.#GAME_CONTAINER_WIDTH_IN_VW = GAME_CONTAINER_WIDTH_IN_VW;
    this.#GAME_CONTAINER_HEIGHT_IN_VH = GAME_CONTAINER_HEIGHT_IN_VH;
    for (let i = 0; i < 200; i++) this.#particlesIndexesArray.push(false);
    this.#ballObj = ballObj;
  }

  handleHittedParticles(updateScoreFunction) {
    this.#particlesArray.forEach((particle, i) => {
      const particleSides = particle.particle.getBoundingClientRect();
      const ballSides = this.#ballObj.getRectangle();
      if (ballSides.left > particleSides.left + particleSides.width);
      else if (ballSides.left + ballSides.width < particleSides.left);
      else if (ballSides.top > particleSides.top + particleSides.height);
      else if (ballSides.top + ballSides.height < particleSides.top);
      else {
        this.#particlesContainer.removeChild(particle.particle);
        this.#particlesIndexesArray[
          particle.line * 25 + particle.column
        ] = false;
        this.#particlesArray.splice(i, 1);
        updateScoreFunction();
      }
    });
  }
  addParticle() {
    if (this.#particlesArray.length >= 200) return;
    const particle = document.createElement("div");
    const placesAvailable = 200 - this.#particlesArray.length;
    let reverseCounter = +Math.floor(Math.random() * placesAvailable);
    let indexForNewParticle = 0;
    for (const [index, val] of Object.entries(this.#particlesIndexesArray)) {
      if (!val) reverseCounter--;
      if (reverseCounter < 0) {
        indexForNewParticle = index;
        break;
      }
    }

    const line = +Math.floor(indexForNewParticle / 25);
    const column = indexForNewParticle % 25;

    this.#particlesIndexesArray[line * 25 + column] = true;
    particle.style.top = `${line * 12.5}%`;
    particle.style.left = `${column * 4}%`;

    particle.style.backgroundColor = `rgb(${Math.random() * 256},${
      Math.random() * 256
    },${Math.random() * 256})`;
    this.#particlesArray.push({
      particle: particle,
      line: line,
      column: column,
    });
    this.#particlesContainer.appendChild(particle);
  }
  reset() {
    this.#particlesContainer.innerHTML = "";
    while (this.#particlesArray.length > 0) this.#particlesArray.pop();
    this.#particlesIndexesArray.forEach(
      (_, i) => (this.#particlesIndexesArray[i] = false)
    );
  }
}
