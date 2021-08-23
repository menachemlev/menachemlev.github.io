"use strict";
const imgsContainer = document.querySelector(".imgs");
//for loading symbol displaying
const paganitation = document.querySelector(".pagination");
let fetchInterval;

function initInterval() {
  fetchInterval = setInterval(() => {
    //no images loading no loading sign
    paganitation.style.display = "none";
    //how much the user is away from bottom of the page
    const distanceToBottom =
      document.documentElement.getBoundingClientRect().height -
      (window.pageYOffset + window.innerHeight);
    if (distanceToBottom < 10) {
      //Stop checking
      clearInterval(fetchInterval);
      //fetch new image
      fetchNewImage();
    }
  }, 300);
}
async function fetchNewImage(firstTime = false) {
  try {
    //show loading
    paganitation.style.display = "block";
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) throw new Error("Something went wrong :(");
    //here the image url
    const data = await response.json();
    //adding new image
    document.querySelector(".error").textContent = "";
    imgsContainer.insertAdjacentHTML(
      "beforeend",
      `<img src="${data.message}"/>`
    );
    //restarting the interval
    clearInterval(fetchInterval);
    //wait between images(While image is conquering its size)
    setTimeout(initInterval, firstTime ? 0 : 1000);
  } catch (err) {
    console.log(err.message);
    if (err.message === "Failed to fetch") {
      document.querySelector(".error").textContent =
        "Sorry no internet connection";
      initInterval();
    }
  }
}
//first image is loading
fetchNewImage(true);
