// pulling any previous answers from localStorage, or starting with a blank object
//This is what I used to understand it better: 
//  Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// main container for all the quiz UI stuff
let frame;

// I really wanted to make a floating heart background, and so I brainstormed the designs using pinterest first:
// Design inspo: https://www.pinterest.com/pin/heart-ui-backgrounds (used for palette ideas)
let hearts = [];

function setup() {
  // reset localStorage on load (wanted it to always start fresh so that users can start from Q1. )
  localStorage.removeItem('answers');
  answers = {};

  // canvas for the background (pink hearts)
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1'); // keep it behind everything else

  // floating hearts logic:
  // For this i used the p5 reference to learn and understand more:
  //  Resource: https://p5js.org/reference/#/p5/random
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 25),
      speed: random(0.2, 1),
      color: random(['#f8bbd0', '#f48fb1', '#f06292']) // all pink tones
    });
  }

  // quiz wrapper (centered + styled to be soft and cute)
  // Used a combo of rounded borders, Comic Sans, and light shadows
  // This was my UI inspiration: https://uimovement.com/ui/soft-ui/
  frame = createDiv().parent(document.body)
    .style('background-color', '#ffffffee')
    .style('border', '2px solid pink')
    .style('border-radius', '16px')
    .style('padding', '30px')
    .style('max-width', '460px')
    .style('margin', '60px auto')
    .style('font-family', 'Comic Sans MS, sans-serif') // yes I went there 😅
    .style('box-shadow', '0 6px 18px rgba(255, 105, 180, 0.4)');

  // This is the quiz title with heart emoji
  createElement('h1', '💖 Self‑Love Monitor (1/4)').parent(frame)
    .style('text-align', 'center')
    .style('color', '#d81b60');

  //
  // QUESTION 1: Mood (Emojis)
  //
  let d1 = createDiv().parent(frame).id('q1');
  createP('1. How do you feel?').parent(d1).style('font-size', '18px');

  // mood buttons – basic emoji options
  // Reference: https://p5js.org/reference/#/p5/createButton
  ['😊', '😢', '😡', '🤔'].forEach(e => {
    createButton(e)
      .parent(d1)
      .style('font-size', '28px')
      .style('margin', '10px')
      .style('padding', '10px 15px')
      .style('border-radius', '50%')
      .style('border', '2px solid #f48fb1')
      .style('background-color', '#fff')
      .style('cursor', 'pointer')
      .mousePressed(() => {
        answers.q1 = e;
        localStorage.setItem('answers', JSON.stringify(answers));
        d1.hide();
        showQ2();
      });
  });

  //
  //QUESTION 2: Energy level slider (0–10)
  //
  let d2 = createDiv().parent(frame).id('q2').hide();
  createP('2. Energy 0–10').parent(d2).style('font-size', '18px');

  // this slider uses p5’s built-in createSlider
  // slider reference: https://p5js.org/reference/#/p5/createSlider
  let s = createSlider(0, 10, answers.q2 || 5).parent(d2)
    .style('width', '100%')
    .style('accent-color', '#f06292'); // matched the pink theme

  // the number that displays next to the slider
  let t = createSpan(' ' + (answers.q2 || 5)).parent(d2)
    .style('margin-left', '10px')
    .style('font-weight', 'bold');

  // updates number as the slider moves
  s.input(() => t.html(' ' + s.value()));

  // Next button — save & move on
  createButton('Next →').parent(d2)
    .style('margin-top', '20px')
    .style('padding', '10px 20px')
    .style('font-size', '16px')
    .style('background-color', '#f06292')
    .style('color', '#fff')
    .style('border', 'none')
    .style('border-radius', '10px')
    .style('cursor', 'pointer')
    .mousePressed(() => {
      answers.q2 = s.value();
      localStorage.setItem('answers', JSON.stringify(answers));
      window.location.href = 'index2.html'; // next quiz page
    });

  // if q1 already saved, skip to q2 (like after refresh)
  if (answers.q1) {
    d1.hide();
    d2.show();
  }
}

// just shows question 2 if we need to call it manually
function showQ2() {
  select('#q2').show();
}

// animates the floating hearts
function draw() {
  background('#fff0f5'); // soft background
  noStroke();
  for (let heart of hearts) {
    fill(heart.color);
    drawHeart(heart.x, heart.y, heart.size);
    heart.y += heart.speed;

    // when a heart floats off screen, takes it back to the top.
    //  ( Alot of these calculations took alot of trial and error, i had to experiment alot before i could get the exact number!)
    if (heart.y > height + heart.size) {
      heart.y = -heart.size; 
      heart.x = random(width);
    }
  }
}

// this draws the heart shape using Bezier curves
// Reference for bezier: https://p5js.org/reference/#/p5/bezierVertex
//To calculate the exact Bezier Vertex I used chat gpt just to help me with this
// part of the calculation, as I was unable to get it even after multiple times. 
function drawHeart(x, y, s) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s); 
  bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
  endShape(CLOSE);
}
