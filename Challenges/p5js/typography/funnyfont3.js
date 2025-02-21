
let funny3; 
let particles = []; 
let targetLetters = []; 
let fontSize = 100; // I reduced the font size to make sure the text fits well in the canvas

function preload() {

    funny3 = loadFont('../p5js/typography/funny3.otf'); 
}

function setup() {

  createCanvas(600, 400);
  textFont(funny3); 
  rectMode(CENTER); // This i found on p5.js reference which was to align the text properly in the center.

  // I manually adjusted the x and y values to center the text visually
  let points = funny3.textToPoints('FUNNY', width / 2 - 180, height / 2 + 30, fontSize, {
    sampleFactor: 0.2 // increasing this value made the text look smoother
  });

  // this is to store the positions where each letter should be, so particles know where to move
  for (let i = 0; i < points.length; i++) {
    targetLetters[i] = new TargetPoint(points[i].x, points[i].y);
  }

  // I had alot of challenges with this one, as I wanted to generate the particles at random positions before they start moving toward the text shape. Eventually after alot of trial and error and reading more on p5.js I found a way to manipulate this function. 
  for (let i = 0; i < points.length; i++) {
    _particles[i] = new Particle(random(width), random(height)); // this is to store the random locations of the particles. 
  }
}

function draw() {
  background(30);
  for (let i = 0; i < particles.length; i++) {
    particles[i].moveTowards(targetLetters[i]); // this is to move each particle towards its target location- I wanted the particles to move ranomly and then come into one stil position. 
    particles[i].display(); 
  }
}

// This is the class representing the target letter points (final positions of particles)
class TargetPoint {
  constructor(x, y) {
    this.x = x; // X-coordinate of the letter point
    this.y = y; // Y-coordinate of the letter point
  }
}

// This is the class representing floating particles that form the text
class Particle {
  constructor(x, y) {
    this.x = x; // x-coordinate (starting randomly)
    this.y = y; // y-coordinate (starting randomly)
    this.speed = random(1, 3); // I gave each particle a random speed to create variation in movement
    this.size = random(4, 8); //I then adjusted particle size for better visibility and balance
  }

  // This is to move each particle toward its corresponding letter position
  moveTowards(target) {
    if (target) {
      let easing = 0.05; // this helped me control the smoothness of particle movement (lower value = slower)
      this.x += (target.x - this.x) * easing; //this was to move the particle slightly closer to the letter’s x-position.
      this.y += (target.y - this.y) * easing; // this was to move the particle slightly closer to the letter’s y-position
    }
  }

  // Using my previous code I used it to display the particle as a glowing yellow dot
  display() {
    fill(255, 204, 0); 
    noStroke(); 
    ellipse(this.x, this.y, this.size, this.size); // Each particle is represented as a small circle
  
  }
  // overall this animation took alot longer and was definitely one of the most challenging ones, as I learnt alot more by reading on the differend kinds of kinetic effects on google, and discovered new functions through the p5.js reference to help me improve my ability and scope of animation. 
}
