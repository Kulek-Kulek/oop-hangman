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
    }

    drawLetters() {
        for (let i = 10; i < 36; i++) {
            const btn = document.createElement('button');
            const letter = i.toString(36);
            btn.textContent = letter;
            btn.addEventListener('click', (e) => this.letterClicked(letter, e));
            this.lettersWrapper.appendChild(btn);
        }
    }

    drawQuote() {
        const slogan = this.quote.getContent();
        this.wordWrapper.textContent = slogan;
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