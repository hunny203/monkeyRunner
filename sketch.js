
var monkey , monkey_running ;
var banana ,bananaImage, obstacle, obstacleImage ;
var bananaGrp, obstacleGrp ;
var score = 0 , number=0;

var PLAY = 1 , END = 0 , gameState = 1 ;

var ground ;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyStop = loadImage("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas (600,400);
  
  monkey = createSprite (80,320,50,50);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.15;
  
  monkey.debug = true ;
  
  ground = createSprite(200,380,800,10);
 //ground.velocityX = -4; 
  
  ground.velocityX = -(4 + 3* score/10)
  ground.shapeColor = "darkgreen" ;
  //ground.x = ground.width /2 ;
  
   
   
  
  bananaGrp = createGroup();
   obstacleGrp = createGroup();
  
 // score = 0;
}


function draw() {
  background(200, 500, 100);


  if(gameState === PLAY){
    
    stroke ("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.ceil(frameCount/frameRate());
    
    
  
   text ("Survival time :" +score , 30 ,30 );
    
     stroke("black");
  textSize(20);
  fill("black");
 
    text ("Number of bananas :" +number , 350 ,30 );
  
   if (keyDown("space") && monkey.y >= 150){
    monkey.velocityY = -10;
  }
  
monkey.velocityY = monkey.velocityY + 0.4;
  monkey.collide(ground);
  
  if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
  if (frameCount % 200 === 0){
    banana = createSprite (500,300,20,20);
    banana.addImage (bananaImage);
    banana.scale = 0.12 ;
    
    banana.x = Math.round (random(400,550));
    banana.y = Math.round (random(50,200));
    banana.velocityX = -(3 + score/10);
    banana.lifetime= 150;
    
   bananaGrp.add(banana);
  }
  
  
  
  if(frameCount % 180 === 0){
    obstacle = createSprite(200,200,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.12 ;
    obstacle.y = 352 ; 
    
    obstacle.x = Math.round(random(500,580));
   // obstacle.velocityX = -4;
    
    obstacle.velocityX = -(6 + score/10);
    obstacle .lifetime= 150;
    
    obstacleGrp.add(obstacle);
}
  
  if(bananaGrp.isTouching(monkey)){
   number = number + 1 ;
    
    bananaGrp.destroyEach();
    
    
    
    
  
   
  
  }
  
  
  }
  
   if(monkey.isTouching(obstacleGrp)){
    obstacleGrp.destroyEach();
    bananaGrp.destroyEach();
    gameState = END ;
   
  }
 
  if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 5;
    obstacleGrp.lifetime = 0;
    bananaGrp.lifetime = 0 ;
    
     stroke("black");
  textSize(20);
  fill("black");
  score = score ;
  
   text ("Survival time :" +score , 200 ,200 );
    
    stroke("black");
  textSize(20);
  fill("black");
 number = number ;
  
 text ("Number of bananas :" +number , 200 ,100 );
  
    
  }
  
  

   
 
  
  drawSprites();
}


  




