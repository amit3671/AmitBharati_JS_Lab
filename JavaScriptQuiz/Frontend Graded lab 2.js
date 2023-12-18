const questions = [
    {
        question: " Which is the scripting language?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "Java Script", correct: true },
            { text: "PHP", correct: false },
        ]
    },
    {
        question: " Which is not a primitive variable in JavaScript?",
        answers: [
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "number", correct: false },
            { text: "char", correct: true },
        ]
    },
    {
        question: " Which is the JavaScript framework for back-end development?",
        answers: [
            { text: "React", correct: false },
            { text: "Node", correct: true },
            { text: "Angular", correct: false },
            { text: "Spring", correct: false },
        ]
    },
    {
        question: " Which of the following methods is used to access HTML elements using Javascript?",
        answers: [
            { text: "getElementById", correct: false },
            { text: "getElementByClassName", correct: false },
            { text: "Both A and B", correct: true },
            { text: "None", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("buttons");
const nextButton = document.getElementById("next_btn");
const questionnumber = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionnumber.innerHTML = "Question " + questionNo + " of " + questions.length;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.style.background = " #01BBFF";
        button.style.width = "250px";
        button.style.fontSize = "20px";
        button.style.color = "#fff";
        button.style.border = "1px solid #1D3C6A";
        button.style.margin = "10px 40px 10px 0px";
        button.style.padding = "10px 10px";
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = "#01BBFF";
            button.style.cursor = "pointer" ;
          });
          button.addEventListener("click", () => {
            button.style.outline = "0";
            button.style.backgroundColor = "blue";
          });
          
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
         answerButton.removeChild(answerButton.firstChild);
    }
}

function selectanswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showscore();
    }
}


function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! \n`;
    answerButton.innerHTML = `${score*100 / questions.length}% marks obtained.`;
    answerButton.style.fontWeight = "400";
    answerButton.style.fontSize = "25px";
    answerButton.style.color = "#01BBFF";
    questionnumber.innerHTML = "Quiz Complete!"
}
startQuiz();