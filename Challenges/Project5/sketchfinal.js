// — Cosmic Mood Oracle —
// This is my attempt at creating a mystical, cosmic-themed mood advice
// generator. Started with a basic design then kept adding cool visual effects
// until it felt like a magical experience!

// References:
// - Colors inspired by "Neon Dreams" palette by Paletton (https://paletton.com)
// - Glow effects based on Josh Comeau's CSS glow tutorial (https://www.joshwcomeau.com/css/designing-beautiful-shadows/)
// - Star shapes adapted from CSS-Tricks clip-path examples (https://css-tricks.com/the-shapes-of-css/)
// - Moon phases visualization inspired by NASA's moon phase diagram
// - Advice content from Advice Slip API (https://api.adviceslip.com/)

let inputMood, buttonAsk, loadingIndicator, adviceParagraph;

function setup() {
    initUI(); // Create all the UI elements with cosmic styling
    clearPreviousSession(); // Clear previous session data for a fresh start
    buttonAsk.mousePressed(fetchAdvice); // Set up button click event
}
  
function draw() {
    // No draw loop needed - this is a static UI with CSS animations
    // I decided against using p5's animation loop to save resources
}
  
// Build the user interface with a dark, neon-glow style
// I spent ages tweaking these values until it looked just right!
function initUI() {
    // Set full-viewport dark navy background - tried black first but this blue looks more cosmic
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.body.style.display = 'flex';
    document.body.style.alignItems = 'center';
    document.body.style.justifyContent = 'center';
    document.body.style.background = '#0a0a30'; // Dark navy background - reminds me of deep space
    document.body.style.fontFamily = '"Mystery Quest", cursive'; // This font has that perfect mystical vibe
                                                                // From Google Fonts (https://fonts.google.com/)
    document.body.style.overflow = 'hidden'; // Prevent scrollbars - they break the immersion
  
    // Container with translucent dark backdrop - I like how it creates a "window" into the cosmos
    const container = createDiv().id('oracle-ui').parent(document.body)
      .style('position', 'relative')
      .style('text-align', 'center')
      .style('padding', '50px')
      .style('background', 'rgba(15,15,50,0.6)') // Translucent blue lets some of the stars show through
      .style('border', '1px solid rgba(180,120,255,0.2)') // Subtle purple border - tried thicker but this is more elegant
      .style('border-radius', '12px')
      .style('box-shadow', '0 0 30px rgba(0,0,0,0.9)') // Deep shadow for that floating effect
      .style('z-index', '10'); // Keep UI above the cosmic elements
  
    // Neon glow title - took forever to get these shadow values just right!
    // Text-shadow technique adapted from "CSS Neon Text Effects" by Envato Tuts+
    // (https://webdesign.tutsplus.com/tutorials/how-to-create-a-neon-text-effect-with-css--cms-32920)
    const title = createElement('h1', 'Mood Oracle')
      .parent(container)
      .style('font-size', '4.5rem')
      .style('margin', '0 0 40px')
      .style('color', '#ff9cff') // Bright pink/purple base color
      .style('text-shadow',
        '0 0 5px #ff9cff, ' +
        '0 0 10px #ff9cff, ' +
        '0 0 20px #ff9cff, ' +
        '0 0 30px #ff9cff, ' + 
        '0 0 40px #ff9cff') // Multiple layers of shadow create that authentic neon glow
      .style('letter-spacing', '4px')
      .style('font-weight', 'normal');
  
    // Prompt text - kept this simple so it doesn't compete with the title
    createP('How do you feel? (one word)')
      .parent(container)
      .style('font-size', '1.2rem')
      .style('color', '#fff')
      .style('margin-bottom', '25px');
  
    // Neon input field - subtle glow effect makes it inviting
    // Input styling inspired by "Glassmorphism UI" trend (https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)
    inputMood = createInput()
      .attribute('placeholder', 'e.g. anxious')
      .parent(container)
      .style('font-size', '1.2rem')
      .style('padding', '10px 12px')
      .style('width', '290px')
      .style('background', 'rgba(15,15,50,0.3)') // Dark blue makes the text pop but keeps the theme
      .style('border', '1px solid rgba(255,255,255,0.2)')
      .style('border-radius', '4px')
      .style('color', '#fff')
      .style('margin-right', '12px')
      .style('margin-bottom', '20px')
      .style('box-shadow', '0 0 5px rgba(255,156,255,0.3)'); // Subtle pink glow
  
    // Neon button - tried several color combinations before settling on this purple
    buttonAsk = createButton('See Oracle')
      .parent(container)
      .style('font-size', '1.2rem')
      .style('padding', '10px 30px')
      .style('background', 'rgba(120,40,180,0.4)') // Purple matches the cosmic theme perfectly
      .style('border', '1px solid rgba(180,120,255,0.6)') // Lighter border gives depth
      .style('border-radius', '4px')
      .style('color', '#fff')
      .style('cursor', 'pointer')
      .style('box-shadow', '0 0 10px rgba(180,120,255,0.5)') // Purple glow effect
      .style('transition', 'all 0.2s') // Smooth hover transition
      .mouseOver(() => buttonAsk.style('background', 'rgba(140,60,200,0.6)')) // Brighten on hover
      .mouseOut(() => buttonAsk.style('background', 'rgba(120,40,180,0.4)')); // Return to normal
  
    // Loading indicator - kept simple but themed
    loadingIndicator = createP('Loading...')
      .id('loading')
      .hide() // Hidden initially
      .parent(container)
      .style('margin-top', '20px')
      .style('color', '#a78bff'); // Light purple
  
    // Advice text with soft glow - the star of the show once it appears
    adviceParagraph = createP('')
      .id('advice')
      .parent(container)
      .style('font-size', '1.5rem')
      .style('margin-top', '30px')
      .style('color', '#fff')
      .style('text-shadow', 
        '0 0 4px rgba(255,156,255,0.7), ' + 
        '0 0 8px rgba(180,120,255,0.5)') // Double shadow for that mystical effect
      .style('font-family', '"Mystery Quest", cursive');
      
    // This is where the magic happens - all the cosmic background elements!
    addEnhancedCosmicElements();
}
  
