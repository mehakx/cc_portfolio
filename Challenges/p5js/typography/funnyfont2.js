
let num = 0; 
let funnyFont; 
let fontSize = 200; 
let centerX, centerY; 
let funnyPoints = []; 

function preload() {
    funnyFont = loadFont('../p5js/typography/bold1.ttf'); 
}

function setup() {
    createCanvas(700, 600);
    textFont(funnyFont);
    textSize(fontSize);
    // Experimental calculations to calculate the placement of text. 
    centerX = width / 2 - textWidth("FUNNY") / 2;
    centerY = height / 2 + textAscent() / 2.5;

    funnyPoints = funnyFont.textToPoints('FUNNY', centerX, centerY, fontSize, {
        sampleFactor: 0.1 
    });
}

// This is function 1 to draw the text in its original form
function Normal1() {
    beginShape();
    for (let pt of funnyPoints) {
        vertex(pt.x, pt.y); // then used vertex to connect each point. 
    }
    endShape(CLOSE);
}

// This is the function to let the text morph into different forms. 
function Wavy1() {
    let waveStrength = 10; // I then did some more experimentation and found 10 to be the most visually strong. 
    beginShape();
    for (let i = 0; i < funnyPoints.length; i++) {
        // I wanted to distort each placement of the point, and hence using sine and cosine functions i was able to distort them dynamicaly.
        let waveX = funnyPoints[i].x + sin(frameCount * 0.1 + i * 0.2) * waveStrength;
        let waveY = funnyPoints[i].y + cos(frameCount * 0.1 + i * 0.2) * waveStrength;
        vertex(waveX, waveY);
    }
    endShape(CLOSE);
}

function draw() {
    background(0); 
    fill(255, 50, 255); // I chose this purple-pink color to create a fun and energetic look
    noStroke(); // Removing the outline made the animation feel smoother!!!

    // then I wanted to switch between the normal and wavy text effects and hence used the switch function. 
    switch (num) {
        case 1:
            Wavy1(); // Where if num is 1, then to apply the wavy distortion effect
            break;
        case 2:
            Normal1(); // But if  num is 2, then to  display the text normally
            break;
        default:
            Wavy1(); // 
    }
}

// this is the function to swtich between the 2 states
function mousePressed() {
    num = (num % 2) + 1; // change between 1 and 2. 
}
