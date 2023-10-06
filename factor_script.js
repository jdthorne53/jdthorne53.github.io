let score = 0;
let lives = 3;
let num = 5;

function generateNumber() {
    let num = Math.floor(Math.random() * 50) + 10; // Random number between 10 and 59
    document.getElementById('factorFinderNumber').innerText = num;
    currentNumber = num;
}

function checkFactors() {
    let inputFactors = document.getElementById('factorFinderInput').value.split(',').map(num => parseInt(num.trim()));
    let correctFactors = getFactors(currentNumber);

    if (arraysEqual(inputFactors, correctFactors)) {
        score++;
        document.getElementById('factorFinderScore').innerText = score;
        generateNumber();
    } else {
        lives--;
        document.getElementById('factorFinderLives').innerText = lives;
        if (lives === 0) {
            alert('Incorrect! The correct factors of ' + currentNumber + ' are: ' + correctFactors.join(', ') + '\nGame Over! Your score is: ' + score);
            resetGame();
        } else {
            alert('Incorrect! The correct factors of ' + currentNumber + ' are: ' + correctFactors.join(', '));
            generateNumber();
        }
    }
}

function getFactors(number) {
    let factors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function resetGame() {
    score = 0;
    lives = 3;
    document.getElementById('factorFinderScore').innerText = score;
    document.getElementById('factorFinderLives').innerText = lives;
    generateNumber();
}

// Initialize the game
generateNumber();
