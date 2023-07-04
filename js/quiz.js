"use strict";
function init() {
  // Variablen deklarieren
  let points = 0; //Rätselpunkte
  let zaehler = 0; // für die Fragen (erste, zweite, ..)
  let fragen, frage, json, antworten; // alle Fragen, eine Frage, JSON Rückgabe
  const container = document.getElementById("quiz-container");
  const punkte = document.getElementById("punkte");
  const ergebnis = document.getElementById("ergebnis");
  const buttons = document.getElementById("buttons");

  //Daten holen und in die Variable json scheiben
  async function fetchJSON() {
    let response = await fetch("../json/quiz.json");
    if (response.status === 200) {
      json = await response.json();
      // Ab hier Daten verarbeiten
      quizausfuehren();
    }
  }

  fetchJSON();

  function quizausfuehren() {
    //Eine Frage erstellen: erst vorhandene Frage löschen, dann neue Frage hinzufügen
    function frageerstellen() {
      while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
      }
      fragen = json.fragen;
      frage = fragen[zaehler];

      let aussage = document.createTextNode(frage.aussage);

      let paragraph = document.createElement("p");
      paragraph.classList.add("question");
      paragraph.appendChild(aussage);
      container.appendChild(paragraph);
    }

    // erste Frage anzeigen
    frageerstellen(zaehler);

    // Funktion, um Punkte im span eintragen
    function punkteEintragen(x) {
      punkte.innerHTML = "";
      punkte.appendChild(document.createTextNode(x));
    }

    //erste Punkte anzeigen
    punkteEintragen(points);

    //Funktion, um die Farbe der Buttons kurz austauschen
    function changeColor(button, correct) {
      if (correct) {
        button.classList.add("gruen");
        changeLightColor(true);
        setTimeout(function () {
          button.classList.remove("gruen");
        }, 1000);
      } else {
        changeLightColor(false);
        button.classList.add("rot");
        setTimeout(function () {
          button.classList.remove("rot");
        }, 1000);
      }
    }
    //Change light of the lightbulb
    function changeLightColor(correct) {
      const Light = document.querySelector(".light-btn");
      const LightRay = document.querySelectorAll(".st4");
      const doc = document.documentElement;

      if (correct) {
        Light.style.fill = "#47CF73";
        Light.style.stroke = "#349654";

        LightRay.forEach((element) => {
          element.style.fill = "#349654";
        });

        setTimeout(function () {
          if (doc.classList.contains("dark")) {
            Light.style.fill = "#feea5c";
            Light.style.stroke = "#fdd65e";

            LightRay.forEach((element) => {
              element.style.fill = "#fdd65e";
            });
          } else {
            Light.style.fill = "#e0e0e0";
            Light.style.stroke = "#c2c2c2";

            LightRay.forEach((element) => {
              element.style.fill = "#fdd65e";
            });
          }
        }, 1000);
      } else {
        Light.style.fill = "#FE7777";
        Light.style.stroke = "#FC5B5B";

        LightRay.forEach((element) => {
          element.style.fill = "#FC5B5B";
        });

        setTimeout(function () {
          if (doc.classList.contains("dark")) {
            Light.style.fill = "#feea5c";
            Light.style.stroke = "#fdd65e";

            LightRay.forEach((element) => {
              element.style.fill = "#fdd65e";
            });
          } else {
            Light.style.fill = "#e0e0e0";
            Light.style.stroke = "#c2c2c2";

            LightRay.forEach((element) => {
              element.style.fill = "#fdd65e";
            });
          }
        }, 1000);
      }
    }

    // Weitere Fragen anzeigen
    function neuefrage() {
      if (zaehler < fragen.length - 1) {
        zaehler++;
        setTimeout(function () {
          frageerstellen(zaehler);
          setButtonText();
        }, 1000);
      } else {
        summary();
      }
    }

    //EventListener auf Buttons
    let btns = document.querySelectorAll(".quiz_btn");
    btns.forEach((button) => button.addEventListener("click", controleAnswer));

    //Antworten auf Buttons
    function setButtonText() {
      antworten = json.antworten;
      btns.forEach((element) => {
        switch (element.id) {
          case "q1":
            element.value = antworten[zaehler].eins;
            break;
          case "q2":
            element.value = antworten[zaehler].zwei;
            break;
          case "q3":
            element.value = antworten[zaehler].drei;
            break;
          case "q4":
            element.value = antworten[zaehler].vier;
            break;
          default:
            console.log("Error :)");
        }
      });
    }
    setButtonText();

    function controleAnswer(e) {
      let wert = e.target.value;
      if (frage.correct === wert) {
        points = points + 10;
        punkteEintragen(points);
        changeColor(e.target, true);
      } else {
        changeColor(e.target, false);
      }
      neuefrage();
    }

    // Gesamtergebnis dokumentieren
    function summary() {
      setTimeout(function () {
        while (container.lastElementChild) {
          container.removeChild(container.lastElementChild);
        }
        while (buttons.lastElementChild) {
          buttons.removeChild(buttons.lastElementChild);
        }
      }, 800);

      const rueckmeldungen = json.rueckmeldungen;
      let text;
      let gesamtpunkte = fragen.length * 10;
      //alert("Es gab insgesamt " + gesamtpunkte + " Punkte")
      if (points <= 10) {
        text = rueckmeldungen[3].anzeige;
        ergebnis.appendChild(document.createTextNode(text));
      } else if (points <= gesamtpunkte / 4 && points > 10) {
        text = rueckmeldungen[2].anzeige;
        ergebnis.appendChild(document.createTextNode(text));
      } else if (points <= gesamtpunkte / 2 && points > gesamtpunkte / 4) {
        text = rueckmeldungen[1].anzeige;
        ergebnis.appendChild(document.createTextNode(text));
      } else {
        text = rueckmeldungen[0].anzeige;
        ergebnis.appendChild(document.createTextNode(text));
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", init);
