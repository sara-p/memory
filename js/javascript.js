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

window.onload = init;

var cards = [];
var colours = ['red', 'green', 'blue', 'black', 'pink', 'red', 'green', 'blue', 'black', 'pink'	 ];
var gameSize = 10;
var selectedCards = 0;


function init() {


	// create cards
	for (var i = 0; i < gameSize; i++) {	
		cards.push(i);
		// create card element
		var li = document.createElement('li');
		li.setAttribute('id', 'id' + i);
		li.classList.add('cards');
		li.innerHTML = '<div class="front" onclick="selectCard(' + cards[i] + ')"></div><div class="back"></div>';
	
		// add cards on board
		var board = document.getElementById('board');
		board.appendChild(li); 
		
		

	}

}



function selectCard(clickedCard) {
	
	if (selectedCards < 2 ) {

		selected = document.getElementById('id' + clickedCard);
		selected.getElementsByClassName('back')[0].style.backgroundColor = colours[clickedCard];

		if (selectedCards === 1) {

		}

		selectedCards+=1;

	  selected.classList.add('flipped');   
	} 
	
}
