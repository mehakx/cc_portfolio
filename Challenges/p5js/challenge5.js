let grotesk;
let mooArray, mooArray1, mooArray2;
let fontSize = 200;
  // This challenge definitely took a very long time to figure out- especially with the mod function. 
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

  // Alternating pattern for "MOO"
  Pattern(mooArray);
  Pattern(mooArray1);
  Pattern(mooArray2);
}

// The mod function over here was very useful for the alternating patterns and keeping the ellipse and squares in its varying positions. 
function Pattern(pointsArray) {
  for (let i = 0; i < pointsArray.length; i++) {
    if (i % 2 == 0) {
      fill(255, 0, 0);
      ellipse(pointsArray[i].x, pointsArray[i].y, 8, 8);
    } else {
      fill(255);
      rect(pointsArray[i].x - 4, pointsArray[i].y - 4, 8, 8);
    }
  }
}
