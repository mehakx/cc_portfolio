
let font;
let points = []; let msg = "fire";
let size = 300;
let r = 15; let angle = 0; let t = 0; // I want to make the font move in almost a semi-circular motion and thus I created 3 variables. 

function preload() {
    font = loadFont('../p5js/typography/fire1.ttf');
}

function setup() {
  createCanvas(800, 400);
  points = font.textToPoints(msg, 0, 0, size, {
    sampleFactor: 0.5,
    simplifyThreshold: 0.0
  });
  angleMode(DEGREES);// changed angle mode to degrees for easier calculation!
}

function draw() {
  background(40, 0, 30);
  stroke(255);
  let x = r*cos(angle);// I wanted it to move upwards but also downnwards in kind of a wavy way and thus used cos to manipulate one form and sin for the other. 
  let y = r*sin(angle);
  translate(20, 300);// This function really helped me move the points to the right place- this again came after alot of trial and error. 
  for (let i=0; i<points.length; i++) {
    line(points[i].x, points[i].y, points[i].x + x, points[i].y + y);// this line I learnt from a sample which i had seen in my previous semester on animating like shapes- which essentially helped me understand how I could do it for points. 
  }
  
  fill(255, 100);
  textSize(size);
  textFont(font);
  text(msg, x, y); // print out the message at the desired x and y. 
  
  let increment = 5*sin(t);
  t++;
  angle += increment;// this is incrementing movements of the text. 
  
}