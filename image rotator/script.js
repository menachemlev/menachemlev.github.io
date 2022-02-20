const file_in_elem = document.querySelector(".file-in");
const flippers = document.querySelectorAll(".container>div");
let should_show_instructions = true;
file_in_elem.addEventListener("change", (e) => {
  document
    .querySelector("img")
    .setAttribute("src", URL.createObjectURL(e.target.files[0]));
  if (should_show_instructions) {
    const show_ins = confirm("Show instructions?");
    should_show_instructions = show_ins;
    show_ins && show_instructions();
  }
});

function show_instructions() {
  flippers.forEach((f, i) => {
    f.style.border = "3px solid orange";
    f.style.backgroundColor = "rgba(3,3,3,0.5)";
    f.innerHTML = "<b>Hover to rotate image in this direction</b>";
    setTimeout(() => {
      f.style.border = "";
      f.textContent = "";
      f.style.backgroundColor = "transparent";
    }, 4000 + i * 200);
  });
}
show_instructions();
