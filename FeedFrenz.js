//CANVAS SETUP
const canvas = document.getElementById ("canvas1");

//TO GET ACESS TO 2D DRAWING
const ctx = canvas.getContext('2d');

canvas.width = 1350;
canvas.height = 650;


//INITIALIZE GAME STATE
let gameStarted = false; 
let timer = 120;
let gameOver = false;
// let anotherLevel = false;
// let levelCounter = 0;



function startGame (){
    gameStarted = true;
    timer = 60;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('introText').style.display = 'none';
    document.getElementById('level1').style.display = 'none';
    document.getElementById('level2').style.display = 'none';
   

    backgroundMusic.play();
    
    setInterval(countDown, 500);

};



function countDown (){
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    const timerElement = document.getElementById('timer');

    let minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
    let secondsDisplay = seconds < 10 ? '0' + seconds : seconds;

    timerElement.innerText = minutesDisplay + ':' + secondsDisplay;
    

    if(timer === 0) {
        if(score > 0){
            nextLevel();
        } else {
            gameOverControl();
        }
    } else {
        timer--;
    }

};




//GAMEOVER
function gameOverControl (){ 
    gameStarted = false;
    gameOver = true;
    gameOverSound.play();
    backgroundMusic.pause();
    document.getElementById('nextbtn').style.display = 'none';
    document.getElementById('levelcompleteMsg').style.display = 'none';
    document.getElementById('tryAgain').style.display = 'block';
    document.getElementById('gameoverMsg').style.display = 'block';

};

const restartGame = document.querySelector('tryAgain');
tryAgain.addEventListener('click', () => {
    window.location.reload();
    
});



//SCORING PROGRESSION
let score = 0;
let gameFrame = 0;
ctx.font = '25px fantasy'; // to display text




//LEVEL COMPLETED
function nextLevel (){
    gameStarted = false;
    winMusic.play();
    backgroundMusic.pause();
    document.getElementById('nextbtn').style.display = 'block';
    document.getElementById('levelcompleteMsg').style.display = 'block';
    document.getElementById('tryAgain').style.display = 'none';
    document.getElementById('gameoverMsg').style.display = 'none';


};



//START NEW LEVEL
function startNewLevel (){
    gameStarted = true;
    timer = 60;
    gameOver = false;
    backgroundMusic.play();
    winMusic.pause();
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('introText').style.display = 'none';
    document.getElementById('level1').style.display = 'none';
    document.getElementById('nextbtn').style.display = 'none';
    document.getElementById('levelcompleteMsg').style.display = 'none';
    document.getElementById('tryAgain').style.display = 'none';
    document.getElementById('gameoverMsg').style.display = 'none';
    document.getElementById('level2').style.display = 'block';

};

const nextGame = document.querySelector('nextbtn');
nextbtn.addEventListener('click', () => {
    startNewLevel();
}); 




//MOUSE CAPTURE
let insideCanvas = canvas.getBoundingClientRect(); 

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
};




//MOUSE INTERACTIVITY
canvas.addEventListener('mousemove', function(event){
    mouse.click = true;
    mouse.x = event.x - insideCanvas.left;
    mouse.y = event.y - insideCanvas.top;
});

canvas.addEventListener('mouseup', function(){
    mouse.click = false;

});




//TO ADD SOUND
const eatSound1 = document.createElement('audio');
eatSound1.src = './sound/bite_sound.wav';

const scoreFail = document.createElement('audio');
scoreFail.src = './sound/score_fail.wav';

const gameOverSound = document.createElement('audio');
gameOverSound.src = './sound/gameover.wav';

const backgroundMusic = document.createElement('audio');
backgroundMusic.src ='./sound/background_music.mp3';

const winMusic = document.createElement('audio');
winMusic.src = './sound/win2music.wav';

const starSound = document.createElement('audio');
starSound.src = './sound/shimmer_1.wav';



//PLAYER
const playerFishLeft = new Image();
playerFishLeft.src = './images/Blue_left_fish.png';

const playerFishRight = new Image();
playerFishRight.src = './images/Blue_right_fish.png';


class Player {
    constructor(){
        this.x = canvas.height / 2;
        this.y = 0;
        this.radius = 30;
        this.angle = 0;
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0; 
        this.widthSpriteSheet = 498;
        this.heightSpriteSheet = 327;
    }

