let snake;
let food;
let rez = 20;
let w;
let h;
let head;
let currentKey;
let speed = 10;
let score = 0;




function Snake() {
  this.body = []
  this.body[0] = createVector(0, 0);
  this.xdir = 0;
  this.ydir = 0;

  this.dead = function () {
    for (let i = 1; i < this.body.length - 1; i++) {
      if (this.body.length > 1) {
        if (head.x == this.body[i].x && head.y == this.body[i].y) {
          this.body = []
          this.body[0] = createVector(0, 0);
          let score2 = score;
          score=0
          alert("Game over...Your score is: " + score2)
        }
      }
    }
  }

  this.update = function () {
    head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head)
    this.dead();
    if (head.x >= w) {
      head.x = 0
    }
    if (head.y >= h) {
      head.y = 0
    }
    if (head.x < 0) {
      head.x = w
    }
    if (head.y < 0) {
      head.y = h;
    }
  }

  this.show = function () {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }

  }

  this.change = function (x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  this.eat = function (pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    if (x == pos.x && y == pos.y) {
      console.log("Food eaten");
      this.body.push(head);
      score++
      return true;
    }
    return false;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (currentKey != RIGHT_ARROW) {
      snake.change(-1, 0);
      currentKey = keyCode;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (currentKey != LEFT_ARROW) {
      snake.change(1, 0);
      currentKey = keyCode;
    }
  }
  if (keyCode === UP_ARROW) {
    if (currentKey != DOWN_ARROW) {
      snake.change(0, -1);
      currentKey = keyCode;
    }
  }
  if (keyCode === DOWN_ARROW) {
    if (currentKey != UP_ARROW) {
      snake.change(0, 1);
      currentKey = keyCode;
    }
  }
}

function setup() {
  cnv = createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(speed)
  snake = new Snake;
  foodLocation();
  $('#inc').click(()=>{speed++})
  $('#dec').click(()=>{speed--})

}

function foodLocation() {
  let x = floor(random(w))
  let y = floor(random(h))
  food = createVector(x, y)
}

function draw() {
  scale(rez)
  frameRate(speed)
  background(164, 164, 164);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  fill(255, 0, 0);
  noStroke();
  rect(food.x, food.y, 1, 1);

  $('#speed').html(speed) 
  $('#score').html(score) 
  

}
