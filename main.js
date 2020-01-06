// For the game
let pause = true;
let delayOn = false;

const WIDTH = 400,
HEIGHT = 600;

const bird_configs = {
    gravity: 0.6,
    lift: -14,
    air_res: 1
};

let birds = [];
let player_bird;

let game = new Game();

let backgroundImg;
let birdFlappingUpImg;
let birdMidFlapImg;
let birdFlappingDownImg;
let pipeHeadImg;
let shaftImg;

// For tml5
const tml5 = new TML5();

// Note: The pipe, background and ground images are from Code Bullet, credit goes to him for those images.
// Note: The bird images and font are from https://flappybird.io/, credit goes to Max McDonnell @mxmcd for those images.
function preload() {
    // For the game
    backgroundImg = loadImage('images/background.png');
    birdFlappingUpImg = loadImage('images/birdFlappingUp.png');
    birdMidFlapImg = loadImage('images/birdMidFlap.png');
    birdFlappingDownImg = loadImage('images/birdFlappingDown.png');
    pipeHeadImg = loadImage('images/pipeHead0000.png');
    shaftImg = loadImage('images/shaft0000.png');

    // For the tml5
    tml5.init(TML5_CONFIG);
}

function setup(){
    // P5
    createCanvas(1200, 1200);
    background(0);

    // Bird
    player_bird = new Bird(bird_configs.gravity, bird_configs.lift, bird_configs.air_res);
    birds.push(player_bird);

    // Game
    game.init();
    game.setUpBirds(birds);

    // tml5
    tml5.setUpVideo();
    tml5.classifyVideo();
}

function draw(){
    // P5
    background(0);

    // Game
    image(backgroundImg, 0, 0, WIDTH, HEIGHT);
    // Score
    textSize(30);
    fill(0);
    text(`Score: ${game.score_show}`, WIDTH - 130, HEIGHT - 50); 

    if(!pause){
        let is_done = game.updateFrame(birdFlappingUpImg, birdMidFlapImg, birdFlappingDownImg, pipeHeadImg, shaftImg);
        if(is_done){
            pause = !pause;
            game.resetGame();
            birds = [];
            player_bird = new Bird(bird_configs.gravity, bird_configs.lift, bird_configs.air_res);
            birds.push(player_bird);
            game.setUpBirds(birds);
        }
    }
    if(label){
        tml5.drawVideo();
    }
}

function keyPressed(){
    if(key === 'p'){
        pause = !pause;
    }
}

// Util for tml5 to talk to bird
function playBird(bird){
    if(!delayOn){
        if(label === 'Jump (1)'){
            bird.birdJump();
            delayOn = true;
            setTimeout(function(){
                delayOn = false;
            }, 300);
        }
    }
}