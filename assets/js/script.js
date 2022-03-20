/**
 * ! Populate initial HTML screen
 */

/* Ask question: Do you want to play? 
 True / False
*/

/**
 * ! Populate Questions
 */

function buildQuestionPage(questionNumber) {
    // Get current question
    var currentQuestion = supplyQuestion(questionNumber);

    // Build HTML Here
    console.log("Question: " + currentQuestion.question())
    console.log("Choices: " + currentQuestion.possibleAnswers());
    console.log("Answer: " + currentQuestion.correctAnswer());
    console.log("Answer ID: " + currentQuestion.correctAnswerId());
}

/**
 * ! Populate Questions
 */
function supplyQuestion(questionNumber) {
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
        }
    };
    return questions;
}

// Add an anonymous function to the questions object to display the answer and increment to the next question

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

var questions = supplyQuestion();

for (let index = 0; index < questions.quizQuestions.length; index++) {
    const currentQuestion = questions[index];
    // Build Question Page
    buildQuestionPage(index);
}
