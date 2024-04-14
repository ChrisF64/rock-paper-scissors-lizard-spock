function game() {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
        'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'
    ];
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.computer-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');

    let currentScore = null;

    window.addEventListener('load', () => {

        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();

                startGame();
            })
        });

        resultElement.querySelector('button').addEventListener('click', tryAgain);

    })

    function startGame() {
        calculateWinner(userChoice, compChoice);
        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearResultBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);
    }

    function getUserChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }

    function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(user, comp) {
        if (user === comp) {
            resultTitleElement.innerText = 'Tie';
        } else if (getUserWinsStatus(user + comp)) {
            resultTitleElement.innerText = 'You win';
            calculateScore(1);
        } else {
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    }

    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);
    }

    function buildChoiceElement(isItUserElement, className) {
        const el = document.createElement('div');
        el.classList = [`game-card ${className}`];
        el.innerHTML = `<img src="assets/images/${className}.png" alt="${className}">`;
        if (isItUserElement) {
            userPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
    }

    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }

    function clearResultBeforeAppend() {
        userPickElement.innerHTML = '';
        pcPickElement.innerHTML = '';
    }

    function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }

    function retrieveScoreFromLocalStorage() {
        const score = +window.localStorage.getItem('gameScore') || 0;
        currentScore = score;
        updateScoreBoard();
    }

    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }
}
game()


//work with modal
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}