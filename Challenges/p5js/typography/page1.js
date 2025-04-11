// To load saved answers from localStorage so the quiz can pick up where the user left off.
// If there’s nothing saved yet, then it defaults to an empty object.
// Reference: MDN localStorage API – https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// This is the main container for the quiz UI.
let frame;

function setup() {
  // created a DIV to wrap the entire quiz, center it, and give it some padding and a border.
  // Using p5.js createDiv() for quick DOM insertion. Reference: p5.js DOM library – https://p5js.org/reference/#/p5/createDiv
  frame = createDiv().parent(document.body)
    .style('border', '3px solid gray')
    .style('padding', '10px')
    .style('max-width', '500px')
    .style('margin', '20px auto');

  // Added the quiz title at the top.
  createElement('h1', 'Self‑Love Monitor (1/4)').parent(frame);

  // QUESTION 1: Mood Emoji
  //
  // I wrapped this question in its own DIV (id="q1") so we can hide/show it easily.
  let d1 = createDiv().parent(frame).id('q1');
  createP('1. How do you feel?').parent(d1);

  // In this i wanted to display four emoji buttons- when one is clicked it should:
  // 1) save the emoji to answers.q1
  // 2)go to local storage
  // 3) hide this question and reveal question 2
  ['😊','😢','😡','🤔'].forEach(e => {
    createButton(e)
      .parent(d1)
      .style('font-size','24px')
      .mousePressed(() => {
        // Saves and follows through to the local storage.
        answers.q1 = e;
        localStorage.setItem('answers', JSON.stringify(answers));
        // move on
        d1.hide();
        showQ2();
      });
  });

  //
  // QUESTION 2: Energy Slider
  //
  // starts hidden; only shows once Q1 is answered.
  let d2 = createDiv().parent(frame).id('q2').hide();
  createP('2. Energy 0–10').parent(d2);

  // creates a slider from 0 to 10. The default values is saved to 5.
  // Reference: p5.js createSlider – https://p5js.org/reference/#/p5/createSlider
  let s = createSlider(0, 10, answers.q2 || 5).parent(d2);
  // A range to display the numeric value next to the slider.
  let t = createSpan(' ' + (answers.q2 || 5)).parent(d2);
  // Updates the range whenever the slider moves.
  s.input(() => t.html(' ' + s.value()));

  // The "next" button saves the slider value and then writes it to the localStorage,
  // then navigates to page2.html for the next questions.
  createButton('Next →').parent(d2)
    .mousePressed(() => {
      answers.q2 = s.value();
      localStorage.setItem('answers', JSON.stringify(answers));
      window.location.href = 'page2.html';
    });

  // This is so that if Q1 was already answered (e.g. user refreshed the page), then it will skip straight to Q2.
  if (answers.q1) {
    d1.hide();
    d2.show();
  }
}

//This is the helper function to un-hide question 2.
function showQ2() {
  select('#q2').show();
}
