
// this is my emotional journaling cam 
// basically— it watches the users face (using ml5.js), guesses the users emotion,
// and adds a little color filter based on how you’re feeling, and then based on that suggests reflection prompts- to make you feel better in some way. 

// ml5 stuff
let faceMesh;
let video;
let allFaces = [];

// emotion stuff
let mood = "Neutral"; // default phase
let lastMood = "Neutral"; // so it can compare if expression changed.

// journaling stuff
let popupMsg = ""; // the prompt
let popupTimeLeft = 0; // how long the prompt shows
let popupFade = 100; 
let moodThoughts = []; //the responsese that get stored. 
let showInput = false; // flag for showing the box to type. 

// for the circular "processing emotions..." 
let rotationOffset = 0;

function setup() {
  createCanvas(700, 700);

  // turns on webcam
  video = createCapture(VIDEO);
  video.size(700, 700);
  video.hide(); // does not show it raw.

  //  loads the ml5 facemesh model
  // basically looks at the users face and then gives me all the keypoints
  faceMesh = ml5.faceMesh(video, whenModelIsReady);

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
  inputField.changed(() => {
    moodThoughts.push({
      mood,
      thought: inputField.value(),
      time: new Date().toLocaleString()
    });
    inputField.value('');
    inputField.hide();
    showInput = false;
  });
}

function whenModelIsReady() {
  //this is an indication that the model is ready!
  faceMesh.detectStart(video, whenFacesCome);
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

  addMoodFilter();        //  emotional tint on top
  showMoodEmoji();        // shows little emoji in top corner
  drawProcessingSpinner(); //  spinning “processing emotions...” text circle
  moodPopup();            // popup with journal box
}

function whenFacesCome(results) {
  allFaces = results;
  if (allFaces.length > 0) {
    detectMood(allFaces[0]); // just looks at the first face for now
  }
}

function detectMood(face) {
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
  if (mood !== lastMood) {
    launchPopup(mood);
    lastMood = mood;
  }
}

function addMoodFilter() {
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
  rect(0, 0, width, height); // lay the color on top of the video
}

function showMoodEmoji() {
  // mood = emoji in the corner 
  textSize(64);
  let icon = "😶"; // default neutral
  if (mood === "Happy") icon = "🦄";
  else if (mood === "Sad") icon = "🌧️";
  text(icon, 20, 20);
}

function launchPopup(currentMood) {
  // changes the question depending on how you’re doing
  if (currentMood === "Happy") {
    popupMsg = "You're smiling! What made you happy?";
  } else if (currentMood === "Sad") {
    popupMsg = "You seem sad. Want to reflect?";
  } else {
    popupMsg = "Feeling neutral — what's on your mind?";
  }

  popupTimeLeft = 180; // shows it for a bit
  popupFade = 100;
  showInput = true;
  inputField.show();
  inputField.value('');
}

function moodPopup() {
  // draws the popup and lets you reflect if you want
  if (popupTimeLeft > 0 || showInput) {
    fill(0, 0, 100, popupFade); // white background
    rect(30, height - 100, width - 60, 60, 12);

    fill(0, 0, 0, popupFade); // black text
    textSize(16);
    text(popupMsg, 45, height - 85);

    if (!showInput) popupTimeLeft--;
    if (popupTimeLeft < 30 && !showInput) {
      popupFade = map(popupTimeLeft, 0, 30, 0, 100); // fade out
      if (popupTimeLeft <= 0) {
        inputField.hide();
        showInput = false;
      }
    }
  }
}

// this draws a spinning circle that says "processing emotions..."
function drawProcessingSpinner() {
  push();
  translate(width / 2, height / 2); // center of canvas
  rotate(radians(rotationOffset));
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
  rotationOffset += 0.3; // keeps it spinning
}