    //UPDATE PLAYER POSITION
    update(){
        const distX = this.x - mouse.x;
        const distY = this.y - mouse.y;
        if(mouse.x != this.x){
            this.x -= distX/20;
        }
        if(mouse.y != this.y){
            this.y -= distY/20;
        }
    }

    draw(){
        if (mouse.click){
            ctx.lineWidth = 0.01;
            ctx.beginPath();
            ctx.moveTo(this.x , this.y);
            ctx.lineTo(mouse.x , mouse.y);
            ctx.stroke(); // to draw the line between 2 points

        }
       //to draw a circle that represents the player
        // ctx.fillStyle = "blue";
        // ctx.beginPath();
        // ctx.arc(this.x , this.y , this.radius, 0, Math.PI * 2);
        // ctx.fill ();
        // ctx.closePath();
        // ctx.fillRect(this.x, this.y, this.radius, 10);


        //To determine which direction the fish should face, based on mouse position
        const blueFish = mouse.x < this.x ? playerFishLeft : playerFishRight;



        ctx.drawImage (blueFish, 
            this.frameX * this.widthSpriteSheet,
            this.frameY * this.heightSpriteSheet,
            this.widthSpriteSheet, 
            this.heightSpriteSheet,
            this.x - 45, this.y - 30, 
            this.widthSpriteSheet/6, 
            this.heightSpriteSheet/6);

    }


}


const player = new Player ();


//Fish Arrays
const anchiovyArray = [];
const silverAnchioArray = [];
const enemyFish1 = [];
const yellowPowerArr = [];


const anchiovyImagePink = new Image();
anchiovyImagePink.src = './images/pink_anchiovis.png'; 

const anchiovyImageSilver = new Image();
anchiovyImageSilver.src = './images/silver_anchiovis.png';

const redFishEnemy = new Image();
redFishEnemy.src = './images/enemy_fish.png';


const yellowStar = new Image();
yellowStar.src = './images/yellow_star.png';



class anchiovy {
    constructor (){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.count = false;
        this.sound = 'eatSound1';
        this.angle = 0;
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0; 
        this.widthSpriteSheet = 503;
        this.heightSpriteSheet = 165;
    }



    update(){
        this.x += this.speed;
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        this.distance = Math.sqrt(distX * distX + distY*distY);
    }


    draw(){
        // ctx.fillStyle = "yellow";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        ctx.drawImage(anchiovyImagePink, this.frameX * this.widthSpriteSheet,
            this.frameY * this.heightSpriteSheet,
            this.widthSpriteSheet, 
            this.heightSpriteSheet,
            this.x - 40, this.y - 15, 
            this.widthSpriteSheet/8, 
            this.heightSpriteSheet/8);
    }

};



class silverAnchiovy  {
    constructor () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.count = false;
        this.sound = 'scoreFail';
        this.angle = 0;
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0; 
        this.widthSpriteSheet = 503;
        this.heightSpriteSheet = 165;
    }


    update(){
        this.x -= this.speed;
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        this.distance = Math.sqrt(distX * distX + distY*distY);
    }


    draw(){
        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage(anchiovyImageSilver, this.frameX * this.widthSpriteSheet,
            this.frameY * this.heightSpriteSheet,
            this.widthSpriteSheet, 
            this.heightSpriteSheet,
            this.x - 30, this.y - 15, 
            this.widthSpriteSheet/8, 
            this.heightSpriteSheet/8);
    }

}




function anchiovyControl (){
    if(gameStarted){
        if(gameFrame % 50 === 0){
            anchiovyArray.push(new anchiovy());
        }
        for (let i = 0; i < anchiovyArray.length; i++){
            anchiovyArray[i].update();
            anchiovyArray[i].draw();

            if(anchiovyArray[i].distance < anchiovyArray[i].radius + player.radius){
                if(!anchiovyArray[i].counted){
                    if(anchiovyArray[i].sound == 'eatSound1'){
                        eatSound1.play();
                    }
                    score++;
                    anchiovyArray[i].counted = true;
                    anchiovyArray.splice(i, 1);
                }

            }

        }
            

    }

   
}




