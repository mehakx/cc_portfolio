let fireFont;
let firePoints = [];
let fontSize = 120;
let waveOffset = 0;

function preload() {
    fireFont = loadFont('../p5js/typography/fire2.ttf');
}

function setup() {
  createCanvas(700, 400);
  textFont(fireFont);
  textSize(fontSize);

  // This is to generate text points for "FIRE"
  let points = fireFont.textToPoints('FIRE', width / 2 - 220, height / 2 + 40, fontSize, {
    sampleFactor: 0.2 // I wanted to adjust this for density, the lower= fewer points, higher = more points
  });

// this is to oop through each point generated from the text, with the variable pt. 
  for (let pt of points) {
    firePoints.push(new FireLetter(pt.x, pt.y));
  }
}

// this is the class for each induv letter particle. 
class FireLetter {
  constructor(x, y) {
    this.originalX = x;
    this.originalY = y;
    // so that it can change over time to create movement. 
    this.x = x;
    this.y = y;
  }

  // this is for smooth floating effect
  move() {
    this.y = this.originalY + sin(frameCount * 0.05 + this.x * 0.02) * 5;
  }

  display() {
    fill(255, 150, 0); // i changed it to orange for a warm effect and to replicate the feeling of fire. 
    noStroke();
    ellipse(this.x, this.y, 4, 4);
  }
}

function draw() {
  background(20);

  // This is to draw the floating letters
  beginShape();
  for (let pt of firePoints) {
    pt.move();
    pt.display();
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
}
