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

  getPositionY() {
    return this.y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isCollision(object) {}
}

class TypeManager {
  static DirectionType = {
    UP: "w",
    DOWN: "s",
    LEFT: "a",
    RIGHT: "d",
  };

  directionToType(direction) {
    switch (direction) {
      case "w":
        return DirectionType.UP;
      case "s":
        return DirectionType.DOWN;
      case "a":
        return DirectionType.LEFT;
      case "d":
        return DirectionType.RIGHT;
    }
  }
}

class Item extends GameObject {}
