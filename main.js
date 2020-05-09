const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterUpdate = document.getElementById('questionCounterUpdate');
const scoreUpdate = document.getElementById('scoreUpdate')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


questions = [
    {
        question: "How many stages are there in start.ng?",
        choice1: '11',
        choice2: '5',
        choice3: '6',
        choice4: '10',
        answer: 4
    },

    {
        question: "How many tracks are there in start.ng?",
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 4
    },
    
    {
        question: "What colour does yellow and blue make?",
        choice1: "Pink",
        choice2: "Green",
        choice3: "Yellowish Blue",
        choice4: "bluish Yellow",
        answer: 2
    },

    {
        question: "My name is?",
        choice1: "Arican",
        choice2: "Ari-san",
        choice3: "Arikan",
        choice4: "Aricun",
        answer: 3
    },

    {
        question: "What eye problem do I suffer from?",
        choice1: "Myopia",
        choice2: "Hypermyopia",
        choice3: "Astigmatism",
        choice4: "Colour Blindness",
        answer: 1
    },
    
    {
        question: "If wishes were horses beggars would?",
        choice1: "slide",
        choice2: "grind",
        choice3: "side",
        choice4: "ride",
        answer: 4
    },

    {
        question: "Which of these months ends on the 31st?",
        choice1: "July",
        choice2: "September",
        choice3: "June",
        choice4: "November",
        answer: 1
    }
];


//SCORING
const maxQuestions = 5;
const corrBonus = 10;

gameStart = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    newQuestion();
};


newQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('yourScore', score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;

    questionCounterUpdate.innerText = questionCounter + '/' + maxQuestions;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];

    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';


        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1000);
        
        if (classToApply === 'correct') {
            addScore(corrBonus);
        }

        const nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', newQuestion, true);
    });
   
    addScore = num => {
        score += num
        scoreUpdate.innerText = score;

    };
    
});

gameStart();