class Game {
    constructor () { 
        this.missed = 0;  
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    // Creates phrases for use in game
    createPhrases() {
        const phrases = [
            new Phrase('A Chip on Your Shoulder'),
            new Phrase('A Piece of Cake'),
            new Phrase('Back to Square One'),
            new Phrase('Barking Up The Wrong Tree'),
            new Phrase('Beating Around the Bush')
        ];
        return phrases;
    };

    // Selects random phrase from phrases property
    getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomNum];
    };

    // Begins game by selecting a random phrase and displaying it to a user
    startGame() {
        document.querySelectorAll('ul > li').forEach(el => el.remove());
        document.querySelectorAll('.key').forEach(el => {
            el.classList.remove('chosen', 'wrong');
            el.removeAttribute('disabled');
        });
        document.querySelectorAll('.tries > img').forEach(el => el.src = 'images/liveHeart.png');

        setTimeout(() => {
            document.querySelector('#overlay').style.display = 'none';
        }, 150);
   
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    // Checks for winning move
    checkForWin() {
        const lis = document.querySelectorAll('li.letter');
        let shown = 0;
        lis.forEach(el => el.classList.contains('show') ? shown++ : shown);
        return (shown === lis.length);
    };

    // Checks if player has remaining lives and ends game if player is out
    removeLife() {
        this.missed++;
        const lives = document.querySelectorAll('.tries > img');
        lives[this.missed - 1].src = 'images/lostHeart.png';
        if (this.missed === 5) {
            this.gameOver(false);
        }
    };

    // Displays game over message
    gameOver(gameWon) {
        const div = document.querySelector('#overlay');
        div.style.display = 'flex';
        div.classList.remove('start');
        const h1 = document.querySelector('#game-over-message');
        if (gameWon) {
            h1.textContent = 'You won! 😄';
            div.className = 'win';
        } else {
            h1.textContent = 'You lost 😪';
            div.className = 'lose';
        }
    };

    //Handles onscreen keyboard button clicks
    handleInteraction(button) {
        const selectedLetter = button.textContent;
        let onScreenLetter;
        document.querySelectorAll('.key').forEach(el => {
            if (el.textContent === selectedLetter) {
                onScreenLetter = el;
            }
        });
        onScreenLetter.setAttribute('disabled', true);
        if (this.activePhrase.checkLetter(selectedLetter)) {
            onScreenLetter.classList.add('chosen');
            this.activePhrase.showMatchedLetter(selectedLetter);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            onScreenLetter.classList.add('wrong');
            this.removeLife();
        };
    };
}