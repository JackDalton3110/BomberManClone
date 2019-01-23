class Player
{
  /**
  *Constructor function that accepts key pressed events and initiates code
  moves square based on which button that's pressed
  @param {number}x assigns squares x position
  @param {number}y assigns squares y position
  @param {number}width assigns height of sqaure
  @param {number}height assigns height of square
  @param {number}colour assigns colour of square
  */
  constructor(context, imageOptions, fps, y, x, playerID)
  {
//  this.x=x;
  this.collisionUp = false;
  this.collisionDown = false;
  this.collisionLeft = false;
  this.collisionRight = false;
  this.moveX = null;
  this.moveY = null;
  this.enableLeft = null;
  this.enableRight = null;
  this.enableDown = null;
  this.enableUp = null;
  this.direction = 0;

  this.img= imageOptions.image;
  this.fps = fps;
  this.x = x;
  this.xFeet = this.x + (this.width / 2);
  this.yFeet = this.y + (this.height/2);
  this.y = y;
  this.index = 0;
  this.width = imageOptions.width;
  this.height = imageOptions.height;
  this.time = 0;
  this.ticksPerFrame = 1000/this.fps;
  this.col = 0;
  this.row = 0;
  this.i = 0;
  this.j = 0;
  this.squareSize = 75 * 0.8;

  this.maxRows=13
  this.maxCols=15

  this.moved =false
  gameNs.collides = false;

  this.imgB=new Image();
  this.imgB.src = "img/Bomb.png";
  this.tile = {};
  this.tile.width = 75;
  this.tile.height = 75;

  this.bomb = new Bomb({
    width: 256,
    height: 244,
    image: this.imgB
  }, 10, this.tile)

  this.healthSystem = new HealthSystem(playerID);

  //particle effects
  gameNs.maxParticles = 200;
  gameNs.particleSize = 1;
  gameNs.objectSize = 10;
  gameNs.life = 0;
  gameNs.maxLife = 200;
  gameNs.loop = true;
  gameNs.alpha = 255;

  gameNs.particles = [];
  gameNs.canvas = document.querySelector('canvas');
  gameNs.ctx = gameNs.canvas.getContext('2d');

  gameNs.canvas.width = window.innerWidth;
  gameNs.canvas.height = window.innerHeight;
  gameNs.emitters = [new Emitter(new VectorTwo(this.x+40, this.y+75), VectorTwo.fromAngle(0, 0))];

  update();


  }
  setPosition()
  {
    this.x = 800;
    this.y = 100;
  }
  updateFromNet(x, y, moveX, moveY, direction)
  {
    this.x = x;
    this.y = y;
    this.moveX = moveX;
    this.moveY = moveY;
    this.direction = direction;
  }

 update(level)
 {

   drawParticles();

   if(gameNs.playScene.gameover == false)
   {

     this.bomb.update();

     if(this.moveX == false && this.x> 0 /*&& this.checkCollisionMap(level.mazeSquares[this.i -1])==false*/)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(0.5, 2))];
        this.x -= 5;
        this.direction = 4;
        this.collisionRight = false;
        this.collisionUp = false;
        this.collisionDown = false;

      }
      else if (this.moveX == true && this.x < 23 * 75 /*&& this.checkCollisionMap(level.mazeSquares[this.i +1]==false)*/)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(3.5, 2))];
        this.x +=5;
        this.direction = 2;
        this.collisionLeft = false;
        this.collisionUp = false;
        this.collisionDown = false;
      }
      else if (this.moveY == false && this.y > 10)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x + 40, this.y +75), VectorTwo.fromAngle(2, 2))];
         this.y-=5;
         this.direction = 1;
         this.collisionDown = false;
         this.collisionLeft = false;
         this.collisionRight = false;
      }
      else if (this.moveY == true && this.y < 12 * 75)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(5, 2))];
       this.y+=5;
       this.direction = 3;
       this.collisionUp = false;
       this.collisionLeft = false;
       this.collisionRight = false;
      }


   }
   else {
    // this.moveX = null;
    // this.moveY = null;
   }

   //var canvas = document.getElementById('mycanvas');
   //var gameNs.ctx = canvas.getContext('2d');

   var image = this.img;
   //if(moveX == true)

  if (this.moveX == false)
   {
     gameNs.ctx.drawImage(image, this.index* 78 , 108,78, 108 ,this.x,this.y, this.width,this.height);
   }
   else if (this.moveX == true)
   {
     gameNs.ctx.drawImage(image, this.index* 78 , 216,78, 108 ,this.x,this.y, this.width,this.height);
   }
   else if (this.moveY == true)
   {
     gameNs.ctx.drawImage(image, this.index* 78, 0,78, 108 ,this.x,this.y, this.width,this.height);
   }
   else if (this.moveY == false)
   {
     gameNs.ctx.drawImage(image, this.index* 78 , 324,78, 108 ,this.x,this.y, this.width,this.height);
   }

   if(this.moveX== null && this.moveY ==null)
   {
     if(this.direction == 1)
     {

       gameNs.ctx.drawImage(image, 78 , 324,78, 108 ,this.x,this.y, this.width,this.height);

     }
     else if(this.direction == 2)
     {

       gameNs.ctx.drawImage(image, 78 , 216,78, 108 ,this.x,this.y, this.width,this.height);
     }
     else if(this.direction == 3)
     {
       gameNs.ctx.drawImage(image, 78, 0,78, 108 ,this.x,this.y, this.width,this.height);
     }
     else
     {
        gameNs.ctx.drawImage(image, 78 , 108,78, 108 ,this.x,this.y, this.width,this.height);
     }


     this.bomb.draw()

   }
   if(this.ticksPerFrame < this.time)
   {
     this.index = this.index +1;
     if(this.index > 2)
     {
       this.index = 0;
     }
       this.time =0;
   }
   this.xFeet = (this.x + (this.width/2));
   this.yFeet = (this.y -(this.squareSize * 1.5)+ 5);
   this.col = Math.floor(this.xFeet / this.squareSize) + 1 ;
   this.row = Math.floor(this.yFeet / this.squareSize) + 1 ;
   this.i = (this.row * this.maxCols)+this.col;
   this.i = this.i - 1  ;

   if(this.play===true)
   {
     gameNs.soundManager.playSound("backGround", true, gameNs.volume)
     this.play=false
   }

   this.checkCollisionMap(level);
   this.collectPowerUp(level);


   this.healthSystem.update();


 }

  plantBomb()
  {
    this.bomb.place({x:this.col - 1, y:this.row})
  }

  checkCollisionMap(level)
  {

    if(this.direction == 2  )
    {
      if(level.mazeSquares[this.i+1].containsWall === true || level.mazeSquares[this.i+1].breakWall === true)
      {
        if(level.mazeSquares[this.i+1].x <= this.x+this.width - 6)
        {
          this.moveX = null;
          this.moveY = null;
          this.collisionRight = true;
          this.healthSystem.healthVal = 1;
          if(this.moved==false)
          {

            this.moved=true;
          }
        }
        else
         {
           this.moved=false;
           this.collisionRight = false;
        }
      }
    }
      else if(this.direction == 4 )
      {
        if(level.mazeSquares[this.i - 1].containsWall === true || level.mazeSquares[this.i - 1].breakWall === true )
        {
          if(this.x <= level.mazeSquares[this.i - 1].x + (this.squareSize - 6)   )
          {
            this.moveX = null;
            this.moveY = null;
            this.collisionLeft = true;
            if(this.moved==false)
            {
              this.moved=true;
            }
          }
          else
           {
             this.moved=false;
             this.collisionLeft = false;
          }
        }

    }
    else if(this.direction == 1)
    {
      if(level.mazeSquares[this.i - this.maxCols].containsWall ===true || level.mazeSquares[this.i - this.maxCols].breakWall ===true)
      {
        if(this.y + (this.height / 2) + 5<= level.mazeSquares[this.i-this.maxCols].y + this.squareSize)
        {
          this.moveX = null;
          this.moveY = null;
          this.collisionUp = true;
          if(this.moved==false)
          {
            this.moved=true;
          }
          if(this.moved==false)
          {
            this.moved=true;
          }
        }
        else
         {
           this.moved=false;
           this.collisionUp = false;
        }
      }

  }
  else if(this.direction == 3)
  {
    if(level.mazeSquares[this.i + this.maxCols].containsWall===true || level.mazeSquares[this.i + this.maxCols].breakWall===true)
    {
      if(this.y + this.height >= level.mazeSquares[this.i+this.maxCols].y)
      {
        this.moveX = null;
        this.moveY = null;
        this.collisionDown = true;
        if(this.moved==false)
        {
                    this.moved=true;
        }
      }
      else
       {
         this.moved=false;
         this.collisionDown = false;
      }
    }

 }
}
  collectPowerUp(level)
  {
    if(level.mazeSquares[this.i].speedUp == true || level.mazeSquares[this.i].armour == true
    || level.mazeSquares[this.i].fire == true || level.mazeSquares[this.i].bomb == true
  || level.mazeSquares[this.i].oneup == true)
      {
        if(level.mazeSquares[this.i].speedUp == true){
          //output speed collected
          console.log("speed");
        }
        if(level.mazeSquares[this.i].armour == true){
          //output speed collected
          console.log("armour");
        }
        if(level.mazeSquares[this.i].fire == true){
          //output speed collected
          console.log("fire");
        }
        if(level.mazeSquares[this.i].bomb == true){
          //output speed collected
          console.log("bomb");
        }
        if(level.mazeSquares[this.i].oneup == true){
          //output speed collected
          console.log("oneup");
        }

          level.mazeSquares[this.i].containsWall = false;
          level.mazeSquares[this.i].speedUp = false;
          level.mazeSquares[this.i].armour = false;
          level.mazeSquares[this.i].fire = false;
          level.mazeSquares[this.i].bomb = false;
          level.mazeSquares[this.i].oneup = false;


    }
  }
}
