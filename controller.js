class GameManager {
  constructor() {
    this.score = 0;
    this.user = new Player();
    this.enemy = [];
    this.maxEnemy = 5;
    this.spawnRate = 1000;
    this.lastSpawnTime = null;
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
      ctx.fillStyle = v.getColor();
      ctx.fill();
      ctx.closePath();
    });
  }

  update() {
    this.objList.filter(
      (obj) =>
        !(
          (obj instanceof Enemy || obj instanceof Bullet) &&
          obj.isOutOfBounds()
        )
    );

    this.objList.forEach((v) => {
      v.update();
    });
  }

  spawnMonster() {
    const now = Date.now();
    if (!this.lastSpawnTime || now - this.lastSpawnTime > this.spawnRate) {
      this.lastSpawnTime = now; // 발사 시간 업데이트

      if (this.enemy.length < this.maxEnemy) {
        const newEnemey = new Enemy(
          Math.floor(Math.random() * (580 - 20 + 1)) + 20,
          0
        );

        this.enemy.push(newEnemey);
        objList.push(newEnemey);
      }
    }
    this.enemy = this.enemy.filter((enemy) => !enemy.isOutOfBounds());
  }

  gameLoop() {
    this.update();
    this.render();
    this.spawnMonster();
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
