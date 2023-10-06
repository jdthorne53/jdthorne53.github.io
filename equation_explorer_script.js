let score = 0;
let lives = 3;
let currentEquation = { left: 7, right: 12, answer: 5 }; // Default equation for the example
let timer;
let countdownMode = false;
let countdownTimeLeft = 60;
let countdownInterval;

document.querySelector('.equation-explorer-countdown-timer').style.display = 'none';

function startCountdownMode() {
    countdownMode = true;
    score = 0;
    document.getElementById('equationExplorerScore').innerText = score;
    countdownTimeLeft = 60;
    document.getElementById('countdownTimer').innerText = countdownTimeLeft;
    
    // Stop the individual equation timer
    clearInterval(timer);
    
    // Hide the individual equation timer from the screen
    document.querySelector('.equation-explorer-timer').style.display = 'none';
    document.querySelector('.equation-explorer-countdown-timer').style.display = 'block';

    generateEquation();
    countdownInterval = setInterval(function() {
        countdownTimeLeft--;
        document.getElementById('countdownTimer').innerText = countdownTimeLeft;
        if (countdownTimeLeft <= 0) {
            endCountdownMode();
        }
    }, 1000);
}

function endCountdownMode() {
    clearInterval(countdownInterval);
    countdownMode = false;
    alert('Time up! Your score is: ' + score);
    
    // Show the individual equation timer again
    document.querySelector('.equation-explorer-timer').style.display = 'block';
    
    resetGame();
}

function generateEquation() {
    let isAdvanced = document.getElementById('advancedOperations').checked;
    let operation = isAdvanced ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 2); // If advanced is checked, include multiplication and division
    let left, right, answer;

    switch (operation) {
        case 0: // Addition
            left = Math.floor(Math.random() * 20) + 1;
            answer = Math.floor(Math.random() * 10) + 1;
            right = left + answer;
            document.getElementById('equationExplorerEquation').innerText = `${left} + ? = ${right}`;
            break;
        case 1: // Subtraction
            right = Math.floor(Math.random() * 20) + 1;
            answer = Math.floor(Math.random() * 10) + 1;
            left = right + answer;
            document.getElementById('equationExplorerEquation').innerText = `${left} - ? = ${right}`;
            break;
        case 2: // Multiplication
            left = Math.floor(Math.random() * 10) + 1;
            answer = Math.floor(Math.random() * 5) + 1;
            right = left * answer;
            document.getElementById('equationExplorerEquation').innerText = `${left} x ? = ${right}`;
            break;
        case 3: // Division
            answer = Math.floor(Math.random() * 5) + 1;
            right = Math.floor(Math.random() * 10) + 1;
            left = right * answer;
            document.getElementById('equationExplorerEquation').innerText = `${left} ÷ ? = ${right}`;
            break;
    }

    currentEquation = { left, right, answer };
}

function startTimer() {
    let timeLeft = 10;
    document.getElementById('equationExplorerTimer').innerText = timeLeft;
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('equationExplorerTimer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!countdownMode) {  // Only lose a life if not in countdown mode
                loseLife();
            } else {
                generateEquation();  // In countdown mode, just generate a new equation
            }
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timer);
    if (!countdownMode) {
        startTimer();
    }
    let inputAnswer = parseInt(document.getElementById('equationExplorerInput').value, 10);
    if (inputAnswer === currentEquation.answer) {
        score++;
        document.getElementById('equationExplorerScore').innerText = score;
        generateEquation();
    } else {
        loseLife();
    }
    let inputBox = document.getElementById('equationExplorerInput');
    inputBox.value = '';
    inputBox.focus();
}

// Event listener for the Enter key
document.getElementById('equationExplorerInput').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {  // 13 is the key code for Enter
        checkAnswer();
    }
});

// Event listener for the "Start Countdown Mode" button
document.getElementById('startCountdownMode').addEventListener('click', startCountdownMode);

function loseLife() {
    lives--;
    document.getElementById('equationExplorerLives').innerText = lives;
    if (lives <= 0) {
        alert('Game Over! Your score is: ' + score);
        resetGame();
    } else {
        generateEquation();
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    document.getElementById('equationExplorerScore').innerText = score;
    document.getElementById('equationExplorerLives').innerText = lives;
    clearInterval(countdownInterval);
    countdownMode = false;
    document.querySelector('.equation-explorer-timer').style.display = 'block';
    document.querySelector('.equation-explorer-countdown-timer').style.display = 'none';
    generateEquation();
}

// Generate the first equation when the game starts
generateEquation();
