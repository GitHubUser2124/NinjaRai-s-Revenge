var ninja, ninjaRunning;
var ground, groundImg;
var backdrop, backdropImg;
var platform, platformImg, platformG;
var gameState = "play";
var score = 0;

function preload(){
    ninjaRunning = loadAnimation("Ninja Running 1.png","Ninja Running 2.png","Ninja Running 3.png","Ninja Running 4.png","Ninja Running 5.png","Ninja Running 6.png");
    groundImg = loadImage("Ground.png");
    backdropImg = loadImage("Backdrop.png");
    platformImg = loadImage("Fire.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //Backdrop
    backdrop  = createSprite(width/2, height/2);
    backdrop.addImage("Backdrop", backdropImg);
    backdrop.scale = 6;
    
    //Ground
    ground = createSprite(width/2, height+100);
    ground.addImage("Ground", groundImg);
    ground.velocityX=-5;
    ground.debug = false;
    ground.setCollider("rectangle", 0, 0, 500, 110);
    ground.scale = 4;

    //Ninja
    ninja = createSprite(width/8, height/2);
    ninja.addAnimation("Ninja Running", ninjaRunning);
    ninja.setCollider("rectangle", 0, 0, 150, 200);
    ninja.debug = false;

    platformG = new Group();    
}

function draw() {
    background("white");

    if(gameState === "play"){
        //Infinte Ground and Backdrop
        if(ground.x<670){
            ground.x = width/2;
        }

        //Gravity
        ninja.velocityY+=0.5;
        
        //Player Jump
        if(keyDown(UP_ARROW)){
            ninja.velocityY=-10;
        }
        
        spawnPlatforms();

        if(frameCount%10===0){
            score+=1;
        }
        text("Score: "+score, width-20, height-400);

        if(ninja.isTouching(platformG)){
            gameState = "end";
        }

        
    }

    if(gameState === "end"){
        platformG.destroyEach();
        ground.destroy();
        ninja.destroy();
        backdrop.destroy();
        textSize(50);
        textFont("Franklin Gothic");
        text("You LOST IMAGINE LOSING (reload)", width/4, height/2);
    }
    
    
    

    //Collide with ground
    if(ninja.isTouching(ground)){
        ninja.collide(ground);
    }

    

    

    drawSprites();
}

function spawnPlatforms(){
    if(frameCount%60===0){
        platform = createSprite(width-100, height);
        platform.addImage("Platform", platformImg);
        platform.y = Math.round(random(600, 100)); 
        platform.velocityX=-5;
        platform.scale = 0.4;
        platformG.add(platform);
    }
    
    
    
}