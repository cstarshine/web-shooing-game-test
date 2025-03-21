class GameManager {
  constructor() {
    this.score = 0;
    this.user = new Player();
    this.monster = [];
    this.maxMonster = 10;
    this.spawnRate = 1000;
    this.objList = [];
    this.keys = {};
  }

  initGame() {
    this.user.setSize(50);
    this.user.setPosition(40, 40);
    this.objList.push(this.user);
    this.setUpInput();
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
    // this.user.renderBullets(ctx);
  }

  setUpInput() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
      this.user.setDirection(this.keys);
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }

  update() {
    this.objList.forEach((v) => {
      v.update();
    });

    this.user.updateBullets();
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}

function gameStart() {
  const gameManager = new GameManager();
  gameManager.initGame();
  gameManager.gameLoop();
}

gameStart();
