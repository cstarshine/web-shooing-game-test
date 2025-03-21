class Player extends GameObject {
  constructor() {
    super();
    this.speed = 2;
    this.bullets = [];
    this.maxBullets = 10;
    this.fireRate = 250;
    this.fillColor = "lightblue";

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

  shoot() {
    if (this.checkDirection(this.directionType.SPACE)) {
      const now = Date.now();

      if (!this.lastShotTime || now - this.lastShotTime > this.fireRate) {
        this.lastShotTime = now; // 발사 시간 업데이트

        if (this.bullets.length < this.maxBullets) {
          const bullet = new Bullet(
            this.x + this.size / 2.5,
            this.y + this.size / 2.5,
            this.direction || this.directionType.UP
          );

          this.bullets.push(bullet);
          objList.push(bullet);
        }
      }
    }

    this.bullets = this.bullets.filter((bullet) => !bullet.isOutOfBounds());
  }

  update() {
    this.move();
    this.shoot();
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
}
