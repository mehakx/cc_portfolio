let font;
let fontSize = 100;
let array1 = [];

function preload() {
    font = loadFont('../p5js/typography/bold3.ttf'); // corrected file path after several errors!!
}

function setup() {
  createCanvas(400, 400);
  background(150);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  array1 = font.textToPoints('Bold', width / 2, height / 2, 100, {
    sampleFactor: 10
  });
  

}

function draw() {
    background(random(255), random(255), 100); // Background with random colors
  
    fill(255); // Filled shape with white
    stroke(255); // I wanted to set my stroke colour to white. 
    strokeWeight(3); // This is to inccrease point thickness
bounce = sin(frameCount * 0.4) * 9; //This is for smooth motion. 

  for (let points of array1) {
    originalY = points.y;  //
    newY = originalY + bounce;
    
    point(points.x, newY); // Here i wanted to draw the updated points. 
  }
  class Alphabet1 { //named my class Alphabet1 based on the way I structured my previous code strucutres. 
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    rect(this.x, this.y, 10, 10);
  }
}
}
