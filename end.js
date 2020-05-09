const yourScore = localStorage.getItem('yourScore')
const finalScore = document.getElementById('finalScore')
finalScore.innerText = yourScore;