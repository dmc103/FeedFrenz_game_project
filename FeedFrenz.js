//canva setup
const canvas = document.getElementById ("canvas1");

//to get access to 2D drawing method
const ctx = canvas.getContext('2d');

canvas.width = 1350;
canvas.height = 650;


//Initialize game state with start button and timer
let gameStarted = false; 
let timer = 120;

function startGame (){
    gameStarted = true;
    timer = 120;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('introText').style.display = 'none';
    document.getElementById('level1').style.display = 'none';
    
    setInterval(countDown, 1000);
};

    


function countDown (){
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    const timerElement = document.getElementById('timer');

    let minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
    let secondsDisplay = seconds < 10 ? '0' + seconds : seconds;

    timerElement.innerText = minutesDisplay + ':' + secondsDisplay;
    timer --;

};
    



//scoring progression
let score = 0;
let gameFrame = 0;
ctx.font = '25px fantasy'; // to display text



//mouse capture
let insideCanvas = canvas.getBoundingClientRect(); 

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}


//mouse interactivity
canvas.addEventListener('mousemove', function(event){
    mouse.click = true;
    mouse.x = event.x - insideCanvas.left;
    mouse.y = event.y - insideCanvas.top;
});

canvas.addEventListener('mouseup', function(){
    mouse.click = false;

});


//To add sound
const eatSound1 = document.createElement('audio');
eatSound1.src = './sound/bite_sound.wav';

const scoreFail = document.createElement('audio');
scoreFail.src = './sound/score_fail.wav';



//Player
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

    //to update player position
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


//Anchiovy Arrays
const anchiovyArray = [];
const silverAnchioArray = [];


const anchiovyImagePink = new Image();
anchiovyImagePink.src = './images/pink_anchiovis.png'; 

const anchiovyImageSilver = new Image();
anchiovyImageSilver.src = './images/silver_anchiovis.png';


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
        this.x -= this.speed;
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
        this.radius = 25;
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
            this.widthSpriteSheet/9, 
            this.heightSpriteSheet/9);
    }

}




function anchiovyControl (){
    if(gameStarted){
        if(gameFrame % 70 === 0){
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
        if(gameFrame % 20 === 0){
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




//Animation Loop
function animate (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    anchiovyControl();
    silverAnchiovyControl();
    player.update();
    player.draw();
    ctx.fillStyle = "white";
    ctx.fillText("Score:" + " " + score, 1200, 45);
    gameFrame ++;
    requestAnimationFrame(animate);

}
animate();


