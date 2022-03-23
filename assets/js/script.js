// Find elements on page
var body = document.body;
var timerEl = document.querySelector("#countdown-timer");
var h2El = document.querySelector("h2");
var focusEl = document.querySelector("#focus-area");
var topicEl = document.querySelector("h3");
var answerListEl = document.querySelector("ol");
var subTopicEl = document.querySelector("h4");

// Initialize question counter & current question number
var questionCount = 0;
var currentQuestionNum = 0;

// Create a temporary variable to persist the following variables
var correctAnswer = 0;
var secondsRemaining = 60;
var timerInterval = null;

/**
 * ! Populate initial HTML screen
 */
// TODO wire up View High Scores
function buildWelcomePage(questionNumber) {
    // Initialize temporary button
    var startQuizEl = document.createElement("button");

    // Add text to elements
    topicEl.textContent =
        "Try to answer the following questions within the 60 second time limit. Remember that incorrect answers will penalize your score time by ten seconds! Good luck!";
    startQuizEl.textContent = "Start Challenge!";

    // Add the elements to the body tag
    body.append(startQuizEl);

    console.log("Welcome page built");

    // Set up event listener to kick off the quiz
    startQuizEl.addEventListener("click", function (event) {
        // Override default HTML form behavior
        event.preventDefault();

        // Remove start quiz button
        startQuizEl.remove();

        // Start Timer
        countDownTimer();

        // Start Quiz
        buildQuestionPage(questionNumber);
    });
}

/**
 * ! Build Questions Page
 */

function buildQuestionPage(questionNumber) {
    console.log(
        "------ Question #" + (questionNumber + 1).toString() + "------ "
    );

    // Get current question
    const currentQuestion = supplyQuestions(questionNumber);

    // Populate the question on the <h3> tag
    topicEl.textContent = currentQuestion.question();

    // Flush the possible answer ordered list
    answerListEl.innerHTML = "";

    // Populate the multiple choice answers
    const possibleAnswers = currentQuestion.possibleAnswers();
    for (let i = 0; i < possibleAnswers.length; i++) {
        const answerEl = document.createElement("li");
        answerEl.innerHTML = `<a data-index=${i} href="#"> ${possibleAnswers[i]} </a>`;
        answerListEl.appendChild(answerEl);
    }

    // Set correct answer to global variable
    correctAnswer = currentQuestion.correctAnswerId();

    // Log questions details
    console.log("Question: " + currentQuestion.question());
    console.log("Choices: " + currentQuestion.possibleAnswers());
    console.log("Answer: " + currentQuestion.correctAnswer());
    console.log("Answer ID: " + currentQuestion.correctAnswerId());
}

/**
 * ! Populate Questions
 */
// TODO add remaining questions count to the UI
// TODO add the actual TV Knowledge Quiz questions
function supplyQuestions(questionNumber) {
    const questions = {
        quizQuestions: [
            {
                question: "what time?",
                choices: ["4pm", "5pm", "6pm", "7pm"],
                answer: 3,
            },
            {
                question: "what date?",
                choices: ["10th", "11th", "12th", "13th"],
                answer: 3,
            },
            {
                question: "what second?",
                choices: ["1 sec", "2 sec", "3 sec", "4 sec"],
                answer: 0,
            },
            {
                question: "what year?",
                choices: ["YR1999", "YR2009", "YR2019", "YR2029"],
                answer: 3,
            },
        ],
        question: function () {
            return this.quizQuestions[questionNumber].question;
        },
        possibleAnswers: function () {
            return this.quizQuestions[questionNumber].choices;
        },
        correctAnswerId: function () {
            return this.quizQuestions[questionNumber].answer;
        },
        correctAnswer: function () {
            return this.quizQuestions[questionNumber].choices[
                this.quizQuestions[questionNumber].answer
            ];
        },
    };
    return questions;
}

/**
 * ! Countdown Timer
 */
function countDownTimer() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsRemaining--;
        timerEl.textContent = secondsRemaining + " seconds remaining";

        if (secondsRemaining === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);

            // Inform the user that the time limit has expired and clear the elements
            topicEl.textContent =
                "Sorry. You ran out of time. The quiz is now complete";
            answerListEl.innerHTML = "";
            subTopicEl.innerHTML = "";
        }
    }, 1000);
}

