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
  }
  getSpeed() {
    return this.speed;
  }
  isOutOfBounds() {
    return this.x < 0 || this.x > 600 || this.y < 0 || this.y > 600;
  }
}
