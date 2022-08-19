let GLOBAL = {};
GLOBAL.ASPECT_MULTIPLIER            = 1;//default multiplier to resize stuff in canvas
GLOBAL.TILESIZE = 16 * GLOBAL.ASPECT_MULTIPLIER;
GLOBAL.BASE_DIR                     = "";
GLOBAL.PROJECT_ASSETS               = GLOBAL.BASE_DIR + "assets/";
GLOBAL.PROJECT_IMAGES               = GLOBAL.PROJECT_ASSETS + "Images/";
GLOBAL.FRAMERATE                    = 1/15;    // frames per second
GLOBAL.CANVAS = {
    CONTAINER : ".canvas_container",
    WIDTH   : GLOBAL.TILESIZE * 40, //parseInt(window.innerWidth / 200) * 100,
    HEIGHT  : GLOBAL.TILESIZE * 35  //parseInt(window.innerHeight / 100) * 100 
}
GLOBAL.CANVAS_WIDTH = GLOBAL.CANVAS.WIDTH;
GLOBAL.CANVAS_HEIGHT = GLOBAL.CANVAS.HEIGHT;
//FONTS
GLOBAL.CHARS = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:-';
GLOBAL.MAPS = {};
GLOBAL.SOUNDS = {};
GLOBAL.IMAGES = {};
//Assets To Load
GLOBAL.Assets = {
    "loaded" : 0,
    "images_url" : [
        'player1.gif',
        '001.gif',
        '002.gif',
        '003.gif',
        'black-font-8.gif',
        'grass.gif',
        'stone.gif',
        'water.gif',
        'dirt.gif',
        'map1.gif',
        'zombie.gif',
        'hero1.gif',
    ],
    "json_url" : [],
    "sounds_url" : [],
    "images"    :{},
    "json"      :{},
    "sounds"    :{}
}
GLOBAL.Assets.count = 
    GLOBAL.Assets.images_url.length + 
    GLOBAL.Assets.json_url.length + 
    GLOBAL.Assets.sounds_url.length;
function rotateCW(image,times,passed = 0){
    let buffer = document.createElement('canvas');
    buffer.width = this.entityManager.size;
    buffer.height = this.entityManager.size;
    let context = buffer.getContext('2d');
    let x = 0;
    let y = 0;
    if(passed == 1){
        x = image.width /4;
        y = image.width /2;
    }
    // context.setTransform(
    //     0,1,-1,0,this.tank.size,0
    // );
    context.rotate(Math.PI/4);
    context.drawImage(image,x,y);
    // context.rotate(-Math.PI/4);
    // context.setTransform(1,0,0,1,0,0);
    if(times <= 0) return buffer;
    else return this.rotateCW(buffer,times-1,passed++);
}
const DIRECTION = {
    UP              : Symbol("UP"),             //Rotation 0
    UPRIGHT         : Symbol("UPRIGHT"),        //Rotation 1
    RIGHT           : Symbol("RIGHT"),          //Rotation 2
    DOWNRIGHT       : Symbol("DOWNRIGHT"),      //Rotation 3
    DOWN            : Symbol("DOWN"),           //Rotation 4
    DOWNLEFT        : Symbol("DOWNLEFT"),       //Rotation 5
    LEFT            : Symbol("LEFT"),           //Rotation 6       
    UPLEFT          : Symbol("UPLEFT"),         //Rotation 7
}
function getDirection(rotation){
    rotation = rotation % 7;
    switch(rotation){
        case 0 : return DIRECTION.UP;
        case 1 : return DIRECTION.UPRIGHT;
        case 2 : return DIRECTION.RIGHT;
        case 3 : return DIRECTION.DOWNRIGHT;
        case 4 : return DIRECTION.DOWN;
        case 5 : return DIRECTION.DOWNLEFT;
        case 6 : return DIRECTION.LEFT;
        case 7 : return DIRECTION.UPLEFT;
    }
}
const rand = (a=1, b=0)=> b + (a-b)*Math.random();
const randInt = (a=1, b=0)=> rand(a,b)|0;