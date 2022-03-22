// Find elements on page
var body = document.body;
var h2El = document.querySelector("h2");
var topicEl = document.querySelector("h3");
var answerListEl = document.querySelector("ol");
var subTopicEl = document.querySelector("h4");

// Initialize question counter
var questionCount = 0;
var currentQuestionNum = 0;

// Create a temporary variable to persist the correct answer
var correctAnswer = 0;

/**
 * ! Populate initial HTML screen
 */
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

        // Start Quiz
        buildQuestionPage(questionNumber);
    });
}

/**
 * ! Populate Questions
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
 * ! Timer Logic
 */

/**
 * ! High score logic
 */

/**
 * ! Add an event listener when a multiple choice answer is selected
 */
answerListEl.addEventListener("click", function (event) {
    var element = event.target;

    // Add an event to all the <a tags
    if (element.matches("a") === true) {
        if (parseInt(element.dataset.index) === correctAnswer) {
            console.log("Your answer is correct!!");
            subTopicEl.textContent = "Correct!";
        } else {
            console.log("Wrong answer is wrong!!");
            subTopicEl.textContent = "Wrong!";
        }

        // TODO If answer is incorrect flash incorrect and decrement the timer by 10 seconds
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
