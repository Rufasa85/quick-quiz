var startGameBtn = document.querySelector("#start-game")
var insDiv = document.querySelector("#instructions")
var gameDiv = document.querySelector("#game")
var addScoreDiv = document.querySelector("#score-input")
var questionEl = document.querySelector("#question")
var answersEl = document.querySelector("#answer-buttons")
var isCorrectEl = document.querySelector("#is-correct")
var timerEl = document.querySelector(`#timer`);
var scoreEl = document.querySelector(`#score`);
var currQuest = 0;

var timeLeft;
var shuffled;
var countdown;

function shuffle(arr){
    var result = [];
    var arrCopy = [...arr];
    while(arrCopy.length){
        result.push(arrCopy.splice(Math.floor(Math.random()*arrCopy.length),1)[0])
    }
    return result
}



function startGame(){
    insDiv.setAttribute("class","hide");
    gameDiv.setAttribute("class","")
    shuffled = shuffle(questions)
    timeLeft = 300;
    timerEl.textContent = `${timeLeft} second(s) remaining!`;
    countdown = setInterval(()=>{
        timeLeft--;
        timerEl.textContent = `${timeLeft} second(s) remaining!`;
        if(timeLeft<=0){
            timeLeft = 0;
            endGame()
        }
    },1000)
    loadNextQuestion()
}

function loadNextQuestion(){
    isCorrectEl.setAttribute("class","hide")
    answersEl.setAttribute("class","")
    questionEl.setAttribute("class","")
    console.log(shuffled[currQuest])
    var shuffledAns = shuffle(shuffled[currQuest].answers);
    answersEl.innerHTML = ""
    questionEl.textContent = shuffled[currQuest].question
    shuffledAns.forEach(answer=>{
        var newton = document.createElement("button");
        newton.textContent = answer;
        answer===shuffled[currQuest].correctAnswer? newton.setAttribute("data-correct","yes"):null;
        answersEl.append(newton)
    })
}

function correctGuess(){
    isCorrectEl.textContent = "correct!"
    isCorrectEl.setAttribute("class","correct")
    answersEl.setAttribute("class","hide")
    questionEl.setAttribute("class","hide")
    currQuest++;
    if(currQuest<shuffled.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}
function wrongGuess(){
    isCorrectEl.textContent = "wrong!"
    isCorrectEl.setAttribute("class","wrong")
    answersEl.setAttribute("class","hide")
    questionEl.setAttribute("class","hide")
    currQuest++;
    timeLeft-=15;
    if(currQuest<shuffled.length){
        setTimeout(loadNextQuestion,500)
    } else {
        endGame()
    }
}

function endGame(){
    clearInterval(countdown)
    gameDiv.setAttribute("class","hide");
    addScoreDiv.setAttribute("class","")
    timerEl.textContent=""
    scoreEl.textContent = timeLeft;

}

startGameBtn.addEventListener("click",startGame)
answersEl.addEventListener("click",function(event){
    if(event.target.matches("button")){
      event.target.getAttribute("data-correct")?correctGuess():wrongGuess()
    }
})
document.querySelector("form").addEventListener("submit",function(event){
    event.preventDefault();
    var currentScores = JSON.parse(localStorage.getItem("scores"))||[];
    console.log(currentScores);
    var me = {
        init:document.querySelector("input").value,
        score:timeLeft
    }
    currentScores.push(me);
    currentScores.sort((a,b)=>b.score-a.score)
    localStorage.setItem("scores",JSON.stringify(currentScores));
    location.assign("./highscores.html")
})

