//  Memory game
//   - create cards
//   - draw cards
//   - play - select 2 cards
//   - flip card
//   - compare
//   - match - points + cards stay
//   - no mach - cards flip back
//   - play again
//   - finish

//   - press play
//   - shuffle cards
var cards = [];
var card = {};
var colours = ['red', 'red', 'blue', 'blue', 'pink', 'pink', 'green', 'green', 'black', 'black'	 ];
var gameSize = 10;
var selectedCards = 0;
var match = [];

window.onload = init;

function init() {

	for (var i = 0; i < gameSize; i++) {	
		// create card element
		var li = document.createElement('li');
		li.setAttribute('id', 'id' + i);
		li.classList.add('cards');
		li.innerHTML = '<div class="front" onclick="selectCard(' + i + ')"></div><div class="back"></div>';
		
		// save card object
		var card = {
    	colour: colours[i],
    	flipped: 0,
    	element: li,
		};

		cards.push(card);

		// add cards on board
		var board = document.getElementById('board');
		board.appendChild(li); 
	}

}



function selectCard(clickedCard) {

	if (selectedCards <= 1 ) {

	  var selectedCard = cards[clickedCard]; 
	  // add class to flip card
	  selectedCard.element.classList.add('flipped');   
	  selectedCard.element.getElementsByClassName('back')[0].style.backgroundColor = colours[clickedCard];
	  
	  selectedCard.flipped = 1;
		
		selectedCards++;
		
	  compareCards(selectedCard);

	} 
}

function compareCards(flippedCard) {
		// save selected cards
		match.push(flippedCard); 
		// check if match when 2 cards are selected
		if (selectedCards == 2) {
			// match
			if(match[0].colour == match[1].colour) {
				match = [];
				selectedCards = 0;
				gameSize = gameSize - 2;
				if(gameSize == 0) {
					setTimeout(gameFinish, 500);
				}
			}
			// no match
			else {
				setTimeout(unFlip, 1000);
			}
		}

}

function unFlip() {

		// delete saved cards
		match[0].element.classList.remove('flipped');
		match[1].element.classList.remove('flipped');
		
		selectedCards = 0;
		match = [];
}

function gameFinish() {
	if(confirm("Play again?")) {
		newGame();
	}
	else {
		alert("Bye");
	}
}

function newGame() {
	gameSize = 4;

	for(var i = 0; i < cards.length; i++) {
		cards[i].element.classList.remove('flipped');
	}
}
