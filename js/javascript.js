//  Memory game
// style in rows
// time

var cards = [];
var card = {};
var coloursInput = ['red', 'blue', 'pink', 'green', 'black', 'yellow', 'lime', 'lightblue', 'white', 'purple'];
var colours;
var gameSize;
var selectedCards = 0;
var match = [];
var startTime; 
var timer = 0;

//window.onload = init;

document.getElementById('gameLevel').addEventListener('click', gameLevel );

function gameLevel(e) {
	
	var choosenLevel = e.target.id;

		var level = '';
	switch (choosenLevel) {
		case 'easy':
			coloursInput.length = 1;
			level = 'easy';
			break;
		case 'medium':
			coloursInput.length = 6;
			level = 'medium';
			break;
		case 'difficult':
			coloursInput.length = 10;
			level = 'difficult';
			break;
		default:
	}
	document.querySelector('h1').innerHTML = level;
	document.getElementById('gameLevel').style.display = 'none';

	colours = coloursInput.concat(coloursInput);
  gameSize = colours.length;

	shuffle(colours);	

}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }

  init();
}

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
	startTime = new Date().getTime();
	timer = setInterval(displayTime ,10);

	console.log(timer + 'timer');
}





function displayTime() {
	var gameTime = new Date().getTime() - startTime;
  dec = Math.floor(gameTime % 1000 / 10);
  s = Math.floor(gameTime/1000);
  m = Math.floor(gameTime/1000/60);
  h = Math.floor(gameTime/1000/60/60);
  document.getElementById('time').innerHTML = 'Time: ' + h + ':' + m + ':' + s + ':' + dec;
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
			if(gameSize === 0) {
				clearInterval(timer);

				// displayTime();
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

function gameFinish(e) {
	console.log(timer + 'finish timer');
	var playAgain = document.getElementById('playAgain');
	playAgain.style.display = 'block';
	playAgain.addEventListener('click', function(e){
		
		var playAgainChoise = e.target.id;
		if(playAgainChoise == 'yes') {
			newGame();
		}
		else {
			alert('ok bye');
		}
		playAgain.style.display = 'none';
	});
}

function newGame() {
	colours = '';
	timer = 0;

	document.getElementById('time').innerHTML = '';
	document.getElementById('board').innerHTML = '';
	document.querySelector('h1').innerHTML = '';
	document.getElementById('gameLevel').style.display = 'block';

	// for(var i = 0; i < cards.length; i++) {
	// 	cards[i].element.classList.remove('flipped');
	// }
}
