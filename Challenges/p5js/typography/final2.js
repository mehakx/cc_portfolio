//For this sketch, I did use my existing prototype sketch, as I really liked it and wanted to develop it further: 
//Hence I got inspired by it, and used it to rethink the way fire moves. 
let font;
let points = []; 
let msg = "fire";
let size = 300;
let r = 20; 
let angle = 0; 
let t = 0; // For movement
let noiseOffset = 0; // This I learnt is makes it more fluidly random and is better for the kind of fast-paced movement. 

function preload() {
    font = loadFont('../p5js/typography/firefinal.ttf');
}

function setup() {
  createCanvas(800, 400);
  points = font.textToPoints(msg, 0, 0, size, {
    sampleFactor: 0.2,
    simplifyThreshold: 1.1
  });
  angleMode(DEGREES);
}

function draw() {
  background(200, 10, 20);

  stroke(255, 150); // Softer stroke
  let x = r * tan(angle * 0.1) + noise(noiseOffset) * 15; // I wanted to incorporate diaganol movements through tan()
  let y = r * tan(angle * 0.2) + noise(noiseOffset + 100) * 15; // Slightly different diagonal shift

  translate(20, 300); 

  for (let i = 0; i < points.length; i++) {
    let noiseX = noise(points[i].x * 0.01, t * 0.05) * 8; // This is to increase the jitter effect
    let noiseY = noise(points[i].y * 0.01, t * 0.05) * 8;
    
    line(points[i].x, points[i].y, points[i].x + x + noiseX, points[i].y + y + noiseY);
  }
  
  fill(255, 150);
  textSize(size);
  textFont(font);
  text(msg, x, y); 
  
  let increment = 5 * tan(t * 0.08); // This is to increase speed dramatically
  t += 8; // Faster time progression
  angle += increment; 

  noiseOffset += 0.05; // Faster shifting noise for energetic motion
}
