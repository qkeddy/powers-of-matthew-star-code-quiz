/**
 * ! Populate initial HTML screen
 */
function buildWelcomePage() {
    // Initialize elements
    var body = document.body;
    var h1El = document.createElement("h1");
    var h2El = document.createElement("h2");
    var infoEl = document.createElement("div");
    var startQuiz = document.createElement("button");

    // Add text
    h1El.textContent = "Television Series Challenge";
    h2El.textContent =
        "Test your knowledge about the Powers of Matthew Star Television Series";
    infoEl.textContent =
        "Try to answer the following questions within the 60 second time limit. Remember that incorrect answers will penalize your score time by ten seconds! Good luck!";
    startQuiz.textContent = "Start Challenge!";

    // Add to page
    body.appendChild(h1El);
    body.appendChild(h2El);
    body.appendChild(infoEl);
    body.appendChild(startQuiz);

    // Style elements
    // h1El.setAttribute("style", "margin:auto; width:100%; text-align:center;");
    // h2El.setAttribute(
    //     "style",
    //     "margin:auto; width:100%; text-align:center; font-size: .75em"
    // );
    // infoEl.setAttribute(
    //     "style",
    //     "margin:auto; width:100%; text-align:center; font-size: .75em; color: blue; font-style: italic"
    // );

    // Assign attributes
    // startQuiz.id = "start-quiz";
    // var startQuiz = document.querySelector("#start-quiz");

    // Set up event listener to kick off the quiz.
    startQuiz.addEventListener("click", function (event) {
        // Override default HTML form behavior 
        event.preventDefault();

        // Fetch array of questions
        var quizQuestions = supplyQuestions().quizQuestions;

        // For each question, build the question page
        for (let index = 0; index < quizQuestions.length; index++) {
            const currentQuestion = quizQuestions[index];
            // Build Question Page
            buildQuestionPage(index);
        }
    });

    console.log("Welcome page built");

    return;
}

/**
 * ! Populate Questions
 */

function buildQuestionPage(questionNumber) {
    // Get current question
    var currentQuestion = supplyQuestions(questionNumber);

    // Build HTML Here
    console.log("Question: " + currentQuestion.question());
    console.log("Choices: " + currentQuestion.possibleAnswers());
    console.log("Answer: " + currentQuestion.correctAnswer());
    console.log("Answer ID: " + currentQuestion.correctAnswerId());
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

buildWelcomePage();

