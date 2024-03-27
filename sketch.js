//Initalise Tilemap Varibles
// let w = 87; //Codes for the keyboard keys
// let a = 65;
// let s = 83;
// let d = 68;

let tilemap = [];
let numDown = 10;
let numAcross = 10;
let tileSize = 50;
let textures = [];

let graphicMap = [

[1, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
[1, 1, 1, 1, 0, 1, 0, 0, 0, 1], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0],   
[0, 1, 1, 1, 0, 1, 0, 0, 0, 0], 
[0, 1, 0, 0, 0, 1, 0, 1, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1], 
[0, 1, 0, 0, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1] 
]



let tileRules = [
[1, 0, 0, 0, 0, 1, 0, 0, 0, 1], 
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
[1, 1, 1, 1, 0, 1, 0, 0, 0, 1], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 1, 0, 1, 0, 0, 0, 0],   
[0, 1, 1, 1, 0, 1, 0, 0, 0, 0], 
[0, 1, 0, 0, 0, 1, 0, 1, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1], 
[0, 1, 0, 0, 0, 1, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 1, 0, 1, 1, 1]   
]

//Creating our hedge collisions

//INITALISING PLAYER VARIABLES

let player;
let playerSprite;
let playerSpriteRight;
let playerSpriteLeft;
let playerSpriteDown;
let playerSpeed = 5;
let playerSize = tileSize;
let playerSprites = {};

//Creating our enemy cat to follow the mouse

let cat, catColor;
let catSprite;
let catSpeed = 2;
let catFriction = 0.5;
//let catSize = tileSize;

let cheese;
let cheese1;
let cheese2;

let stage = 0;
//stage 0 = splash;
//stage 1 = game;
//stage 2 = lose;
let started = false; 
let startclick  = false; 

//let cat1;
// let cats = [];
// let catSize = 5;
// let catSpeed = 3;
// let numCats = 3;

//Loading in our sprites and art
function preload(){
textures[0] = loadImage("grass3.path.png");
textures[1] = loadImage("grass2.path.png");

//Attempting to make the mouse player face the way in which it is going
// playerSprites = {
//     up: loadImage("mouse.up.png"),
//     left: loadImage("mouse-left.png"),
//     down: loadImage("mouse-down.png"),
//     right: loadImage("mouse-right.png")
// }

playerSprites = loadImage("mouse.up.png");




// playerSprite = loadImage("mouse.up.png");
// playerSpriteRight = loadImage("mouse-right.png")
// playerSpriteLeft = loadImage("mouse-left.png");
// playerSpriteDown = loadImage("mouse-down.png");
catSprite = loadImage("ginger.cat.jpg");
//Original plan was to have 3/4 different mazes with a sidescroller feature that player moves through,
//With some of the mazes having multiple cats that follow the player, however we didn't end up being able to complete this.
//We do however have our other cat sprites made as well as some other tile images which will be attached to the folder.

//Loading cheese 

cheese = loadImage("cheese.png.png");


}

function setup() {
    if(started===false){
        createCanvas(500, 500);
      }
      started = true; 
     //Creating our tileMap
    let tileID = 0;

    for (let across = 0; across < numAcross; across++) {
        tilemap[across] = [];
        for (let down = 0; down < numDown; down++) {
            // let x = across * tileSize;
            // let y = down * tileSize;

//
            let textureNum = graphicMap[down][across];
            tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID);

            tileID++;
        }
    }
    //Introducing our player and enemy including their starting positions (classes below)

    player = new Player(playerSprites,0,3,tileSize, playerSpeed, tileSize, tileRules);
    cat = new Cat(catSprite,0,3,tileSize,catSpeed,catFriction,tileSize,tileRules);
    //cheese =  new Cheese(cheese,5,5,tileSize,tileSize,tileRules);
    cheese1 = new Cheese(cheese, 150, 300, 50, 100);
    cheese2 = new Cheese(cheese, 300, 450, 50, 100);

    //Code below was involved in trying to make the cat follow the mouse but didn't end up using it.
    //catSprite.attractionPoint(0.1,playerSprite.position.x,playerSprite.position.y);
        
    }
