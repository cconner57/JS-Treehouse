class Phrase {
    constructor (phrase) { 
      this.phrase = phrase.toLowerCase();  
    }

    // Displays phrase on game board
    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase > ul');
        let li;
        for (let i = 0; i < this.phrase.length; i++){
            li = document.createElement('li')
            li.textContent = this.phrase[i];
            if (li.textContent === ' ') {
                li.className = 'space';
            } else {
                li.classList.add('hide', 'letter', `${li.textContent}`);
            };
            ul.appendChild(li);
        }
        document.getElementsByClassName('space')[2].classList.add('break');
    };

    // Checks if passed letter is in phrase
    checkLetter(letter) {
        return this.phrase.includes(letter);
    };

    // Displays passed letter on screen after a match is found
    showMatchedLetter(letter) {
        document.querySelectorAll(`.${letter}`).forEach(el => {
            el.classList.remove('hide');
            el.classList.add('show');
        });
    };
}