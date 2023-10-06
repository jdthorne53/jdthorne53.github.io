let score = 0;
let lives = 3;
let currentSequence = [2, 4, null, 8, 10]; // Default sequence for the example

function generateSequence() {
    let start = Math.floor(Math.random() * 10) + 1;
    let step = Math.floor(Math.random() * 5) + 1;
    let missingIndex = Math.floor(Math.random() * 5);
    currentSequence = [];

    for (let i = 0; i < 5; i++) {
        if (i === missingIndex) {
            currentSequence.push(null);
        } else {
            currentSequence.push(start + step * i);
        }
    }

    document.getElementById('numberJumperInput').value = '';
    document.getElementById('numberJumperSequence').innerText = currentSequence.map(num => num || '?').join(', ');
}

function checkNumber() {
    let inputNumber = parseInt(document.getElementById('numberJumperInput').value, 10);
    let missingIndex = currentSequence.indexOf(null);
    
    // Calculate the correct number based on the sequence pattern
    let step;
    if (missingIndex > 1) {
        step = currentSequence[missingIndex - 1] - currentSequence[missingIndex - 2];
    } else {
        step = currentSequence[missingIndex + 2] - currentSequence[missingIndex + 1];
    }
    let correctNumber = currentSequence[missingIndex - 1] ? currentSequence[missingIndex - 1] + step : currentSequence[missingIndex + 1] - step;

    if (inputNumber === correctNumber) {
        score++;
        document.getElementById('numberJumperScore').innerText = score;
        generateSequence();
    } else {
        lives--;
        document.getElementById('numberJumperLives').innerText = lives;
        if (lives === 0) {
            alert('Game Over! Your score is: ' + score);
            resetGame();
        } else {
            generateSequence();
        }
    }
    let inputBox = document.getElementById('numberJumperInput');
    inputBox.value = '';
    inputBox.focus();
}

// Event listener for the Enter key
document.getElementById('numberJumperInput').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {  // 13 is the key code for Enter
        checkNumber();
    }
});


function resetGame() {
    score = 0;
    lives = 3;
    document.getElementById('numberJumperScore').innerText = score;
    document.getElementById('numberJumperLives').innerText = lives;
    generateSequence();
}

// Generate the first sequence when the game starts
generateSequence();
