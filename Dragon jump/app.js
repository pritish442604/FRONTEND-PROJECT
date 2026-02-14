
score = 0;


cross=true;

let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');
let musicStarted = false;
document.onkeydown = function (e) {

    if (musicStarted === false) {
        audio.loop = true;   
        audio.play();        
        musicStarted = true;
    }

    let dino = document.querySelector('.dino');

    if (e.key === "ArrowUp") {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.key === "ArrowRight") {
        let x = parseInt(window.getComputedStyle(dino).left);
        dino.style.left = (x + 112) + "px";
    }

    if (e.key === "ArrowLeft") {
        let x = parseInt(window.getComputedStyle(dino).left);
        dino.style.left = (x - 112) + "px";
    }
}


setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() =>{
        audiogo.pause();
        audio.pause();
        },1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';

            console.log('New animation duration: ',newDur)

        }, 500);

    }

}, 10);
function updateScore(score) {
   scoreCont.innerHTML = "Your Score: " + score
}

