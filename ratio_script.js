let currentPosition = 0;
let difficulty = "easy"; // default difficulty

let riddles = {
    //easy
    1: [
        { question: "If there are 5 apples and 10 bananas, what's the ratio of apples to bananas?", answer: "1:2" },
        { question: "If there are 4 cats and 8 dogs, what's the ratio of cats to dogs?", answer: "1:2" },
        { question: "If there are 3 pencils and 6 erasers, what's the ratio of pencils to erasers?", answer: "1:2" },
        { question: "If there are 2 oranges and 3 apples, what's the ratio of oranges to apples?", answer: "2:3" },
        { question: "If there are 7 boys and 14 girls in a class, what's the ratio of boys to girls?", answer: "1:2" },
        { question: "If there are 6 birds and 3 nests, what's the ratio of birds to nests?", answer: "2:1" },
        { question: "If there are 9 chocolates and 3 kids, what's the ratio of chocolates to kids?", answer: "3:1" },
        { question: "If there are 8 cars and 4 garages, what's the ratio of cars to garages?", answer: "2:1" },
        { question: "If there are 10 pencils and 5 notebooks, what's the ratio of pencils to notebooks?", answer: "2:1" },
        { question: "If there are 3 balls and 9 players, what's the ratio of balls to players?", answer: "1:3" }
    ],
    //hard
    2: [
        { question: "If there are 7 apples and 21 bananas, what's the ratio of apples to bananas?", answer: "1:3" },
        { question: "If there are 5 cats and 15 dogs, what's the ratio of cats to dogs?", answer: "1:3" },
        { question: "If there are 13 lions and 39 zebras, what's the ratio of lions to zebras?", answer: "1:3" },
        { question: "If there are 8 oranges and 24 apples, what's the ratio of oranges to apples?", answer: "1:3" },
        { question: "If there are 11 boys and 33 girls in a class, what's the ratio of boys to girls?", answer: "1:3" },
        { question: "If there are 9 birds and 27 trees, what's the ratio of birds to trees?", answer: "1:3" },
        { question: "If there are 14 chocolates and 42 kids, what's the ratio of chocolates to kids?", answer: "1:3" },
        { question: "If there are 6 cars and 18 garages, what's the ratio of cars to garages?", answer: "1:3" },
        { question: "If there are 10 pencils and 30 notebooks, what's the ratio of pencils to notebooks?", answer: "1:3" },
        { question: "If there are 4 balls and 12 players, what's the ratio of balls to players?", answer: "1:3" }
    ]
};

function loadRiddle() {
    if (currentPosition < riddles[difficulty].length) {
        document.querySelector('.riddle').innerText = "Riddle: " + riddles[difficulty][currentPosition].question;
    } else {
        alert('You completed the ' + difficultyname + ' mode!');
        resetGame();
    }
}

function checkAnswer() {
    let answer = document.getElementById('answer').value;
    if (answer === riddles[difficulty][currentPosition].answer) {
        currentPosition++;
        document.getElementById('position').innerText = currentPosition;
        loadRiddle();
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
