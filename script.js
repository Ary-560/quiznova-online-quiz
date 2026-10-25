const quizData = {
  "Computer Science": [
    { question: "Which component is often called the brain of a computer?", options: ["Monitor", "CPU", "Keyboard", "Printer"], answer: 1, explanation: "The CPU executes instructions and processes data." },
    { question: "Which of these is an example of an operating system?", options: ["Windows", "HTML", "Google Search", "Python"], answer: 0, explanation: "Windows is an operating system that manages computer hardware and software." },
    { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Run Active Machine", "Remote Application Module"], answer: 1, explanation: "RAM stands for Random Access Memory and temporarily stores data in use." },
    { question: "Which device is primarily used to enter text into a computer?", options: ["Speaker", "Monitor", "Keyboard", "Projector"], answer: 2, explanation: "A keyboard is an input device commonly used to enter text." },
    { question: "Which number system uses only 0 and 1?", options: ["Decimal", "Octal", "Hexadecimal", "Binary"], answer: 3, explanation: "The binary number system uses the digits 0 and 1." }
  ],
  "Programming": [
    { question: "Which HTML tag is used for the largest standard heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2, explanation: "The h1 element represents the highest-level heading." },
    { question: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?", options: ["let", "const", "static", "define"], answer: 0, explanation: "let declares a block-scoped variable that may be reassigned." },
    { question: "Which CSS property changes the text colour?", options: ["font-style", "text-size", "background", "color"], answer: 3, explanation: "The color property sets the foreground colour of text." },
    { question: "What does a loop help a program do?", options: ["Repeat instructions", "Delete the operating system", "Always stop execution", "Turn code into hardware"], answer: 0, explanation: "Loops repeat a block of instructions while a condition or iteration rule applies." },
    { question: "Which data type represents true or false values in JavaScript?", options: ["String", "Boolean", "Array", "Number"], answer: 1, explanation: "Boolean values are true and false." }
  ],
  "General Knowledge": [
    { question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Pune", "Jaipur"], answer: 1, explanation: "New Delhi is the capital of India." },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Mercury"], answer: 2, explanation: "Mars appears reddish partly because of iron oxide on its surface." },
    { question: "How many days are there in a standard non-leap year?", options: ["364", "365", "366", "360"], answer: 1, explanation: "A standard year has 365 days." },
    { question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3, explanation: "The Pacific Ocean is the largest ocean on Earth." },
    { question: "Which gas do plants absorb from the atmosphere during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1, explanation: "Plants use carbon dioxide, water, and light energy during photosynthesis." }
  ]
};

const screens = {
  home: document.getElementById("home-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen")
};
const categoryCards = [...document.querySelectorAll(".category-card")];
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const questionCount = document.getElementById("question-count");
const answeredCount = document.getElementById("answered-count");
const progressFill = document.getElementById("progress-fill");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

let currentSubject = "Computer Science";
let questions = [];
let currentIndex = 0;
let userAnswers = [];

categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    currentSubject = card.dataset.subject;
    categoryCards.forEach(item => item.classList.toggle("selected-category", item === card));
  });
});

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  questions = quizData[currentSubject];
  currentIndex = 0;
  userAnswers = Array(questions.length).fill(null);
  document.getElementById("subject-badge").textContent = currentSubject;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentIndex];
  questionText.textContent = question.question;
  questionCount.textContent = `QUESTION ${String(currentIndex + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  answeredCount.textContent = `${userAnswers.filter(answer => answer !== null).length} answered`;
  progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  optionsList.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option${userAnswers[currentIndex] === index ? " selected" : ""}`;
    button.setAttribute("aria-pressed", userAnswers[currentIndex] === index ? "true" : "false");
    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = option;
    button.append(letter, label);
    button.addEventListener("click", () => {
      userAnswers[currentIndex] = index;
      renderQuestion();
    });
    optionsList.appendChild(button);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.classList.toggle("hidden", currentIndex === questions.length - 1);
  submitBtn.classList.toggle("hidden", currentIndex !== questions.length - 1);
}

function submitQuiz() {
  const unanswered = userAnswers.filter(answer => answer === null).length;
  if (unanswered > 0 && !window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;

  const correct = questions.reduce((total, question, index) => total + (userAnswers[index] === question.answer ? 1 : 0), 0);
  const wrong = questions.length - correct;
  const percentage = Math.round((correct / questions.length) * 100);

  document.getElementById("score-value").textContent = `${correct}/${questions.length}`;
  document.getElementById("correct-value").textContent = correct;
  document.getElementById("wrong-value").textContent = wrong;
  document.getElementById("percent-value").textContent = `${percentage}%`;
  document.getElementById("result-heading").textContent = percentage >= 80 ? "Look at you go!" : percentage >= 50 ? "Nice work, keep going!" : "Every try makes you better!";
  document.getElementById("result-message").textContent = `You completed the ${currentSubject} quiz. Review the answers to learn something new.`;
  document.getElementById("result-icon").textContent = percentage >= 80 ? "🏆" : percentage >= 50 ? "🌟" : "📚";

  try {
    const history = JSON.parse(localStorage.getItem("quizNovaScores") || "[]");
    history.push({ subject: currentSubject, score: correct, total: questions.length, percentage, date: new Date().toISOString() });
    localStorage.setItem("quizNovaScores", JSON.stringify(history.slice(-20)));
  } catch (error) {
    console.warn("This browser did not allow saving score history.", error);
  }

  buildReview();
  document.getElementById("review-panel").classList.add("hidden");
  document.getElementById("review-btn").textContent = "🔎 Review answers";
  showScreen("result");
}

function buildReview() {
  const reviewList = document.getElementById("review-list");
  reviewList.innerHTML = "";
  questions.forEach((question, index) => {
    const item = document.createElement("article");
    item.className = "review-item";
    const title = document.createElement("h3");
    title.textContent = `${String(index + 1).padStart(2, "0")}. ${question.question}`;
    const yourAnswer = document.createElement("p");
    const selected = userAnswers[index];
    yourAnswer.className = selected === question.answer ? "right" : "wrong";
    yourAnswer.textContent = `Your answer: ${selected === null ? "Not answered" : question.options[selected]}`;
    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Correct answer: ${question.options[question.answer]}`;
    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    item.append(title, yourAnswer, correctAnswer, explanation);
    reviewList.appendChild(item);
  });
}

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("exit-btn").addEventListener("click", () => {
  if (window.confirm("Exit this quiz? Your current answers will not be submitted.")) showScreen("home");
});
prevBtn.addEventListener("click", () => { if (currentIndex > 0) { currentIndex--; renderQuestion(); } });
nextBtn.addEventListener("click", () => { if (currentIndex < questions.length - 1) { currentIndex++; renderQuestion(); } });
submitBtn.addEventListener("click", submitQuiz);
document.getElementById("retry-btn").addEventListener("click", () => showScreen("home"));
document.getElementById("review-btn").addEventListener("click", () => {
  const panel = document.getElementById("review-panel");
  const isHidden = panel.classList.toggle("hidden");
  document.getElementById("review-btn").innerHTML = isHidden ? "🔎 Review answers" : "Hide review";
  if (!isHidden) panel.scrollIntoView({ behavior: "smooth", block: "start" });
});
