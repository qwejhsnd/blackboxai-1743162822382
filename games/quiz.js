// Quiz Questions Database
const questions = {
    easy: [
        {
            question: "What is the correct way to create a variable in Python?",
            options: [
                "var x = 5",
                "x = 5",
                "dim x = 5",
                "let x = 5"
            ],
            answer: 1,
            explanation: "In Python, variables are created by simply assigning a value using the '=' operator. No declaration keyword is needed."
        },
        {
            question: "Which of these is a valid Python comment?",
            options: [
                "// This is a comment",
                "/* This is a comment */",
                "# This is a comment",
                "<!-- This is a comment -->"
            ],
            answer: 2,
            explanation: "Python uses the '#' symbol for single-line comments."
        },
        {
            question: "What is the correct way to create a list in Python?",
            options: [
                "list = (1, 2, 3)",
                "list = [1, 2, 3]",
                "list = {1, 2, 3}",
                "list = <1, 2, 3>"
            ],
            answer: 1,
            explanation: "Lists in Python are created using square brackets []."
        },
        {
            question: "Which function is used to get the length of a list?",
            options: [
                "size()",
                "length()",
                "count()",
                "len()"
            ],
            answer: 3,
            explanation: "The len() function is used to get the length of sequences like lists, strings, and tuples."
        },
        {
            question: "What is the output of: print('Hello' + 'World')?",
            options: [
                "Hello World",
                "HelloWorld",
                "Error",
                "Hello+World"
            ],
            answer: 1,
            explanation: "The + operator concatenates strings in Python without adding spaces."
        }
    ],
    medium: [
        {
            question: "What is the output of:\nlist = [1, 2, 3]\nprint(list[-1])",
            options: [
                "Error",
                "1",
                "3",
                "None"
            ],
            answer: 2,
            explanation: "Negative indices in Python count from the end of the sequence. -1 refers to the last element."
        },
        {
            question: "Which of these is NOT a valid way to create a tuple?",
            options: [
                "tuple = (1,)",
                "tuple = 1, 2, 3",
                "tuple = [1, 2, 3]",
                "tuple = tuple([1, 2, 3])"
            ],
            answer: 2,
            explanation: "While [1, 2, 3] creates a list, not a tuple. Tuples use parentheses () or just commas for separation."
        },
        {
            question: "What does the following code do?\nfor i in range(5):",
            options: [
                "Loops 5 times, i from 1 to 5",
                "Loops 5 times, i from 0 to 4",
                "Loops 6 times, i from 0 to 5",
                "Causes an error"
            ],
            answer: 1,
            explanation: "range(5) generates numbers from 0 to 4 (5 numbers total)."
        },
        {
            question: "What is the purpose of the 'self' parameter in class methods?",
            options: [
                "It's optional and can be omitted",
                "It refers to the class itself",
                "It refers to the instance of the class",
                "It's a Python keyword"
            ],
            answer: 2,
            explanation: "'self' refers to the instance of the class and is used to access instance attributes and methods."
        },
        {
            question: "What is the difference between append() and extend() for lists?",
            options: [
                "They are identical",
                "append() adds one element, extend() adds multiple elements",
                "append() adds multiple elements, extend() adds one element",
                "append() creates a new list, extend() modifies the existing list"
            ],
            answer: 1,
            explanation: "append() adds a single element to the end of the list, while extend() adds all elements from an iterable."
        }
    ],
    hard: [
        {
            question: "What is the output of:\nprint(1 + True + False + True)",
            options: [
                "Error",
                "3",
                "True",
                "2"
            ],
            answer: 1,
            explanation: "In Python, True has a value of 1 and False has a value of 0 when used in arithmetic operations."
        },
        {
            question: "Which statement about Python generators is correct?",
            options: [
                "They can only yield numbers",
                "They store all values in memory",
                "They generate values on-the-fly",
                "They can't be used in for loops"
            ],
            answer: 2,
            explanation: "Generators create values on-the-fly and don't store them all in memory, making them memory-efficient."
        },
        {
            question: "What is the purpose of the __slots__ attribute in a class?",
            options: [
                "To define class methods",
                "To restrict attribute creation",
                "To create class properties",
                "To define class inheritance"
            ],
            answer: 1,
            explanation: "__slots__ is used to explicitly declare data members and prevent the creation of __dict__, saving memory."
        },
        {
            question: "What is the output of:\nprint(isinstance(lambda x: x, object))",
            options: [
                "False",
                "True",
                "Error",
                "None"
            ],
            answer: 1,
            explanation: "In Python, everything is an object, including lambda functions, so they inherit from the object class."
        },
        {
            question: "Which of these decorators modifies the behavior of a class attribute?",
            options: [
                "@classmethod",
                "@staticmethod",
                "@property",
                "@abstractmethod"
            ],
            answer: 2,
            explanation: "@property decorator is used to define properties that can be accessed like attributes but with getter/setter functionality."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Game State
    let currentGame = {
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        difficulty: null
    };

    // DOM Elements
    const gameSetup = document.getElementById('game-setup');
    const quizArea = document.getElementById('quiz-area');
    const gameOver = document.getElementById('game-over');
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const totalQuestions = document.getElementById('total-questions');
    const scoreDisplay = document.getElementById('score');
    const finalScore = document.getElementById('final-score');
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const explanation = document.getElementById('explanation');
    const performanceMessage = document.getElementById('performance-message');
    const progressBar = document.getElementById('progress-bar');
    const optionsContainer = document.getElementById('options-container');
    const nextQuestionBtn = document.getElementById('next-question');

    // Game Functions
    function startGame() {
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
        quizArea.classList.remove('hidden');
        gameOver.classList.add('hidden');
        feedback.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');

        // Update displays
        scoreDisplay.textContent = '0';
        totalQuestions.textContent = currentGame.questions.length;
        updateProgressBar();
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = currentGame.questions[currentGame.currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        questionNumber.textContent = currentGame.currentQuestionIndex + 1;

        // Clear and create new option buttons
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg text-left transition-colors w-full mb-2';
            button.textContent = option;
            button.onclick = () => handleAnswer(index);
            optionsContainer.appendChild(button);
        });

        // Hide feedback section and next button
        feedback.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
        updateProgressBar();
    }

    function handleAnswer(selectedIndex) {
        const currentQuestion = currentGame.questions[currentGame.currentQuestionIndex];
        const isCorrect = selectedIndex === currentQuestion.answer;

        // Disable all option buttons
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach((button, index) => {
            button.disabled = true;
            if (index === currentQuestion.answer) {
                button.classList.remove('bg-gray-800', 'hover:bg-gray-700');
                button.classList.add('bg-green-600');
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.remove('bg-gray-800', 'hover:bg-gray-700');
                button.classList.add('bg-red-600');
            }
        });

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

        // Show explanation and feedback
        explanation.textContent = currentQuestion.explanation;
        feedback.classList.remove('hidden');

        // Show next question button if not the last question
        if (currentGame.currentQuestionIndex < currentGame.questions.length - 1) {
            nextQuestionBtn.classList.remove('hidden');
        } else {
            setTimeout(showGameOver, 1500);
        }
    }

    function showNextQuestion() {
        if (currentGame.currentQuestionIndex < currentGame.questions.length - 1) {
            currentGame.currentQuestionIndex++;
            showQuestion();
        }
    }

    function showGameOver() {
        quizArea.classList.add('hidden');
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
    }

    function resetGame() {
        gameOver.classList.add('hidden');
        gameSetup.classList.remove('hidden');
        currentGame.difficulty = null;
        
        // Reset difficulty buttons
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');
        difficultyBtns.forEach(btn => btn.classList.remove('bg-red-600'));
    }

    function updateProgressBar() {
        const progress = ((currentGame.currentQuestionIndex + 1) / currentGame.questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Event Listeners
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('bg-red-600'));
            btn.classList.add('bg-red-600');
            currentGame.difficulty = btn.dataset.difficulty;
        });
    });

    document.getElementById('start-game').addEventListener('click', startGame);
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    document.getElementById('play-again').addEventListener('click', resetGame);
});

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}