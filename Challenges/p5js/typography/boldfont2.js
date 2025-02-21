let font;
let fontSize = 100;
let array1 = [];
let _text1 = []; // my variable to store the array in the form of _text. 
let waveSpeed = 0.05; // Speed of wave movement
let waveAmplitude = 10; // Height of wave movement

function preload() {
        font = loadFont('../p5js/typography/bold2.ttf'); // After several tries I fixed the font file name
    }  

function setup() {
  createCanvas(400, 400);
  background(150);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  // First made an array called alphabet and stored my points in that. 
  let alphabetArray1 = font.textToPoints('BOLD', width / 2, height / 2, textSize, {
    sampleFactor: 0.05 * 5,
  });

  for (let i = 0; i < alphabetArray1.length; i++) {
    _text1[i] = new Text(alphabetArray1[i].x, alphabetArray1[i].y);
  }

  array1 = font.textToPoints('BOLD', width / 2, height / 2, 100, {
    sampleFactor: 4
  });
}

function draw() {
  background(220);
  
  for (let i = 0; i < _text1.length; i++) {
    _text1[i].show();
  }

  for (let i = 0; i < array1.length; i++) {
    let pointX = array1[i].x;
    let originalY = array1[i].y;
    
    // then using my learnings from previous codes I created a wave effect using sine function and stored it under "waveOffset"
    let waveOffset = sin(frameCount * waveSpeed + pointX * 0.05) * waveAmplitude;
    let newY = originalY + waveOffset;

    point(pointX, newY);
  }
}

class Text {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  show() {
    rect(this.x, this.y, 10, 10);
  }
}
