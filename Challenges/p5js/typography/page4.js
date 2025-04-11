// Most of my HTML Pages contain similar structures, and use the same references throughout:

// loads saved answers from localStorage so the quiz can resume where the user left off.
// Defaults to an empty object if nothing is stored.
// Reference: MDN localStorage API – https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// will hold the main quiz container.
let frame;

function setup() {
  // creates and styles the main quiz wrapper DIV.
  frame = createDiv().parent(document.body)
    .style('border', '3px solid gray')
    .style('padding', '10px')
    .style('max-width', '500px')
    .style('margin', '20px auto');

  // adds the page title for step 4 of 4.
  createElement('h1', 'Self‑Love Monitor (4/4)').parent(frame);

  //
  // QUESTION 7: Big Challenges: 
  //
  // wraps Q7 in its own DIV (id="q7") for easy show/hide control.
  let d7 = createDiv().parent(frame).id('q7');
  createP('7. Any big challenges?').parent(d7);

  // container for navigation and answer buttons.
  let nav7 = createDiv().parent(d7);

  // back button which goes back to page3.html
  createButton('← Back').parent(nav7)
    .mousePressed(() => window.location.href = 'page3.html');

  // "No" button that records "No" then follows through then shows Q8
  createButton('No').parent(nav7)
    .mousePressed(() => {
      answers.q7 = 'No';
      localStorage.setItem('answers', JSON.stringify(answers));
      d7.hide();
      showQ8();
    });

  // "Yes" button that dynamically adds input for the user to describe the challenge
  createButton('Yes').parent(nav7)
    .mousePressed(() => {
      // creates a text input for the user’s answer
      let inp = createInput().parent(d7);
      // creates a next button to submit the input
      let nxt = createButton('Next').parent(d7);
      nxt.mousePressed(() => {
        let text = inp.value().trim();
        if (text) {
          answers.q7 = text;
          localStorage.setItem('answers', JSON.stringify(answers));
          d7.hide();
          showQ8();
        }
      });
    });

  //
  // QUESTION 8: pick a mood (hidden initially)
  //
  let d8 = createDiv().parent(frame).id('q8').hide();
  createP('8. Pick a mood').parent(d8);

  // creates a dropdown select for mood options.
  let sel = createSelect().parent(d8);
  ['Calm', 'Energetic', 'Reflective'].forEach(option => sel.option(option));
  // psre-select if previously answered
  if (answers.q8) sel.selected(answers.q8);

  //navigation container for Q8
  let nav8 = createDiv().parent(d8);
  createButton('← Back').parent(nav8)
    .mousePressed(() => {
      d8.hide();
      d7.show();
    });
  // Results: saves mood, follows through, then shows the results summary
  createButton('Results').parent(nav8)
    .mousePressed(() => {
      answers.q8 = sel.value();
      localStorage.setItem('answers', JSON.stringify(answers));
      showResults();
    });


  let r = createDiv().parent(frame).id('results').hide();

  // If q7 was already answered then i made it go to q8
  if (answers.q7) {
    d7.hide();
    d8.show();
  }
}

// helper to un-hide question 8 once Q7 is answered.
function showQ8() {
  select('#q8').show();
}

// displays the final results screen.
function showResults() {
  // Hide Q8 and reveals the results DIV
  select('#q8').hide();
  let r = select('#results');
  r.show().html('');  // clears any previous content

  // Adds a header and then some recommendations
  createElement('h2', 'Your Results').parent(r);
  createP('Affirmation: You deserve this joy—keep shining!').parent(r);
  createP('Productivity Tip: Try a 5‑minute stretch.').parent(r);
  createP('Mood Playlist: Calm vibes').parent(r);

  // shows a summary of all answers
  createElement('h3', 'You answered:').parent(r);
  ['q1','q2','q3','q4','q5','q6','q7','q8'].forEach(key => {
    createP(`${key}: ${JSON.stringify(answers[key])}`).parent(r);
  });
}
