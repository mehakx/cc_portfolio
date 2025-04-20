// First, I check localStorage to see if there's already progress saved.
// This way the quiz can pick up where the user left off if they refresh or return.
// If nothing is saved, I default to an empty object.
let answers = JSON.parse(localStorage.getItem('answers') || '{}');

// This will be the container for all quiz elements on the page.
let frame;

// Array to hold floating heart data for the animated background
let hearts = [];

function setup() {
  // I’m creating a full-screen canvas for the background, positioned behind the quiz.
  // This canvas is where the soft lilac hearts will float around.
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1'); // puts the canvas in the background behind all other content

  // Here I’m generating 50 floating hearts with random position, size, speed, and color.
  // These colors are all in the lilac/purple theme for a soothing vibe
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(10, 25),
      speed: random(0.2, 1),
      color: random(['#e1bee7', '#ce93d8', '#ba68c8']) // light-to-dark purple range
    });
  }

  // This is the main quiz container.
  // It's centered, padded, and styled to match the soft lilac theme.
  frame = createDiv().parent(document.body)
    .style('background-color', '#ffffffee') // white with a little transparency
    .style('border', '2px solid #ba68c8')
    .style('border-radius', '16px')
    .style('padding', '30px')
    .style('max-width', '480px')
    .style('margin', '60px auto')
    .style('font-family', 'Comic Sans MS, sans-serif') // playful font to keep things friendly
    .style('box-shadow', '0 6px 18px rgba(186, 104, 200, 0.3)'); // soft shadow

  // This is the page title. I added an emoji to make it feel welcoming and consistent with the previous pages.
  createElement('h1', '💜 Self‑Love Monitor (4/4)').parent(frame)
    .style('text-align', 'center')
    .style('color', '#8e24aa');

  //
  // QUESTION 7 — Ask the user if they’ve been facing any challenges lately.
  // This allows the user to reflect or skip based on their comfort.
  //
  let d7 = createDiv().parent(frame).id('q7');
  createP('7. Any big challenges?').parent(d7).style('font-size', '18px');

  // This div will hold the navigation buttons (Back, No, Yes)
  let nav7 = createDiv().parent(d7).style('margin-top', '10px');

  // "Back" button takes the user to the previous page (Section 3)
  createButton('← Back').parent(nav7)
    .style('margin-right', '10px')
    .style('background-color', '#f3e5f5')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => window.location.href = 'index3.html');

  // If the user selects "No", just record that and move forward
  createButton('No').parent(nav7)
    .style('margin-right', '10px')
    .style('background-color', '#ce93d8')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      answers.q7 = 'No';
      localStorage.setItem('answers', JSON.stringify(answers));
      d7.hide();
      showQ8();
    });

  // If they say "Yes", I show an input box so they can describe their challenge
  createButton('Yes').parent(nav7)
    .style('background-color', '#ba68c8')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      let inp = createInput().parent(d7)
        .style('margin-top', '10px')
        .style('padding', '8px')
        .style('width', '90%')
        .style('border', '1px solid #ce93d8')
        .style('border-radius', '6px');

      // Clicking "Next" saves their written response and moves forward
      createButton('Next').parent(d7)
        .style('margin-top', '10px')
        .style('background-color', '#8e24aa')
        .style('color', '#fff')
        .style('border', 'none')
        .style('padding', '8px 16px')
        .style('border-radius', '6px')
        .mousePressed(() => {
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
  // QUESTION 8 — Final mood selection dropdown.
  // The idea is to end the quiz with a reflective question.
  //
  let d8 = createDiv().parent(frame).id('q8').hide();
  createP('8. Pick a mood').parent(d8).style('font-size', '18px');

  // Mood options with soft UI styling
  let sel = createSelect().parent(d8)
    .style('margin-top', '10px')
    .style('padding', '8px')
    .style('border-radius', '6px')
    .style('border', '1px solid #ce93d8');
  ['Calm', 'Energetic', 'Reflective'].forEach(option => sel.option(option));
  if (answers.q8) sel.selected(answers.q8);

  // Buttons to navigate or view results
  let nav8 = createDiv().parent(d8).style('margin-top', '20px');

  // Go back to question 7
  createButton('← Back').parent(nav8)
    .style('margin-right', '10px')
    .style('background-color', '#f3e5f5')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      d8.hide();
      d7.show();
    });

  // Once they choose a mood, clicking "Results" ends the quiz and shows their summary
  createButton('Results').parent(nav8)
    .style('background-color', '#8e24aa')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '8px 16px')
    .style('border-radius', '6px')
    .mousePressed(() => {
      answers.q8 = sel.value();
      localStorage.setItem('answers', JSON.stringify(answers));
      showResults();
    });

  // Placeholder for the results screen, hidden until triggered
  createDiv().parent(frame).id('results').hide();

  // If the user has already answered Q7 (like if they refresh), skip to Q8
  if (answers.q7) {
    d7.hide();
    d8.show();
  }
}

