let secretWord;
fetch("https://random-word-api.herokuapp.com/word?number=1")
  .then(res => res.json())
  .then(data => {
    secretWord = data[0].split("")
  })


const alphabetDiv = document.querySelector("#alphabet")
// const secretWord = ["t", "r", "i", "a", "n", "g", "l", "e", "o", "f", "s", "a", "d", "n", "e", "s", "s"]
const playButton = document.querySelector("#playButton")
const gameOver = document.querySelector(".game")
const secretWordDiv = document.querySelector("#secretWord")
const answer = document.createElement("h4")

const addSpaces = () => {

  secretWordDiv.innerHTML = ""

  for (let i = 0; i < secretWord.length; i++) {
    secretWordDiv.innerHTML = secretWordDiv.innerHTML + `<span id="${i}">_</span>`
  }
  console.log(secretWord.join(""))
}

setTimeout(addSpaces, 800)

let errorCount = 0

alphabetDiv.addEventListener("click", (e) => {
  if (e.target.id !== "alphabet") {
    
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === e.target.innerHTML) {
        document.getElementById(i.toString()).innerHTML = e.target.innerHTML.toUpperCase()
        e.target.setAttribute("disabled", "")
      }
    }

    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] !== e.target.innerHTML) {
        e.target.setAttribute("disabled", "")
      }
    }

    if (!secretWord.includes(e.target.innerHTML)) {
      if (errorCount <= 4) {
        errorCount++
        switch (errorCount) {
          case 1:
            document.querySelector(".head").style.display = "block";
            break;
          case 2:
            document.querySelector(".body").style.display = "block";
            break;
          case 3:
            document.querySelector(".arm1").style.display = "block";
            break;
          case 4:
            document.querySelector(".arm2").style.display = "block";
            break;
          case 5:
            document.querySelector(".leg1").style.display = "block";
            break;
        }
      } else {
        let buttons = document.querySelectorAll("button")
        answer.innerHTML = `The answer is: "${secretWord.join("").toUpperCase()}"`
        gameOver.appendChild(answer)
        buttons.forEach(x => {
          if (x.id !== "playButton") {
            x.setAttribute("disabled", "")
            document.querySelector(".leg2").style.display = "block";
            gameOver.style.display = "block"

          }
        })
      }
    }
  }
})


playButton.addEventListener("click", () => {

  document.querySelector(".head").style.display = "none";
  document.querySelector(".arm1").style.display = "none";
  document.querySelector(".arm2").style.display = "none";
  document.querySelector(".leg1").style.display = "none";
  document.querySelector(".leg2").style.display = "none";
  document.querySelector(".body").style.display = "none";

  let buttons = document.querySelectorAll("button")
  buttons.forEach(x => {
    x.removeAttribute("disabled")
  })

  secretWordDiv.innerHTML = `<h3>Loading...</h3>`
  errorCount = 0
  gameOver.style.display = "none"
  answer.remove()

  fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(res => res.json())
    .then(data => {
      secretWord = data[0].split("")
    })

  setTimeout(addSpaces, 800)
})
