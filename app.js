const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['yassen', 'programming', 'wizard', 'interface', 'homsany'];
const selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word 
function displayWord() {
    wordEl.innerHTML = `
        ${
            selectedWord
            .split('')
            .map(letter => 
                `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`    
            ).join('')
    
        }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! you won :)';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters 
function updateWronglettersEl() {
    // Display Wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Display Parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'flex';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if(wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'You Lost :( !';
        popup.style.display = 'flex';
    }
}

// Show Notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(function() {
        notification.classList.remove('show');
    }, 2500);
}

// Pressing letters 
window.addEventListener('keydown', event => {
    if(event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = event.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWronglettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Restart Game and play again
playAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    const selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWronglettersEl();
    popup.style.display = 'none';
});

displayWord();