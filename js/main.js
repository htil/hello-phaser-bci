window.threshHold = 0.05;
window.relativeBeta = 0;
var nodeConnect = new NodeSocket();
window.isTakeoff = false;

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("red", "assets/red.png");
}

function create() {
  var particles = this.add.particles("red");

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: "ADD",
  });

  var centerX = window.innerWidth / 2;
  logo = this.physics.add.image(centerX, window.innerHeight);
  logo.setCollideWorldBounds(true);
  emitter.startFollow(logo);

  setInterval(() => {
    if (window.isTakeoff == false) {
      return 0;
    } else {
      console.log(isTakeoff);
      if (window.relativeBeta > window.threshHold) {
        logo.setVelocityY(-100);
        nodeConnect.up();
        // make drone go up if not at max height
      } else {
        logo.setVelocityY(100);
        nodeConnect.down();
        // make drone go down if not at min height
      }
    }
  }, 500);
}

function update(time, delta) {
  //console.log(window.relativeBeta);
  /*
  if (window.relativeBeta > window.threshHold) {
    logo.setVelocityY(-100);
    nodeConnect.up();
    // make drone go up if not at max height
  } else {
    logo.setVelocityY(100);
    nodeConnect.down();
    // make drone go down if not at min height
  } */
}

function bindButtons(id, func) {
  document.getElementById(id).onclick = func;
}

bindButtons("takeoff", nodeConnect.takeOff);
bindButtons("land", nodeConnect.land);
bindButtons("up", nodeConnect.up);
bindButtons("down", nodeConnect.down);
