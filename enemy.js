class Enemy extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = 1;
    this.direction = TypeManager.DirectionType.DOWN;
    this.fillColor = "red";
  }
  update() {
    this.y += this.speed;
    // switch (this.direction) {
    //   case "w":
    //     this.y -= this.speed;
    //     break;
    //   case "up":
    //     this.x -= this.speed;
    //     break;
    //   case "down":
    //     this.y += this.speed;
    //     break;
    //   case "d":
    //     this.x += this.speed;
    //     break;
    // }
  }
  getSpeed() {
    return this.speed;
  }
  isOutOfBounds() {
    return this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600;
  }
}
