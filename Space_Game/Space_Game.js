//set up the class GameObject
//create a constant gameObject

/* objects */
const gameObject = {
  x: 0,
  y: 0,
  type: '',
  dead: false,
  width: 0,
  height: 0,
  img: undefined,
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  },
  rectFromGameObject() {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width
    }
  }
};


//...and a constant movable
const movable = {
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  },
  move(x, y) {
    this.x += x;
    this.y += y;
  },
  speed: 42,
}

//then the constant movableObject is composed of the gameObject and movable constants
const movableObject = { ...gameObject, ...movable };

class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  //when a message is received, let the listener to handle its payload
  on(message, listener) {
    if (!this.listeners[message]) {
      this.listeners[message] = [];
      //   this.listeners[message].push(listener);
    }
    this.listeners[message].push(listener);
  }
  //when a message is sent, send it to a listener with some payload
  emit(message, payload = null) {
    if (this.listeners[message]) {
      this.listeners[message].forEach(l => l(message, payload))
    }
  }
}

/* -------------------------------------------------------------------------- */

/* event */
const Messages = {
  HERO_MOVE_LEFT: 'HERO_MOVE_LEFT',
  HERO_MOVE_RIGHT: 'HERO_MOVE_RIGHT',
  HERO_MOVE_UP: 'HERO_MOVE_UP',
  HERO_MOVE_DOWN: 'HERO_MOVE_DOWN',
  KEY_EVENT_SPACE: "KEY_EVENT_SPACE",
  COLLISION_ENEMY_LASER: "COLLISION_ENEMY_LASER",
  COLLISION_ENEMY_HERO: "COLLISION_ENEMY_HERO",
};
//invoke the eventEmitter you set up above
const eventEmitter = new EventEmitter();
//set up a hero
//let the eventEmitter know to watch for messages pertaining to the hero moving left, and act on it
eventEmitter.on(Messages.HERO_MOVE_LEFT, () => {
  hero.move(-1 * hero.speed * hero.step, 0);
});

eventEmitter.on(Messages.HERO_MOVE_RIGHT, () => {
  hero.move(1 * hero.speed * hero.step, 0);
});

eventEmitter.on(Messages.HERO_MOVE_UP, () => {
  hero.move(0, -1 * hero.speed * hero.step);
});

eventEmitter.on(Messages.HERO_MOVE_DOWN, () => {
  hero.move(0, 1 * hero.speed * hero.step);
});
eventEmitter.on(Messages.KEY_EVENT_SPACE, () => {
  if (hero.dead === false) {
    laserArray.push(new createLaser());
  }
});

//set up the window to listen for the keyup event, specifically if the left arrow is hit, emit a message to move the hero left
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    eventEmitter.emit(Messages.HERO_MOVE_LEFT)
  }
  if (event.key === 'ArrowRight') {
    eventEmitter.emit(Messages.HERO_MOVE_RIGHT)
  }
  if (event.key === 'ArrowUp') {
    eventEmitter.emit(Messages.HERO_MOVE_UP)
  }
  if (event.key === 'ArrowDown') {
    eventEmitter.emit(Messages.HERO_MOVE_DOWN)
  }
  if (event.key === ' ') {
    eventEmitter.emit(Messages.KEY_EVENT_SPACE)
  }
});

/* -------------------------------------------------------------------------- */
/* main */

let assets = {};
const canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
const ENEMY_TOTAL = 5;
const ENEMY_WIDTH = ENEMY_TOTAL * 98;
let hero = {};
let enemyArray = [];
let laserArray = [];
let gameId;
let score;

gamestart();
/* -------------------------------------------------------------------------- */


/* Functions */
function updateScore() {
  document.getElementById("score").innerHTML = score;
}

function gamestart() {
  hero = {};
  enemyArray = [];
  laserArray = [];
  score = 0;
  init().then(() => {
    hero = new createHero(canvas.width / 2 - 45, canvas.height - canvas.height / 4);
    createEnemies((canvas.width - ENEMY_WIDTH) / 2)
      .then(() => {
        gameId = setInterval(() => {
          enemyArray.forEach(enemy => enemy.move(0, enemy.speed));
          laserArray.forEach(l => l.move(0, -1 * l.speed))
          deadChecker();
          drawAll();
          deadManager();
          updateScore();
        }, 50)
      });
  });
}

let deadStack = [];

function deadManager() {
  deadStack.forEach((tmp) => {
    if (tmp.type === 'Enemy') {
      tmp.img = assets.laserShootImage;
      tmp.draw(ctx);
    }
  })
  deadStack = [];
}

function deadChecker() {
  enemyArray.forEach((enemy, idx) => {
    if (intersectRect(hero.rectFromGameObject(), enemy.rectFromGameObject())) {
      clearInterval(gameId);
      if (confirm("game over"))
        gamestart();
    }
    laserArray.forEach((l, jdx) => {
      //enemy dead
      if (intersectRect(l.rectFromGameObject(), enemy.rectFromGameObject())) {
        deadStack.push(enemy);
        enemyArray.splice(idx, 1);
        deadStack.push(l);
        laserArray.splice(jdx, 1);
        score += enemy.point;
      }
    })
  });
  //laser out of screen
  laserArray.forEach((l, idx) => {
    if (l.y + l.height < 0) {
      laserArray.splice(idx, 1);
      score -= 21;
    }
  })
}

function createHero(x, y) {
  const hero = {
    ...movableObject,
    x,
    y,
    type: 'Hero',
    step: 1,
  }
  hero.img = assets.heroImage
  hero.width = hero.img.width;
  hero.height = hero.img.height;
  return hero;
}

function createLaser() {
  const laser = {
    ...movableObject,
    type: 'Laser',
    speed: 10,
  }
  laser.img = assets.laserImage;
  laser.width = laser.img.width;
  laser.height = laser.img.height;
  laser.x = hero.x + hero.width / 2 - laser.width / 2;
  laser.y = hero.y + laser.height;
  return laser;
}


function createEnemy(x, y) {
  const enemy = {
    ...movableObject,
    x,
    y,
    point: 42,
    speed: 1,
    type: 'Enemy'
  }
  enemy.img = assets.enemyImage;
  enemy.width = enemy.img.width;
  enemy.height = enemy.img.height;

  return enemy;
}
//...and a static object that inherits only the gameObject properties
function createStatic(x, y, type) {
  return {
    ...gameObject,
    x,
    y,
    type
  }
}//set up an EventEmitter class that contains listeners

async function loadAssets() {
  const heroImage = await loadAsset('spaceArt/png/player.png');
  const enemyImage = await loadAsset('spaceArt/png/enemyShip.png');
  const laserImage = await loadAsset('spaceArt/png/laserRed.png');
  const laserShootImage = await loadAsset('spaceArt/png/laserRedShot.png');
  return {
    heroImage,
    enemyImage,
    laserImage,
    laserShootImage,
  }
}

function intersectRect(r1, r2) {
  return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}

function drawAll() {
  const drawObjects = [...enemyArray, hero, ...laserArray];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawObjects.forEach(obj => obj.draw(ctx));
}

function loadAsset(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      // image loaded and ready to be used
      resolve(img);
    }
  })
}

async function createEnemies(START_X) {
  const STOP_X = START_X + ENEMY_WIDTH;
  for (let x = START_X; x < STOP_X; x += 98) {
    for (let y = 0; y < 50 * 5; y += 50) {
      const enemy = new createEnemy(x, y);
      enemyArray.push(enemy);
    }
  }
}

async function init() {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  assets = await loadAssets();
}
/* -------------------------------------------------------------------------- */
