let grotesk;
let mooArray, mooArray1, mooArray2;
let fontSize = 200;
 // I chose 3 variables to allow for varying opacities. 
function preload() {
    grotesk = loadFont("grotesk.ttf");  
}

function setup() {
    createCanvas(800, 400);
    
    textFont(grotesk);
    noStroke();

      // I put the sample Factor to 0.2, to make it smoother. 
    if (grotesk) {
        mooArray = grotesk.textToPoints("M", 100, 250, fontSize, { sampleFactor: 0.2 });
        mooArray1 = grotesk.textToPoints("O", 250, 250, fontSize, { sampleFactor: 0.2 });
        mooArray2 = grotesk.textToPoints("O", 400, 250, fontSize, { sampleFactor: 0.2 });
    } else {
        console.error("Font failed to load!");
    }
}

function draw() {
    background(0); 

    fill(255, 0, 0, 255); 
    drawTextPoints(mooArray);

    fill(255, 0, 0, 150);
    drawTextPoints(mooArray1);

    fill(255, 0, 0, 100); 
    drawTextPoints(mooArray2);
}

function drawTextPoints(pointsArray) {
    if (!pointsArray) return; 
    for (let i = 0; i < pointsArray.length; i++) {
        ellipse(pointsArray[i].x, pointsArray[i].y, 8, 8);
    }
}
