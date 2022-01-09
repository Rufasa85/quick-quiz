var scores = JSON.parse(localStorage.getItem("scores"))||[];

scores.forEach(score=>{
    var newli = document.createElement("li");
    newli.textContent = `${score.init} : ${score.score}`
    document.querySelector("ol").append(newli)
})