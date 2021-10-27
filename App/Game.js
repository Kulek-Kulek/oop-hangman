import { Quote } from './Quote.js';

class Game {
    currentStep = 0;
    lastStep = [...document.querySelectorAll('.step')].length;


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

    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper
    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const quoteIndex = Math.floor(Math.random() * this.quotes.length);
        const { text, category } = this.quotes[quoteIndex];
        this.quote = new Quote(text);
        this.categoryWrapper.textContent = category;

    }

    letterClicked(letter, e) {
        if (this.quote.guess(letter)) {
            this.drawQuote();
        } else {
            this.currentStep++;
            [...document.querySelectorAll('.step')][this.currentStep].style.opacity = 1;
        }
        e.target.disabled = true;

        if (this.currentStep === this.lastStep - 1) {
            this.losing();
            this.disableButtons();
            this.playAgain();
        }
    }

    drawLetters() {
        for (let i = 10; i < 36; i++) {
            const btn = document.createElement('button');
            btn.classList.add('letters__button');
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
            this.disableButtons();
            this.playAgain();
        }
    }

    winning() {
        this.wordWrapper.textContent = "CONGRATS. You've won!!!";
    }

    losing() {
        this.wordWrapper.textContent = "Cheer up. More luck next time!";
    }

    disableButtons() {
        const letterButtons = [...document.querySelectorAll('.letters__button')];
        letterButtons.forEach(button => button.disabled = true);
    }

    playAgain() {
        document.querySelector('.reload').classList.add('reload--active');
        const playAgainBtn = document.querySelector('.reload__btn');
        playAgainBtn.addEventListener('click', () => location.reload());
        const buttons = [...document.querySelectorAll('letters__button')];
        buttons.forEach(btn => btn.style.cursor = 'auto');
    }

    start() {
        this.drawLetters();
        this.drawQuote();
        document.querySelector('.step').style.opacity = 1;
    }
}

const wrappers = {
    lettersWrapper: document.querySelector('#letters'),
    categoryWrapper: document.querySelector('#category'),
    wordWrapper: document.querySelector('#word'),
    outputWrapper: document.querySelector('#output'),
}
const game = new Game(wrappers);
game.start();