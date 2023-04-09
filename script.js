window.onload = () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  class Game {
    constructor() {
      this.enemies = [];
      this.#addNewEnemy();
    }
    update() {
      this.enemies.forEach(object => object.update());
    }
    draw() {
      this.enemies.forEach(object => object.update());
    }
    #addNewEnemy() {
      this.enemies.push(new Enemy());
    }
  };

  class Enemy {
    constructor() {
      this.x = 100;
      this.y = 100;
      this.width = 100;
      this.height = 100;
    }
    update() {
      this.x--;
    }
    draw() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  const game = new Game();
  let lastTime = 1;
  const animate = (timeStamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update();
    game.draw();

    requestAnimationFrame(animate);
  };
  animate(0);
};