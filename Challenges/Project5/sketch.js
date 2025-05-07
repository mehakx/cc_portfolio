
// function setup() {
//     noCanvas();
//     const container = createDiv()
//       .parent(document.body)
//       .id('oracle-ui');
  
//     // Added a friendly title at the top. The little crystal-ball emoji sets the mood :)  
//     createElement('h2', '🔮 Mood Oracle')
//       .parent(container);
  
//     // A simple prompt to ask the user how they're feeling in one word.
//     createP('How do you feel? (one word)')
//       .parent(container);
  
//     // Then to create a text input for the mood. I set a placeholder to guide the user,
//     // and I gave it an ID so I can grab its value later.
//     const inp = createInput()
//       .attribute('placeholder', 'e.g. anxious')
//       .parent(container)
//       .id('mood');
  
//     // This button triggers the advice lookup when clicked.
//     // I also give it an ID in case I want to style or reference it directly.
//     const btn = createButton('See Oracle')
//       .parent(container)
//       .id('ask');
  
//     // This is for the “loading…” message that stays hidden until we actually fetch advice.
//     const loading = createP('Loading...')
//       .parent(container)
//       .id('loading')
//       .hide();  // start hidden
  
//     // this is to display the oracle's advice. After some experimentation I saw that the italic style makes it look a bit mystical!
//     const adviceP = createP('')
//       .parent(container)
//       .id('advice')
//       .style('font-style', 'italic');
  
//     // Then I used .remove item to clear any previous session data—this ensures a fresh start every time the page loads.
//     localStorage.removeItem('oracle');
  
//     // when the user clicks “See Oracle,” it runs through the advice-fetching flow.
//     btn.mousePressed(() => {
    
//       const mood = inp.value().trim();
//       if (!mood) return;
  
//       // clears any old advice text and show the loading indicator.
//       adviceP.html('');
//       loading.show();
  
//       // this was the url to connect to advice slip's api!
//       const searchURL = `https://api.adviceslip.com/advice/search/${encodeURIComponent(mood)}`;
  
//       // First, it tries to find advice slips that mention our mood word.
//       //CHALLENGE! The mood oracle overall is fun, but the pieces of advice are super vague- so in my final iteration, I hope to pick out or make the advice more specific!
//       loadJSON(
//         searchURL,
//         data => {
//           if (data.slips && data.slips.length) {
//             //Once the list gets returned, the code can then pick one at random to keep it fresh.
//             const slip = random(data.slips);
//             displayAdvice(slip.advice);
//           } else {
//             // In case the word is very vague, there is a fallback function to then load a random piece of advice.
//             loadRandom();
//           }
//         },
//         // If the search request fails (network error, etc.), also fall back.
//         () => loadRandom()
//       );
  
//       // Helper to fetch a truly random slip of advice.
//       function loadRandom() {
//         loadJSON(
//           'https://api.adviceslip.com/advice',
//           randData => displayAdvice(randData.slip.advice),
//           // If even random fails, hide loading and show an error.
//           () => {
//             loading.hide();
//             adviceP.html('😕 Something went wrong.');
//           }
//         );
//       }
  
//       function displayAdvice(text) {
//         loading.hide();
//         adviceP.html(`“${text}”`);
//         // I stored both the mood and the advice so I can show it later
//         // or let the user revisit their last oracle session.
//         localStorage.setItem('oracle', JSON.stringify({ mood, advice: text }));
//       }
//     });
//   }
  
let container, inputMood, buttonAsk, loadingIndicator, adviceParagraph;
let angle = 0;

function setup() {
  // Full-window swirling background
  const bgCanvas = createCanvas(windowWidth, windowHeight);
  bgCanvas.position(0, 0);
  bgCanvas.style('z-index', '-1');

  initUI();
  clearPreviousSession();
  buttonAsk.mousePressed(fetchAdvice);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Swirling background effect
  background(20, 20, 30, 50);
  translate(width / 2, height / 2);
  angle += 0.005;
  for (let i = 0; i < 12; i++) {
    push();
    rotate(angle + (TWO_PI * i) / 12);
    noFill();
    stroke(100 + 50 * sin(angle + i), 150, 200, 100);
    strokeWeight(2);
    ellipse(200, 0, 200, 200);
    pop();
  }
}

