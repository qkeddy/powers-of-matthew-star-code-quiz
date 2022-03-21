/**
 * ! Populate initial HTML screen
 */
function buildWelcomePage() {
    // Initialize elements
    var body = document.body;
    var h2El = document.createElement("h2");
    var infoEl = document.createElement("div");
    var startQuizEl = document.createElement("button");

    // Add text to elements
    h2El.textContent =
        "Test your knowledge about the Powers of Matthew Star Television Series";
    infoEl.textContent =
        "Try to answer the following questions within the 60 second time limit. Remember that incorrect answers will penalize your score time by ten seconds! Good luck!";
    startQuizEl.textContent = "Start Challenge!";

    // Add the elements to the body tag
    body.append(h2El, infoEl, startQuizEl);

    console.log("Welcome page built");

    // Set up event listener to kick off the quiz
    startQuizEl.addEventListener("click", function (event) {
        // Override default HTML form behavior
        event.preventDefault();

        // Start Quiz
        buildQuestionPage();
    });
}

/**
 * ! Populate Questions
 */

function buildQuestionPage(questionNumber) {
    var questionCount = supplyQuestions().quizQuestions.length;

    // For each question, build the question page
    for (let index = 0; index < questionCount; index++) {
        // Get current question
        const currentQuestion = supplyQuestions(index);

        // Build HTML Here
        console.log("Question: " + currentQuestion.question());
        console.log("Choices: " + currentQuestion.possibleAnswers());
        console.log("Answer: " + currentQuestion.correctAnswer());
        console.log("Answer ID: " + currentQuestion.correctAnswerId());
    }
}

/**
 * ! Populate Questions
 */
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
// Refresh HTML to display high scores

/**
 * ! Main Controller
 */
function init() {
    buildWelcomePage();
}

init();
