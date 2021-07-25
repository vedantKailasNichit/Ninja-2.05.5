/////////////////////////////////  GAME -  CUBE NINJA  //////////////////////////////////////////

//--------------------------------All Variable Start-----------------------------------\\
var ninja;
var ground;
var b1, b2, b3, b4, b5, b6, b7, b8;
//---------Movment And Gravity Variable----------\\
var gravity = 7, jump = 20;
var ninjaSpeed = 13;
//--Canvas--\\
var canavs;
//--------Definig Level----------\\
var levels = 1;
//--------------------------------All Spawn Position Variable------------------------------------\\
var spwanPointX = 400, spwanPointY= 100;
var spwanTeleX = 600, spwanTeleY = 350;
//--------------------------------------------------------------------\\
var Mode = 1, runtime = -1;
//-------------------Buttons-------------------------\\
var play, pauseButton;
//--------------------------------All Variable End-----------------------------------\\

//-------------------Setup Function were we createSprites-------------------------\\
function setup() {
  canavs = createCanvas(1314, 600);

  //---------------------Ninja Or Player-----------------------\\
  ninja = createSprite(spwanPointY,spwanPointX,20,30);
  ninja.shapeColor = rgb(0,0,0);

  //-------------------Ground Or Platform-------------------------\\
  ground = createSprite(width/2,600,width*2,50);
  //----------------------Teleporter Which Teleportes to diffrent level ? Ya----------------------\\
  teleporter = createSprite(600,350,50,80); 
  teleporter.shapeColor = "green";
  teleporter.visible = false;
  //------------------------------ menu Button --------------------------------------\\
  pauseButton = createSprite(50,40,50,50);
  pauseButton.shapeColor = 'gray';
  pauseButton.visible = false;
}

//------------------ Draw Function --------------------------\\
function draw() {
  background(220);  
  if(Mode === 1){
    if(runtime === -1){
      runtime = 0;
      main();
    }
    if(mousePressedOver(play)){
      Mode = 2;
      runtime = 1;
    }
    collide(ninja,play);
  }
  if(Mode === 2){
    teleporter.visible = true;
    pauseButton.visible = true;
    play.visible = false;
    if(ninja.isTouching(teleporter) && levels === 1){
      console.log('Teleported');
      levels = 2;
      ninja.x = 200;
      ninja.y = 150;
      teleporter.y = 350;
      teleporter.x = 800;
    }

    //------------------------------- Levels Called ----------------------------------------\\
    if(levels === 1 && runtime === 1){
      runtime = 2;
      level1();
    }
    if(levels === 2 && runtime === 2){
      runtime = 3;
      level2();
    }
    if(levels === 1){
      collide(ninja,b1);
      collide(ninja,b2);
      collide(ninja,b3);
    }
    if(levels === 2){
      b1.destroy();
      b2.destroy();
      b3.destroy();
      collide(ninja,b4);
      collide(ninja,b5);
      collide(ninja,b6);
      if(ninja.isTouching(ground)){
        ninja.x = 200
        ninja.y = 150;
      }
    }

    //--------------------------------------- Level Displaying Code ----------------------------------------\\
    textSize(30);
    fill('#222222');
    //stroke(0);
    //strokeWeight(2);
    text("Level - " + levels, 1100,60);
  }
  collide(ninja,ground);
  move(ninja);
  drawSprites();
}

//------------------------------- Collide Function --------------------------------------\\
function collide(ninja,block){
  if(ninja.isTouching(block)){
    ninja.velocityY = 0;
    ninja.collide(block);

    if(keyDown(UP_ARROW)){
      ninja.velocityY = jump * -1;
    }    
  }
  else{
    ninja.velocityY = ninja.velocityY + 0.4;
  }
  
}


//----------------------------- Right And Left Movement Of A Object --------------------------\\
function move(object){
  if(keyDown(RIGHT_ARROW)){
    object.x += 13;
  }

  if(keyDown(LEFT_ARROW)){
    object.x += 13 * -1;
  }
}

//------------------------------ Main Menu Function Display -----------------------------------\\
function main(){
  play = createSprite(width/2,300,200,50);
  play.shapeColor = 'yellow';
  play.visible = true;

}


//-------------------------------Levels Fucntion Are Made Here(Start) --------------------------------------\\
function level1(){
  b1 = createSprite(150,500,200,20);
  b2 = createSprite(350,450,200,20);
  b3 = createSprite(600,400,200,20);
}

function level2(){
  b4 = createSprite(200,200,200,20);
  b5 = createSprite(500,300,200,20);
  b6 = createSprite(800,400,70,20);
}

//------------------------------- End --------------------------------------\\

