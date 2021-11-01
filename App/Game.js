import { Quote } from './Quote.js';

class Game {
    currentStep = 0;
    lastStep = [...document.querySelectorAll('.step')].length;
    halloweenMode = false;

    quotes = [
        {
            text: 'pan tadeusz',
            category: 'utwór literacki'
        },
        {
            text: 'ogniem i mieciem',
            category: 'utwór literacki'
        },
        {
            text: 'jak trwoga to do boga',
            category: 'cytaty'
        },
        {
            text: 'kto rano wstaje ten jest niewyspany',
            category: 'cytaty'
        },
        {
            text: 'czterej pancerni i pies',
            category: 'tytuły filmów'
        },
    ];

    gallowsImgs = [{
        img: "1.jpg"
    }, {
        img: "2.jpg"
    }, {
        img: "3.jpg"
    }, {
        img: "4.jpg"
    }, {
        img: "5.jpg"
    }, {
        img: "6.jpg"
    }, {
        img: "7.jpg"
    }, {
        img: "8.jpg"
    }
    ]

    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper,
        gameOverWrapper,
        sounds
    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;
        this.gameOverWrapper = gameOverWrapper;
        this.sounds = sounds;

        const quoteIndex = Math.floor(Math.random() * this.quotes.length);
        const { text, category } = this.quotes[quoteIndex];
        this.quote = new Quote(text);
        this.categoryWrapper.textContent = category;
        this.currentSlogan = text;
    }

    letterClicked(letter, e) {
        if (this.quote.guess(letter)) {
            this.drawQuote();
            this.halloweenMode && this.sounds[2].play();
            document.querySelector('.letters__button-' + letter).style.color = 'chartreuse';
        } else {
            this.currentStep++;
            [...document.querySelectorAll('.step')][this.currentStep].style.opacity = 1;
            document.querySelector('.halloween__img').src = 'images/' + this.gallowsImgs[this.currentStep].img;
            this.halloweenMode && this.sounds[1].play();
            document.querySelector('.letters__button-' + letter).style.color = 'red';
        }
        e.target.disabled = true;

        if (this.currentStep === this.lastStep - 1) {
            this.losing();
            this.playAgain();
        }
    }

    drawLetters() {
        for (let i = 10; i < 36; i++) {
            const btn = document.createElement('button');
            btn.classList.add('letters__button', 'letters__button-' + i.toString(36));
            const letter = i.toString(36);
            btn.textContent = letter;
            btn.addEventListener('click', (e) => this.letterClicked(letter, e));
            this.lettersWrapper.appendChild(btn);
        }
    }

    drawQuote() {
        const slogan = this.quote.getContent();
        this.wordWrapper.textContent = slogan;
        if (!slogan.includes('_')) {
            this.winning();
            this.playAgain();
        }
    }

    winning() {
        this.gameOverWrapper.textContent = "CONGRATS. You've won!!!";
        this.gameOverWrapper.style.color = 'chartreuse';
        this.halloweenMode && this.sounds[3].play();
        this.disableButtons();
    }

    losing() {
        this.gameOverWrapper.textContent = "Cheer up. More luck next time!";
        this.wordWrapper.textContent = this.currentSlogan;
        this.halloweenMode && this.sounds[0].play();
        this.disableButtons();
    }

    disableButtons() {
        const letterButtons = [...document.querySelectorAll('.letters__button')];
        letterButtons.forEach(button => {
            button.disabled = true;
            button.style.cursor = 'auto';
        });
    }

    playAgain() {
        document.querySelector('.reload').classList.add('reload--active');
        const playAgainBtn = document.querySelector('.reload__btn');
        playAgainBtn.addEventListener('click', () => location.reload());
        const buttons = [...document.querySelectorAll('letters__button')];
        buttons.forEach(btn => btn.style.cursor = 'auto');
    }


    toggleMode() {
        const modeBtn = document.querySelector('.mode__btn');
        const bgd = document.querySelector('.simple-mode');

        const modeDiv = document.querySelector('.mode');
        const modeImgWrappers = [...document.querySelectorAll('.step')];
        const word = document.querySelector('.word');
        const lettersWrapper = document.querySelector('.letters');
        const panelDiv = document.querySelector('.mode__game');
        const outputDiv = document.querySelector('.output');

        const halloweenImgWrapper = document.querySelector('.step__halloween');
        const halloweenImg = document.querySelector('.halloween__img');
        const catIcon = document.querySelector('.reload__cat');

        modeBtn.addEventListener('click', () => {
            this.halloweenMode = !this.halloweenMode;
            bgd.classList.toggle('halloween-mode');
            modeBtn.textContent === 'Halloween Mode' ? modeBtn.textContent = 'Simple Mode' : modeBtn.textContent = 'Halloween Mode';
            modeBtn.classList.toggle('mode__btn--simple');

            modeDiv.classList.toggle('mode--halloween');
            modeImgWrappers.forEach(div => div.classList.toggle('hide-show'));
            word.classList.toggle('word--halloween');
            lettersWrapper.classList.toggle('letters-halloween');
            panelDiv.classList.toggle('mode__game--halloween');
            outputDiv.classList.toggle('output--halloween');
            halloweenImgWrapper.classList.toggle('step__halloween--active');
            halloweenImg.src = 'images/' + this.gallowsImgs[this.currentStep].img;
            catIcon.classList.toggle('reload__cat-halloween');
        });
    }

    start() {
        this.drawLetters();
        this.drawQuote();
        document.querySelector('.step').style.opacity = 1;
        this.toggleMode();
    }
}

const wrappers = {
    lettersWrapper: document.querySelector('#letters'),
    categoryWrapper: document.querySelector('#category'),
    wordWrapper: document.querySelector('#word'),
    outputWrapper: document.querySelector('#output'),
    gameOverWrapper: document.querySelector('#game-over'),
    sounds: [...document.querySelectorAll('.audio')]
}
const game = new Game(wrappers);
game.start();