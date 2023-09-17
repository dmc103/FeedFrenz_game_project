//canva setup
const canvas = document.getElementById ("canvas1");

//to get access to 2D drawing method
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

//scoring progression
let score = 0;
let gameFrame = 0; //to spawn small fishes every 100 frames//
ctx.font = '50px Georgia'; // to display text


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


//Player
class Player {
    constructor(){
        this.x = 0;
        this.y = canvas.height / 2;
        this.radius = 30;
        this.angle = 0;
        this.frameX = 0; //so the fish will face the direction where it is swimming
        this.frameY = 0; //so the fish will face the direction where it is swimming
        this.frame = 0; //to track the number of frames in the sprite sheet
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
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius, 0, Math.PI * 2);
        ctx.fill ();
        ctx.closePath();


    }


}

const player = new Player ();


//Anchiovy
const anchiovyArray = [];
class anchiovy {
    constructor (){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 30;
        this.speed = Math.random() * 5 + 1;
        this.distance;

    }

    update(){
        this.x -= this.speed;
    }
    

    draw(){
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

}


function anchiovyControl (){
    if(gameFrame % 50 === 0){
        anchiovyArray.push(new anchiovy());
        console.log(anchiovyArray.length);

    }
    for (let i = 0; i < anchiovyArray.length; i++){
        anchiovyArray[i].update();
        anchiovyArray[i].draw();
    }
}




//Animation Loop
function animate (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    anchiovyControl();
    player.update();
    player.draw();
    gameFrame ++;
    requestAnimationFrame(animate);

}
animate();