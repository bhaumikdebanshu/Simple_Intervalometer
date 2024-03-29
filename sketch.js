var osc;
var freq = 500;
var slider;
var sliderValue;
var fpsValue;

var flag = 0;
var t;

function setup() {
  
  createCanvas(800,800);
  backgroundColor = color(255,255,255);
  
     
  slider = createSlider(150,1500,100,5);
  slider.id('slider');
  slider.position(20, 120);
  slider.style('width', '500');
  document.getElementById("slider").disabled = false;
    
  textSize(24);
  noStroke();
  
  
  //tone.js initialization
  osc = new Tone.Oscillator().toDestination();
  osc.frequency = freq;
  osc.type = 'square';
  //source.mute = true;

  

  //p5.sound commands

  // osc = new p5.Oscillator();
  // osc.setType('square');
  // osc.freq(freq);
  // osc.amp(0);

  initTime = 0;

  startButton = createButton('Start');
  startButton.position(440, 150);
  startButton.mousePressed(flagHigh);
  startButton.touchStarted(flagHigh);
  startButton.id('s');
  startButton.class('startButton');
  document.getElementById("s").disabled = false;

  stopButton = createButton('Stop');
  stopButton.position(440, 185);
  stopButton.mousePressed(flagLow);
  stopButton.touchStarted(flagLow);
  stopButton.class('stopButton');
  
}

function draw() {

  background(backgroundColor);
  
  textSize(36);
  textAlign(LEFT);
  text('Simple Intervalomter', 20, 60);

  textSize(16);
  textAlign(LEFT);
  text('This intervalometer uses sound signal to trigger camera', 20, 90);

  sliderValue = slider.value();
  timePeriod = sliderValue;
  fpsValue = roundNumber(1000 / sliderValue, 2);
  
  textSize(24);
  textAlign(LEFT);
  text(sliderValue + 'ms', 20, 165);
  text(fpsValue + 'fps', 20, 195);

  textSize(16);
  textAlign(LEFT);
  text('INSTRUCTIONS TO USE', 20, 250);
  text("1. Connect one end of 3.5mm Aux Cable to the PC and other to the device.", 20, 280);
  text("2. Connect 2.5mm jack on the device to the 2.5mm camera connector.", 20, 300);
  text("3. Set the camera to Manual mode with Manual focus.", 20, 320);
  text("4. Set the frame, shutter speed, aperture, white balance etc.", 20, 340);
  text("5. Once satisfied with the camera settings, plug in the camera connector into the camera.", 20, 360);
  text("6. Set the fps value and press Start.", 20, 380);
}


function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}


function toggleSound(){
  if (flag == 1){
    t = setInterval(function startS(){
      osc.start();
      //osc.volume.value = 6;
      //osc.amp(1);
      console.log('start');
      setTimeout(function stopS(){
      osc.stop();
      //osc.volume.value = -6;
      //osc.amp(0);
      console.log('stop');
      }
    , 10);
    }, (sliderValue-10));
  }
  else if (flag == 0){
    //osc.amp(0);
    osc.stop();
    //osc.volume.value = -6;
    //osc.stop();
  }
}

function flagHigh(){
  flag = 1;
  toggleSound();
  document.getElementById("s").disabled = true;
  document.getElementById("slider").disabled = true;
}

function flagLow(){
  flag = 0;
  clearInterval(t);
  document.getElementById("s").disabled = false;
  document.getElementById("slider").disabled = false;
}

