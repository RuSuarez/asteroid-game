class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.spaceCraft = loadImage('/images/space_craft.png'); // Loadin space craft image
    this.flames = loadImage('/images/flames.png'); // Loadin space craft image
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
//    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
//        this.location.x + this.size/2, this.location.y + this.size/2,
//        this.location.x, this.location.y - this.size/2);
    
    image(this.spaceCraft,this.location.x-this.size/2, this.location.y-this.size/2,this.size,this.size);
  }

  move(){
    this.velocity.add(this.acceleration); // Modifying velocity
    this.velocity.limit(this.maxVelocity); // Limiting the velocity
    this.location.add(this.velocity); // Modifying location
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        push();
        translate(this.location.x+this.size/2, this.location.y+this.size*1.5); // Translating the origin of the flames
        rotate(radians(90)); // Rotating the flames
        image(this.flames,-66,-15,10,20);
        pop();
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
        push();
        translate(this.location.x+this.size/2, this.location.y+this.size*1.5); // Translating the origin of the flames
        rotate(radians(270)); // Rotating the flames
        image(this.flames,57,-62,10,20);
        pop();
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
        push();
        translate(this.location.x+this.size/2, this.location.y+this.size*1.5); // Translating the origin of the flames
        rotate(radians(180)); // Rotating the flames
        image(this.flames,20,29,10,20);
        pop();
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
        push();
        image(this.flames,this.location.x-15+this.size/2,this.location.y-20,10,20);
        image(this.flames,this.location.x-45+this.size/2,this.location.y-20,10,20);
        pop();
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    this.applyForce(createVector(0, 0.05)); // Creating and applying gravity force
    this.friction = new createVector(-this.velocity.x/30,-this.velocity.y/30); // Creating friciton, 30 times smaller than gravity and opposite direction
    this.applyForce(this.friction); // Applying friciton
  }
}