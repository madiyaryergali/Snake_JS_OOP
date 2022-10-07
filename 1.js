$('document').ready(function(){//kind of css file :)
    $('body').css({"align-items":"center", 
                    "margin": "0px",
                    "padding": "0px",
                    "display":"flex",
                    "flex-direction":"column",
                    "justify-content": "center"});
    $('canvas').css({"box-shadow":"black 20px 10px 50px"});
});

// let yvelocity;
// let xvelocity;

class Snake{
    //canvas elements
    canvas = $('#board').get(0);
    ctx = this.canvas.getContext('2d');;

    //speed parts
    speed = 7;
    tileCount = 20;

    tileSize=this.canvas.clientWidth/this.tileCount-2;

    xvelocity = 0;
    yvelocity = 0;

    //head position
    headX =10;
    headY= 10;

    //snake Parts
    snakeParts = [];
    
    //initial tail length
    tailLength = 2;

    //food Position
    foodX = 5;
    foodY = 5;

    //score
    score = 0;

    constructor(){
        this.xvelocity =0;
        this.yvelocity = 0;
        // this.canvas = $('#board').get(0);
        // this.ctx = this.canvas.getContext('2d');
        // this.tileSize = this.canvas.clientWidth/this.tileCount-2;
        this.drawGame();
        document.addEventListener('keydown', () =>{this.keyDown()});//adding event listener
    }


    drawGame(){
        // setInterval( ()=> {
        this.changeSnakePosition();
        console.log('draw');

        //check for the game over state: following a game over logic
        let result = this.isGameOver();
        if(result) {
            return;
        }

        this.clearScreen();
        this.drawSnake();
        this.drawFood();

        this.checkAteFood();
        this.drawScore();
        // }, 1000/this.speed);
        
        setTimeout(()=> this.drawGame(), 1000/this.speed);//screen update 7 times/second
    }

    //game over function
    isGameOver(){
        let gameOver = false;

        //checking for game to start
        if(this.yvelocity===0 & this.xvelocity===0){
            return false;
        }

        //left wall hit
        if(this.headX<0){
            gameOver = true;
        }

        //right wall hit
        else if(this.headX === this.tileCount){
            gameOver = true;
        }

        //top wall hit
        if(this.headY<0){
            gameOver = true;
        }

        //bottom wall hit
        if(this.headY === this.tileCount){
            gameOver = true;
        }

        //hit its own body (crash)

        for(let i = 0; i < this.snakeParts.length; i++){
            let part = this.snakeParts[i];
            //checking if two parts of the snake are on the same spot
            if(part.x ==this.headX && part.y ==this.headY){
                gameOver = true;
                break;//stop the loop
            }
        }

        //display game over words
        if(gameOver){
        this.gameOverDisplay();
        }

        return gameOver;//stop the execution of drawgame if it is over
    }

    gameOverDisplay(){
        this.ctx.fillStyle = "white";
        this.ctx.font = "50px verdana";
        this.ctx.fillText("Game Over!", this.canvas.clientWidth/6.5, this.canvas.clientHeight/2); //center position
    }

    //score function
    drawScore(){
        this.ctx.fillStyle = "white";//color
        this.ctx.font = "10px verdana";//font
        this.ctx.fillText("Score: " + this.score, this.canvas.clientWidth-50, 10);//right top corner position
    }

    //clear Screen
    clearScreen(){
        this.ctx.fillStyle = "black";//make screen black
        this.ctx.fillRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);//entire screen
    }

    //draw snake
    drawSnake(){
        this.ctx.fillStyle = "green";//color of snake parts

        //loop over snake parts
        for(let i =0; i< this.snakeParts.length; i++){
            let part = this.snakeParts[i];
            this.ctx.fillRect(part.x*this.tileCount, part.y*this.tileCount, this.tileSize, this.tileSize);
        }
        
        //push snake parts
        this.snakeParts.push(new snakePart(this.headX, this.headY));
        
        if(this.snakeParts.length > this.tailLength){
            this.snakeParts.shift();//remove furthest item if we have more than our tail
        }

        //drawHead
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(this.headX*this.tileCount, this.headY* this.tileCount, this.tileSize, this.tileSize);

    }

    //snake position change function
    changeSnakePosition(){
        this.headX = this.headX + this.xvelocity;
        this.headY = this.headY + this.yvelocity;
    }

    //draw food
    drawFood(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.foodX* this.tileCount, this.foodY*this.tileCount, this.tileSize, this.tileSize);
    }

    //check if head snake ate the food and create another food on another place
    checkAteFood(){
        if(this.foodX==this.headX && this.foodY==this.headY){
            this.foodX = Math.floor(Math.random()* this.tileCount);
            this.foodY = Math.floor(Math.random()* this.tileCount);
            this.snakeParts.push(new snakePart(this.headX, this.headY));
            this.tailLength++;
            this.score++;//+1 to our score
        }
    }

    //snake control logic
    keyDown(){
        if(event.code == "ArrowUp"){
            
            if(this.yvelocity==1){
                return;//prevention of snake moving in opposite direction
            }
            this.yvelocity=-1;
            this.xvelocity=0;
        }

        if(event.code == "ArrowDown"){
            if(this.yvelocity==-1){
                return;//prevention of snake moving in opposite direction
            }
            this.yvelocity=1;
            this.xvelocity=0;
        }

        if(event.code == "ArrowLeft"){
            if(this.xvelocity==1){
                return;//prevention of snake moving in opposite direction
            }
            this.yvelocity=0;
            this.xvelocity=-1;
        }

        if(event.code == "ArrowRight"){
            if(this.xvelocity==-1){
                return;//prevention of snake moving in opposite direction
            }
            this.yvelocity=0;
            this.xvelocity=1;
        }
    }
    
}

//snakePart class
class snakePart{

    constructor(x,y){
        this.x= x;
        this.y =y;
    }
}
let snake = new Snake();