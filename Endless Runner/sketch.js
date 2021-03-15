const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;


var PLAY=1;
var END=0;
var gameState=PLAY;
var img,img2,endimg,end,word,wordimg;
var engine,world;
var ground,ground2,player,running,standing,jumping;
var invisibleGround ;
var obstacle1,obstacle2,obstacle3,obstaclesGroup;
var obstacle1img,obstacle3img,obstacle2img;
var score=0;
var word,wordimg,jump;

function preload() {


running=loadAnimation("sprites/run1.png","sprites/run2.png",
"sprites/run3.png","sprites/run4.png","sprites/run5.png",
"sprites/run6.png","sprites/run7.png","sprites/run8.png","sprites/run9.png",
"sprites/run10.png","sprites/run11.png","sprites/run12.png",
"sprites/run13.png","sprites/run14.png","sprites/run15.png")


img=loadImage("sprites/Background.png") 
img2=loadImage("sprites/second2.png")
endimg=loadImage("End.png")
wordimg=loadImage("Score.png")
object1=loadImage("obstacle1.png")
object2=loadImage("obstacle2.png")
object3=loadImage("obstacle3.png")
jump=loadSound("jump1.mp3")
  }
  function setup(){
    var canvas  = createCanvas(1000,500);
    engine = Engine.create();
    world = engine.world;

    end=createSprite(500,250,1000,250);
    end.addAnimation("end",endimg);
    end.visible=false;
    word=createSprite(850,50,1000,250);
    word.addAnimation("end",wordimg);
    word.scale=0.7;

  
 
    ground=createSprite(3380,470,1000)
    ground.addImage("groundimg",img2)
    ground.velocityX=-12

    
    player=createSprite(150,380,20,20);
    player.addAnimation("running",running)
    player.scale=0.3;
    player.visible=true;
    player.debug=false

    player.setCollider("rectangle",0,0,100,player.height)

    console.log(player.y)
    
    invisibleGround = createSprite(100,470,1000,20);
    invisibleGround.visible=false

    obstaclesGroup=createGroup();
  

  }


  function draw(){
    background(img);
    
    textSize(30)
    text(score,900,40)
   
    

    if(gameState===PLAY){
        if(ground.x<500){  
          ground.x=3000
        }
         
        score=score+Math.round(getFrameRate()/60)

        if (keyDown("space") && player.y >= 200  ) {
        player.velocityY=-12
        jump.play()
        
          }
  
        player.velocityY = player.velocityY+0.9;
    
        player.collide(invisibleGround);

        Obstacles1();
        Obstacles2();

        if(obstaclesGroup.isTouching(player)){
         gameState=END
        }
      
      }else if(gameState===END){
      end.visible=true;
      
      player.visible=false;
      obstaclesGroup.destroyEach();
      ground.setVelocity(0,0)
     
      if(keyDown("r")){
        
        reset();
        }

      }
      
    Engine.update(engine);
    drawSprites();
    

  }

  function reset(){
  gameState=PLAY
   score=0
   player.x=150
   player.visible=true;
   end.visible=false;
   ground.velocityX=-12
  }




 function Obstacles1(){
    if(frameCount%100===0){
     obstacle1=createSprite(1010,380,20,20)
     var rand=random(1,3)
     obstacle1.addAnimation("car2",object1)
     obstacle1.scale=0.40;
     obstacle1.velocityX=-(14+ 3*score/200);
     obstaclesGroup.add(obstacle1);
    }
  }

  function Obstacles2(){
    if(frameCount%330===0){
     obstacle2=createSprite(1010,380,20,20)
     obstacle2.addAnimation("car2",object2)
     obstacle2.scale=0.40;
     obstacle2.velocityX= -(14+ 3*score/200);
     obstaclesGroup.add(obstacle2);
    }
  }




