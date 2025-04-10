// Self‑Love Checklist

// stores all answers here
let answers = {};

// main container for the quiz
let frame;

function setup() {
 // this is to create a box around everything:
  frame = createDiv();
  frame.style('border', '3px solid gray');
  frame.style('padding', '10px');
  frame.style('max-width', '500px');
  frame.style('margin', '20px auto');

  // quiz title
  createElement('h1', 'Self‑Love Monitor').parent(frame);

  // adding each question to the page
  q1();
  q2();
  q3();
  q4();
  q5();
  q6();
  q7();
  q8();

  // to prepare results area but keeping it hidden for now: 
  let r = createDiv().parent(frame);
  r.id('results');
  r.hide();
}

// updates the border color and thickness based on how many questions are done
function updateBorder() {
    let done = Object.keys(answers).length;   // count answered questions
    let pct = done / 8;                       // percent complete
    let c = floor(200 + 55 * pct);            // map to 200–255
  
    // change color
    frame.style('border-color', 'rgb(' + c + ',200,200)');
    // change thickness (e.g., from 4px up to 20px as you progress)
    let thickness = floor(4 + 16 * pct);      // maps 0→4px to 1→20px
    frame.style('border-width', thickness + 'px');
  }
  //I had to experiment with the above calculations and used little bit of ai over here to make sure my calculations were accurate!
  
// QUESTION 1: Emoji mood
function q1() {
  // container for question 1
  let d = createDiv().parent(frame);
  d.id('q1');
  createP('1. How do you feel?').parent(d);

  // possible emojis
  let em = ['😊','😢','😡','🤔'];
  for (let i = 0; i < em.length; i++) {
    let b = createButton(em[i]).parent(d);
    b.style('font-size','24px');
    b.mousePressed(function() {
      // save answer, hide this question, show next
      answers.q1 = em[i];
      d.hide();
      select('#q2').show();
      updateBorder();
    });
  }
}

// QUESTION 2: Energy slider
function q2() {
  let d = createDiv().parent(frame);
  d.id('q2');
  d.hide();  // start hidden
  createP('2. Energy 0–10').parent(d);

  // slider input
  let s = createSlider(0,10,5).parent(d);
  let t = createSpan('5').parent(d);
  // update text as slider moves
  s.input(function() { t.html(' ' + s.value()); });

  // next button
  createButton('Next').parent(d).mousePressed(function() {
    answers.q2 = s.value();
    d.hide();
    select('#q3').show();
    updateBorder();
  });
}

// QUESTION 3: Focus slide
function q3() {
  let d = createDiv().parent(frame);
  d.id('q3');
  d.hide();
  createP('3. Focus: High, Medium, Low').parent(d);

  //  buttons
  let r = createRadio().parent(d);
  r.option('High');
  r.option('Medium');
  r.option('Low');
  r.selected('Medium');

  // next
  createButton('Next').parent(d).mousePressed(function() {
    answers.q3 = r.value();
    d.hide();
    select('#q4').show();
    updateBorder();
  });
}

// QUESTION 4: question: 
function q4() {
  let d = createDiv().parent(frame);
  d.id('q4');
  d.hide();
  createP('4. Alone or with friends?').parent(d);

  // two buttons
  ['Alone','With friends'].forEach(o => {
    let b = createButton(o).parent(d);
    b.mousePressed(function() {
      answers.q4 = o;
      d.hide();
      select('#q5').show();
      updateBorder();
    });
  });
}

// QUESTION 5: Self‑care checklist
function q5() {
  let d = createDiv().parent(frame);
  d.id('q5');
  d.hide();
  createP('5. Slect a form of care').parent(d);

  // multiple checkboxes
  let items = ['Sleep','Hydrate','Excercise','Journal'];
  let boxes = items.map(i => createCheckbox(i,false).parent(d));

  // next
  createButton('Next').parent(d).mousePressed(function() {
    // To collect checked values
    answers.q5 = boxes
      .filter(cb => cb.checked())
      .map(cb => cb.value());
    d.hide();
    select('#q6').show();
    updateBorder();
  });
}

// QUESTION 6: Gratitude text
function q6() {
  let d = createDiv().parent(frame);
  d.id('q6');
  d.hide();
  createP('6. Grateful for…').parent(d);

  // text input
  let i = createInput().parent(d);

  // next
  createButton('Next').parent(d).mousePressed(function() {
    if (i.value().trim()) {
      answers.q6 = i.value();
      d.hide();
      select('#q7').show();
      updateBorder();
    }
  });
}

// QUESTION 7: Challenges yes/no
function q7() {
  let d = createDiv().parent(frame);
  d.id('q7');
  d.hide();
  createP('7. Any big challenges?').parent(d);

  // yes button
  createButton('Yes').parent(d).mousePressed(function() {
    // show a text box if yes
    let i = createInput().parent(d);
    let n = createButton('Next').parent(d);
    n.mousePressed(function() {
      if (i.value().trim()) {
        answers.q7 = i.value();
        d.hide();
        select('#q8').show();
        updateBorder();
      }
    });
  });

  // no button
  createButton('No').parent(d).mousePressed(function() {
    answers.q7 = 'No';
    d.hide();
    select('#q8').show();
    updateBorder();
  });
}

// QUESTION 8: What vibe would you go for?
function q8() {
  let d = createDiv().parent(frame);
  d.id('q8');
  d.hide();
  createP('8. Pick a mood').parent(d);

  // dropdown with three different moods
  let s = createSelect().parent(d);
  s.option('Calm');
  s.option('Energetic');
  s.option('Reflective');

  // finish
  createButton('Results').parent(d).mousePressed(function() {
    answers.q8 = s.value();
    d.hide();
    showResults(); //show the summary 
    updateBorder();
  });
}

// show final results
function showResults() {
  let r = select('#results');
  r.show();
  r.html('');  // clear old content

  // summary lines
  createElement('h2','Your Results').parent(r);
  createP('Affirmation: You deserve this joy—keep shining!').parent(r);
  createP('Productivity Tip: Try a 5‑minute stretch.').parent(r);
  createP('Mood Playlist: Calm vibes').parent(r);

  // This lists what users answered
  createElement('h3','You answered:').parent(r);
  createP('You said: ' + answers.q1).parent(r);
  createP('Energy: ' + answers.q2).parent(r);
  createP('Focus: ' + answers.q3).parent(r);
  createP('Time: ' + answers.q4).parent(r);
  createP('Self‑care: ' + (answers.q5.length ? answers.q5.join(', ') : 'None')).parent(r);
  createP('Grateful for: ' + answers.q6).parent(r);
  createP('Challenges: ' + answers.q7).parent(r);
  createP('Vibe: ' + answers.q8).parent(r);
}
