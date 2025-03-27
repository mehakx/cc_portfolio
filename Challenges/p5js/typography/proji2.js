
// All this code I have learnt from ( https://docs.ml5js.org/#/reference/facemesh) and the emotions part I used youtube, and some of my own calculations: 

let faceMesh;
let video;
let faces = [];
let emotion = "Neutral"; // this is the default emotion that I could think of. 

 function setup() {
 createCanvas(640, 480);
 video = createCapture(VIDEO);
 video.size(640, 480);
 video.hide();
 faceMesh = ml5.faceMesh({ maxFaces: 1 }, modelReady);
 }

function modelReady() {
  faceMesh.detectStart(video, gotFaces);
 }

function draw() {
  image(video, 0, 0, width, height);

 for (let i = 0; i < faces.length; i++) {
   let face = faces[i];
   for (let j = 0; j < face.keypoints.length; j++) {
     let keypoint = face.keypoints[j];
     fill(0, 255, 0);
     noStroke();
      circle(keypoint.x, keypoint.y, 5);
   }
  }

 // Show emotion detection: 
  fill(255);
textSize(20);
 text("Emotion: " + emotion, 20, height - 20);
 }

 function gotFaces(results) {
 faces = results;
 if (faces.length > 0) {
   detectEmotion(faces[0]);
  }
 }

 function detectEmotion(face) {
 let mouthTop = face.keypoints[13]; 
 let mouthBottom = face.keypoints[14]; 
  let mouthLeft = face.keypoints[57]; 
  let mouthRight = face.keypoints[287];

 let mouthHeight = mouthBottom.y - mouthTop.y;
 let mouthWidth = mouthRight.x - mouthLeft.x;

 if (mouthHeight > mouthWidth * 0.2) {
    emotion = "Happy"; // Smile (open mouth)
 } else if (mouthHeight < mouthWidth * 0.1) {
  emotion = "Sad"; // Frown (small mouth height)
 } else {
   emotion = "Neutral"; // Default expression
  }
}


// All this code I have learnt from ( https://docs.ml5js.org/#/reference/facemesh) 
// and the emotions part I used youtube, and some of my own calculations: 