// This function creates all the stars, swirls, moons, and other cosmic elements
// After about 5 iterations, I finally got the perfect cosmic atmosphere I was looking for
function addEnhancedCosmicElements() {
    // Add CSS for cosmic animations and elements
    // These keyframes create all the different movements in the background
    // Animation techniques inspired by "Advanced CSS Animations" course on Frontend Masters
    // and "Animation Handbook" by Ryan McLeod (https://www.designbetter.co/animation-handbook)
    let styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.2; }
        50% { opacity: 1; }
        100% { opacity: 0.2; }
      }
      
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(5deg); } /* Added rotation for more organic movement */
        100% { transform: translateY(0px) rotate(0deg); }
      }
      
      @keyframes floatSideways {
        0% { transform: translateX(0px) translateY(0px); }
        33% { transform: translateX(20px) translateY(-10px); } /* Three-stage movement feels more natural */
        66% { transform: translateX(-10px) translateY(15px); } /* than a simple back-and-forth */
        100% { transform: translateX(0px) translateY(0px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.2); opacity: 1; } /* Breathing effect for cosmic objects */
        100% { transform: scale(1); opacity: 0.7; }
      }
      
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes counterRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); } /* Having elements rotate in opposite directions */
      }                                     /* creates more visual interest */
      
      /* Base class for all cosmic elements */
      .cosmic-element {
        position: absolute;
        z-index: -1;
        pointer-events: none; /* Ensures elements don't interfere with UI interaction */
      }
      
      /* Element-specific styles */
      .star {
        border-radius: 50%;
      }
      
      /* I'm particularly proud of this star shape using clip-path! */
      /* Star shape math derived from "CSS Polygon Generator" (https://bennettfeely.com/clippy/) */
      .sparkle {
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      }
      
      .swirl {
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #8c3bff; /* Two-tone border creates rotating gradient effect */
        border-bottom-color: #ff77ff;
      }
      
      .moon {
        box-shadow: 0 0 20px rgba(255,255,255,0.6);
      }
      
      .nebula {
        filter: blur(8px); /* Blur creates that gaseous nebula look */
        mix-blend-mode: screen; /* Blend mode makes colors more vibrant */
      }
      
      .constellation {
        background: transparent;
      }
      
      .constellation-line {
        position: absolute;
        background: linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.5), rgba(255,255,255,0.1));
        height: 1px;
        transform-origin: 0 0;
      }
      
      .constellation-star {
        position: absolute;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 5px white;
      }
    `; // <-- closed template literal
    document.head.appendChild(styleElement);
    
    // Create cosmic background container - all elements will be placed inside this
    const cosmicBg = createDiv()
      .style('position', 'fixed')
      .style('top', '0')
      .style('left', '0')
      .style('width', '100%')
      .style('height', '100%')
      .style('z-index', '-5')
      .style('overflow', 'hidden');
    
    // 1. LARGER Colorful stars - the basic building blocks of my cosmic scene
    // Star rendering inspired by "Night Sky Visualization" by Greg Hovanesyan
    // (https://codepen.io/gregh/pen/YeMzZE)
    for (let i = 0; i < 20; i++) {
      const size = random(5, 12); // Nice medium size for main stars
      const x = random(window.innerWidth);
      const y = random(window.innerHeight);
      const duration = random(3, 7); // Random durations make it feel more natural
      const delay = random(0, 2); // Random delays prevent everything from pulsing in sync
      const hue = random([280, 300, 260, 320]); // Various purple/pink hues - tried blues but these match the theme better
      
      createDiv()
        .class('cosmic-element star')
        .parent(cosmicBg)
        .style('width', `${size}px`)
        .style('height', `${size}px`)
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('background', `hsl(${hue}, 100%, 80%)`)
        .style('box-shadow', `0 0 ${size*3}px hsl(${hue}, 100%, 70%)`) // Big glow radius
        .style('animation', `twinkle ${duration}s infinite ${delay}s, float ${duration*2}s infinite ${delay}s`);
    }
    
    // 2. LARGER Star-shaped sparkles - these are my favorite elements!
    for (let i = 0; i < 12; i++) {
      const size = random(12, 24); // These need to be bigger to show the star shape
      const x = random(window.innerWidth);
      const y = random(window.innerHeight);
      const duration = random(4, 8);
      const delay = random(0, 2);
      const hue = random([290, 310, 270]); // More purple-focused hues
      
      createDiv()
        .class('cosmic-element sparkle')
        .parent(cosmicBg)
        .style('width', `${size}px`)
        .style('height', `${size}px`)
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('background', `hsl(${hue}, 100%, 75%)`)
        .style('box-shadow', `0 0 ${size*2}px hsl(${hue}, 100%, 70%)`) // Glow effect
        .style('animation', `pulse ${duration}s infinite ${delay}s, floatSideways ${duration*3}s infinite ${delay}s`);
    }
    
    // 3. Giant glowing orbs - represent distant nebulae or galaxies
    // Nebula effect inspired by NASA Hubble images and "WebGL Nebula" by Ebram Marzouk
    // (https://codepen.io/ebram/pen/qBdyjEM)
    for (let i = 0; i < 3; i++) {
      const size = random(60, 120); // These are huge - like distant galaxies
      const x = random(window.innerWidth);
      const y = random(window.innerHeight);
      const duration = random(15, 25); // Slow pulsing for these big elements
      const delay = random(0, 4);
      const hue = random([260, 290, 320]); // Various purple/pink hues
      
      createDiv()
        .class('cosmic-element nebula')
        .parent(cosmicBg)
        .style('width', `${size}px`)
        .style('height', `${size}px`)
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('background', `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.3) 0%, hsla(${hue}, 100%, 50%, 0) 70%)`)
        .style('border-radius', '50%')
        .style('opacity', '0.7')
        .style('animation', `pulse ${duration}s infinite ${delay}s, floatSideways ${duration*2}s infinite ${delay}s`);
    }
    
    // 4. LARGER Glowing swirls - represent cosmic energy patterns
    // Inspired by James Turrell's light installations (https://jamesturrell.com)
    for (let i = 0; i < 4; i++) {
      const size = random(100, 200); // Big rotating elements
      const x = random(window.innerWidth);
      const y = random(window.innerHeight);
      const duration = random(20, 40); // Slow rotation
      const delay = random(0, 5);
      const direction = i % 2 === 0 ? 'rotate' : 'counterRotate'; // Alternate directions
      
      createDiv()
        .class('cosmic-element swirl')
        .parent(cosmicBg)
        .style('width', `${size}px`)
        .style('height', `${size}px`)
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('box-shadow', '0 0 40px rgba(140, 59, 255, 0.4), inset 0 0 40px rgba(255, 119, 255, 0.4)') // Inner and outer glow
        .style('animation', `${direction} ${duration}s linear infinite ${delay}s, float ${duration*1.5}s infinite ${delay}s`);
    }
    
    // 5. Giant spiral swirl in background - the centerpiece of the cosmic scene
    // Spiral galaxy inspired by NASA's imagery of the Milky Way and "Spiral Generator" by Akimitsu Hamamuro
    // (https://codepen.io/akm2/pen/rHIsa)
    const mainSwirl = createDiv()
      .class('cosmic-element')
      .parent(cosmicBg)
      .style('width', '600px') // This is huge! Almost like a galaxy
      .style('height', '600px')
      .style('left', `${window.innerWidth/2 - 300}px`) // Centered
      .style('top', `${window.innerHeight/2 - 300}px`)
      .style('background', 'radial-gradient(circle, rgba(10,10,48,0) 30%, rgba(140,59,255,0.15) 70%)')
      .style('border-radius', '50%')
      .style('border', '3px solid rgba(140,59,255,0.15)')
      .style('box-shadow', '0 0 70px rgba(140,59,255,0.25)') // Massive glow
      .style('animation', 'rotate 60s linear infinite'); // Slow majestic rotation
      
    // Add spiral arms to main swirl - makes it look like a galaxy
    for (let i = 0; i < 4; i++) {
      const angle = i * 90; // Evenly spaced arms
      const spiralArm = createDiv()
        .parent(mainSwirl)
        .style('position', 'absolute')
        .style('width', '280px') // Long arms
        .style('height', '3px')
        .style('top', '300px')
        .style('left', '300px')
        .style('transform-origin', '0 0') // Rotate from center
        .style('transform', `rotate(${angle}deg)`)
        .style('background', 'linear-gradient(to right, rgba(140,59,255,0.6), rgba(255,156,255,0))') // Fade out
        .style('box-shadow', '0 0 10px rgba(255,156,255,0.4)'); // Glow effect
    }
    
    // 6. Add moon phases - took forever to get these gradients right!
    // Moon phase visualization inspired by NASA's moon phase diagrams
    // and "CSS Moon Phases" by Codeconvey (https://codeconvey.com/pure-css-moon-phases-animation/)
    const moonPhases = [
      // Full Moon
      {
        size: 35,
        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(210,210,255,1) 70%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 20px rgba(255,255,255,0.8)'
      },
      // Waning Gibbous - the trick is the circle position in the gradient
      {
        size: 32,
        background: 'radial-gradient(circle at 30% 50%, rgba(15,15,50,1) 0%, rgba(15,15,50,1) 20%, rgba(255,255,255,1) 20%, rgba(210,210,255,1) 70%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 20px rgba(255,255,255,0.7)'
      },
      // Third Quarter
      {
        size: 30,
        background: 'radial-gradient(circle at 0% 50%, rgba(15,15,50,1) 0%, rgba(15,15,50,1) 50%, rgba(255,255,255,1) 50%, rgba(210,210,255,1) 80%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 15px rgba(255,255,255,0.6)'
      },
      // Waning Crescent
      {
        size: 28,
        background: 'radial-gradient(circle at -30% 50%, rgba(15,15,50,1) 0%, rgba(15,15,50,1) 80%, rgba(255,255,255,1) 80%, rgba(210,210,255,1) 90%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 15px rgba(255,255,255,0.5)'
      },
      // New Moon - nearly invisible!
      {
        size: 25,
        background: 'radial-gradient(circle, rgba(40,40,80,1) 0%, rgba(30,30,70,1) 70%, rgba(40,40,80,0.8) 100%)',
        boxShadow: '0 0 10px rgba(100,100,150,0.6)'
      },
      // Waxing Crescent
      {
        size: 28,
        background: 'radial-gradient(circle at 130% 50%, rgba(15,15,50,1) 0%, rgba(15,15,50,1) 80%, rgba(255,255,255,1) 80%, rgba(210,210,255,1) 90%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 15px rgba(255,255,255,0.5)'
      },
      // First Quarter
      {
        size: 30,
        background: 'radial-gradient(circle at 100% 50%, rgba(15,15,50,1) 0%, rgba(15,15,50,1) 50%, rgba(255,255,255,1) 50%, rgba(210,210,255,1) 80%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 15px rgba(255,255,255,0.6)'
      },
      // Waxing Gibbous
      {
        size: 32,
        background: 'radial-gradient(circle at 70% 50%, rgba(15,15,50,1) 0%, rgba(15,15,50,1) 20%, rgba(255,255,255,1) 20%, rgba(210,210,255,1) 70%, rgba(180,180,255,0.8) 100%)',
        boxShadow: '0 0 20px rgba(255,255,255,0.7)'
      }
    ];
    
    // Place moon phases around the screen in a circle - like moon phase diagrams
    for (let i = 0; i < moonPhases.length; i++) {
      const moon = moonPhases[i];
      const angle = (i / moonPhases.length) * Math.PI * 2; // Distribute in a circle
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4; // Not too close to edge
      const x = (window.innerWidth / 2) + Math.cos(angle) * radius - moon.size / 2; // Center of screen + offset
      const y = (window.innerHeight / 2) + Math.sin(angle) * radius - moon.size / 2;
      
      createDiv()
        .class('cosmic-element moon')
        .parent(cosmicBg)
        .style('width', `${moon.size}px`)
        .style('height', `${moon.size}px`)
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('background', moon.background)
        .style('border-radius', '50%')
        .style('box-shadow', moon.boxShadow)
        .style('animation', `pulse ${random(8, 15)}s infinite ${random(0, 5)}s`);
    }
    
    // 7. Add constellations - connect the dots between stars!
    for (let c = 0; c < 3; c++) {
      createConstellation(cosmicBg, c);
    }
    
    // 8. Add shooting stars occasionally - my favorite dynamic element
    setInterval(() => {
      const x = random(-100, window.innerWidth);
      const y = random(-100, 0); // Start above the viewport
      const length = random(100, 200);
      const angle = random(30, 60); // Downward angle
      const duration = random(1, 2); // Quick animation
      
      const shootingStar = createDiv()
        .class('cosmic-element')
        .parent(cosmicBg)
        .style('position', 'absolute')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('width', `${length}px`)
        .style('height', '2px')
        .style('background', 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1) 50%, rgba(255,255,255,0))')
        .style('box-shadow', '0 0 4px white')
        .style('transform', `rotate(${angle}deg)`)
        .style('opacity', '0')
        .style('z-index', '-2')
        .style('transition', `transform ${duration}s linear, opacity ${duration}s linear`);
      
      setTimeout(() => {
        shootingStar.style('opacity', '1');
        shootingStar.style('transform', `rotate(${angle}deg) translateX(${window.innerWidth}px)`);
        setTimeout(() => shootingStar.remove(), duration * 1000);
      }, 100);
    }, 5000);
}
  
// Create a constellation with connected stars
function createConstellation(parent, index) {
    const constellations = [
      { name: 'Oracle', stars: 5 },
      { name: 'Harmony', stars: 7 },
      { name: 'Mystic', stars: 6 }
    ];
    
    const constellation = constellations[index];
    const starPositions = [];
    const centerX = random(window.innerWidth * 0.2, window.innerWidth * 0.8);
    const centerY = random(window.innerHeight * 0.2, window.innerHeight * 0.8);
    const radius = random(50, 150);
    
    const constellationDiv = createDiv()
      .class('cosmic-element constellation')
      .parent(parent)
      .style('position', 'absolute')
      .style('left', '0')
      .style('top', '0')
      .style('width', '100%')
      .style('height', '100%')
      .style('animation', `float ${random(30, 60)}s infinite ${random(0, 5)}s`);
    
    for (let i = 0; i < constellation.stars; i++) {
      const angle = (i / constellation.stars) * Math.PI * 2;
      const distance = radius * (0.5 + random(0.5, 1.5));
      const x = centerX + Math.cos(angle) * distance * random(0.7, 1.3);
      const y = centerY + Math.sin(angle) * distance * random(0.7, 1.3);
      
      starPositions.push({ x, y });
      
      const starSize = random(2, 4);
      createDiv()
        .class('constellation-star')
        .parent(constellationDiv)
        .style('width', `${starSize}px`)
        .style('height', `${starSize}px`)
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('animation', `pulse ${random(3, 6)}s infinite ${random(0, 2)}s`);
    }
    
    for (let i = 0; i < starPositions.length - 1; i++) {
      const start = starPositions[i];
      const end = starPositions[i + 1];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      createDiv()
        .class('constellation-line')
        .parent(constellationDiv)
        .style('width', `${distance}px`)
        .style('left', `${start.x}px`)
        .style('top', `${start.y}px`)
        .style('transform', `rotate(${angle}deg)`)
        .style('opacity', '0.6')
        .style('animation', `pulse ${random(4, 8)}s infinite ${random(0, 3)}s`);
    }
    
    if (constellation.stars > 2) {
      const start = starPositions[starPositions.length - 1];
      const end = starPositions[0];
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      createDiv()
        .class('constellation-line')
        .parent(constellationDiv)
        .style('width', `${distance}px`)
        .style('left', `${start.x}px`)
        .style('top', `${start.y}px`)
        .style('transform', `rotate(${angle}deg)`)
        .style('opacity', '0.6')
        .style('animation', `pulse ${random(4, 8)}s infinite ${random(0, 3)}s`);
    }
} // <— Closed createConstellation

// Clear previous session data - fresh start every time
function clearPreviousSession() {
  localStorage.removeItem('oracle');
}

// Fetch advice workflow - the functional heart of the app
async function fetchAdvice() {
  const mood = inputMood.value().trim();
  if (!mood) return; // Empty input check
  adviceParagraph.html(''); // Clear previous advice
  loadingIndicator.show(); // Show loading indicator
  try {
    const advice = await searchAdvice(mood);
    displayAdvice(advice);
  } catch {
    displayError(); // Show error message if fetch fails
  }
}

// Search for advice matching the user's mood
async function searchAdvice(mood) {
  const resp = await fetch(`https://api.adviceslip.com/advice/search/${encodeURIComponent(mood)}`);
  const data = await resp.json();
  if (data.slips && data.slips.length) return random(data.slips).advice; // Pick random relevant advice
  const rand = await fetch('https://api.adviceslip.com/advice').then(r => r.json()); // Fallback to random
  return rand.slip.advice;
}

// Display the advice with a nice transition
async function displayAdvice(text) {
  loadingIndicator.hide();
  adviceParagraph.html(`"${text}"`); // Quotes add a nice touch
}

// Show error message if something goes wrong
function displayError() {
  loadingIndicator.hide();
  adviceParagraph.html('😕 Something went wrong.'); // Simple error message with emoji
}
