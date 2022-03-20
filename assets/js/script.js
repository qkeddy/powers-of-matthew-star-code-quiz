/**
 * ! Main Controller
 */

// Loop over available questions
var questions = supplyQuestions();


for (let index = 0; index < questions.length; index++) {
    const currentQuestion = questions[index];
    console.log("Question: " + currentQuestion.question);
    console.log("Choices: " + currentQuestion.choices);
    console.log("Answer Value: " + currentQuestion.choices[currentQuestion.answer]);
}


/**
 * ! Populate initial HTML screen
 */

/* Ask question: Do you want to play? 
 True / False
*/

/**
 * ! Populate Questions
 */
function supplyQuestions() {
    var questions = [
        {
            question: "what time?",
            choices: ["4pm", "5pm", "6pm", "7pm"],
            answer: 3,
        },
        {
            question: "what date?",
            choices: ["10", "11", "12", "13"],
            answer: 3,
        },
        {
            question: "what second?",
            choices: ["1", "2", "3", "4"],
            answer: 0,
        },
        {
            question: "what year?",
            choices: ["1999", "2009", "2019", "2029"],
            answer: 3,
        },
    ];
    return questions;
}

/* TEST CODE  ---  Why does this not work?  
*/
// var currentAnswer = supplyQuestion(1).correctAnswer;
// console.log(supplyQuestion(1).correctAnswer);
// var currentQuestion = supplyQuestion(1).returnCurrentQuestion;
// console.log(currentQuestion);


/**
 * ! Populate QuestionsII
 */
// function supplyQuestion(questionNumber) {
//     const questions = {
//         quizQuestions: [
//             {
//                 question: "what time?",
//                 choices: ["4pm", "5pm", "6pm", "7pm"],
//                 answer: 3,
//             },
//             {
//                 question: "what date?",
//                 choices: ["4pm", "5pm", "6pm", "7pm"],
//                 answer: 3,
//             },
//             {
//                 question: "what second?",
//                 choices: ["4pm", "5pm", "6pm", "7pm"],
//                 answer: 0,
//             },
//             {
//                 question: "what year?",
//                 choices: ["4pm", "5pm", "6pm", "7pm"],
//                 answer: 3,
//             },
//         ],
//         Question: function () {
//             return this.quizQuestions[questionNumber].question;
//         },
//         possibleAnswers: function () {
//             return this.quizQuestions[questionNumber].choices;
//         },
//         correctAnswerId: function () {
//             return this.quizQuestions[questionNumber].answer;
//         },
//         correctAnswer: function () {
//             return this.quizQuestions[questionNumber].choices[
//                 this.quizQuestions[questionNumber].answer
//             ];
//         },
//         returnCurrentQuestion: function () {
//             const currentQuestion = {
//                 question: this.quizQuestions[questionNumber].question,
//                 choices: this.quizQuestions[questionNumber].choices,
//                 answer: this.quizQuestions[questionNumber].choices[this.quizQuestions[questionNumber].answer],
//             };
//             console.log(currentQuestion.answer);
//             return currentQuestion;
//         },
//     };
//     return questions;
// }

// Add an anonymous function to the questions object to display the answer and increment to the next question

/**
 * ! Timer Logic
 */

/**
 * ! High score logic
 */
// Refresh HTML to display high scores
