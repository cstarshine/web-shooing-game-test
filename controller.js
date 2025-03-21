class GameManager {
  constructor() {
    this.score = 0;
    this.user = new Player();
    this.monster = [];
    this.maxMonster = 10;
    this.spawnRate = 1000;
    this.objList = [];
  }

  initGame() {
    this.user.setSize(50);
    this.user.setPosition(40, 40);
    this.user.setUpInput();
    this.objList.push(this.user);
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
  }

  update() {
    this.objList.forEach((v) => {
      v.update();
    });
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

const gameManager = new GameManager();
const objList = gameManager.objList;
function gameStart() {
  gameManager.initGame();
  gameManager.gameLoop();
}

gameStart();
