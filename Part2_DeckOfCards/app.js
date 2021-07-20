// Exercise 1

function getCardFromNewDeck() {
	const card = axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
	return card;
}

// getCardFromNewDeck()
// 	.then(res => console.log(prepareValueAndSuit(res.data.cards[0])))
// 	.catch(err => console.log('ERROR!', err));

function prepareValueAndSuit(cardObj) {
	return `${cardObj.value.toLowerCase()} of ${cardObj.suit.toLowerCase()}`;
}

// ----------------------------------------------
// Exercise 2

// let cards = [];
// getCardFromNewDeck()
// .then(res => {
// 	cards.push(res.data.cards[0]);
// 	return axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`);
// })
// .then(res => {
// 	cards.push(res.data.cards[0]);
// 	for (let card of cards) {
// 		console.log(prepareValueAndSuit(card));
// 	}
// })
// .catch(err => console.log('ERROR!', err));

// ----------------------------------------------
// Exercise 3

let deckId;
const drawButton = document.getElementById('drawButton');
const cardsContainer = document.getElementById('cardsContainer');

drawButton.addEventListener('click', drawAndDisplayNewCard);

function getNewDeck() {
	const deck = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	return deck;
}

function drawAndDisplayNewCard() {
	drawNewCard()
		.then(res => {
			if (res.data.remaining > 0) {
				console.log('remaining:', res.data.remaining);
				displayCard(res.data.cards[0]);
			}
			else {
				console.log('Deck is out cards.');
				drawButton.disabled = true;
			}
		})
		.catch(err => {
			console.log('ERROR!', err);
		});
}

function drawNewCard() {
	const res = axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
	return res;
}

function displayCard(card) {
	const cardImg = document.createElement('img');
	cardImg.src = card.image;
	cardsContainer.append(cardImg);
}

getNewDeck().then(res => {
	deckId = res.data.deck_id;
	console.log(deckId);
	drawButton.hidden = false;
});
