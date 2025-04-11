// loads saved quiz answers from localStorage, or start with an empty object if none exist.
// Reference: MDN localStorage API – https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// this will hold the quiz container DIV.
let frame;

function setup() {
  // create and style the main quiz container.
  frame = createDiv().parent(document.body)
    .style('border', '3px solid gray')
    .style('padding', '10px')
    .style('max-width', '500px')
    .style('margin', '20px auto');

  // Add the page title for step 3 of 4.
  createElement('h1', 'Self‑Love Monitor (3/4)').parent(frame);

  //
  // QUESTION 5: Self‑Care Selection
  //
  // wrap this question in a DIV (id="q5") to show/hide control.
  let d5 = createDiv().parent(frame).id('q5');
  createP('5. Select a form of care').parent(d5);

  // Define the care options and create a checkbox for each.
  // If the user has previous answers.q5, pre‑check those boxes.
  let items = ['Sleep', 'Hydrate', 'Excercise', 'Journal'];
  let boxes = items.map(item =>
    createCheckbox(item, (answers.q5 || []).includes(item)).parent(d5)
  );

  // Navigation buttons for Q5
  let nav5 = createDiv().parent(d5);
  // go back to page2.html
  createButton('← Back').parent(nav5)
    .mousePressed(() => window.location.href = 'page2.html');
  // saves selected care options, follows through , then shows Q6
  createButton('Next →').parent(nav5)
    .mousePressed(() => {
      // gathers all checked values into an array
      answers.q5 = boxes
        .filter(cb => cb.checked())
        .map(cb => cb.value());
      // saves to localStorage
      localStorage.setItem('answers', JSON.stringify(answers));
      // hides Q5 and reveals Q6
      d5.hide();
      showQ6();
    });

  //
  // QUESTION 6: gratitude Entry
  //
  let d6 = createDiv().parent(frame).id('q6').hide();
  createP('6. Grateful for…').parent(d6);

  // text input for the gratitude prompt, pre‑filled if answers.q6 exists.
  let inp = createInput(answers.q6 || '').parent(d6);

  // navigation buttons for Q6
  let nav6 = createDiv().parent(d6);
  // Back- hides Q6 and shows Q5 again
  createButton('← Back').parent(nav6)
    .mousePressed(() => {
      d6.hide();
      d5.show();
    });
 
  createButton('Next →').parent(nav6)
    .mousePressed(() => {
      let text = inp.value().trim();
      if (text) {
        answers.q6 = text;
        localStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'page4.html';
      }
    });

  // If the user already completed Q5 (e.g., on refresh), skip to Q6 immediately.
  if (answers.q5) {
    d5.hide();
    d6.show();
  }
}

function showQ6() {
  select('#q6').show();
}
