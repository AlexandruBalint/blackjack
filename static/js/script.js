function ageInDays(){
var birthYear = prompt('What year were you born?');
var ageInDayss = (2020 - birthYear) * 365;
var h1 = document.createElement('h1');
var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
h1.setAttribute('id', 'ageInDays');
h1.appendChild(textAnswer);
document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}
// Blackjack challange

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box','score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/deal.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
    
function blackjackDeal() {
    computeWinner();
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
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][0];
                }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic(){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
}

function computeWinner(){
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER || (DEALER['score'] >21)){
            console.log('You WON!');
            winner = YOU;
        } else if (YOU['score'] < DEALER['score'] <= 21) {
            console.log('You LOST!');
            winner = DEALER
        } else if (YOU['score'] === DEALER['score']){
            console.log('You DREW');
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('You LOST!');
        winner = DEALER
    } else if (YOU['score'] > 21 && DEALER['score'] >21) {
        console.log('You DREW');
    }
    console.log(winner);
    return winner;
}