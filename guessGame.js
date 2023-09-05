
const inputElement = document.querySelector('.js-input-number');
const resultElement = document.querySelector('.js-result');
const scoreElement = document.querySelector('.js-score');
const attemptElement = document.querySelector('.js-attempt')

let score = JSON.parse(localStorage.getItem('score')) || { 
    correct: 0,
    incorrect: 0
}
updateScoreElement();

function resetRandomNumber() {
    randomNumber = getRandomNumber(1, 10); 
}

function getRandomNumber(min, max){ 
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function handleKeyUp (event) { 
    if (event.key === 'Enter'){
        getResult();
    }
}

function resetAttempts(){
    remainingAttempts = 3;
    attemptElement.innerHTML = `Attempts remaining: ${remainingAttempts}`;
}

let remainingAttempts = 3;
let randomNumber = getRandomNumber(1, 10);

function getResult(){ 
        console.log(randomNumber)
        const guess = Number(inputElement.value);
        if (guess === randomNumber){
            console.log('correct');
            resultElement.innerHTML = 'Correct';
            score.correct += 1;
            resetAttempts();
            resetRandomNumber();
        } else {
            console.log('incorrect');
            resultElement.innerHTML = 'Incorrect';
            remainingAttempts -= 1;
            attemptElement.innerHTML = `Attempts remaining: ${remainingAttempts}`;
            if (remainingAttempts === 0) {
                resultElement.innerHTML = `No more attempts left. Try Again. The number was ${randomNumber}.`;
                resetRandomNumber(); 
                score.incorrect++ 
                resetAttempts();
            }
        }
    
    
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    inputElement.value = ''
}


function updateScoreElement () {
scoreElement.innerHTML = `Correct: ${score.correct} Incorrect: ${score.incorrect}`
};
