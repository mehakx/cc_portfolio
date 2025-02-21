// in this sketch I wanted to develop the typography animation from before. 
let num = 0;
let _Morph1 = [];
let _Morph2 = [];
let speed = 2;
let bold1;
let fontSize = 200;
let boldArray;
let firstWord = [];
let secondWord = [];
let centerX, centerY; // I used centerX and center Y to re-center the variables

function preload() {
    bold1 = loadFont('../p5js/typography/bold1.ttf');


}

function setup() {
    createCanvas(600, 600); // Increased size for better centering
    textFont(bold1);
    textSize(fontSize);

    // first I tried to calculate the center positiong for this text, and hence experimented with different positions. 
    centerX = width / 2 - textWidth("BOLD") / 1.9;
    centerY = height / 2 + textAscent() / 2.5;

    // First Morph action
    let morphArray1 = bold1.textToPoints('Bold', centerX, centerY, fontSize, {
// I played around with the numbers and saw that by multiplying the sample factor you can change the density of the font. 
        sampleFactor: 0.05 * 5
    });

    for (let i = 0; i < morphArray1.length; i++) {
        _Morph1[i] = new Morph(morphArray1[i].x, morphArray1[i].y);
    }

    firstWord = bold1.textToPoints('BOLD', centerX, centerY, fontSize, {
        sampleFactor: 0.1
    });

    secondWord = bold1.textToPoints('BOLD', centerX, centerY, fontSize, {
        sampleFactor: 0.05
    });

    print(firstWord.length, secondWord.length);
}

class Morph {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    show() {
        rect(this.x, this.y, 10, 10);
    }
}

function morph1() {
    for (let i = 0; i < _Morph1.length; i++) {
        _Morph1[i].show();
    }
}

function morph2() {
    for (let i = 0; i < min(firstWord.length, secondWord.length); i++) {
        // I discovered and used this lerp function last sem, to help with transitioning between different states. This was very challenging to get right as i had only used this with the different colours.
        firstWord[i].x = lerp(firstWord[i].x, secondWord[i].x, 0.05);
        firstWord[i].y = lerp(firstWord[i].y, secondWord[i].y, 0.05);
    }
}

// then I made different switch cases to switch between different morph states. 
function draw() {
    background(0);
    noStroke();
    fill(255, 0, 255); // bold purple colour. 

    switch (num) {
        case 1:
            morph1();
            break;

        case 2:
            morph2();
            break;

        default:
            
    }
    // Drawing different morph versions.
    beginShape();
    for (let i = 0; i < min(firstWord.length, secondWord.length); i++) {
        vertex(firstWord[i].x, firstWord[i].y);
    }
    endShape(CLOSE);
}


function mousePressed() {
    num = (num % 2) + 1; // by adding a mouse pressed function, the user can control the styling of the font and the way the text appears. 
}
