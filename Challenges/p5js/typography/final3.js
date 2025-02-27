// This is also inspired by my prototype sketch and I wanted to take it further: 
let num = 0; 

let letterPoints = []; 
let speed = 2; 

let Boldfinal; 
let fontSize = 200; 

// This is to center the text. 
let centerX, centerY; 

function preload() {
    BoldFont = loadFont('../p5js/typography/Boldfinal.ttf'); 
}

function setup() {
    createCanvas(700, 600);
    textFont(BoldFont);
    textSize(fontSize);

    // It took me some time to figure out how to center the text, as it kept going off the canvas!:(
    centerX = width / 2 - textWidth("BOLD") / 2;
    centerY = height / 2 + textAscent() / 2.5;

    // Over here I wanted to convert the text into an array of points. 
    let points = BoldFont.textToPoints('BOLD', centerX, centerY, fontSize, {
        sampleFactor: 0.1 
    });

    // This is to store each point as an object for later movement. 
    for (let pt of points) {
        letterPoints.push(new LetterPoint(pt.x, pt.y));
    }
}

class LetterPoint {
    constructor(x, y) {
        this.originalX = x; 
        this.originalY = y;
        this.x = x;
        this.y = y;
        this.jumpOffset = 0; // For jump effect as it controls how much the point moves up and down.  
        this.isJumping = false;// tracks if the point should jump
    }

    // I wanted the bold to jump in a intense way, as I feel like it can be intimidating, and hence that's what I tried to do in this function. 
    jump() {
        if (this.isJumping) {
            this.jumpOffset = -random(20, 50); // This is to junp up sharply, and the negative sign I calculated to make it move upwards. 
            this.isJumping = false; 
        } else {
            if (this.jumpOffset < 0) {
                this.jumpOffset += 5; // This is to fall back firmly. 
            }
        }
        this.y = this.originalY + this.jumpOffset;
    }

    display() {
        fill(255, 204, 0); //I feel like a bright yellow text can really stand out. 
        noStroke();
        ellipse(this.x, this.y, 8, 8); // I made the dots slightly bigger to make it visually striking. 
    }
}

// This is to make the points jump too and match the intense jumping energy. 
function jumpingText() {
    for (let pt of letterPoints) {
        pt.jump();
        pt.display();
    }
}

function draw() {
    background(0); // This is to keep the background black. 
    jumpingText(); // This is for a firm jumping effect. 
}

// I wanted the users to be able to click whenever they wanted the "bold" to transition. 
function mousePressed() {
    for (let pt of letterPoints) {
        pt.isJumping = true; // 
    }
}