//Creating starting screen of game
    function draw(){
        if(stage == 0){
            splash();
          }
          
          if(stage == 1){
            fill(255);
           
            game();
          } // game only starts if stage = 1
        
          if(stage == 2){
            lose();
          }
        
          if(startclick == true){
            stage = 1;
          }
          console.log(stage);
        }

        function splash(){
            background(255, 192, 203);
            textSize(50);
            noStroke();
            strokeWeight(4);
            fill(0);
            text('Cat & Mouse', 100, 250);
            textSize(30);
            strokeWeight(10);
            text('Press Spacebar to Start Game', 50, 300);
            textSize(18);
            fill(255);
            noStroke();
            //strokeWeight(2);
            text('Use the W, A, S, D to move the mouse', 15, 480);
          }
    

function game() {
    background(0);
    
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            

            tilemap[across][down].display();
            tilemap[across][down].debug();

        
        }
//More code attempting to get cat to follow mouse.
// keyPressed();

// catSprite.friction = catFriction;

// catSprite.attractionPoint(
//     speedCat,
//     playerSprite.position.x,
//     playerSprite.position.y);
// drawSprites();

    }
    player.display();

    player.move();

    
    cat.followPlayer(player.xPos,player.yPos);
    cat.move();

    cat.display();
    cheese1.display();
    cheese2.display();
}

// function lose(){
//     background(255, 192, 203);
//     textSize(50);
//     stroke(255, 0, 0);
//     strokeWeight(3);
//     fill(0);
//     text('Game Over', 100, 250);
//     fill(255);
//     textSize(20);
//     noStroke();
//     text('Your Final Score was : ' + scoreVal, 150, 400);

//   }

//Key pressed function, controlled by wasd keys. We originally wanted our player to be able to move continiously forward
//If the key was held but were unable to figure out how to do this without breaking the code (the mouse would start moving by itself, ignoring collisions etc)
//So we decided to leave it.

//Trying to figure out how to get the mouse to face the way its going.
function keyPressed() {
     player.setDirection();

    if (key==="w"){
//         //playerSprite.rotation = 0;
        
     }

     if (key==="s"){
//        //playerSprite.rotation = 180;
    }
     if (key==="a"){
//         //playerSprite.rotation = -90;
    }
     if (key==="d"){
//         //playerSprite.rotation = 90; 
 }
startclick = true;
}

//Constructor class for player.

class Player {
    constructor(sprites, startAcross, startDown, size, speed, tileSize, tileRules){
        //Attaching sprite to key in object
        this.sprites = sprites;
        //Starting tile info
        this.across = startAcross;
        this.down = startDown;
        //Converting tile coordinates into pixels
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;
        //Size and speed
        this.size = size;
        this.speed = speed;
        //Checking rules/collisions for tile player is moving to
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        //Extra properties used to control player movement and direction
        this.dirX = 0;
        this.dirY = 0;
        //Boolean to determine Whether player is moving or not
        this.isMoving = false;
        //X and Y position of tile player is moving to
        this.tx = this.xPos;
        this.ty = this.yPos;
        //this.currentSprite = this.sprites.down;
    
    }

    //Code below was to get the player to face the direction in which they were going. This, the cat following the player and
    //Seeing the cheese was all working but something has broken the code and we can no longer see any of it.

    setDirection(){
        //boolean
        if(!this.isMoving){
                         
            if (key==="w"){
                this.dirX = 0;
                this.dirY = -1;
                this.sprites = this.sprites.up;
            }

            if (key==="s"){
                this.dirX = 0;
                this.dirY = 1;
                this.sprites = this.sprites.down;
            }
            if (key==="a"){
                this.dirX = -1;
                this.dirY = 0;
                this.sprites = this.sprites.left;
            }
            if (key==="d"){
                this.dirX = 1;
                this.dirY = 0;
                this.sprites = this.sprites.right;
            }
            this.checkTargetTile();
        
        }
    }
        

