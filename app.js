const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 100;
let ground_y = 500;
let ground_width = 200;
let ground_height = 5;
let brickArray = [];
let count = 0;

function getRandomNum(min, max) {
  // random num between min and max
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.visible = true;
    brickArray.push(this);
  }
  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  touchBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY <= this.y + this.height + radius &&
      ballY >= this.y - radius
    );
  }
}

// Create 10 bricks
for (let i = 0; i < 10; i++) {
  new Brick(getRandomNum(0, 950), getRandomNum(0, 550));
}

c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});
function drawCircle() {
  // check if ball hits brick
  brickArray.forEach((brick) => {
    if (brick.visible && brick.touchBall(circle_x, circle_y)) {
      count++;
      brick.visible = false;
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        ySpeed *= -1;
      } else if (circle_x >= brick.x + brick.width || circle_x <= brick.x) {
        xSpeed *= -1;
      }
      if (count == 10) {
        alert("You won!");
        clearInterval(game);
      }
    }
  });
  // check if ball hits orange floor
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + ground_width + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    // 增加彈力
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }
  if (circle_x >= canvasWidth - radius || circle_x <= radius) {
    // change coordinates
    // change if ball hits boundaries
    xSpeed *= -1;
  }
  if (circle_y >= canvasHeight - radius || circle_y <= radius) {
    ySpeed *= -1;
  }
  circle_x += xSpeed;
  circle_y += ySpeed;

  // draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // draw all bricks
  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  // draw floor
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, ground_width, ground_height);

  // draw circle
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
