// challenge 1
// i chose the grotesk font as I loved the simplicity of it and tried to replicate the challenge with this font:
let grotesk;  
let fontSize = 200;
let mooArray;

function preload() {
    grotesk = loadFont("grotesk.ttf");
}

function setup() {
    createCanvas(800, 400);
    textFont(grotesk);
    textSize(fontSize);

    mooArray = grotesk.textToPoints("MOO", 100, 250, fontSize, {
        sampleFactor: 0.2
    });

    console.log(mooArray);
}

function draw() {
    background(0);
    noStroke();
    fill(255, 0, 0);

    // I chose an ellipse with 8 widh and 8 height. 
    if (mooArray) {  
        for (let i = 0; i < mooArray.length; i++) {  
            ellipse(mooArray[i].x, mooArray[i].y, 8, 8);
        }
    }
}
