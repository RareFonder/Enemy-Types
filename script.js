window.onload = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemiesInterval = 300;
      this.enemyTimer = 0;
    }
    update(deltaTime) {
      this.enemies = this.enemies.filter(object => !object.markedForDeletion);
      if (this.enemyTimer > this.enemiesInterval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(object => object.update());
    }
    draw() {
      this.enemies.forEach(object => object.draw(this.ctx));
    }
    #addNewEnemy() {
      this.enemies.push(new Worm(this));
    }
  };

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markedForDeletion = false;
    }
    update() {
      this.x--;
      if (this.x < 0 - this.width) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  };

  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.spriteWidth = 229;
      this.spriteHeight = 171
      this.width = 300;
      this.height = 15;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.image = worm;  
    }
  }

  const game = new Game(ctx, canvas.width, canvas.height);
  let lastTime = 1;
  const animate = (timeStamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime); 
    game.draw();

    requestAnimationFrame(animate);
  };
  animate(0);
};