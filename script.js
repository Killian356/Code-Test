//Variable Startlist
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var Rightans = new Audio("assets\sounds\correctanswer.m4a");
var Wrongans = new Audio("assets\sounds\wronganswer.m4a");

function startQuiz() {
  // hide screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");


  questionsEl.setAttribute("class", " ");

  //  timer
  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  // show starting time
  timerEl.textContent = time;

  getQuestion();
}
var timeRemaining = 75;

function timerStart(){
    var quizInterval = setInterval(function(){
        timeRemaining--;
        $(".timer").text("Time: " + timeRemaining)

        if( timeRemaining <= 0 ){
            clearInterval(quizInterval)
        }
    }, 1000)
}

