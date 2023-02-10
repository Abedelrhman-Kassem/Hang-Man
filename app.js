let alphapet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let alphaArray = alphapet.split("");

let mainObject = {
  Programming: ["java script", "Ruby", "HTML", "CSS", "go", "React"],
  Countries: ["Egypt", "Palestine", "Libya", "Saudi-Arabia", "Syria", "Sudan"],
  Planets: ["Mercury", "Venus", "Earth", "Mars", "Uranus", "Neptun"],
  Fruits: ["Apple", "Orange", "Banana", "Water-Melon", "Strawberry", "apricot"],
};
let allKeys = Object.keys(mainObject);
let objectKey = allKeys[Math.floor(Math.random() * allKeys.length)];
let objectArray = mainObject[objectKey];
let randomElement = objectArray[Math.floor(Math.random() * objectArray.length)];
console.log(randomElement);
let lettersBox = document.querySelector(".letters-box");
for (let i = 0; i < randomElement.length; i++) {
  let span = document.createElement("span");
  span.classList.add("letter-box");

  if (randomElement[i] === "-" || randomElement[i] === " ") {
    span.classList.add("break");
    span.innerHTML = "-";
  }
  lettersBox.appendChild(span);
}

document.querySelector(".word-from").innerHTML = `Word Clue: ${objectKey}`;
let letters = "";
alphaArray.forEach((ele) => {
  letters += `<span class="letter">${ele}</span>`;
});
document.querySelector(".letters").innerHTML = letters;
let spans = document.querySelectorAll(".letters .letter");
let sucsses = 0;
let failed = 0;
let counter = 0;
spans.forEach(function (span) {
  span.addEventListener("click", function () {
    this.classList.add("clicked");
    for (let i = 0; i < randomElement.length; i++) {
      if (randomElement[i] !== "-" || randomElement[i] !== " ") {
        if (this.innerHTML.toLowerCase() === randomElement[i].toLowerCase()) {
          lettersBox.children[i].innerHTML = randomElement[i].toUpperCase();
        }
      }
    }
    if (randomElement.toLowerCase().includes(this.innerHTML.toLowerCase())) {
      sucsses++;
    } else {
      failed++;
      coloringRed();
    }

    if (sucsses === randomElement.length || check()) {
      sucssesPopup();
    } else if (failed === 9) {
      failedPopup();
    }
  });
});

function sucssesPopup() {
  let text = `Congratulation You Won The Word Is
  <span>${randomElement.toUpperCase()}</span>
  <button id="reload">Play Again</button>`;
  let div = document.querySelector(".result");
  div.style.display = "flex";
  div.innerHTML = text;
  reload();
}

function failedPopup() {
  let text = `Oops You Lost Try Again The Word Is
  <span>${randomElement.toUpperCase()}</span>
  <button id="reload">Play Again</button>`;
  let div = document.querySelector(".result");
  div.style.display = "flex";
  div.innerHTML = text;
  reload();
}
function reload() {
  document.getElementById("reload").addEventListener("click", () => {
    location.reload();
  });
}

let lettersArray = Array.from(lettersBox.children);
function check() {
  let result = true;
  lettersArray.forEach((span) => {
    if (span.innerHTML === "") {
      result = false;
    }
  });
  return result;
}
let statusColor = false;
function coloringRed() {
  let base = document.querySelector(".base");
  base.classList.add("colored");
  if (statusColor) {
    base.children[counter].classList.add("colored");
    counter++;
  }
  statusColor = true;
}
