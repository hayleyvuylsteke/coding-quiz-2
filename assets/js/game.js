/* Select items for targeting */

const question = document.querySelector('#question');
const choice = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector(".score-text")

/*End of select items */

let currentQuestions = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = {}

let questions = [
    {
        question: "What tag defines the body of the HTML document, and usually includes all the contents such as the text, hyperlinks, images, tables, lists, and more?",
        choice1: "<body></body>",
        choice2: "<title></title>",
        choice3: "<br></br>",
        choice4: "<head></head>",
        answer: 1,
    },
    {
        question: "What are the identifiers called that cannot be used as variables or function names in JavaScript?",
        choice1: "favourites",
        choice2: "concrete terms",
        choice3: "constants",
        choice4: "reserved words",
        answer: 4,
    },
    {
        question: "What is the most important CSS property, used for controlling the layout?",
        choice1: "Margin",
        choice2: "Display",
        choice3: "Table",
        choice4: "<div>",
        answer: 2,
    },
    {
        question: "In JavaScript, what is a block of code that is used to perform a specific task?",
        choice1: "String",
        choice2: "Function",
        choice3: "Variable",
        choice4: "Declaration",
        answer: 2,
    },
    {
        question: "What HTML tag is used to define an interactive field where users can enter data?",
        choice1: "<enterpoint>",
        choice2: "<datalist>",
        choice3: "<dialog>",
        choice4: "<input>",
        answer: 4,
    },
    {
        question: "What property is used to set the horizontal alignment of text or words on a page?",
        choice1: "Spacing",
        choice2: "Horizontal-align",
        choice3: "Text-align",
        choice4: "Placement",
        answer: 3,
    },
    {
        question: "What is the JavaScript element called that can continue to execute a block of code as long as the specified condition remains true",
        choice1: "Loop",
        choice2: "Clone",
        choice3: "Debugger",
        choice4: "Repeater",
        answer: 1,
    },
    {
        question: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
        choice1: "Arrays",
        choice2: "Variables",
        choice3: "Strings",
        choice4: "Function",
        answer: 3,
    },
    {
        question: "In HTML, what tag is used to underline a word or line of text?",
        choice1: "<ul>",
        choice2: "<ol>",
        choice3: "<li>",
        choice4: "<u>",
        answer: 4,
    },
    {
        question: "What is considered the most popular programming language in the world?",
        choice1: "Python",
        choice2: "Java",
        choice3: "JavaScript",
        choice4: "HTML",
        answer: 3,
    },
    {
        question: "What is the value called that defines colors such as the following: #FFFF00?",
        choice1: "Hex",
        choice2: "RGB",
        choice3: "Color",
        choice4: "Decimal",
        answer: 1,
    },
    {
        question: "What HTML element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
        choice1: "<title></title>",
        choice2: "<header></header>",
        choice3: "<body></body>",
        choice4: "<head></head>",
        answer: 4,
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 12

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion();
    setInterval(updateCountdown, 1000);
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestions = availableQuestions[questionsIndex]
    question.innerText = currentQuestions.question

    choice.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestions['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}


choice.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('in choice for each');
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        let classToApply =
            selectedAnswer == currentQuestions.answer ? 'correct' : 'incorrect';
        if (classToApply == 'correct') {
            incrementScore(SCORE_POINTS);
        } else {
            startTime = startTime -3;
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = "Score: " + score
}

startGame()

// timer
let startTime = 90;

const countdownE1 = document.querySelector(".quiz-timer");

function updateCountdown() {

    countdownE1.innerHTML = "Time Remaining: " + startTime

    startTime--;

    if (startTime === -1) {
    localStorage.setItem('mostRecentScore', score);
    localStorage.setItem('timeRanOut', 'yes');
    return window.location.assign("end.html");
    }   

}

