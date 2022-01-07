//Variable Startlist
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var nameEl = document.getElementById("name");
var feedbackEl = document.getElementById("feedback");
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var Rightans = new Audio("assets/sounds/correctanswer.m4a");
var Wrongans = new Audio("assets/sounds/wronganswer.m4a");

function startQuiz() {
  // hide screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  questionsEl.setAttribute("class", " ");

  //  Timer start
  timerId = setInterval(function () {
    clockTick();
  }, 1000);
  // Display start time
  timerEl.textContent = time;

  getQuestion();
}
var timeRemaining = 75;

function timerStart() {
  var quizInterval = setInterval(function () {
    timeRemaining--;
    $(".timer").text("Time: " + timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(quizInterval);
    }
  }, 1000);
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  questionsEl.children[0].textContent = currentQuestion.title;

  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];

    choicesEl.appendChild(choiceButton);
  }
  // Allows choice functionality
  choicesEl.children[0].addEventListener("click", function (event) {
    questionClick(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function (event) {
    questionClick(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function (event) {
    questionClick(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function (event) {
    questionClick(choicesEl.children[3]);
  });
}

function questionClick(answerChoice) {
  console.log(answerChoice.textContent);
  console.log(questions[currentQuestionIndex].answer);
  if (answerChoice.textContent != questions[currentQuestionIndex].answer) {
    time -= 10;

    feedbackEl.textContent = "Incorrect";

    Wrongans.play();
  } else {
    feedbackEl.textContent = "Correct";
    Rightans.play();
  }

  feedbackEl.setAttribute("class", "feedback");
  setInterval(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  // Next question functionality
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) quizEnd();
  else getQuestion();
}

function quizEnd() {
  clearInterval(timerId);
  timerEl.textContent = time;

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // Shows final Score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hides Questions
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) quizEnd();
}

function saveHighscore() {
  // Grabs Key Values
  var name = nameEl.value.toUpperCase();
  // Empty Prevention
  if (name === "") {
    alert("Input cannot be blank'");
    return;
  } else if (name.length > 28) {
    alert("Input cannot be more than 28 characters");
    return;
  } else {
    // Saves high scoresto local storage
    var highscores;
    if (JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else highscores = [];

    var newScore = {
      name: name,
      score: time,
    };
    highscores.push(newScore);
    // Save Quality
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Next page function
    location.href = "leaderboard.html";
  }
}

function checkForEnter(event) {
  // Saves High Score
  if (event.keyCode === 15) saveHighscore();
}

submitBtn.onclick = saveHighscore;

// Start Quiz Button
startBtn.onclick = startQuiz;

nameEl.onkeyup = checkForEnter;