    checkTargetTile(){

    //Find out which tile player is currently on     
    this.across = Math.floor(this.xPos / this.tileSize);
    this.down = Math.floor(this.yPos / this.tileSize);
    //Calculate coordinates of target tile then check it is in bounds of map
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

    if(
        nextTileHorizontal >= 0 &&
        nextTileHorizontal < numAcross &&
        nextTileVertical >= 0 &&
        nextTileVertical < numDown
    ) {
    //If in bounds set as moveable
    if(this.tileRules[nextTileVertical][nextTileHorizontal] !=1){

    //If walkable then calculate x and y coordinate of target tile

    this.tx = nextTileHorizontal * this.tileSize;
    this.ty = nextTileVertical * this.tileSize;

    //Then we set boolean to true
    this.isMoving = true;
    }
}

}

    move(){
        if(this.isMoving){
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            if(this.xPos === this.tx && this.yPos === this.ty){
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
            }
        }
    }

    display(){
        imageMode(CORNER);
        image(this.sprites,this.xPos,this.yPos,50,50);
    }
}
//Our tile class
    class Tile {
    constructor(texture, across, down, tileSize, tileID) {
        this.texture = texture;
        this.across = across;
        this.down = down;
        this.xPos = across * tileSize;
        this.yPos = down * tileSize;
        this.tileSize = tileSize;
        this.tileID = tileID;
    }

    display() {
    noStroke();
    image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
    }
    
    debug() {
        //TILE
        noStroke();
        noFill();
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);

        noStroke();
        //fill(255);
        //textAlign(LEFT,TOP);

        text(this.tileID,this.xPos,this.yPos);
        
    }}

//Creating our cat class

class Cat {

    constructor(catSprite, startAcross, startDown,catSpeed,catFriction, size, tileSize, tileRules){
        //Attaching sprite to key in object
        this.catSprite = catSprite;
        //Starting tile info
        this.across = startAcross;
        this.down = startDown;
        this.speed = catSpeed;
        this.friction = catFriction;
        //Converting tile coordinates into pixels
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;
        //Size and speed
        this.size = size;
        //this.speed = speed;
        //Checking rules/collisions for tile player is moving to
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        //Extra properties used to control player movement and direction
        this.dirX = 0;
        this.dirY = 0;
        //Boolean to determine Whether player is moving or not
        this.isMoving = false;
        //X and Y position of tile player is moving to
        this.tx = this.xPos;
        this.ty = this.yPos;

}

//Code to get mouse to follow player - this was working but cat was going through collisions, couldn't figure out
//How to avoid this. 
    
followPlayer(playerX,playerY){

    if(this.xPos <playerX){
        this.dirX = 1;
    }
    else if (this.xPos > playerX){
        this.dirX = -1;
    } else {
        this.dirX = 0;
    }

    if(this.yPos<playerY){
        this.dirY =1;
    } else if (this.yPos > playerY){
        this.dirY = -1;
    } else {
        this.dirY = 0;
    }
    }


move(){

    this.xPos += this.speed * this.dirX;
    this.yPos += this.speed * this.dirY;
}

display(){
    console.log("cat's xPos = ", this.xPos, "Cat's yPos = ", this.yPos)
    imageMode(CORNER);
    image(this.catSprite,this.xPos, this.yPos, this.size,this.size);
}

// class Cheese {
//     constructor(x,y,s){
//         this.x = x;
//         this.y = y;
//         this.s = s;
//     }
// display(){
//     translate(this.x,this.y)
//     scale(this.s)
//     image(cheese,0,0)
 }

        
        //CONVERT SINGLE DIGIT NUMBERS TO TWO-DIGIT NUMBERS
        //Convert all one-digit tileIDs to two-digit (i.e. 0 becomes 00, 1 becomes 01, 2 becomes 01 etc.).
        // //This is so the first digit is the X axis and the second digit is the Y axis.
        // let twoDigitTileID;
        // if (this.tileID < 10) {
        //     twoDigitTileID = "0" + this.tileID;
        // } else {
        //     twoDigitTileID = this.tileID;
        // }
    

        class Cheese{
            constructor(sprite, x, y, size, points){
                this.sprite = sprite;
                this.x = x;
                this.y = y;
                this.size = size;
                this.points = points;
            }
            display(){
                imageMode(CORNER);
                image(this.sprite,this.x,this.y,this.size,this.size);
            }
        }



