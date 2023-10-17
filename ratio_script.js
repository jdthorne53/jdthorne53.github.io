let currentPosition = 0;
let currentAnswer = "";

function generateRandomQuestion() {
    let objects = ['apples', 'bananas', 'cats', 'dogs', 'pencils', 'erasers', 'oranges', 'apples', 'boys', 'girls', 'birds', 'nests', 'chocolates', 'kids', 'cars', 'garages', 'pencils', 'notebooks', 'balls', 'players'];
    let obj1 = objects[Math.floor(Math.random() * objects.length)];
    let obj2 = objects[Math.floor(Math.random() * objects.length)];
    let num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    let multipliers = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    let multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    let num2 = Math.round(num1 * multiplier); // num2 is a product of num1 and the multiplier
    let gcdValue = gcd(num1, num2); // Greatest common divisor

    // Randomly decide which number will be larger
    if (Math.random() > 0.5) {
        [num1, num2] = [num2, num1];
        [obj1, obj2] = [obj2, obj1];
    }

    let ratio = `${num1/gcdValue}:${num2/gcdValue}`;
    return {
        question: `If there are ${num1} ${obj1} and ${num2} ${obj2}, what's the ratio of ${obj1} to ${obj2}?`,
        answer: ratio
    };
}

function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}


function loadRiddle() {
    let riddle = generateRandomQuestion();
    document.querySelector('.riddle').innerText = "Riddle: " + riddle.question;
    currentAnswer = riddle.answer; // Store the answer for checking later
}

function checkAnswer() {
    let answer = document.getElementById('answer').value;
    if (answer === currentAnswer) {
        document.getElementById('position').innerText = currentPosition;
        loadRiddle();
        currentPosition++;
    } else {
        alert('Try again!');
    }
    let answerbox = document.getElementById('answer');
    answerbox.value = '';
    answerbox.focus();
}

// Event listener for the Enter key
document.getElementById('answer').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {  // 13 is the key code for Enter
        checkAnswer();
    }
});

function resetGame() {
    currentPosition = 0;
    document.getElementById('position').innerText = currentPosition;
    loadRiddle();
}

function switchToHard() {
    difficultyname = "hard";
    difficulty = 2;
    resetGame();
}

// Load the first riddle when the game starts
difficulty = 1;
loadRiddle();
