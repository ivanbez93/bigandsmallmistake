let compositions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let numCircles = 10; // Adjust the number of invisible circles
  let circleRadius = random(1,100); // Adjust the radius of the largest circle
  let radiusIncrement = random(10, 90); // Adjust the increment in radius for each subsequent circle

  createCompositionGrid(numCircles, circleRadius, radiusIncrement);
}

function createCompositionGrid(numCircles, circleRadius, radiusIncrement) {
  let centerX = width / 2; // Calculate the center X position
  let centerY = height / 2; // Calculate the center Y position

  for (let i = 0; i < numCircles; i++) {
    let radius = circleRadius + i * radiusIncrement;

    let numCompositions = floor(random(1, 5)); // Adjust the number of compositions per circle

    for (let j = 0; j < numCompositions; j++) {
      let angle = map(j, 0, numCompositions, 0, 360); // Calculate the angle for each composition

      let x = centerX + radius * cos(radians(angle));
      let y = centerY + radius * sin(radians(angle));

      let numCircles = floor(random(1, 90));
      let initialRadius = random(1, 10);
      let sizeIncrease = random(0.01, 0.9);

      let noiseScale = random(0.15, 0.29); // Adjust the range for noiseScale
      let frequency = random(0.15, 0.90); // Adjust the range for frequency
      let amplitude = random(0.1, 0.55); // Adjust the range for amplitude

      let composition = {
        x: x,
        y: y,
        numCircles: numCircles,
        initialRadius: initialRadius,
        sizeIncrease: sizeIncrease,
        noiseScale: noiseScale,
        frequency: frequency,
        amplitude: amplitude
      };

      compositions.push(composition);
    }
  }
}

function draw() {
  background(220);

  for (let i = 0; i < compositions.length; i++) {
    let composition = compositions[i];

    drawConcentricCircles(
      composition.x,
      composition.y,
      composition.numCircles,
      composition.initialRadius,
      composition.sizeIncrease,
      composition.noiseScale,
      composition.frequency,
      composition.amplitude
    );
  }
}

function drawConcentricCircles(
  x,
  y,
  numCircles,
  initialRadius,
  sizeIncrease,
  noiseScale,
  frequency,
  amplitude
) {
  for (let i = 0; i < numCircles; i++) {
    let radius = initialRadius + i * initialRadius * sizeIncrease;
    let points = createDistortedCirclePoints(x, y, radius, i, noiseScale, frequency, amplitude);

    noFill();
    stroke(0);
    beginShape();
    for (let point of points) {
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function createDistortedCirclePoints(x, y, radius, index, noiseScale, frequency, amplitude) {
  let points = [];
  let angleStep = 360 / 100;

  for (let angle = 0; angle < 360; angle += angleStep) {
    let waveDistortion = customWaveDistortion(angle, frequency, amplitude); // Call your custom wave distortion function here
    let noiseDistortion = customNoiseDistortion(angle, index, noiseScale); // Call your custom Perlin noise distortion function here

    let distortion = waveDistortion + noiseDistortion;

    let xPos = x + (radius + distortion) * cos(radians(angle));
    let yPos = y + (radius + distortion) * sin(radians(angle));
    let point = createVector(xPos, yPos);
    points.push(point);
  }

  return points;
}

function customWaveDistortion(angle, frequency, amplitude) {
  // Wave distortion based on the angle
  let distortion = sin(angle * frequency) * amplitude;

  return distortion;
}

function customNoiseDistortion(angle, index, noiseScale) {
  // Perlin noise distortion based on angle and index
  let noiseDistortion = noise(angle * noiseScale, index * noiseScale) * 5; // Adjust the noise parameters and scale as needed

  return noiseDistortion;
}


