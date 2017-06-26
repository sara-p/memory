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

//window.onload = init;

document.getElementById('gameLevel').addEventListener('click', gameLevel );
document.getElementById('enterPlayer').addEventListener('click', player );

function gameLevel(e) {

	//copy into a new array
	colours = coloursInput.slice();
	var choosenLevel = e.target.id;

		var level = '';
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
	document.querySelector('h1').innerHTML = level;
	document.getElementById('gameLevel').style.display = 'none';

	colours = colours.concat(colours);
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

function player() {
	//save the player
	var person = prompt("Please enter your name");
  if (person !== null) {
    document.getElementById('player').innerHTML = "Player: " + person;
   	document.getElementById('enterPlayer').style.display = 'none'; 
   	document.getElementById('gameLevel').style.display = 'block'; 
	}
	saveResult(person);
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
	// set time when game starts
	startTime = new Date().getTime();
	timer = setInterval(displayTime ,10);

}


function displayTime() {
	// calculate current time
	var gameTime = new Date().getTime() - startTime;

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



function saveResult(player) {
	// sessionStorage.clear();
	// localStorage.clear();
	// Check browser support
	if (typeof(Storage) !== "undefined") {
	    // Store
	    // sessionStorage.setItem('name', player);


    // Parse any JSON previously stored in allNames
    var existingEntries = JSON.parse(sessionStorage.getItem("allNames"));
    if(existingEntries === null) {
    	existingEntries = [];
    } 
    var playerName = player;
    var entry = {
        "name": playerName,
    };
    sessionStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    sessionStorage.setItem("allNames", JSON.stringify(existingEntries));

    var leaderBoard = JSON.parse(sessionStorage.getItem("allNames"));

		console.log(leaderBoard);

    for (var i = 0; i < leaderBoard.length; i++){
    	console.log(leaderBoard[i].name);
 			var li = document.createElement('li');
   		var result = document.getElementById('result');
   		li.innerHTML = "name: " + leaderBoard[i].name;
   		result.appendChild(li); 
		}

		// var count = 0;

		// for(var prop in leaderBoard) {
		// 	if(leaderBoard.hasOwnProperty(prop)) {
		// 	  ++count;
	 //   		var li = document.createElement('li');
	 //   		var result = document.getElementById('result');
	 //   		li.innerHTML = prop;
	 //   		result.appendChild(li); 
		// console.log(prop);
		
		// 	}
		// }
	


		//localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
	    // localStorage.removeItem('allNames');



	    // localStorage.removeItem('entry');
	    // localStorage.removeItem('name');
	    // sessionStorage.removeItem('allNames');
	    // sessionStorage.removeItem('entry');
	    // sessionStorage.removeItem('name');
			// console.log(localStorage.getItem("allNames").length);
    		// do something with localStorage.getItem(localStorage.key(i));
    		// console.log(localStorage.getItem(localStorage.key(i)));
    		// console.log(sessionStorage.getItem("allNames") );
    		// console.log(sessionStorage.getItem("entry") );
    		// console.log(sessionStorage.getItem("name") );
    		// console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    		// console.log(localStorage.length);
   		

	    // Retrieve
	    // var localStorageShow = sessionStorage.getItem("name");
	    // console.log(localStorageShow);
	    
	    // document.getElementById("result").innerHTML = sessionStorage.getItem("name");
	} else {
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

	document.getElementById('player').innerHTML = '';
	document.getElementById('time').innerHTML = '';
	document.getElementById('board').innerHTML = '';
	document.querySelector('h1').innerHTML = '';
	document.getElementById('gameLevel').style.display = 'none';
	document.getElementById('enterPlayer').style.display = 'block'; 
	
}
