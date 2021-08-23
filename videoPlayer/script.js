"use strict";
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

//Instructions
if (!window.mobileAndTabletCheck()) {
  setTimeout(() => {
    document.querySelector(".landspace_message").style.display = "block";
  }, 500);
}

//Go landspace message
if (screen.height > screen.width) {
  setTimeout(() => {
    document.querySelector(".landspace_message1").style.display = "flex";
  }, 500);
}
//////////////////////////////////////
class MediaPlayer {
  //Interval Time to update local storage
  #UPDATE_TIME = 7 * 1000;
  //Duration of movie
  #DURATION = 596;

  //Video element
  #video = document.querySelector(".video");
  #playButton = document.querySelector(".play_button");

  //Time bar control
  #time_progress = document.querySelector(".time_progress");
  #fill = document.querySelector(".fill");

  //Volume control
  #volume_metter = document.querySelector(".volume_metter");
  #volume = document.querySelector(".volume");

  //Hints
  #hints = document.querySelectorAll(".hint");
  #volumeup = document.querySelector(".volumeup");
  #volumedown = document.querySelector(".volumedown");
  #later = document.querySelector(".later");
  #sooner = document.querySelector(".sooner");

  //Object to store data about the video
  #videoParams;
  #videoTimeUpdaterInterval;
  #hideControlsTimeout;
  #hideHintsTimeout;

  //Initial parameters
  #initialParams = {
    volume: 0.2,
    play: false,
    time: 0,
    fillWidth: 0,
  };
  constructor() {
    //For calling functions on events with parameters
    //const this = this;
    //Getting previous parameters from local storage or intiliazing local storage
    if (sessionStorage !== undefined)
      if (sessionStorage.videoParams) {
        this.#videoParams = JSON.parse(sessionStorage.videoParams);
      } else {
        this.#videoParams = this.#initialParams;
        sessionStorage.setItem("videoParams", "");
      }

    this._updateVideo();
    this._resettingHideControlsTimeout(3);
    this.#playButton.addEventListener("click", this._toggle.bind(this));
    if (!window.mobileAndTabletCheck()) {
      this.#video.addEventListener("click", this._toggle.bind(this));
    }
    this.#video.addEventListener("mousemove", () => {
      this._resettingHideControlsTimeout.call(this, 0.8);
    });
    window.addEventListener("keydown", (e) => {
      this._actionByKeyPress.call(this, e);
    });

    this.#time_progress.addEventListener("click", (e) => {
      this._updateTimeBar.call(this, e);
    });

    this.#volume_metter.addEventListener("click", (e) => {
      this._updateVolumeBar.call(this, e);
    });
  }

  //helpers

  _updateVolumeBar(e) {
    const volume_metter_sizes = this.#volume_metter.getBoundingClientRect();
    this.#videoParams.volume =
      (Number(volume_metter_sizes.bottom) - e.clientY) /
      Number(volume_metter_sizes.height);
    this._resettingHideControlsTimeout(2);
    this.#videoParams.time = this.#video.currentTime;
    //Updating
    this._updateVideo();
    this._updateStorage();
  }

  _updateTimeBar(e) {
    const time_progress_sizes = this.#time_progress.getBoundingClientRect();
    const percentage =
      (e.clientX - Number(time_progress_sizes.left)) /
      Number(time_progress_sizes.width);
    this.#videoParams.time = +this.#video.duration * percentage;
    this._resettingHideControlsTimeout(2);

    //Updating
    this._updateVideo();
    this._updateStorage();
  }

  //Hints functionallity
  _actionByKeyPress(e) {
    if (e.keyCode === 32) return this._toggle();
    if (e.keyCode === 37) {
      this.#videoParams.time = Math.max(this.#video.currentTime - 10, 0);
      this._updateVideo();
      this._updateStorage();
      this._handleHint(this.#sooner);
    }

    if (e.keyCode === 39) {
      this.#videoParams.time = Math.min(
        this.#video.currentTime + 10,
        this.#DURATION
      );
      this._updateVideo();
      this._updateStorage();
      this._handleHint(this.#later);
    }

    if (e.keyCode === 38) {
      this.#videoParams.volume = Math.min(this.#videoParams.volume + 0.05, 1);
      this._updateVideo();
      this._updateStorage();
      this._handleHint(this.#volumeup);
    }
    if (e.keyCode === 40) {
      this.#videoParams.volume = Math.max(this.#videoParams.volume - 0.05, 0);
      this._updateVideo();
      this._updateStorage();
      this._handleHint(this.#volumedown);
    }
    this._updateByPlaying();
    this._resettingHideControlsTimeout(0.8);
  }
  _hideHints() {
    this.#hints.forEach((hint) => {
      hint.style.display = "none";
    });
  }

  _handleHint = (hint) => {
    clearTimeout(this.#hideHintsTimeout);
    hint.style.display = "block";
    this.#hideHintsTimeout = setTimeout(this._hideHints.bind(this), 400);
  };

  //controlls handle
  _hideControls() {
    this.#playButton.style.display =
      this.#time_progress.style.display =
      this.#volume_metter.style.display =
        "none";
  }
  _showControls() {
    this.#playButton.style.display =
      this.#time_progress.style.display =
      this.#volume_metter.style.display =
        "block";
  }

  _resettingHideControlsTimeout(timeout) {
    clearTimeout(this.#hideControlsTimeout);
    this._showControls();
    this.#hideControlsTimeout = setTimeout(
      this._hideControls.bind(this),
      timeout * 1000
    );
  }

  //updators
  //Updating video and storage functionallity
  _updateByPlaying() {
    this.#videoParams.time = this.#video.currentTime;
    const percentage = (this.#videoParams.time / this.#DURATION) * 100;
    this.#fill.style.width = percentage + "%";
    this.#videoParams.fillWidth = percentage;
    this._updateStorage();
  }

  _updateVideo() {
    this.#video.volume = this.#videoParams.volume;
    this.#video.currentTime = this.#videoParams.time;

    //Updating time bar
    const percentage = (this.#videoParams.time / this.#DURATION) * 100;
    this.#fill.style.width = percentage + "%";
    this.#videoParams.fillWidth = percentage;

    this.#volume.style.height = this.#videoParams.volume * 100 + "%";
  }

  //Update sessionStorage
  _updateStorage() {
    sessionStorage.videoParams = JSON.stringify({
      ...this.#videoParams,
      play: false,
    });
  }

  //Video playing controll
  _playVideo() {
    this.#video.play();
    this.#videoParams.play = true;
    this._updateStorage();
    this.#videoTimeUpdaterInterval = setInterval(
      this._updateByPlaying.bind(this),
      this.#UPDATE_TIME
    );
    this.#playButton.innerHTML = `<img src="pause-button.png"">`;
    this._resettingHideControlsTimeout(0.8);
  }
  _pauseVideo() {
    this.#video.pause();
    this.#videoParams.play = false;
    this._updateStorage();
    clearInterval(this.#videoTimeUpdaterInterval);
    this.#playButton.innerHTML = `<img src="play.png"">`;
    this._resettingHideControlsTimeout(3);
  }

  _toggle() {
    this.#videoParams.play === true ? this._pauseVideo() : this._playVideo();
  }
}
const mediaPlayer = new MediaPlayer();
