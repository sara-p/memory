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

var colours = ['red', 'green', 'blue', 'black', 'pink', 'red', 'green', 'blue', 'black', 'pink', ];

function init() {

	// how many cards
	var gameSize = 10;
	
	// create cards
	for (var i = 0; i < gameSize; i++) {		
		var li = document.createElement('li');
		li.classList.add('cards');
		li.innerHTML = '<div class="front">front</div><div class="back">'+ colours[i] + '</div>';
		var board = document.getElementById('board');
		// add cards on board
		board.appendChild(li); 
		
		li.addEventListener('click', flip);
	}

	//event Listener for cards
	// var cards = document.getElementsByClassName('cards');
	// for (var i = 0; i < cards.length; i++) {
	//   cards[i].addEventListener('click', flip);
	// }
}


function flip() {
  if (this.classList.contains('flipped')) {
    this.classList.remove('flipped');
  }
  else {
    this.classList.add('flipped');     
  }
}