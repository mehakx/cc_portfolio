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

    TextPoints(mooArray, 255, 0, 0);
    HalfColoredTextPoints(mooArray1);
    HalfColoredTextPoints(mooArray2);
}
// Over here i mentioned alpha for the opacity reference and then nested it under the map function. 
function TextPoints(pointsArray, r, g, b) {
    for (let i = 0; i < pointsArray.length; i++) {
        let alpha = map(pointsArray[i].y, 100, 250, 50, 255); // Made sure that the Top is faded, bottom is solid through the map function. 
        fill(r, g, b, alpha);
        ellipse(pointsArray[i].x, pointsArray[i].y, 8, 8);
    }
}

// Over here I split it from 325, for the center split and to get half green. 
function HalfColoredTextPoints(pointsArray) {
    let centerX = 325; 
    
    for (let i = 0; i < pointsArray.length; i++) {
        let alpha = map(pointsArray[i].y, 100, 250, 50, 255); 

        if (pointsArray[i].x < centerX) {
            fill(255, 0, 0, alpha); 
        } else {
            fill(0, 255, 0, alpha); 
        }
        ellipse(pointsArray[i].x, pointsArray[i].y, 8, 8);
    }
}
