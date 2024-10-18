const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class GameObject {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 0;
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getPositionX() {
    return this.x;
  }

  getPositionX() {
    return this.y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isCollision(object) {}
}

class Item extends GameObject {}

class Player extends GameObject {
  constructor() {
    super();
    this.speed = 2;
    this.bullets = [];
  }

  getSpeed() {
    return this.speed;
  }

  shoot(direction) {
    if (this.bullets.length < 5) {
      const bullet = new Bullet(
        this.x + this.size / 3,
        this.y + this.size / 3,
        direction
      );
      this.bullets.push(bullet);
    }
  }

  updateBullets() {
    this.bullets = this.bullets.filter((bullet) => !bullet.isOutOfBounds());
    this.bullets.forEach((bullet) => bullet.update());
  }

  renderBullets(ctx) {
    this.bullets.forEach((bullet) => bullet.render(ctx));
  }
}

class Bullet extends GameObject {
  constructor(x, y, direction) {
    super();
    this.x = x;
    this.y = y;
    this.size = 5;
    this.speed = 7;
    this.direction = direction;
  }

  update() {
    switch (this.direction) {
      case "w":
        this.y -= this.speed;
        break;
      case "a":
        this.x -= this.speed;
        break;
      case "s":
        this.y += this.speed;
        break;
      case "d":
        this.x += this.speed;
        break;
    }
  }

  getSpeed() {
    return this.speed;
  }
  isOutOfBounds() {
    return this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600;
  }

  render(ctx) {
    ctx.beginPath();
    let calcX = 0;
    let calcY = 0;
    switch (this.direction) {
      case "w":
        calcY = -30;
        break;
      case "a":
        calcX = -30;
        break;
      case "s":
        calcY = 30;
        break;
      case "d":
        calcX = 30;
        break;
    }
    ctx.arc(this.x + calcX, this.y + calcY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#999999";
    ctx.fill();
    ctx.closePath();
  }
}

class GameControl {
  constructor() {
    this.score = 0;
    this.user = new Player();
    this.monster = new GameObject();
    this.Bullet = new Bullet();
    this.objList = [];
    this.keys = {};
  }
  initGame() {
    this.user.setSize(50);
    this.user.setPosition(40, 40);
    this.objList.push(this.user);
    this.setupInput();
  }

  render() {
    ctx.clearRect(0, 0, 600, 600);
    this.objList.forEach((v) => {
      let position = v.getPosition();
      let size = v.getSize();
      ctx.beginPath();
      ctx.rect(position.x, position.y, size, size);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    });
    this.user.renderBullets(ctx);
  }

  setupInput() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      if (e.key === " ") {
        this.user.shoot(this.getLastDirection());
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }

  update() {
    let position = this.user.getPosition();
    let speed = this.user.getSpeed();
    let x = position.x;
    let y = position.y;

    if (this.keys["w"]) {
      y -= speed;
    }
    if (this.keys["a"]) {
      x -= speed;
    }
    if (this.keys["s"]) {
      y += speed;
    }
    if (this.keys["d"]) {
      x += speed;
    }

    this.user.setPosition(x, y);
    this.user.updateBullets();
  }

  getLastDirection() {
    if (this.keys["w"]) return "w";
    if (this.keys["a"]) return "a";
    if (this.keys["s"]) return "s";
    if (this.keys["d"]) return "d";
    return "d";
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

function gameStart() {
  const gameControl = new GameControl();
  gameControl.initGame();
  gameControl.gameLoop();
}

gameStart();
