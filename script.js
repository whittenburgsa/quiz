var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var timerEl = document.querySelector("#time")
var startEl = document.querySelector("#start-section")
var startBtn = document.querySelector("#start-button")
var questionsEl = document.querySelector("#questions")
var answersEl = document.querySelector("#answers")
var questionEl = document.querySelector("#question")
var endEl = document.querySelector("#end-section")
var index = 0
var timeInterval;
var time = 30

function quizStart() {
  timeInterval = setInterval(countdown, 1000)
  timerEl.textContent = 30
  startEl.classList.add("hide")
  showQuestions()
}

function countdown() {
  time--;
  timerEl.textContent = time
  if (time <= 0) {
    endQuiz()
  }
}

function showQuestions() {
  var currentQuestion = questions[index]
  questionEl.textContent = currentQuestion.title
  answersEl.innerHTML = ''
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    var choiceBtn = document.createElement("button")
    choiceBtn.textContent = currentQuestion.choices[i]
    choiceBtn.setAttribute("value", currentQuestion.choices[i])
    choiceBtn.onclick = checkAnswer
    answersEl.append(choiceBtn)
  }
}

function endQuiz() {
  clearInterval(timeInterval)
  questionsEl.classList.add ("hide")
  endEl.classList.remove("hide")
  document.getElementById ("score").textContent = time
  document.getElementById ("save-button").addEventListener ("click", function (){
    var initials = document.getElementById ('initials').value
    var highScores = JSON.parse(localStorage.getItem("highscores"))|| []
    var newScore = {
      initials:initials,
      score:time
    }
    highScores.push (newScore)
    localStorage.setItem("highscores", JSON.stringify(highScores))
    window.location.href="highscores.html"
  })
}
function checkAnswer() {
  if (this.value !== questions[index].answer) {
    time -= 3
    if (time <= 0) {
      endQuiz()
    }
  }
  else {
    index++
    if (index >= questions.length) {
      endQuiz()
    }
    else {
      showQuestions ()
    }
  }
}

startBtn.addEventListener("click", quizStart)