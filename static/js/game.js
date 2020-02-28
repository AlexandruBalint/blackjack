let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box','score': 0, 'currentCards': []},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0, 'currentCards': []},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'whoWon' : {'player1': 'YOU WON', 'player2': 'DEALER WON', 'tie': 'DRAW'},
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/deal.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

// GENERATE A RANDOM CARD
function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

// SHOW THE CARD IN THE CURRENT PLAYER DIV
function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

// DEALER LOGIC HERE

function dealerLogic(){
    let card = randomCard();

    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    blackjackGame['dealer']['currentCards'].push(card);
    console.log(blackjackGame['dealer']['currentCards']);

    if (DEALER['score'] < YOU['score'] && YOU['score'] <= 21){
        dealerLogic();
    } else {
        computeWinner();
    }
}

//PLAYER LOGIC HERE

function blackjackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    blackjackGame['you']['currentCards'].push(card);
    console.log(blackjackGame['you']['currentCards']);
    showScore(YOU);
}

//UPDATE THE CURRENT SCORE BASED ON THE DREW CARD

function updateScore(card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
            activePlayer['hasA'] = true;
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        for (var i=0; i < activePlayer['currentCards'].length; i++){
            if (activePlayer['currentCards'][i] == 'A' && activePlayer['score'] + blackjackGame['cardsMap'][card] > 21){
                activePlayer['score'] = activePlayer['score'] - 10;
            } else {

            }
        } 
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

//SHOW THE SCORE

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

//CALCULATE AND SEE WHO IS THE WINNER

function computeWinner(){
    let winner;
    let currentWins = document.querySelector('#wins').innerHTML;
    let currentLosses = document.querySelector('#losses').innerHTML;
    let currentDrews = document.querySelector('#Draws').innerHTML;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] >21)){
            winner = blackjackGame['whoWon'].player1;
            currentWins++;
            document.querySelector('#wins').innerHTML = currentWins;
        } else if (YOU['score'] < DEALER['score'] && DEALER['score'] < 21) {
            winner = blackjackGame['whoWon'].player2;
            currentLosses++;
            document.querySelector('#losses').innerHTML = currentLosses;
        } else if (YOU['score'] === DEALER['score']){
            winner = blackjackGame['whoWon'].tie;
            currentDrews++;
            document.querySelector('#Draws').innerHTML = currentDrews;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = blackjackGame['whoWon'].player2;
        currentLosses++;
        document.querySelector('#losses').innerHTML = currentLosses;
    } else if (YOU['score'] > 21 && DEALER['score'] >21) {
        winner = blackjackGame['whoWon'].tie;
        currentDrews++;
        document.querySelector('#Draws').innerHTML = currentDrews;
    }
    console.log(winner);
    document.querySelector('#blackjack-result').textContent = winner;
    return winner;
}

//START A NEW GAME

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    for (i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector(['#your-blackjack-result']).style.color = 'white';
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector(['#dealer-blackjack-result']).style.color = 'white';
    blackjackGame['you']['currentCards'] = [];
    blackjackGame['dealer']['currentCards'] = [];
    blackjackHit();
}