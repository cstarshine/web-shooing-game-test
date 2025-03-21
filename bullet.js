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
}