// Helper to show the Q8 screen
function showQ8() {
  select('#q8').show();
}

// Results screen with summary and affirmations
function showResults() {
  // Hide Q8 and show results container
  select('#q8').hide();
  let r = select('#results');
  r.show().html(''); // Clear previous content

  // Title
  createElement('h2', 'Your Results').parent(r).style('color', '#8e24aa');

  // Get the selected mood from localStorage answers
  let selectedMood = answers.q1;

  // Emoji-based affirmations
  // Based on the emoji selected I want users to be able to see their responses and change it accordingly. 
  let moodAffirmation = {
    '😊': "You're glowing – keep it up! 💖",
    '😢': "It's okay to feel down. Be kind to yourself 💗",
    '😡': "Take a deep breath. You're doing your best. 🧘",
    '🤔': "Reflection leads to growth – you're on your way 🌱"
  };

  // Use the matching affirmation or fall back to a default- this is in case of some error
  let affirmation = moodAffirmation[selectedMood] ?? "You deserve this joy—keep shining!";

  // Display the dynamic affirmation
  createP(`Affirmation: ${affirmation}`).parent(r);

  // Productivity tip & playlist
  createP('Productivity Tip: Try a 5‑minute stretch.').parent(r);
  createP('Mood Playlist: Calm vibes').parent(r);// i wanted to add some music inspiration here.

  // Label mapping for each answer key
  createElement('h3', 'You answered:').parent(r);
  const labels = {
    q1: 'Mood',
    q2: 'Energy Level',
    q3: 'Focus',
    q4: 'Social Preference',
    q5: 'Care Activities',
    q6: 'Gratitude',
    q7: 'Challenge',
    q8: 'Mood Selection'
  };

  Object.keys(labels).forEach(key => {
    const label = labels[key];
    const value = answers[key] !== undefined ? answers[key] : 'Not answered';
    createP(`${label}: ${Array.isArray(value) ? value.join(', ') : value}`).parent(r);
  });

  // Navigation buttons row
  let navButtons = createDiv().parent(r)
    .style('display', 'flex')
    .style('justify-content', 'space-between')
    .style('margin-top', '30px');

  // Left button: Restart quiz
  createButton('Start Again!').parent(navButtons)
    .style('background-color', '#8e24aa')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '10px 20px')
    .style('font-size', '16px')
    .style('border-radius', '8px')
    .style('cursor', 'pointer')
    .mousePressed(() => {
      window.location.href = 'index1.html';
    });

  // Right button: Go to projects
  createButton('🏠 Back to Projects').parent(navButtons)
    .style('background-color', '#ce93d8')
    .style('color', '#fff')
    .style('border', 'none')
    .style('padding', '10px 20px')
    .style('font-size', '16px')
    .style('border-radius', '8px')
    .style('cursor', 'pointer')
    .mousePressed(() => {
      window.location.href = '../../../projects.html';
    });
}


// p5.js draw loop — animates the background hearts on every frame
function draw() {
  background('#f9f3fc'); // soft lavender background
  noStroke();
  for (let heart of hearts) {
    fill(heart.color);
    drawHeart(heart.x, heart.y, heart.size);
    heart.y += heart.speed;

    // loop the heart to the top after it goes off screen
    if (heart.y > height + heart.size) {
      heart.y = -heart.size;
      heart.x = random(width);
    }
  }
}

// Custom heart drawing function using bezier curves 
// Reference: https://p5js.org/reference/#/p5/bezierVertex
//Reference: Chat Gpt for some of the exact calculations of the bezierVertex. 
function drawHeart(x, y, s) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
  bezierVertex(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
  endShape(CLOSE);
}
