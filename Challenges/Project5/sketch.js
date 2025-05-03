
function setup() {
    noCanvas();
    const container = createDiv()
      .parent(document.body)
      .id('oracle-ui');
  
    // Added a friendly title at the top. The little crystal-ball emoji sets the mood :)  
    createElement('h2', '🔮 Mood Oracle')
      .parent(container);
  
    // A simple prompt to ask the user how they're feeling in one word.
    createP('How do you feel? (one word)')
      .parent(container);
  
    // Then to create a text input for the mood. I set a placeholder to guide the user,
    // and I gave it an ID so I can grab its value later.
    const inp = createInput()
      .attribute('placeholder', 'e.g. anxious')
      .parent(container)
      .id('mood');
  
    // This button triggers the advice lookup when clicked.
    // I also give it an ID in case I want to style or reference it directly.
    const btn = createButton('See Oracle')
      .parent(container)
      .id('ask');
  
    // This is for the “loading…” message that stays hidden until we actually fetch advice.
    const loading = createP('Loading...')
      .parent(container)
      .id('loading')
      .hide();  // start hidden
  
    // this is to display the oracle's advice. After some experimentation I saw that the italic style makes it look a bit mystical!
    const adviceP = createP('')
      .parent(container)
      .id('advice')
      .style('font-style', 'italic');
  
    // Then I used .remove item to clear any previous session data—this ensures a fresh start every time the page loads.
    localStorage.removeItem('oracle');
  
    // when the user clicks “See Oracle,” it runs through the advice-fetching flow.
    btn.mousePressed(() => {
    
      const mood = inp.value().trim();
      if (!mood) return;
  
      // clears any old advice text and show the loading indicator.
      adviceP.html('');
      loading.show();
  
      // this was the url to connect to advice slip's api!
      const searchURL = `https://api.adviceslip.com/advice/search/${encodeURIComponent(mood)}`;
  
      // First, it tries to find advice slips that mention our mood word.
      //CHALLENGE! The mood oracle overall is fun, but the pieces of advice are super vague- so in my final iteration, I hope to pick out or make the advice more specific!
      loadJSON(
        searchURL,
        data => {
          if (data.slips && data.slips.length) {
            //Once the list gets returned, the code can then pick one at random to keep it fresh.
            const slip = random(data.slips);
            displayAdvice(slip.advice);
          } else {
            // In case the word is very vague, there is a fallback function to then load a random piece of advice.
            loadRandom();
          }
        },
        // If the search request fails (network error, etc.), also fall back.
        () => loadRandom()
      );
  
      // Helper to fetch a truly random slip of advice.
      function loadRandom() {
        loadJSON(
          'https://api.adviceslip.com/advice',
          randData => displayAdvice(randData.slip.advice),
          // If even random fails, hide loading and show an error.
          () => {
            loading.hide();
            adviceP.html('😕 Something went wrong.');
          }
        );
      }
  
      function displayAdvice(text) {
        loading.hide();
        adviceP.html(`“${text}”`);
        // I stored both the mood and the advice so I can show it later
        // or let the user revisit their last oracle session.
        localStorage.setItem('oracle', JSON.stringify({ mood, advice: text }));
      }
    });
  }
  
 
  