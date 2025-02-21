let fireFont;
let firePoints = [];
let particles = [];
let fontSize = 150;
let isBurning = false; // this is to enable or disable the fire effect. 

function preload() {
    fireFont = loadFont('../p5js/typography/fire3.ttf'); 
}

function setup() {
  createCanvas(700, 400);
  textFont(fireFont);
  textSize(fontSize);

  // Generate text points for "FIRE"
  let points = fireFont.textToPoints('FIRE', width / 2 - 170, height / 2 + 50, fontSize, {
    sampleFactor: 0.2
  });

  // to store each letter's points for later animation. 
  for (let pt of points) {
    firePoints.push(new FirePoint(pt.x, pt.y));
  }

  // generate particles for fire animation. 
  for (let i = 0; i < 100; i++) {
    particles.push(new FireParticle(random(width), height - random(50)));
  }
}

// this is the class representing each letter point in 'FIRE'. 
class FirePoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // function to create a wavy like fire distortion effect
  distort() {
    let noiseFactor = noise(this.x * 0.01, frameCount * 0.02) * 10;
    let flameOffset = sin(frameCount * 0.05 + this.x * 0.02) * 5;
    return { x: this.x + noiseFactor, y: this.y - flameOffset };
  }
}

// class representing induvidual floating fire particles
class FireParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);     //randomized size for variation. 
    this.speed = random(1, 3);
    this.opacity = 255;    // starts fully visible 
  }

  // Over here i wanted to move the particle upwards with slight horizontal randomness- with many calculations I finally figured out the math:
  move() {
    this.y -= this.speed;
    this.x += random(-1, 1);
    this.opacity -= 3;

    // This is to reset the particle when it becomes invisible
    if (this.opacity <= 0) {
      this.y = height; // this is to move back to bottom
      this.opacity = 255;//this is to restore visbility. 
    }
  }

  //I wanted to display the fire particles as glowing dots. 
  display() {
    fill(255, random(100, 200), 0, this.opacity); // orange glow effect
    noStroke();
    ellipse(this.x, this.y, this.size); // this is to draw the particle
  }
}

function draw() {
  background(20);

  // Draw the base shape of "FIRE"
  fill(255, 150, 0);
  noStroke();
  beginShape();
  for (let pt of firePoints) {
    // i wanted to distort the fire if it becomes active or when a user clicks on it. And for this i referred to an online sample in which the text could be distorted. Hence I used that in the below "let distorted line"
    let distorted = isBurning ? pt.distort() : pt; 
    vertex(distorted.x, distorted.y);
  }
  endShape(CLOSE);

  // This is the fire particle animation
  if (isBurning) {
    for (let p of particles) {
      p.move();
      p.display();
    }
  }
}

// This is for when the user clicks the fire and for the particles to float up. 
function mousePressed() {
  isBurning = !isBurning;
}
