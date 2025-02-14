let grotesk;
let mooArray, mooArray1, mooArray2;
let fontSize = 200;

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
 //Learning: After many mistakes I realised that the more specific I am with the variable names the easier it is to maintain the code.
// Thus, I named the varaibles 'textpoints', 'HalfColoredTextPoints' to make it easier to navigate and remember. 

    fill(255, 0, 0);
    TextPoints(mooArray);
    HalfColoredTextPoints(mooArray1);
    HalfColoredTextPoints(mooArray2);
}

function TextPoints(pointsArray) {
    for (let i = 0; i < pointsArray.length; i++) {
        ellipse(pointsArray[i].x, pointsArray[i].y, 8, 8);
    }
}

// To vary the other half I coded it under a different function. 

function HalfColoredTextPoints(pointsArray) {
    let centerX = 325; 
    let half = pointsArray.length / 2;

    for (let i = 0; i < pointsArray.length; i++) {
        if (pointsArray[i].x < centerX) {
            fill(255, 0, 0); 
        } else {
            fill(0, 255, 0); 
        }
        ellipse(pointsArray[i].x, pointsArray[i].y, 8, 8);
    }
}


