//  Memory game
// add name of player
// save name 
// save time
// make a leaderboard

var cards = [];
var card = {};
var coloursInput = ['red', 'blue', 'pink', 'green', 'black', 'yellow', 'lime', 'lightblue', 'white', 'purple'];
var colours;
var gameSize;
var selectedCards = 0;
var match = [];
var startTime; 
var timer = 0;
var gameTime;

//window.onload = init;

// listen for click on Player and Level 
document.getElementById('enterPlayer').addEventListener('click', player );
document.getElementById('gameLevel').addEventListener('click', gameLevel );


//save and print the player 
function player() {
  var person = prompt("Please enter your name");
  if (person !== null) {
    document.getElementById('player').style.display = 'block';
    document.getElementById('player').innerHTML = 'Name: ' + person;
    document.getElementById('enterPlayer').style.display = 'none'; 
    document.getElementById('gameLevel').style.display = 'block'; 
  }
}

// set the game level and add colours on card
  //copy into a new array
function gameLevel(e) {
	colours = coloursInput.slice();
	
  // check which level is choosen
  var choosenLevel = e.target.id;

	var level = '';
	
  // set number of colour on differnt level
  switch (choosenLevel) {
		case 'easy':
			colours.length = 1;
			level = 'easy';
			break;
		case 'medium':
			colours.length = 6;
			level = 'medium';
			break;
		case 'difficult':
			colours.length = 10;
			level = 'difficult';
			break;
		default:
	}

  // display Level headline
	document.querySelector('h1').innerHTML = level;
	document.getElementById('gameLevel').style.display = 'none';

  // double cards
	colours = colours.concat(colours);
  gameSize = colours.length;

	shuffle(colours);	

}

// shuffle cards 
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
  // set up board
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
	// set time when game starts
	startTime = new Date().getTime();
	timer = setInterval(displayTime ,10);

}


function displayTime() {
	// calculate current time
	 gameTime = new Date().getTime() - startTime;

	// if more than one day, finish game
	if (gameTime > 86399999) {
  	document.getElementById('time').innerHTML = 'You are too slow';
		clearInterval(timer);

		setTimeout(gameFinish, 500);
			
	}
	else {
		// display cureent time
	  dec = Math.floor(gameTime % 1000 / 10);
	  s = Math.floor((gameTime/1000) % 60);
	  m = Math.floor((gameTime/(1000*60)) % 60);
	  h = Math.floor((gameTime/(1000*60*60)) % 24);

	  // display time in double digits
		if(dec < 10){dec = '0' + dec;}
		if(h < 10){h = '0' + h;}
		if(m < 10){m = '0' + m;}
		if(s < 10){s = '0' + s;}

	  document.getElementById('time').innerHTML = 'Time: ' + h + ':' + m + ':' + s + ':' + dec;	
	}
}


function selectCard(clickedCard) {
  // check if 2 or less card are selected
	if (selectedCards <= 1 ) {
	  var selectedCard = cards[clickedCard];
	  // add class to flip card
	  selectedCard.element.classList.add('flipped');   
	  //set colour on the back of the card on selected card
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
			//how many card left to match?
      gameSize = gameSize - 2;
			
      // check if there are more cards to match
      if(gameSize === 0) {
				saveResult();
				clearInterval(timer);
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

// show play again option
function gameFinish(e) {
	var playAgain = document.getElementById('playAgain');
	playAgain.style.display = 'block';
	playAgain.addEventListener('click', playGameAgain);
}

function playGameAgain(event) {
	var playAgainChoise = event.target.id;
		if(playAgainChoise == 'yes') {
			newGame();
		}
		else {
			alert('ok bye');
		}
		playAgain.style.display = 'none';
}



function saveResult() {
	// clear storage
  // sessionStorage.clear();
	// localStorage.clear();
 
	// Check browser support
	if (typeof(Storage) !== "undefined") {
    // convert previously stored allNames to objects
    var existingEntries = JSON.parse(sessionStorage.getItem("allNames"));
    if(existingEntries === null) {
    	existingEntries = [];
    } 
    var playerName = document.getElementById('player').innerHTML;
    var playerTime = document.getElementById('time').innerHTML;
    
    var entry = {
        "name": playerName,
        "time": playerTime,
        "seconds": gameTime,
    };
    // do I need this
    // sessionStorage.setItem("entry", JSON.stringify(entry));
    
    //add new entry to array
    existingEntries.push(entry);
    
    // Save allEntries back to local storage
    sessionStorage.setItem("allNames", JSON.stringify(existingEntries));

    // var leaderBoard = JSON.parse(sessionStorage.getItem("allNames"));
    
    console.log(existingEntries);
    // sort leaderbord after best time
    existingEntries.sort(function(a, b) {
      return a.seconds-b.seconds;
    });

    // print top 20 leaderboard
    for (var i = 0; (i < existingEntries.length && i < 20); i++){
      // create list element to leaderboard
 			var li = document.createElement('li');
   		var result = document.getElementById('result');
   		li.innerHTML = " " + existingEntries[i].name + ' '  + existingEntries[i].time ;
   		result.appendChild(li); 
		}

		
	} 
  else {
	  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
}




function newGame() {
	//reset game
	for(var i = 0; i < cards.length; i++) {
		cards[i].element.classList.remove('flipped');
	}
	
  cards = [];
	colours = {};
	timer = 0;
	coloursInput.length = 10;

  // reset board
	document.getElementById('player').innerHTML = '';
	document.getElementById('time').innerHTML = '';
	document.getElementById('board').innerHTML = '';
	document.getElementById('result').innerHTML = '';
	document.querySelector('h1').innerHTML = '';
	document.getElementById('gameLevel').style.display = 'none';
	document.getElementById('enterPlayer').style.display = 'block'; 
	
}