// Build the user interface and center it
function initUI() {
  container = createDiv().id('oracle-ui').parent(document.body)
    .style('position', 'absolute')
    .style('top', '50%')
    .style('left', '50%')
    .style('transform', 'translate(-50%, -50%)')
    .style('text-align', 'center')
    .style('padding', '30px')
    .style('background', 'rgba(255,255,255,0.05)')
    .style('border-radius', '16px');

  // Gradient glow typography inspired by Lucid & Dark Sun covers
  const title = createElement('h2', '🔮 Mood Oracle')
    .parent(container)
    .style('font-size', '4rem')
    .style('margin-bottom', '16px')
    .style('background', 'radial-gradient(circle at center, #ff76a0, #fffc84, #88e1ff)')
    .style('-webkit-background-clip', 'text')
    .style('color', 'transparent')
    .style('text-shadow', '0 0 8px rgba(255,118,160,0.7), 0 0 16px rgba(136,225,255,0.7)');

  createP('How do you feel? (one word)')
    .parent(container)
    .style('font-size', '1.3rem')
    .style('margin', '12px 0')
    .style('color', '#eee');

  inputMood = createInput()
    .attribute('placeholder', 'e.g. anxious')
    .id('mood')
    .parent(container)
    .style('font-size', '1.2rem')
    .style('padding', '10px')
    .style('width', '260px')
    .style('margin-right', '10px')
    .style('border', '2px solid rgba(255,255,255,0.3)')
    .style('border-radius', '6px')
    .style('background', 'rgba(255,255,255,0.1)')
    .style('color', '#fff');

  buttonAsk = createButton('See Oracle')
    .id('ask')
    .parent(container)
    .style('font-size', '1.2rem')
    .style('padding', '10px 20px')
    .style('border', 'none')
    .style('border-radius', '6px')
    .style('background', 'radial-gradient(circle at top left, #88e1ff, #ff76a0)')
    .style('color', '#111')
    .style('cursor', 'pointer')
    .style('box-shadow', '0 4px 12px rgba(136,225,255,0.5), 0 2px 6px rgba(255,118,160,0.5)');

  loadingIndicator = createP('Loading...')
    .id('loading')
    .hide()
    .parent(container)
    .style('margin-top', '14px')
    .style('color', '#ccc');

  adviceParagraph = createP('')
    .id('advice')
    .style('font-style', 'italic')
    .style('font-size', '1.6rem')
    .style('margin-top', '20px')
    .style('color', '#fff')
    .parent(container);
}

// Remove any stored oracle data for a fresh start
function clearPreviousSession() {
  localStorage.removeItem('oracle');
}

// Main logic: fetch advice based on user mood
async function fetchAdvice() {
  const mood = inputMood.value().trim();
  if (!mood) return;

  adviceParagraph.html('');
  loadingIndicator.show();
  
  try {
    const advice = await searchAdvice(mood);
    displayAdvice(advice, mood);
  } catch (err) {
    displayError();
  }
}

// Try mood-specific advice, fallback to random
async function searchAdvice(mood) {
  const searchURL = `https://api.adviceslip.com/advice/search/${encodeURIComponent(mood)}`;
  const response = await fetchJSON(searchURL);

  if (response?.slips?.length) {
    const { advice } = random(response.slips);
    return advice;
  }

  const randomResp = await fetchJSON('https://api.adviceslip.com/advice');
  return randomResp.slip.advice;
}

// Helper to fetch and parse JSON
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  return await res.json();
}

// Show advice and save to localStorage
function displayAdvice(text, mood) {
  loadingIndicator.hide();
  adviceParagraph.html(`“${text}”`);
  localStorage.setItem('oracle', JSON.stringify({ mood, advice: text }));
}

// Show an error message when all requests fail
function displayError() {
  loadingIndicator.hide();
  adviceParagraph.html('😕 Something went wrong.');
}
