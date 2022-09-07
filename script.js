const gameOver = document.getElementById("gameOver");

document.getElementById('reset').addEventListener('click', reset);

const diamonds = document.querySelectorAll('diamond-lane');

for (const diamond of diamonds){
    diamond.addEventListener('click', checkForWinner);
}

function checkForWinner(){
    for (const diamond of diamonds){
        if (diamond.score == 10){
            freezeGame(diamond);
        }
    }
}

function freezeGame(diamond){
    diamond.render(); // to update color of diamond
    gameOver.isGameOver = true;
}
    

function reset(){
    gameOver.isGameOver = false
    for (const diamond of diamonds){
        diamond.score = 0;
    }
}