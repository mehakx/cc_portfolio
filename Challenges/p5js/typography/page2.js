// Most of my HTML Pages contain similar structures, and use the same references throughout:
// To load saved answers from localStorage so the quiz can pick up where the user left off.
// If there’s nothing saved yet, then it defaults to an empty object.
// Reference: MDN localStorage API – https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// This is the main container for the quiz UI.
let frame;

function setup() {
  // created a DIV to wrap the entire quiz, center it, and give it some padding and a border.
  // Using p5.js again to createDiv() for quick DOM insertion. Reference: p5.js DOM library – https://p5js.org/reference/#/p5/createDiv
  frame = createDiv().parent(document.body)
    .style('border', '3px solid gray')
    .style('padding', '10px')
    .style('max-width', '500px')
    .style('margin', '20px auto');

  // Added the quiz title at the top for page 2 of 4.
  createElement('h1', 'Self‑Love Monitor (2/4)').parent(frame);

  // QUESTION 3: Focus Level
  //
  // I wrapped this question in its own DIV (id="q3") so we can hide/show it easily.
  let d3 = createDiv().parent(frame).id('q3');
  createP('3. Focus: High, Medium, Low').parent(d3);

  // I wanted to alter the style of the buttons and so decided to create a radio button
  // styl and store it in createRadio():
  // Reference: p5.js createRadio – https://p5js.org/reference/#/p5/createRadio
  let r = createRadio().parent(d3);
  ['High', 'Medium', 'Low'].forEach(o => r.option(o));

  // pre-select the previously saved answer if there is one
  if (answers.q3) {
    r.selected(answers.q3);
  }

  // navigation buttons for Q3
  let nav3 = createDiv().parent(d3);
  createButton('← Back').parent(nav3)
    .mousePressed(() => window.location.href = 'page1.html');
  createButton('Next →').parent(nav3)
    .mousePressed(() => {
      // Saves the selected focus level to answers.q3 and follows through to localStorage
      answers.q3 = r.value();
      localStorage.setItem('answers', JSON.stringify(answers));
      // hides Q3 and reveal Q4
      d3.hide();
      showQ4();
    });

  // QUESTION 4: Social Preference:
  //
  // starts hidden; only shows once Q3 is answered.
  let d4 = createDiv().parent(frame).id('q4').hide();
  createP('4. Alone or with friends?').parent(d4);

  // navigation buttons & options for Q4
  let nav4 = createDiv().parent(d4);
  createButton('← Back').parent(nav4)
    .mousePressed(() => {
      // hides Q4 and goes back to Q3
      d4.hide();
      d3.show();
    });
  ['Alone', 'With friends'].forEach(o => {
    createButton(o).parent(nav4)
      .mousePressed(() => {
        // saves answer, follows through, then navigates to page3.html
        answers.q4 = o;
        localStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'page3.html';
      });
  });

  // auto‑skips if Q3 was already answered (e.g. if user refreshed the page)
  if (answers.q3) {
    d3.hide();
    d4.show();
  }
}

// helper function to un-hide question 4 when Q3 is completed
function showQ4() {
  select('#q4').show();
}
