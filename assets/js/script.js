var questions = [
  {
    question: "what time?",
    choices: ["4pm", "5pm", "6pm", "7pm"],
    answer: 3,
  },
  {
    question: "what date?",
    choices: ["4pm", "5pm", "6pm", "7pm"],
    answer: 3,
  },
  {
    question: "what second?",
    choices: ["4pm", "5pm", "6pm", "7pm"],
    answer: 0,
  },
  {
    question: "what year?",
    choices: ["4pm", "5pm", "6pm", "7pm"],
    answer: 3,
  },
];

/**
 * Main Controller
 */
console.log("Question: " + questions[2].question);
console.log("Choices: " + questions[2].choices);
console.log("Answer ID: " + questions[2].answer);
console.log("Answer Value: " + questions[2].choices[questions[2].answer]);

/**
 * Populate initial screen
 */
