class Player extends GameObject {
  constructor() {
    super();
    this.speed = 2;
    this.bullets = [];
    this.directionType = TypeManager.DirectionType;
    this.keys = {};
  }

  setUpInput() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
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

  update() {
    this.move();
  }

  move() {
    let position = this.getPosition();
    let speed = this.getSpeed();
    let x = position.x;
    let y = position.y;
    const directionType = this.directionType;

    if (this.checkDirection(directionType.UP)) {
      y -= speed;
    }
    if (this.checkDirection(directionType.LEFT)) {
      x -= speed;
    }
    if (this.checkDirection(directionType.DOWN)) {
      y += speed;
    }
    if (this.checkDirection(directionType.RIGHT)) {
      x += speed;
    }
    this.setPosition(x, y);
  }

  checkDirection(direction) {
    return this.keys[direction];
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
