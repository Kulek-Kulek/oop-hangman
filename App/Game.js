class Game {
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
    }

    letterClicked(letter) {
        console.log(letter);
    }

    start() {
        for (let i = 10; i < 36; i++) {
            const btn = document.createElement('button');
            const letter = i.toString(36);
            btn.innerHTML = letter;
            btn.addEventListener('click', () => this.letterClicked(letter));
            this.lettersWrapper.appendChild(btn)
        }
    }
}

