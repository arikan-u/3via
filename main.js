const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));

let currentQuestion = [];
let answerAccept = true;
let score = 0;
let liveQuestionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: "How many stages are there in start.ng?",
        option1: 11,
        option2: 5,
        option3: 6,
        option4: 10,
        answer: 4
    },

    {
        question: "How many tracks are there in start.ng?",
        option1: 1,
        option2: 2,
        option3: 3,
        option4: 4,
        answer: 4
    },
    
    {
        question: "What colour does yellow and blue make?",
        option1: "Pink",
        option2: "Green",
        option3: "Yellowish Blue",
        option4: "bluish Yellow",
        answer: 2
    },

    {
        question: "My name is?",
        option1: "Arican",
        option2: "Ari-san",
        option3: "Arikan",
        option4: "Aricun",
        answer: 3
    },

    {
        question: "What eye problem do i suffer from?",
        option1: "Myopia",
        option2: "Hypermyopia",
        option3: "Astigmatism",
        option4: "Colour Blindness",
        answer: 1
    },
    
    {
        question: "If wishes were horses beggars would?",
        option1: "slide",
        option2: "grind",
        option3: "side",
        option4: "ride",
        answer: 4
    },

    {
        question: "Which of these months ends on the 31st?",
        option1: "July",
        option2: "September",
        option3: "June",
        option4: "November",
        answer: 1.
    }
];

//constants

const correctAnswer = 10;
const maxQuestion = 5;

startGame = () => {
    liveQuestionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    newQuestion();
};


newQuestion = () => {

    if (availableQuestions.length === 0 || liveQuestionCounter >= maxQuestion){
        //end page

        return window.location.assign("/end.html");
    };

    liveQuestionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    options.forEach( option => {
        const number = option.dataset["number"];
        option.innerText = currentQuestion["option" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    answerAccept = true;
};

options.forEach(option => {
    option.addEventListener("click", e => {
        if(!answerAccept)return;

        answerAccept = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply)

       selectedOption.parentElement.classList.add(classToApply)
       selectedOption.parentElement.classList.remove(classToApply)
        
        newQuestion();
    });
});

startGame();