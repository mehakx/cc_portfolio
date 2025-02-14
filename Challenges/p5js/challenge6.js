let grotesk;
let mooArray, mooArray1, mooArray2;
let fontSize = 200;
let amplitude = 5; 
let frequency = 0.2; 

function preload() {
  grotesk = loadFont('grotesk.ttf'); 
}

function setup() {
  createCanvas(800, 400);
  textFont(grotesk);
  noStroke();


  mooArray = grotesk.textToPoints("M", 100, 250, fontSize, { sampleFactor: 0.2 });
  mooArray1 = grotesk.textToPoints("O", 250, 250, fontSize, { sampleFactor: 0.2 });
  mooArray2 = grotesk.textToPoints("O", 400, 250, fontSize, { sampleFactor: 0.2 });
}

function draw() {
  background(0);

//   i used the sin variable and named it "wavyText" to help me remember the shape of the sin curve. 
  
  wavyText(mooArray);
  wavyText(mooArray1);
  wavyText(mooArray2);
}


//  After reviwing the sin curve, I was able to understand the wave 

function wavyText(pointsArray) {
  for (let i = 0; i < pointsArray.length; i++) {
    let wave = sin(frameCount * 0.05 + i * frequency) * amplitude;
    fill(255, 0, 0);
    ellipse(pointsArray[i].x, pointsArray[i].y + wave, 8, 8);
  }
}
