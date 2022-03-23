// Find elements on page
var body = document.body;
var scoresEl = document.querySelector("#high-scores");
var timerEl = document.querySelector("#countdown-timer");
var h2El = document.querySelector("h2");
var focusEl = document.querySelector("#focus-area");
var topicEl = document.querySelector("h3");
var oListEl = document.querySelector("ol");
var subTopicEl = document.querySelector("h4");
var buttonEl = document.querySelector("button");

// Initialize question counter & current question number
var questionCount = 0;
var currentQuestionNum = 0;

// Create a temporary variable to persist the following variables
var correctAnswer = 0;
var secondsRemaining = 0;
var timerInterval = null;

/**
 * ! Populate initial HTML screen
 */
function buildWelcomePage(questionNumber) {
    // Add text to elements
    topicEl.textContent =
        "Try to answer the following questions within the 60 second time limit. Remember that incorrect answers will penalize your score time by ten seconds! Good luck!";

    console.log("Welcome page built");

    // Set up event listener to kick off the quiz
    buttonEl.addEventListener("click", function (event) {
        // Override default HTML form behavior
        event.preventDefault();

        // Hide start quiz button
        buttonEl.style.visibility = "hidden";
        subTopicEl.innerHTML = "";

        // Start Timer
        countDownTimer();

        // Set seconds remaining
        secondsRemaining = 60;

        // Reset the main topic color
        topicEl.style.color = "black";

        // Start Quiz
        buildQuestionPage(questionNumber);
    });

    // Set up event listener to display high scores
    scoresEl.addEventListener("click", function (event) {
        // Override default HTML form behavior
        event.preventDefault();

        // Hide start quiz button
        buttonEl.style.visibility = "hidden";

        // Stop the timer
        clearInterval(timerInterval);

        // Flush answer list & timer
        oListEl.innerHTML = "";
        timerEl.textContent = "";

        // Display high scores
        displayHighScores();
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
    oListEl.innerHTML = "";

    // Populate the multiple choice answers
    const possibleAnswers = currentQuestion.possibleAnswers();
    for (let i = 0; i < possibleAnswers.length; i++) {
        const answerEl = document.createElement("li");
        answerEl.innerHTML = `<a data-index=${i} href="#"> ${possibleAnswers[i]} </a>`;
        oListEl.appendChild(answerEl);
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
function supplyQuestions(questionNumber) {
    const questions = {
        quizQuestions: [
            {
                question: "Complete the sentence: \nThe ________ of Matthew Star",
                choices: ["Adventures", "Powers", "House", "None of the above"],
                answer: 1,
            },
            {
                question: "Matthew Star is…",
                choices: [
                    "An alien prince",
                    "An orphaned peasant boy",
                    "An aspiring artist",
                    "A mutant",
                    "None of the above",
                ],
                answer: 0,
            },
            {
                question: "Matthew Star lived…",
                choices: [
                    "In a closet under the stairs",
                    "On a spaceship",
                    "With a janitor",
                ],
                answer: 2,
            },
            {
                question: "What is Matthew Star’s super power?",
                choices: [
                    "He has telekinetic powers",
                    "He can move through space and time",
                    "He is an extremely talented singer",
                    "All of the above",
                ],
                answer: 0,
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
                "Sorry. You ran out of time. The quiz is now complete.";
            topicEl.style.color = "red"
            oListEl.innerHTML = "";
            subTopicEl.innerHTML = "";
            buttonEl.style.visibility = "visible";
        }
    }, 1000);
}

/**
 * ! Input initials
 */
function inputInitials() {
    // Update Header
    h2El.textContent = "High Scores";

    // Initialize temporary elements
    var initialsInputEl = document.createElement("input");
    var submitEl = document.createElement("button");

    // Add text to elements
    topicEl.textContent = "You finished the quiz! Please enter initials to be added to the leader board:";
    initialsInputEl.innerHTML = 'type="text" id="initials"';
    submitEl.textContent = "Submit";

    // Add elements to page
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
            existingScores = JSON.parse(
                localStorage.getItem("tvQuizHighScores")
            );

            // If the existing scores array is null than initialize as an array
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

            // Hide start quiz button
            buttonEl.style.visibility = "visible";

            // Display the high score board
            displayHighScores();
        }
    });
}

/**
 * ! Display high scores Board
 */
function displayHighScores() {
// Clear out prior scores
    

    // Fetch current scores and sort items if there are items
    var existingScores = JSON.parse(
        localStorage.getItem("tvQuizHighScores"));
    
    // Sort the array if it is not empty. Otherwise, notify the player and exit
    if (existingScores) {
        existingScores = existingScores.sort(
            sortByProperty("secondsRemaining")
        );

        // Update page message
        topicEl.textContent = "Top scores in descending order:";
        topicEl.style.color = "green";
    } else {
        // Update page message
        topicEl.textContent = "Currently there are no scores stored.";
        console.log("Currently there are no scores stored.");
        topicEl.style.color = "red";
        return;
    }
    
    // Loop over scores and display on page
    for (let i = 0; i < existingScores.length; i++) {
        const scoreEl = document.createElement("li");
        const playerInitials = existingScores[i].playerInitials;
        const score = existingScores[i].secondsRemaining;
        scoreEl.textContent = playerInitials.toUpperCase() + " - " + score;
        oListEl.appendChild(scoreEl);
        console.log(playerInitials + " - " + score);
    }

    subTopicEl.textContent = "Want to play?";
    buttonEl.style.visibility = "visible";
}

/**
 * ! Generic sort function
 * Credit to: https://medium.com/@asadise/sorting-a-json-array-according-one-property-in-javascript-18b1d22cd9e9
 */
function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property]) return -1;
        else if (a[property] < b[property]) return 1;

        return 0;
    };
}

/**
 * ! Add an event listener when a multiple choice answer is selected
 */
oListEl.addEventListener("click", function (event) {
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
                // Quiz is complete, now reset the ordered list
                oListEl.innerHTML = "";

                // Clear the subtopic text
                subTopicEl.textContent = "";

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
