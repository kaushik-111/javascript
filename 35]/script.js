let countdownTime = 10;

const updateCountdown = () => {
    const countdownDisplay = document.getElementById("countdownDisplay");
    countdownDisplay.textContent = `Time remaining: ${countdownTime} seconds`;
    countdownTime--;

    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "Time's up!";
    }
};

const showModal = () => {
    document.getElementById("myModal").style.display = "block";
};

const countdownInterval = setInterval(updateCountdown, 1000); 

setTimeout(showModal, 5000); 
