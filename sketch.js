let cloud;
let cloudX;
let cloudY;
var planets = [];
let starspeed = 2;

let boat;
let boatx = 600;
let boaty = 500;
let cloud2;
let cloud2X;
let cloud2Y;

let cloud3;
let cloud3X;
let cloud3Y;

let sunRad = 300;
let Suneasing = 0.005;

let yoff = 0.0;

let color1;
let color2;
let skycolor1;
let skycolor2;
let sky2clr1;
let sky2clr2;
let rockclr1;
let rockclr2;
let colorcontrol;
let diffcolor;
let colorchange;

let campers;
let trees;
let animals;
let dolphin;
let dx = 0;
let dy = 600;

let bird;
let birdx = 0;
let birdy;

let bridge;
let giraffe;
let girX = 575;
let girY = 565;

let walker;
let walkx = 1205;
let walky = 650;
let walkh = 175;

let pulse = 0.35
let sunsize = 0;
let fade = 0;
let pfade = 0.01;
let wtrclr = 0;
let wtrpulse = 0.02
function preload() {
  boat = loadImage("boat.gif");
  walker = loadImage("walker.gif");
  giraffe = loadImage("giraffe.gif");
  bridge = loadImage("bridge.png");
  bird = loadImage("birdy.gif");
  dolphin = loadImage("dolphin.gif");
  animals = loadImage("animals.png");
  campers = loadImage("campcrew.png");
  trees = loadImage("trees.png");
  cloud = loadImage("cloud.png");
  cloud2 = loadImage("cloud.png");
  cloud3 = loadImage("cloud.png");
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  imageMode(CENTER);
  cloudX = width / 2 + 175;
  cloudY = height / 2 - 200;

  cloud2X = width / 2 - 200;
  cloud2Y = height / 2 - 350;

  cloud3X = width / 2 - 350;
  cloud3Y = height / 2 - 275;

  motioncontrol = 0;
  colorcontrol = 0;
  diffcolor = 1;
  color1 = color(0, 107, 255);
  color2 = color(0, 226, 255);
  skycolor1 = color(74, 0, 94);
  sky2clr1 = color(0, 137, 255);
  sky2clr2 = color(147, 248, 255);
  skycolor2 = color(255, 85, 0);
  rockclr1 = color(82, 156, 23);
  rockclr2 = color(64, 40, 2);
  animationcontrol = 0;
  colorMode(RGB, 255);
  //frameRate(60)

  //setInterval(skychange, 2000);
}

