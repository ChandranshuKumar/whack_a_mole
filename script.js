const TOTAL_CARDS = 12;
const startButton = document.querySelector('.button');
const scoreElem = document.querySelector('.score').querySelector('span');

let interval;
let score = 0;

/** @param {NodeListOf<Element>} molesElems */
const resetMoles = (molesElems) => {
    const moles = molesElems ?? document.querySelectorAll('.mole');
    moles.forEach(mole => {
        mole.classList.remove('active');
    });
    
};

/** @param {ReturnType<typeof setInterval>} interval */
const clearOutIntervals = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

const startGame = () => {
    clearOutIntervals();
    const moles = document.querySelectorAll('.mole');
    interval = setInterval(() => {
        resetMoles(moles);
        const randomMolePosition = Math.floor(Math.random() * TOTAL_CARDS);
        moles[randomMolePosition].classList.add('active');
    }, 900);
};

startButton.addEventListener('click', e => {
    if (interval) {
        startButton.classList.remove('stop');
        startButton.innerText = "Start Game";
        score = 0;
        scoreElem.innerText = score;
        resetMoles();
        clearOutIntervals();
    } else {
        startGame();
        startButton.classList.add('stop');
        startButton.innerText = "Stop Game";
    }

});

const contructDirtAndMoles = (totalCards) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const dirt = document.createElement('img');
    dirt.classList.add('dirt');
    dirt.classList.add('dirt');
    dirt.src = "./dirt.webp";

    const mole = document.createElement('img');
    mole.classList.add('mole');
    mole.src = "./mole.png";

    card.appendChild(dirt);
    card.appendChild(mole);

    let cummulativeHTML = "";
    for (let i = 0; i < totalCards; i++) {
        cummulativeHTML += card.outerHTML;
    }

    const parentWrapper = document.querySelector('.game');
    parentWrapper.innerHTML = cummulativeHTML;
}

contructDirtAndMoles(TOTAL_CARDS);

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        /** @type {Element} */
        const target = e.target;
        if (target.classList.contains('mole')) {
            score++;
            scoreElem.innerHTML = score;
            target.classList.remove('active')
            startGame();
        }
    });
});
