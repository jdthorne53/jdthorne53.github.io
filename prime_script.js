let score = 0;
let lives = 3;
let currentNumber = 17; // Default number for the example

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

function generateNumber() {
    currentNumber = Math.floor(Math.random() * 97) + 2; // Random number between 2 and 99
    document.getElementById('primeTimeNumber').innerText = currentNumber;
}

function checkPrime(guess) {
    if (isPrime(currentNumber) === guess) {
        score++;
        document.getElementById('primeTimeScore').innerText = score;
        generateNumber();
    } else {
        lives--;
        document.getElementById('primeTimeLives').innerText = lives;
        if (lives === 0) {
            alert('Game Over! Your score is: ' + score);
            resetGame();
        } else {
            generateNumber();
        }
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    document.getElementById('primeTimeScore').innerText = score;
    document.getElementById('primeTimeLives').innerText = lives;
    generateNumber();
}

// Generate the first number when the game starts
generateNumber();
