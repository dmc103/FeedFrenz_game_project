//canva setup
const canvas = document.getElementById ("canvas1");

//to get access to 2D drawing method
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

//scoring progression
let score = 0;
let gameFrame = 0; //to spawn small fishes every 100 frames//
ctx.font = '25px Georgia'; // to display text


//mouse capture
let insideCanvas = canvas.getBoundingClientRect(); // track mouse within the canvas

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

//mouse interactivity
canvas.addEventListener('mousedown', function(event){
    mouse.click = true;
    mouse.x = event.x - insideCanvas.left;
    mouse.y = event.y - insideCanvas.top;
});

canvas.addEventListener('mouseup', function(){
    mouse.click = false;

});


//Initiating the game with the Start Button

// const startButton = document.getElementById('startButton');
// let gameStarted = false;


// startButton.addEventListener('click', function (){
//     if(!gameStarted){
//         gameStarted = true;
//         anchiovyControl();
//     }
// });





//Player
const playerFishLeft = new Image();
playerFishLeft.src = './images/Blue_left_fish.png';

const playerFishRight = new Image();
playerFishRight.src = './images/Blue_right_fish.png';


class Player {
    constructor(){
        this.x = 0;
        this.y = canvas.height / 2;
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
            ctx.lineWidth = 0.1;
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


//Anchiovy
const anchiovyArray = [];

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
            this.widthSpriteSheet/7, 
            this.heightSpriteSheet/7);
    }

};



class silverAnchiovy extends anchiovy {

    update(){
        this.x -= this.speed;
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        this.distance = Math.sqrt(distX * distX + distY*distY);
    }


    draw(){
        // ctx.fillStyle = "white";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        ctx.drawImage(anchiovyImageSilver, this.frameX * this.widthSpriteSheet,
            this.frameY * this.heightSpriteSheet,
            this.widthSpriteSheet, 
            this.heightSpriteSheet,
            this.x - 40, this.y - 15, 
            this.widthSpriteSheet/7, 
            this.heightSpriteSheet/7);
    }

}





//to add sound
const eatSound1 = document.createElement('audio');
eatSound1.src = './sound/bite_sound.wav';

// const eatSound2 = document.createElement('audio');
// eatSound2.src = './sound/pop.ogg';




function anchiovyControl (){
    if(gameFrame % 60 === 0){
        anchiovyArray.push(new anchiovy());
        anchiovyArray.push(new silverAnchiovy());

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




//Animation Loop
function animate (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    anchiovyControl();
    player.update();
    player.draw();
    ctx.fillStyle = "white";
    ctx.fillText("points:" + score, 850, 485);
    gameFrame ++;
    requestAnimationFrame(animate);

}
animate();