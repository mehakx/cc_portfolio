
// Emotional Processing Meter: The following is the code for my meter- that detects emotion based on one's facial expressions(ML5.JS), and accordingly 
//tries to get the user to open up and process their feelings through online journal prompts. 
//Hence it adds a little color filter based on how you’re feeling, and then based on that suggests reflection prompts- to make you feel better in some way. 

let faceMesh;
let video;
let facesNow = [];

// deciding the emotion part: 
let mood = "Neutral"; // default emotional phase
let prevMood = "Neutral"; // so it can compare if expression changed.

// journaling part: 
let promptText = ""; // the prompt
let promptTimer = 0; // how long the prompt shows
let promptFade = 100; 
let moodLogs = []; //the responsese that get stored. 
let showBox = false; // flag for showing the box to type. 

// for the circular "processing emotions..." 
let swirlOffset = 0;

function setup() {
  createCanvas(700, 700);

  // turns on webcam
  video = createCapture(VIDEO);
  video.size(700, 700);
  video.hide(); // does not show it raw.

  //  loads the ml5 facemesh model- which looks at the users face and then gives all the keypoints
  faceMesh = ml5.faceMesh(video, modelReady);

  // setting colorMode to HSB so it's easier to do mood filters
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  textAlign(LEFT, TOP);

  //  creating the input box but keeping it hidden until needed
  inputField = createInput('');
  inputField.position(50, height - 45);
  inputField.size(540);
  inputField.hide();

  // when the user enters something into the journal box
  inputField.changed(() =>//I learnt this newly through "https://dev.to/hannahgooding/vs-code-shortcuts-and-tricks-that-i-wish-i-knew-sooner-3mcj"
  //  wherein this symbol is used to write functions in shorter ways//
   {
    moodLogs.push({
      mood,
      thought: inputField.value(),
      time: new Date().toLocaleString()
    });
    inputField.value('');
    inputField.hide();
    showBox = false;
  });
}

function modelReady() {
  //this is an indication that the model is ready!
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(0);

  // border color changes based on mood
  let borderColor;
  if (mood === "Happy") borderColor = color(330, 80, 100); // pink
  else if (mood === "Sad") borderColor = color(50, 80, 100); // yellow
  else borderColor = color(30, 80, 100); // orange

  stroke(borderColor);
  strokeWeight(20); // border
  image(video, 0, 0, width, height); // webcam live feed

  showMoodTint();        //  emotional tint on top
  dropEmoji();           // shows little emoji in top corner
  drawSwirlText();       //  spinning “processing emotions...” text circle
  handlePrompt();        // popup with journal box
}

function gotFaces(results) {
  facesNow = results;
  if (facesNow.length > 0) {
    readMood(facesNow[0]); // just looks at the first face for now
  }
}

function readMood(face) {
  //this is how I calculate it: 
  // open mouth = probably smiling
  // tiny mouth = possibly sad
  // in between = neutral face

  let top = face.keypoints[13];
  let bottom = face.keypoints[14];
  let left = face.keypoints[57];
  let right = face.keypoints[287];

  let h = bottom.y - top.y;
  let w = right.x - left.x;

  if (h > w * 0.2) {
    mood = "Happy";
  } else if (h < w * 0.1) {
    mood = "Sad";
  } else {
    mood = "Neutral";
  }

  // if mood changed → show popup!
  if (mood !== prevMood) {
    launchPrompt(mood);
    prevMood = mood;
  }
}

function showMoodTint() {
  // this is inspired by a project I did during my sophomore year first semester!!
  // we learnt about color theory + lerp and how moods = colors
  // here I'm not lerping, but I'm applying soft emotional HSB tints

  let moodColor;

  if (mood === "Happy") {
    moodColor = color(330, 80, 100, 25); // soft pink haze
  } else if (mood === "Sad") {
    moodColor = color(50, 80, 100, 25); // warm yellow wash
  } else {
    moodColor = color(30, 80, 100, 25); // muted orange for neutral
  }

  fill(moodColor);
  rect(0, 0, width, height); // to lay the color on top of the video
}

function dropEmoji() {
  // mood = emoji in the corner 
  textSize(64);
  let icon = "😶"; // default neutral
  if (mood === "Happy") icon = "🦄";
  else if (mood === "Sad") icon = "🌧️";
  text(icon, 20, 20);
}

function launchPrompt(currentMood) {
  // changes the question depending on how you’re doing
  if (currentMood === "Happy") {
    promptText = "You're smiling! What made you happy?";
  } else if (currentMood === "Sad") {
    promptText = "You seem sad. Want to reflect?";
  } else {
    promptText = "Feeling neutral — what's on your mind?";
  }

  promptTimer = 180; // shows it for a little bit
  promptFade = 100;
  showBox = true;
  inputField.show();
  inputField.value('');
}

function handlePrompt() {
  // draws the popup and lets you reflect if you want
  if (promptTimer > 0 || showBox) {
    fill(0, 0, 100, promptFade); // white background
    rect(30, height - 100, width - 60, 60, 12);

    fill(0, 0, 0, promptFade); // black text
    textSize(16);
    text(promptText, 45, height - 85);

    if (!showBox) promptTimer--;
    if (promptTimer < 30 && !showBox) {
      promptFade = map(promptTimer, 0, 30, 0, 100); // fade out
      if (promptTimer <= 0) {
        inputField.hide();
        showBox = false;
      }
    }
  }
}

// this draws a spinning circle that says "processing emotions..- i mostly did this as a more fun and indirect way to show the way we all process our emotions. "
function drawSwirlText() {
  push();
  translate(width / 2, height / 2); // center of canvas
  rotate(radians(swirlOffset));
  fill(0); // black text
  textSize(12);
  textAlign(CENTER, CENTER);

  let phrase = "processing emotions... ";
  let radius = 230;
  let angleStep = TWO_PI / phrase.length;

  for (let i = 0; i < phrase.length; i++) {
    let char = phrase.charAt(i);
    let angle = i * angleStep;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    push();
    translate(x, y);
    rotate(angle + HALF_PI);
    text(char, 0, 0);
    pop();
  }

  pop();
  swirlOffset += 0.3; // keeps it spinning
}
