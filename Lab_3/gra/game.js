const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const resetDiv = document.getElementById("reset");
const finalScore = document.getElementById("final");
const cross = document.getElementById("crosshair");
const resetBtn = document.getElementById("resetGame");

let score = 50;
let hp = 3;
let zId = 0;
let loop;
const zeds = {};
let music = new Audio("image/sad-music.mp3");

function rand(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
    Math.ceil(min)
  );
}

function moveCross(event) {
  cross.style.top = `${event.pageY}px`;
  cross.style.left = `${event.pageX}px`;
}

function miss() {
  score -= 5;
  scoreEl.textContent = score;
  if (score <= 0) end();
}

function hit() {
  score += 20;
  scoreEl.textContent = score;
  clearInterval(zeds[this.id]);
  this.remove();
}

function genZed() {
  const speed = rand(15, 51);
  const bottom = rand(3, 29);
  const size = rand(1, 3);
  createZed(speed, bottom, size);
}

function createZed(speed, bottom, size) {
  const zed = document.createElement("div");
  zed.className = "zombie";
  zed.id = `zombie${zId}`;
  zed.style.bottom = `${bottom}vh`;
  zed.style.left = "100vw";
  zed.style.transform = `scale(${size})`;
  zed.onclick = hit;
  board.appendChild(zed);
  animateZed(zed, speed);
  zId++;
}

function animateZed(zed, speed) {
  let bgPos = 0;
  let pos = 0;
  const shift = 200;

  zeds[zed.id] = setInterval(() => {
    zed.style.backgroundPositionX = `${bgPos + shift}px`;
    zed.style.left = `${100 - pos}vw`;
    bgPos -= shift;
    pos++;

    if (bgPos === -1800) bgPos = 0;
    if (pos === 115) {
      zed.remove();
      hp -= 1;
      updateHp();
      if (hp <= 0) end();
      clearInterval(zeds[zed.id]);
    }
  }, speed);
}

function updateHp() {
  const hearts = document.getElementsByTagName("img");
  for (let i = 0; i < 3; i++) {
    hearts[i].src = i < hp ? "image/full_heart.png" : "image/empty_heart.png";
  }
}

function start() {
  music.pause();
  music.currentTime = 0;
  hp = 3;
  score = 50;
  zId = 0;
  updateHp();
  scoreEl.textContent = score;
  document.body.style.cursor = "none";
  board.addEventListener("click", miss);
  window.addEventListener("mousemove", moveCross);

  while (board.firstChild) board.removeChild(board.firstChild);

  loop = setInterval(() => {
    genZed();
    if (score <= 0) end();
  }, 1000);
}

function resetGame() {
  resetDiv.style.transform = "translateY(200%)";
  start();
}

function end() {
  clearInterval(loop);
  for (const id in zeds) clearInterval(zeds[id]);
  board.removeEventListener("click", miss);
  finalScore.textContent = score;
  window.removeEventListener("mousemove", moveCross);
  document.body.style.cursor = "default";
  resetDiv.style.transform = "translateY(0%)";
  music.play();
  resetBtn.addEventListener("click", resetGame);
}

window.onload = start;
