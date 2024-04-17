let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function printTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const display = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  document.getElementById('display').innerText = display;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printElapsedTime() {
    elapsedTime = Date.now() - startTime;
    printTime(elapsedTime);
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  printTime(elapsedTime);
  laps = [];
  document.getElementById('lapList').innerHTML = '';
  document.getElementById('pauseBtn').disabled = true;
}

function lapTimer() {
  const lapTime = elapsedTime;
  laps.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.innerText = laps.length + '. ' + printTime(lapTime);
  document.getElementById('lapList').appendChild(lapItem);
}

document.getElementById('startBtn').addEventListener('click', function () {
  startTimer();
  this.disabled = true;
  document.getElementById('pauseBtn').disabled = false;
});

document.getElementById('pauseBtn').addEventListener('click', function () {
  pauseTimer();
  document.getElementById('startBtn').disabled = false;
});

document.getElementById('resetBtn').addEventListener('click', function () {
  resetTimer();
  document.getElementById('startBtn').disabled = false;
});

document.getElementById('lapBtn').addEventListener('click', function () {
  lapTimer();
});