function draw() {
  background(255, 250, 206);

  for (var i = 0; i < 30; i++) {
    planets.push(new Space());
    planets[i].movement();
    planets[i].star();
  }

  function Space() {
    // setting up placement size and color of stars
    this.x = random(width);
    this.y = random(height);
    this.size = random(3, 7);
    var r = random(155, 255);
    var g = random(0, 100);
    var b = random(0, 255);
    // working on movement of the stars
    this.movement = function () {
      this.x += starspeed;

      if (this.x > width + 15) {
        this.x = 0;
      }
    };

    this.star = function () {
      push();
      noStroke();
      fill(0);
      ellipse(this.x, this.y, this.size, this.size);
      pop();
    };
  }
  //////Cloud Movement
  cloudX = cloudX + 1;
  if (cloudX >= width + 115) {
    cloudX = -115;
  }

  cloud2X = cloud2X + 1;
  if (cloud2X >= width + 80) {
    cloud2X = -80;
  }

  cloud3X = cloud3X + 1;
  if (cloud3X >= width + 80) {
    cloud3X = -80;
  }
  //////////////   sky color  ////////////////
  fade = fade + pfade;
  for (let i = 0; i < 500; i++) {
    let inter = map(i, 0, 400, 0, fade);
    let g = lerpColor(skycolor1, skycolor2, inter);
    stroke(g);
    line(0, i, width, i);
  }

  if (fade > 2 || fade < 0) {
    pfade = pfade * -1;
  }
  stroke(0);


  fill(255, 85, 0);
  ellipse(width / 2, height / 2, 200 + sunsize, 200 + sunsize);

  sunsize = sunsize + pulse;
  if (sunsize > 60 || sunsize < -20){
    pulse = pulse * -1;
  }
  /// Water////////////////////////////
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, 70, 140) + 375;

    // console.log(colorcontrol);

    fill(0, 107, 255);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  if (motioncontrol > 100) {
    motioncontrol = 0;
  }

  colorcontrol = colorcontrol + diffcolor;
  //console.log("colorControlDiff: " + diffcolor);
  if (colorcontrol > 100) {
    diffcolor = -1;
  } else if (colorcontrol <= 0) {
    diffcolor = 1;
  }
  endShape(CLOSE);

  for (let i = 0; i < 500; i++) {
    let inter = map(i, 0, 400, 0, wtrclr);
    let g = lerpColor(color1, color2, inter);
    stroke(g);
    line(0, i + height / 2 + 100, width, i + height / 2 + 100);
  }

  wtrclr = wtrclr + wtrpulse;
  if (wtrclr > 3|| wtrclr < 0) {
    wtrpulse = wtrpulse * -1;
  }
  stroke(0);

  colorMode(RGB);

  /////dolphin
  dx += float(random(1, 4));

  if (dx > width + 20) {
    let dw = 200;
    let dh = 200;

    dy = float(random(500, 650));
    dx = -20;
  }

  if (dy >= 500 && dy <= 585) {
    dw = 130;
    dh = 130;
  } else {
    dh = 200;
    dw = 200;
  }

  image(dolphin, dx, dy, dw, dh);
  image(dolphin, dx, dy - 50, dw, dh);
  //////////////////////////////////
  birdx += 3;
  if (birdx > width + 10) {
    birdx = -10;
    birdy = float(random(75, 450));
  }

  image(bird, birdx, birdy, 100, 100);

  ////boat

  boatx -= 1;
  if (boatx < -75) {
    boatx = width + 70;
  }

  image(boat, boatx, boaty, 150, 150);
  ///// left mountain
  beginShape();
  let rocks = 100;
  let sup = map(rocks, 0, 400, 0, 1);
  let myguy = lerpColor(rockclr1, rockclr2, 100);
  fill(myguy);
  vertex(0, 450);
  vertex(335, 435);
  vertex(315, 500);
  vertex(325, 575);
  vertex(290, 700);

  vertex(325, height);
  vertex(0, height);

  endShape();

  fill(82, 156, 23);
  beginShape();
  vertex(0, 450);
  vertex(335, 435);
  vertex(325, 440);
  vertex(186, 650);
  vertex(0, 750);
  endShape();
  ///////////////right mountain///////
  beginShape();
  fill(myguy);
  vertex(width, 450);
  vertex(width - 335, 435);
  vertex(width - 315, 500);
  vertex(width - 325, 575);
  vertex(width - 290, 700);

  vertex(width - 325, height);
  vertex(width, height);

  endShape();

  fill(82, 156, 23);
  beginShape();
  vertex(width, 450);
  vertex(width - 335, 435);
  vertex(width - 325, 440);
  vertex(width - 186, 650);
  vertex(width, 750);
  endShape();

  ///////walker
  let mw = 3.5;
  walkx =walkx- mw;
  walkh =walkh + 0.55;
  walky =walky- 0.1;
  if (walkx < -20) {
    walkx = width + 40;
    walkh = 180;
    walky = 630;
  }

  colorMode(RGB);
  image(campers, 100, 575, 375, 375);
  image(cloud, cloudX, cloudY, 400, 375);
  image(cloud2, cloud2X, cloud2Y, 275, 275);
  image(cloud3, cloud3X, cloud3Y, 275, 275);
  image(trees, 115, 385, 1100, 1100);
  image(trees, width - 115, 385, 1100, 1100);
  image(animals, width-100, 475, 300, 300);
  image(bridge, width / 2 - 40, 750, 1550, 255);
  image(giraffe, girX, girY, 800, 800);
  image(walker, walkx, walky, 150, walkh);
  loop();
}