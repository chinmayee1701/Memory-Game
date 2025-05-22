const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let canFlip = true;
let flippedCards = [];
let moves = 0;

function createGame() {
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.innerHTML = '';
    const gameEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    gameEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="front"></div>
                <div class="back">${emoji}</div>
            </div>
        `
        card.addEventListener('click', () => flipCard(card));
        gameGrid.appendChild(card);


    });
}

function flipCard(card) {

    if (!canFlip || card.classList.contains('flipped') || flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }




}


function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.back').textContent;
    const emoji2 = card2.querySelector('.back').textContent;

    if (emoji1 === emoji2) {

        flippedCards = [];
        canFlip = true;
        checkwin();
    }
    else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;

        }, 1000);
    }
}

function checkwin() {

    const allCards = document.querySelectorAll('.card');
    const allFlipped = [...allCards].every(card=>card.classList.contains('flipped'));

    if(allFlipped){
        setTimeout(() => {
        alert('congratulations! You won ${moves} moves')
    }, 500);
}
    }

function  restartGame() {
    flippedCards = [];
    moves = 0;
    document.getElementById('moves').textContent = moves;
    createGame();
}
  createGame();

















