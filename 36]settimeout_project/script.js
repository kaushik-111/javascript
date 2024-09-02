let timer; 
let hours = 0, minutes = 0, seconds = 0; 

function updateDisplay() {
    const display = document.getElementById("timer");
    display.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!timer) { 
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null; 
}

function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("stopButton").addEventListener("click", stopTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
