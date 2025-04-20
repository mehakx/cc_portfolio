// loads any saved quiz answers from localStorage, or starts fresh
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// container for the quiz UI
let frame;

// orange heart background animation array
let hearts = [];

function setup() {
  // create the animated canvas that lives behind the quiz
  // Reference: https://p5js.org/reference/#/p5/createCanvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1'); // pushes it behind all content

  // create some floating hearts with warm orange tones
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 25),
      speed: random(0.2, 1),
      color: random(['#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726']) // cozy orange palette
    });
  }

  // build the main quiz UI container
  frame = createDiv().parent(document.body)
    .style('background-color', '#ffffffee') // slight transparency
    .style('border', '2px solid #ffa726')
    .style('border-radius', '16px')
    .style('padding', '30px')
    .style('max-width', '460px')
    .style('margin', '60px auto')
    .style('font-family', 'Comic Sans MS, sans-serif')
    .style('box-shadow', '0 6px 18px rgba(255, 167, 38, 0.3)');

  // page title
  createElement('h1', '🧡 Self‑Love Monitor (3/4)').parent(frame)
    .style('text-align', 'center')
    .style('color', '#ef6c00');

  //
  // QUESTION 5: Self-Care Activities
  //
  let d5 = createDiv().parent(frame).id('q5');
  createP('5. Select a form of care').parent(d5).style('font-size', '18px');

  // create a checkbox for each care option
  // Reference: https://p5js.org/reference/#/p5/createCheckbox
  let items = ['Sleep', 'Hydrate', 'Excercise', 'Journal'];
  let boxes = items.map(item =>
    createCheckbox(item, (answers.q5 || []).includes(item)).parent(d5)
  );

  // nav buttons for Q5
  let nav5 = createDiv().parent(d5).style('margin-top', '20px');

  // go back to page 2 (focus + social pref)
  createButton('← Back').parent(nav5)
    .style('margin-right', '10px')
    .style('background-color', '#ffe0b2')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => window.location.href = 'index2.html');

  // go forward to gratitude (q6)
  createButton('Next →').parent(nav5)
    .style('background-color', '#fb8c00')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      // collect all checked boxes
      answers.q5 = boxes
        .filter(cb => cb.checked())
        .map(cb => cb.value());

      localStorage.setItem('answers', JSON.stringify(answers));
      d5.hide();
      showQ6();
    });

  //
  // 🌻 QUESTION 6: Gratitude Input
  //
  let d6 = createDiv().parent(frame).id('q6').hide();
  createP('6. Grateful for…').parent(d6).style('font-size', '18px');

  // text input for gratitude (optional)
  let inp = createInput(answers.q6 || '').parent(d6)
    .style('width', '100%')
    .style('padding', '10px')
    .style('margin-top', '10px')
    .style('border', '1px solid #ffcc80')
    .style('border-radius', '6px');

  // nav buttons for Q6
  let nav6 = createDiv().parent(d6).style('margin-top', '20px');

  // back to care checkboxes
  createButton('← Back').parent(nav6)
    .style('margin-right', '10px')
    .style('background-color', '#ffe0b2')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      d6.hide();
      d5.show();
    });

  // go forward to section 4
  createButton('Next →').parent(nav6)
    .style('background-color', '#fb8c00')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      let text = inp.value().trim();
      if (text) {
        answers.q6 = text;
        localStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'index4.html'; // go to final section
      }
    });

  // if user already answered q5, skip to q6 (like after a refresh)
  if (answers.q5) {
    d5.hide();
    d6.show();
  }
}

// helper to show q6
function showQ6() {
  select('#q6').show();
}

// animated floating orange hearts
function draw() {
  background('#fff8f0'); // soft peach background
  noStroke();
  for (let heart of hearts) {
    fill(heart.color);
    drawHeart(heart.x, heart.y, heart.size);
    heart.y += heart.speed;

    // once a heart goes off screen, brings it back up
    if (heart.y > height + heart.size) {
      heart.y = -heart.size;
      heart.x = random(width);
    }
  }
}

// bezier curve-based heart shape drawing 
// Reference: https://p5js.org/reference/#/p5/bezierVertex
//Reference: Chat Gpt for some of the exact calculations of the bezierVertex. 
function drawHeart(x, y, s) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
  bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
  endShape(CLOSE);
}