/**
 * ! Input initials
 */
function inputInitials() {
    // Update Header
    h2El.textContent = "High Scores";

    // Clear unneeded elements
    focusEl.innerHTML = "";

    // Initialize temporary elements
    var initialsInputEl = document.createElement("input");
    var submitEl = document.createElement("button");

    // Add text to elements
    topicEl.textContent = "Enter Initials:";
    initialsInputEl.innerHTML = 'type="text" id="initials"';
    submitEl.textContent = "Submit";

    // Add elements to page
    focusEl.appendChild(topicEl);
    focusEl.appendChild(initialsInputEl);
    focusEl.appendChild(submitEl);

    // Add an event listener for the submit button
    submitEl.addEventListener("click", () => {
        if (initialsInputEl.value.trim()) {
            // Create object to hold the current score and associated initials
            const currentScore = {
                secondsRemaining: secondsRemaining,
                playerInitials: initialsInputEl.value.trim(),
            };

            // Get existing high scores
            var existingScores = JSON.parse(
                localStorage.getItem("tvQuizHighScores")
            );

            if (!existingScores) {
                existingScores = [];
            }

            // Add new scores to existing scores
            existingScores.push(currentScore);

            // Update local storage with the new existing score array
            localStorage.setItem(
                "tvQuizHighScores",
                JSON.stringify(existingScores)
            );

            // Clear unnecessary elements
            initialsInputEl.remove();
            submitEl.remove();

            // Display the high score board
            displayHighScores();
        }
    });
}

/**
 * ! Display high scores Board
 */
function displayHighScores() {
    // Update page
    topicEl.textContent = "Top scores in descending order:";

    // Fetch current scores
    const existingScores = JSON.parse(localStorage.getItem("tvQuizHighScores"));

    // Create a new ordered list
    const scoreList = document.createElement("ul");
    focusEl.appendChild(scoreList);

    // Loop over scores and display on page
    for (let i = 0; i < existingScores.length; i++) {
        const scoreEl = document.createElement("li");
        scoreEl.textContent = JSON.stringify(existingScores[i]);
        scoreList.appendChild(scoreEl);
        console.log(JSON.stringify(existingScores[i]));
    }
}

/**
 * ! Add an event listener when a multiple choice answer is selected
 */
answerListEl.addEventListener("click", function (event) {
    // Prevent default action
    event.preventDefault();

    // Create an object of the target element
    var element = event.target;

    // Add an event to all the <a tags
    if (element.matches("a") === true) {
        if (parseInt(element.dataset.index) === correctAnswer) {
            // Flash that the answer is right
            console.log("Your answer is correct!!");
            subTopicEl.textContent = "Correct!";
            subTopicEl.style.color = "green";
        } else {
            // Flash that the answer is wrong
            console.log("Wrong answer is wrong!!");
            subTopicEl.textContent = "Wrong!";
            subTopicEl.style.color = "red";

            // Subtract 10 seconds if the answer is wrong
            secondsRemaining -= 10;
        }

        // After 2 seconds remove flashed messages
        setTimeout(() => {
            subTopicEl.textContent = "";
            if (currentQuestionNum <= questionCount - 1) {
                // Build the next question and the corresponding set of answers
                buildQuestionPage(currentQuestionNum);

                // Increment current question number
                currentQuestionNum++;
            } else {
                // Quiz is complete, now reset the page
                topicEl.textContent = "Quiz is Complete";
                answerListEl.innerHTML = "";
                subTopicEl.innerHTML = "";

                // Stop the timer
                clearInterval(timerInterval);
                timerInterval = null;

                // Add 2 seconds to compensate for the final answer review
                secondsRemaining += 2;

                // Update the UI with the total remaining time
                timerEl.textContent = "Seconds remaining: " + secondsRemaining;

                // Enter a high score
                inputInitials();
            }
        }, 2000);
    }
});

/**
 * ! Main Controller
 */
function init() {
    // Fetch number of questions
    questionCount = supplyQuestions().quizQuestions.length;
    console.log("There are " + questionCount + " question(s) in this quiz.");

    // Build the welcome page if the question count is greater than 0
    if (questionCount > 0) {
        buildWelcomePage(0);
    }

    // Increment the question count since the first question has loaded
    currentQuestionNum++;
}

// Kickoff main initialization function
init();
