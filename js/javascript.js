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

 

var cards = document.getElementsByClassName('cards');
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flip);
}

function flip() {
  if (this.classList.contains('flipped')) {
    this.classList.remove('flipped');
  }
  else {
    this.classList.add('flipped');     
  }
}