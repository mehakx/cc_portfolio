

// This variable keeps track of which animation is currently active
let num = 0; 


let letterPoints = []; 

// This helps control the wave effect's timing
let waveOffset = 0; 


let speed = 2; 


let funnyFont; 
let fontSize = 200; 

// These will help me center the text dynamically
let centerX, centerY; 

function preload() {
 
    funnyFont = loadFont('../p5js/typography/funny1.ttf'); 
}

function setup() {
   
    createCanvas(700, 600);

    textFont(funnyFont);
    textSize(fontSize);

    // I tried multiple calculations to center the position so "FUNNY" is aligned properly
    centerX = width / 2 - textWidth("FUNNY") / 2;
    centerY = height / 2 + textAscent() / 2.5;

    // I then converted my word "FUNNY" into an array of points that could represent its shape
    let points = funnyFont.textToPoints('FUNNY', centerX, centerY, fontSize, {
        sampleFactor: 0.1 
    });

    // I stored each point as an object so I can manipulate them later
    for (let pt of points) {
        letterPoints.push(new LetterPoint(pt.x, pt.y));
    }
}

class LetterPoint {
    constructor(x, y) {
        // saved the original positions so I can reset the movement later
        this.originalX = x; 
        this.originalY = y;
        this.x = x; // This will be updated every frame
        this.y = y; 
    }

    // This function makes the points move in a smooth wave pattern using sine functions
    wave() {
        let waveStrength = 10; // I tested different values and found 10 gives a noticeable but smooth effect
        this.y = this.originalY + sin(frameCount * 0.1 + this.x * 0.05) * waveStrength;
    }

    //I googled a few diffrent effects for kinetic typography, and found this function of bounce. 
    // Wherein, this function makes the points stretch horizontally, creating a bounce effect
    bounce() {
        let stretchFactor = 10; // Similar to waveStrength, but applied in the X direction
        this.x = this.originalX + sin(frameCount * 0.15 + this.y * 0.05) * stretchFactor;
    }

    
    display() {
        fill(0, 255, 100); // I chose green because it makes the effect look fun and energetic and matches the energy of the word. 
        noStroke();
        ellipse(this.x, this.y, 6, 6); 
    }
}

// Function to animate the wavy text effect
function wavyText() {
    for (let pt of letterPoints) {
        pt.wave(); // I wanted to move each point in a wave motion
        pt.display(); // this is to draw them on the screen
    }
}

// this is the function to animate the bouncing text effect- from what i newly learnt above^^
function bouncingText() {
    for (let pt of letterPoints) {
        pt.bounce(); // this is to move each point in a stretching pattern
        pt.display(); 
    }
}

function draw() {
    background(0); // I saw that a  background makes the green dots stand out more!!

    // Then I wanted to switch between the two different text effects based on the value of 'num'
    switch (num) {
        case 1:
            wavyText(); // where if num is 1,then to  apply the wavy effect
            break;
        case 2:
            bouncingText(); // and if num is 2 then to apply the bouncing effect
            break;
        default:
            wavyText(); 
    }
}

// I used mousePressed to change the animation type when I click the mouse
function mousePressed() {
    num = (num % 2) + 1; // this is to change or switch between the 2 num states. 

}
