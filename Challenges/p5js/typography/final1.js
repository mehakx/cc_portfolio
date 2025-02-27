


//For this final sketch, I chose one of my prototype styles and chose to enhance it as I wanted to further develop it
//and make it my final sketch!
let font;
let fontSize = 100;
let array1 = [];

function preload() {
    font = loadFont('../p5js/typography/funnyfinal.ttf'); 
}

function setup() {
  createCanvas(400, 400);
  background(150);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  array1 = font.textToPoints('F-u-N-n-y', width / 2, height / 2, 100, {
    sampleFactor: 10
  });
  

}

function draw() {

        background(0); // Black background to enhance contrast
        
        // I wanted to generate a perlin noise kind of bakcground as I felt it signified the fun of the word. 
        for (let y = 0; y < height; y += 10) {
          for (let x = 0; x < width; x += 10) {
            let noiseFactor = noise(x * 0.01, y * 0.01, frameCount * 0.01);
            let angle = noiseFactor * TWO_PI * 2; // I wanted to convert the noise into an angle
            let length = noiseFactor * 10; // This helped me just swirl intensity
      
            let xOffset = cos(angle) * length;
            let yOffset = sin(angle) * length;
      
            stroke(lerpColor(color(255, 100, 100), color(100, 100, 255), noiseFactor));
            strokeWeight(2);
            line(x, y, x + xOffset, y + yOffset);
          }
        }
    

    stroke(random(255), random(255), random(255));  
    strokeWeight(1.5); 
bounce = sin(frameCount * 1.6) * 7;
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
