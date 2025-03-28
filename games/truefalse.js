// Game Questions Database
const questions = {
    easy: [
        {
            question: "In Python, the print() function is used to display output on the screen.",
            answer: true
        },
        {
            question: "Python uses curly braces {} to define code blocks.",
            answer: false
        },
        {
            question: "The len() function returns the length of a string or list.",
            answer: true
        },
        {
            question: "Python is a case-insensitive programming language.",
            answer: false
        },
        {
            question: "Lists in Python are defined using square brackets [].",
            answer: true
        },
        {
            question: "The comment symbol in Python is //",
            answer: false
        },
        {
            question: "Python's input() function always returns a string.",
            answer: true
        },
        {
            question: "break statement is used to exit a loop.",
            answer: true
        },
        {
            question: "In Python, we can use both single and double quotes for strings.",
            answer: true
        },
        {
            question: "Python requires variable declaration with specific types.",
            answer: false
        }
    ],
    medium: [
        {
            question: "The expression type([]) returns <class 'array'>",
            answer: false
        },
        {
            question: "List comprehension is generally faster than an equivalent for loop.",
            answer: true
        },
        {
            question: "In Python, strings are immutable objects.",
            answer: true
        },
        {
            question: "The range(5) function generates numbers from 1 to 5.",
            answer: false
        },
        {
            question: "Python's dictionary keys must be immutable objects.",
            answer: true
        },
        {
            question: "The 'is' operator compares the memory locations of objects.",
            answer: true
        },
        {
            question: "Lambda functions in Python can contain multiple expressions.",
            answer: false
        },
        {
            question: "All objects in Python inherit from the 'object' class by default.",
            answer: true
        },
        {
            question: "The __init__ method in a class must return a value.",
            answer: false
        },
        {
            question: "Python's list.append() method returns the modified list.",
            answer: false
        }
    ],
    hard: [
        {
            question: "In Python 3, the maximum value for an integer is 2^31 - 1.",
            answer: false
        },
        {
            question: "The GIL in CPython prevents true multi-threading for CPU-bound tasks.",
            answer: true
        },
        {
            question: "Decorators in Python are executed when the function is defined, not when it's called.",
            answer: true
        },
        {
            question: "Python's dict.get() method raises a KeyError if the key doesn't exist.",
            answer: false
        },
        {
            question: "Generator expressions are memory-efficient compared to list comprehensions because they create objects one at a time.",
            answer: true
        },
        {
            question: "In Python, all functions have a closure.",
            answer: false
        },
        {
            question: "The __slots__ attribute can be used to reduce the memory usage of Python classes.",
            answer: true
        },
        {
            question: "Python's asyncio is built on top of threads.",
            answer: false
        },
        {
            question: "Context managers (__enter__ and __exit__) can be used to manage resources other than files.",
            answer: true
        },
        {
            question: "The @staticmethod decorator in Python creates a method that can access class attributes.",
            answer: false
        }
    ]
};

// Game State
let currentGame = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    difficulty: null
};

// DOM Elements
const gameSetup = document.getElementById('game-setup');
const gameArea = document.getElementById('game-area');
const gameOver = document.getElementById('game-over');
const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');
const scoreDisplay = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const performanceMessage = document.getElementById('performance-message');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Difficulty Selection
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                difficultyBtns.forEach(b => b.classList.remove('bg-red-600'));
                btn.classList.add('bg-red-600');
                currentGame.difficulty = btn.dataset.difficulty;
            });
        });

        // Start Game Button
        document.getElementById('start-game').addEventListener('click', startGame);

        // Answer Buttons
        document.getElementById('true-btn').addEventListener('click', () => handleAnswer(true));
        document.getElementById('false-btn').addEventListener('click', () => handleAnswer(false));

        // Next Question Button
        document.getElementById('next-question').addEventListener('click', showNextQuestion);

        // Play Again Button
        document.getElementById('play-again').addEventListener('click', resetGame);

    } catch (error) {
        console.error('Error setting up game:', error);
    }
});

// Game Functions
function startGame() {
    try {
        if (!currentGame.difficulty) {
            alert('Please select a difficulty level!');
            return;
        }

        // Initialize game state
        currentGame.questions = [...questions[currentGame.difficulty]];
        shuffleArray(currentGame.questions);
        currentGame.currentQuestionIndex = 0;
        currentGame.score = 0;

        // Update UI
        gameSetup.classList.add('hidden');
        gameArea.classList.remove('hidden');
        gameOver.classList.add('hidden');
        feedback.classList.add('hidden');

        // Update displays
        scoreDisplay.textContent = '0';
        totalQuestions.textContent = currentGame.questions.length;
        showQuestion();

    } catch (error) {
        console.error('Error starting game:', error);
    }
}

function showQuestion() {
    try {
        const currentQuestion = currentGame.questions[currentGame.currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        questionNumber.textContent = currentGame.currentQuestionIndex + 1;

        // Enable answer buttons
        document.getElementById('true-btn').disabled = false;
        document.getElementById('false-btn').disabled = false;

    } catch (error) {
        console.error('Error showing question:', error);
    }
}

function handleAnswer(userAnswer) {
    try {
        const currentQuestion = currentGame.questions[currentGame.currentQuestionIndex];
        const isCorrect = userAnswer === currentQuestion.answer;

        // Disable answer buttons
        document.getElementById('true-btn').disabled = true;
        document.getElementById('false-btn').disabled = true;

        // Update score and show feedback
        if (isCorrect) {
            currentGame.score++;
            scoreDisplay.textContent = currentGame.score;
            feedbackText.textContent = '✅ Correct!';
            feedbackText.className = 'text-green-500 text-xl mb-4';
        } else {
            feedbackText.textContent = '❌ Incorrect!';
            feedbackText.className = 'text-red-500 text-xl mb-4';
        }

        feedback.classList.remove('hidden');

        // Check if game is over
        if (currentGame.currentQuestionIndex === currentGame.questions.length - 1) {
            setTimeout(showGameOver, 1500);
        }

    } catch (error) {
        console.error('Error handling answer:', error);
    }
}

function showNextQuestion() {
    try {
        currentGame.currentQuestionIndex++;
        feedback.classList.add('hidden');
        showQuestion();

    } catch (error) {
        console.error('Error showing next question:', error);
    }
}

function showGameOver() {
    try {
        gameArea.classList.add('hidden');
        gameOver.classList.remove('hidden');
        finalScore.textContent = currentGame.score;

        // Calculate performance message
        const percentage = (currentGame.score / currentGame.questions.length) * 100;
        let message;
        if (percentage === 100) {
            message = "Perfect score! You're a Python master! 🏆";
        } else if (percentage >= 80) {
            message = "Excellent work! You really know your Python! 🌟";
        } else if (percentage >= 60) {
            message = "Good job! Keep practicing to improve! 👍";
        } else {
            message = "Keep learning! Practice makes perfect! 💪";
        }
        performanceMessage.textContent = message;

    } catch (error) {
        console.error('Error showing game over:', error);
    }
}

function resetGame() {
    try {
        gameOver.classList.add('hidden');
        gameSetup.classList.remove('hidden');
        currentGame.difficulty = null;
        
        // Reset difficulty buttons
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        difficultyBtns.forEach(btn => btn.classList.remove('bg-red-600'));

    } catch (error) {
        console.error('Error resetting game:', error);
    }
}

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}