let answers = JSON.parse(localStorage.getItem('answers') || '{}');
let frame;
let hearts = [];

function setup() {
  // Set up animated blue background hearts
  console.log("p5 setup running 🎨");
  function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(document.body); // 💡 force attach to body
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
  
    for (let i = 0; i < 50; i++) {
      hearts.push({
        x: random(width),
        y: random(height),
        size: random(10, 25),
        speed: random(0.3, 0.8),
        color: random(['#bbdefb', '#64b5f6', '#42a5f5'])
      });
    }
  
    // Quiz frame container
    frame = createDiv().parent(document.body)
      .style('background-color', '#ffffffee')
      .style('border', '2px solid #64b5f6')
      .style('border-radius', '16px')
      .style('padding', '30px')
      .style('max-width', '480px')
      .style('margin', '60px auto')
      .style('font-family', 'Comic Sans MS, cursive, sans-serif')
      .style('box-shadow', '0 6px 18px rgba(100, 181, 246, 0.4)');
  
    createElement('h1', '💙 Self‑Love Monitor (2/4)').parent(frame)
      .style('text-align', 'center')
      .style('color', '#1e88e5');
  
    //
    // QUESTION 3: Focus
    //
    let d3 = createDiv().parent(frame).id('q3');
    createP('3. Focus: High, Medium, Low').parent(d3).style('font-size', '18px');
  
    let r = createRadio().parent(d3).style('margin', '10px').style('font-size', '16px');
    ['High', 'Medium', 'Low'].forEach(o => r.option(o));
    if (answers.q3) r.selected(answers.q3);
  
    let nav3 = createDiv().parent(d3).style('margin-top', '20px');
    createButton('← Back').parent(nav3)
      .style('margin-right', '10px')
      .style('background-color', '#bbdefb')
      .style('border', 'none')
      .style('padding', '8px 16px')
      .style('border-radius', '6px')
      .mousePressed(() => window.location.href = 'page1.html');
  
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
    // QUESTION 4: Social Preference
    //
    let d4 = createDiv().parent(frame).id('q4').hide();
    createP('4. Alone or with friends?').parent(d4).style('font-size', '18px');
  
    let nav4 = createDiv().parent(d4).style('margin-top', '20px');
  
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
          window.location.href = 'page3.html';
        });
    });
  
    // Auto-skip if already answered
    if (answers.q3) {
      d3.hide();
      d4.show();
    }
  }
  
  function showQ4() {
    select('#q4').show();
  }
  
  function draw() {
    background('#e3f2fd');
    noStroke();
    for (let heart of hearts) {
      fill(heart.color);
      drawHeart(heart.x, heart.y, heart.size);
      heart.y += heart.speed;
      if (heart.y > height + heart.size) {
        heart.y = -heart.size;
        heart.x = random(width);
      }
    }
  }
  
  function drawHeart(x, y, s) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
    bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
    endShape(CLOSE);
  }
  
    // Your hearts setup...
  }
  
  


  