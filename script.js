const urlParams = new URLSearchParams(window.location.search);
const maxTarget = parseInt(urlParams.get('max')) || 10;

let targetNumber = maxTarget;
let leftNumber = 0;
let successCount = 0;
let roundsBeforeChange = 3;
let usedLeftNumbers = new Set();

function calculateRoundsBeforeChange(value) {
    return Math.max(Math.min(value - 3, 4), 1);
}

function getNewLeftNumber() {
    let possibleNumber;
    do {
        possibleNumber = Math.floor(Math.random() * targetNumber);
    } while (usedLeftNumbers.has(possibleNumber));
    return possibleNumber;
}

function generateQuestion() {
    if (successCount === 0) {
        targetNumber = Math.floor(Math.random() * maxTarget) + 1;
        roundsBeforeChange = calculateRoundsBeforeChange(targetNumber);
        document.getElementById('number').textContent = targetNumber;
        usedLeftNumbers.clear();
    }
    
    leftNumber = getNewLeftNumber();
    usedLeftNumbers.add(leftNumber);
    
    document.getElementById('leftBox').value = leftNumber;
    document.getElementById('rightBox').value = '';
    document.getElementById('rightBox').focus();
}

document.getElementById('rightBox').addEventListener('input', function(e) {
    const rightNumber = parseInt(e.target.value);
    const total = leftNumber + rightNumber;

    if (total === targetNumber) {
        document.querySelector('.flashcard').classList.add('correct');
        setTimeout(() => {
            document.querySelector('.flashcard').classList.remove('correct');
            successCount = (successCount + 1) % roundsBeforeChange;
            generateQuestion();
        }, 1000);
    } else if (total > targetNumber) {
        const inputArea = document.querySelector('.input-area');
        inputArea.classList.add('shake');
        setTimeout(() => {
            inputArea.classList.remove('shake');
            e.target.value = '';
        }, 500);
    }
});

generateQuestion();
