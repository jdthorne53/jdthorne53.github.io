let score = 0;
let lives = 3;
let currentFraction = { numerator: 1, denominator: 2 }; // Default fraction for the example

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

function simplifyFraction(numerator, denominator) {
    const greatestCommonDivisor = gcd(numerator, denominator);
    return {
        numerator: numerator / greatestCommonDivisor,
        denominator: denominator / greatestCommonDivisor
    };
}

function generateFraction() {
    let numerator = Math.floor(Math.random() * 8) + 1;
    let denominator = Math.floor(Math.random() * 8) + numerator;
    currentFraction = { numerator, denominator };
    document.getElementById('mainFraction').innerText = `${numerator}/${denominator}`;
    generateOptions();
}

function generateOptions() {
    let isSimplified = Math.random() > 0.5; // Randomly decide if the correct option should be simplified
    let correctOption;
    let simplified = simplifyFraction(currentFraction.numerator, currentFraction.denominator);

    if (isSimplified && (simplified.numerator != currentFraction.numerator)) {
        correctOption = `${simplified.numerator}/${simplified.denominator}`;
    } else {
        let multiplier = Math.floor(Math.random() * 3) + 2; // Random multiplier between 2 and 4
        correctOption = `${currentFraction.numerator * multiplier}/${currentFraction.denominator * multiplier}`;
    }

    let options = [correctOption];

    while (options.length < 4) {
        let num = Math.floor(Math.random() * 8) + 1;
        let den = Math.floor(Math.random() * 8) + num;
        let option = `${num}/${den}`;
        if (options.indexOf(option) === -1) {
            options.push(option);
        }
    }

    // Shuffle the options
    options.sort(() => Math.random() - 0.5);

    // Update the buttons with the new options
    let buttons = document.querySelectorAll('.options button');
    buttons.forEach((button, index) => {
        button.innerText = options[index];
        button.onclick = () => checkFraction(options[index]);
    });
}

function checkFraction(fraction) {
    let [num, den] = fraction.split('/').map(Number);
    if (num * currentFraction.denominator === den * currentFraction.numerator) {
        score++;
        document.getElementById('score').innerText = score;
        generateFraction();
    } else {
        lives--;
        document.getElementById('lives').innerText = lives;
        if (lives === 0) {
            alert('Game Over! Your score is: ' + score);
            resetGame();
        }
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    document.getElementById('score').innerText = score;
    document.getElementById('lives').innerText = lives;
    generateFraction();
}

// Generate the first fraction when the game starts
generateFraction();
