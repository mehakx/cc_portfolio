let grotesk;
let mooArray, mooArray1, mooArray2;
let fontSize = 200;
let maxblobSize = 50; 
let blobradius = 80; 

function preload() {
    grotesk = loadFont('grotesk.ttf'); 
}

function setup() {
    createCanvas(800, 400);
    textFont(grotesk);
    noStroke();


    mooArray = grotesk.textToPoints("M", 100, 250, fontSize, { sampleFactor: 0.2 });
    mooArray1 = grotesk.textToPoints("O", 250, 250, fontSize, { sampleFactor: 0.2 });
    mooArray2 = grotesk.textToPoints("O", 400, 250, fontSize, { sampleFactor: 0.2 });
}

function draw() {
    background(0);

//   under the BlobEffect variable I made three arrays. 
    BlobEffect(mooArray);
    BlobEffect(mooArray1);
    BlobEffect(mooArray2);
}

//  CHALLENGE: This was one of the hardest to figure out as at first the map function and the use of boolean was confusing but then after several tries I was able to connect it!
//  Then using the map function and with the blob radius and blob size I was able to change its size and shape with the font. 

function BlobEffect(pointsArray) {
    for (let i = 0; i < pointsArray.length; i++) {
        let d = dist(pointsArray[i].x, pointsArray[i].y, mouseX, mouseY); 
        let size = map(d, 0, blobradius, maxblobSize, 8, true); 

        fill(255, 0, 0);
        ellipse(pointsArray[i].x, pointsArray[i].y, size, size);
    }
}
