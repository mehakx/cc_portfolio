// grabbing any saved answers (from localStorage) or starting fresh
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// quiz UI wrapper div
let frame;

// array of floating hearts for background effect
let hearts = [];

function setup() {
  // background canvas for floating hearts
  // Reference: https://p5js.org/reference/#/p5/createCanvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1'); // puts it behind everything

  // generates animated heart objects with soft blue tones
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 25),
      speed: random(0.2, 1),
      color: random(['#bbdefb', '#64b5f6', '#42a5f5']) // all calming blues
    });
  }

  // quiz frame (basic UI wrapper with soft styling) I really wanted it to look personalised and create that safe comfy environment. 
  frame = createDiv().parent(document.body)
    .style('background-color', '#ffffffee')
    .style('border', '2px solid #64b5f6')
    .style('border-radius', '16px')
    .style('padding', '30px')
    .style('max-width', '460px')
    .style('margin', '60px auto')
    .style('font-family', 'Comic Sans MS, sans-serif')
    .style('box-shadow', '0 6px 18px rgba(100, 181, 246, 0.4)');

  // quiz title
  createElement('h1', '💙 Self‑Love Monitor (2/4)').parent(frame)
    .style('text-align', 'center')
    .style('color', '#1e88e5');

  //
  // QUESTION 3 — Focus Level
  //
  let d3 = createDiv().parent(frame).id('q3');
  createP('3. Focus: High, Medium, Low').parent(d3).style('font-size', '18px');

  // radio buttons for focus options
  // Reference: https://p5js.org/reference/#/p5/createRadio
  let r = createRadio().parent(d3)
    .style('margin', '10px')
    .style('font-size', '16px');
  ['High', 'Medium', 'Low'].forEach(o => r.option(o));

  // auto-select if already answered
  if (answers.q3) r.selected(answers.q3);

  // nav buttons below the focus options
  let nav3 = createDiv().parent(d3).style('margin-top', '20px');

  // back to page 1 (mood & energy)
  createButton('← Back').parent(nav3)
    .style('margin-right', '10px')
    .style('background-color', '#bbdefb')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => window.location.href = 'index1.html');

  // move to next question (q4)
  createButton('Next →').parent(nav3)
    .style('background-color', '#42a5f5')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      answers.q3 = r.value();
      localStorage.setItem('answers', JSON.stringify(answers));
      d3.hide();
      showQ4();
    });

  //
  //  QUESTION 4 — Social Preference
  //
  let d4 = createDiv().parent(frame).id('q4').hide();
  createP('4. Alone or with friends?').parent(d4).style('font-size', '18px');

  let nav4 = createDiv().parent(d4).style('margin-top', '20px');

  // go back to Q3
  createButton('← Back').parent(nav4)
    .style('margin-right', '10px')
    .style('background-color', '#bbdefb')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      d4.hide();
      d3.show();
    });

  // options for Q4 as regular buttons
  ['Alone', 'With friends'].forEach(o => {
    createButton(o).parent(nav4)
      .style('margin', '5px')
      .style('background-color', '#64b5f6')
      .style('color', '#fff')
      .style('border', 'none')
      .style('padding', '10px 15px')
      .style('border-radius', '10px')
      .mousePressed(() => {
        answers.q4 = o;
        localStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'index3.html'; // next quiz page
      });
  });

  // if q3 is already saved, skip straight to q4
  if (answers.q3) {
    d3.hide();
    d4.show();
  }
}

// simple helper to show q4 when needed
function showQ4() {
  select('#q4').show();
}

// floating blue hearts background animation
function draw() {
  background('#e3f2fd'); // soft baby blue
  noStroke();
  for (let heart of hearts) {
    fill(heart.color);
    drawHeart(heart.x, heart.y, heart.size);
    heart.y += heart.speed;

    // when hearts leave screen, reset them to the top
    if (heart.y > height + heart.size) {
      heart.y = -heart.size;
      heart.x = random(width);
    }
  }
}

// draws a cute heart using p5's bezierVertex tool
// Reference: https://p5js.org/reference/#/p5/bezierVertex
//Reference: Chat Gpt for some of the exact calculations of the bezier Curve. 
function drawHeart(x, y, s) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
  bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
  endShape(CLOSE);
}
