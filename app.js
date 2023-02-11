let alphapet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let alphaArray = alphapet.split("");

let mainObject = {
  Programming: ["java script", "Ruby", "HTML", "CSS", "go", "React"],
  Countries: ["Egypt", "Palestine", "Libya", "Saudi-Arabia", "Syria", "Sudan"],
  Planets: ["Mercury", "Venus", "Earth", "Mars", "Uranus", "Neptun"],
  Fruits: ["Apple", "Orange", "Banana", "Water-Melon", "Strawberry", "apricot"],
};
// Array From The Keys
let allKeys = Object.keys(mainObject);
// Get Random Key
let objectKey = allKeys[Math.floor(Math.random() * allKeys.length)];
// Get The Array Of The Key
let objectArray = mainObject[objectKey];
// get Random Element Of The Array
let randomElement = objectArray[Math.floor(Math.random() * objectArray.length)];
console.log(randomElement);

// Create Spans For eqaul to random Letters
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

// Put All Letters In The Page in Spans
let letters = "";
alphaArray.forEach((ele) => {
  letters += `<span class="letter">${ele}</span>`;
});
document.querySelector(".letters").innerHTML = letters;

let spans = document.querySelectorAll(".letters .letter");
let sucsses = 0;
let failed = 0;
let counter = 0;
// When Clicked On asny Span
spans.forEach(function (span) {
  span.addEventListener("click", function () {
    // ad class on it to make it unclickable
    this.classList.add("clicked");
    // then loop on the randomElement to check
    for (let i = 0; i < randomElement.length; i++) {
      if (randomElement[i] !== "-" || randomElement[i] !== " ") {
        // if clicked span has same letter in therandomElement
        if (this.innerHTML.toLowerCase() === randomElement[i].toLowerCase()) {
          lettersBox.children[i].innerHTML = randomElement[i].toUpperCase();
          lettersBox.children[i].classList.add("green");
        }
      }
    }

    if (randomElement.toLowerCase().includes(this.innerHTML.toLowerCase())) {
      sucsses++;
    } else {
      failed++;
      // change styles of the draw
      coloringRed();
    }

    // check sucsses = randomElement.length or All Spans not Empty To Show The Congrats Message
    if (sucsses === randomElement.length || check()) {
      let text = `Congratulation You Won The Word Is
      <span>${randomElement.toUpperCase()}</span>
      <button id="reload">Play Again</button>`;
      popUp(text);

      // check failed = Number Of Elements That Turn To red  To Show The Oops Message
    } else if (failed === 9) {
      let text = `Oops You Lost Try Again The Word Is
      <span>${randomElement.toUpperCase()}</span>
      <button id="reload">Play Again</button>`;
      popUp(text);
    }
  });
});

// Ceate The Popup That Will Show If User Win Or Lose
function popUp(text) {
  let div = document.querySelector(".result");
  div.style.display = "flex";
  div.innerHTML = text;
  reload();
}

// When Button Play Again Clicked Reload The Page
function reload() {
  document.getElementById("reload").addEventListener("click", () => {
    location.reload();
  });
}

// Check If All Spans Is Not Empty
let lettersArray = Array.from(lettersBox.children);
function check() {
  let result = true;
  lettersArray.forEach((span) => {
    if (span.innerHTML === "") result = false;
  });
  return result;
}

// Styles The Element To red Run If Click Was Wrong
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
