function displayScores () {
    var highScores = JSON.parse(localStorage.getItem("highscores")) || []
    highScores.sort (function (a,b) {
        return b.score - a.score
    })
    for (let i = 0; i < highScores.length; i++) {
        var liEl = document.createElement ("li")
        liEl.textContent = highScores [i].initials + " - " + highScores [i].score
        document.getElementById ("highscores").appendChild (liEl)
    }
}

displayScores ();