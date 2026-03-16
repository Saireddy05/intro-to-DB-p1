const quiz = [
    {q:"What is Data?",a:["Random text","Information stored processed and retrieved by a system","Only numbers","Only images"],c:1},
    {q:"What does a system do with data?",a:["Store only","Process only","Store process and retrieve","Delete"],c:2},
    {q:"What is a Database?",a:["Programming language","Organized collection of data","Computer hardware","Operating system"],c:1},
    {q:"Why do we use databases?",a:["To manage data easily","To watch movies","To draw pictures","To play games"],c:0},
    {q:"What is DBMS?",a:["Database Machine System","Database Management System","Data Binary Model","Digital Backup System"],c:1},
    {q:"Which is an advantage of DBMS?",a:["Security","Backup","Easy data access","All of the above"],c:3},
    {q:"Which database type is most commonly used?",a:["Graph","Relational","Document","Key-value"],c:1},
    {q:"Database helps to?",a:["Store data","Manage data","Access data","All of these"],c:3},
    {q:"Data can exist in?",a:["Different formats","Only text","Only numbers","Only images"],c:0},
    {q:"DBMS improves?",a:["Data organization","Security","Retrieval","All"],c:3}
];

let shuffled = [];
let index = 0;
let score = 0;

// Element Selectors
const startCard = document.getElementById("start-card");
const quizCard = document.getElementById("quiz-card");
const resultCard = document.getElementById("result-card");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next");
const retryBtn = document.getElementById("retry");
const questionText = document.getElementById("question");
const answerGrid = document.getElementById("answers");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const finalScore = document.getElementById("final-score");
const totalQuestionsText = document.getElementById("total-questions");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const resultIcon = document.getElementById("result-icon");

function showCard(card) {
    [startCard, quizCard, resultCard].forEach(c => c.classList.remove("active"));
    card.classList.add("active");
}

function startQuiz() {
    shuffled = quiz.sort(() => Math.random() - 0.5);
    index = 0;
    score = 0;
    showCard(quizCard);
    loadQuestion();
}

function loadQuestion() {
    answerGrid.innerHTML = "";
    nextBtn.style.display = "none";
    
    let currentQ = shuffled[index];
    questionText.innerText = currentQ.q;
    
    // Update Progress
    const progress = ((index + 1) / shuffled.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Question ${index + 1} / ${shuffled.length}`;

    currentQ.a.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.className = "answer-btn";
        btn.onclick = () => selectAnswer(i, currentQ.c, btn);
        answerGrid.appendChild(btn);
    });
}

function selectAnswer(selectedIdx, correctIdx, btn) {
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(b => b.disabled = true);

    if (selectedIdx === correctIdx) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        buttons[correctIdx].classList.add("correct");
    }

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    index++;
    if (index < shuffled.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
};

function finishQuiz() {
    showCard(resultCard);
    finalScore.innerText = score;
    totalQuestionsText.innerText = `/ ${shuffled.length}`;

    if (score === shuffled.length) {
        resultTitle.innerText = "Mastery Achieved!";
        resultIcon.innerText = "🏆";
        resultText.innerText = "Exceptional work! You've demonstrated complete mastery of database fundamentals.";
    } else if (score > shuffled.length / 2) {
        resultTitle.innerText = "Great Effort!";
        resultIcon.innerText = "✨";
        resultText.innerText = "You're getting there! A bit more practice and you'll be a database expert.";
    } else {
        resultTitle.innerText = "Practice Makes Perfect";
        resultIcon.innerText = "📚";
        resultText.innerText = "Database concepts can be tricky. Review the fundamentals and try again!";
    }
}

startBtn.onclick = startQuiz;
retryBtn.onclick = () => location.reload();