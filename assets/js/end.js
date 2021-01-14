const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#final-score')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const timeRanOut = localStorage.getItem('timeRanOut')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerHTML = "Your Score: " + mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
    return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highscores.html') 
} 

if(timeRanOut === "yes") {
    var headerText = document.querySelector('#end-header');
    headerText.innerHTML ="You've run out of time!"
}