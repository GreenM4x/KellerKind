("use strict");
//Funktion Theme [Dark to light] by Clicking on the Light SVG
const btn = document.querySelector(".light-btn");
const btnCabel = document.querySelector(".st5");
const btnLightRay = document.querySelectorAll(".st4");
function myfunction(e) {
  const doc = document.documentElement;
  doc.classList.toggle("dark");

  const svg = e.currentTarget.querySelector(".light-btn");
  if (doc.classList.contains("dark")) {
    btn.style.fill = "#feea5c";
    btn.style.stroke = "#fdd65e";

    btnCabel.style.stroke = "#fff";

    btnLightRay.forEach((element) => {
      element.style.display = "block";
    });
  } else {
    btn.style.fill = "#e0e0e0";
    btn.style.stroke = "#c2c2c2";

    btnCabel.style.stroke = "#000";

    btnLightRay.forEach((element) => {
      element.style.display = "none";
    });
  }
}

btn.addEventListener("click", myfunction);