function silverAnchiovyControl (){
    if(gameStarted){
        if(gameFrame % 80 === 0){
            silverAnchioArray.push(new silverAnchiovy());
        }
        for(let i = 0; i < silverAnchioArray.length; i++){
            silverAnchioArray[i].update();
            silverAnchioArray[i].draw();

            if(silverAnchioArray[i].distance < silverAnchioArray[i].radius + player.radius){
                if(!silverAnchioArray[i].counted){
                    if(silverAnchioArray[i].sound == 'scoreFail'){
                        scoreFail.play();
                    }
                    score -= 2;
                    silverAnchioArray[i].counted = true;
                    silverAnchioArray.splice(i,1);
                }
            }
        }
    }

}



//ENEMY1

class redEnemy {
    constructor (){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 55;
        this.speed = Math.random() * 2 + 2;
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0; 
        this.widthSpriteSheet = 622;
        this.heightSpriteSheet = 451;
    }

    update(){
        this.x += this.speed;
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        this.distance = Math.sqrt(distX * distX + distY*distY);

    }


    draw(){
        // ctx.fillStyle = "yellow";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        ctx.drawImage(redFishEnemy, 
            this.frameX * this.widthSpriteSheet, 
            this.frameY * this.heightSpriteSheet, 
            this.widthSpriteSheet,
            this.heightSpriteSheet, 
            this.x - 70, this.y - 45, this.widthSpriteSheet/4, this.heightSpriteSheet/4);
    
    }

}


const fishEnemy = new redEnemy();


function redEnemyControl () {
    if(gameStarted && !gameOver){
        if(gameFrame % 80 === 0){
            enemyFish1.push(new redEnemy());
        }
        for(let i = 0; i < enemyFish1.length; i++){
            enemyFish1[i].update();
            enemyFish1[i].draw();

            if(enemyFish1[i].distance < enemyFish1[i].radius + player.radius){
                if(!enemyFish1[i].counted){
                    if(enemyFish1[i].sound == 'scoreFail'){
                        scoreFail.play();
                    }
                    score = 0;
                    enemyFish1[i].counted = true;
                    enemyFish1.splice (i, 1);

                    gameOver = true;
                    gameOverControl();
                    timer = 0;
                }
            }
        }
    }
    
}



//POWERUP

class powerStar {
    constructor (){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 40;
        this.speed = Math.random() * 2 + 2;
        this.frameX = 0;
        this.sound = 'starSound';
        this.frameY = 0; 
        this.frame = 0; 
        this.widthSpriteSheet = 512;
        this.heightSpriteSheet = 512;
    }

    update(){
        this.y -= this.speed;
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        this.distance = Math.sqrt(distX * distX + distY*distY);

    }


    draw(){
        // ctx.fillStyle = "yellow";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        ctx.drawImage(yellowStar, 
            this.frameX * this.widthSpriteSheet, 
            this.frameY * this.heightSpriteSheet, 
            this.widthSpriteSheet,
            this.heightSpriteSheet, 
            this.x - 20, this.y - 15, this.widthSpriteSheet/10, this.heightSpriteSheet/10);
    
    }


}

const powerUp1 = new powerStar();


function extraTime (){
    timer += 10;
}



function powerUpControl (){
    if(gameStarted){
        if(gameFrame % 250 === 0){
            yellowPowerArr.push(new powerStar());
        }
        for(let i = 0; i < yellowPowerArr.length; i++){
            yellowPowerArr[i].update();
            yellowPowerArr[i].draw();

            if(yellowPowerArr[i].distance < yellowPowerArr[i].radius + player.radius){
                if(!yellowPowerArr[i].counted){
                    if(yellowPowerArr[i].sound == 'starSound'){
                        starSound.play();
                    }
                    score += 5;
                    yellowPowerArr[i].counted = true;
                    yellowPowerArr.splice(i,1);
                    extraTime();
                }
            }
        }
    }

}







//ANIMATION LOOP
function animate (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    anchiovyControl();
    silverAnchiovyControl();
    redEnemyControl();
    powerUpControl();
    player.update();
    player.draw();
    ctx.fillStyle = "white";
    ctx.fillText("Score:" + " " + score, 1200, 45);
    gameFrame ++;
    requestAnimationFrame(animate);

}

animate();


