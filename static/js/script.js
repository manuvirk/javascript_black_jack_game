// challenge 5 black jack
let blackjackGame ={
  'you':{'scoreSpan':'#your-black-jack-result', 'div': '#your-box','score': 0},
  'dealer':{'scoreSpan':'#dealer-blackjack-result', 'div': '#dealer-box','score': 0},
  'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
  'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
  'wins':0,
  'losses':0,
  'draws':0,
  'stand':false,
  'turnover': false,

};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');




document.querySelector('#blackjackhit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjackdeal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjackstand-button').addEventListener('click', blackjackstand);


function blackjackHit(){
 if(blackjackGame['stand'] === false){
 let card = randomcard();
 showCard(card,YOU);
 updatescore(card, YOU);
 
 //console.log(YOU['score']);
 showScore(YOU);
}
}
function randomcard(){
  let randomindex = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomindex];
}

function showCard(card,ActivePlayer){
if(ActivePlayer['score'] <=21){
 let cardImage = document.createElement('img');
  cardImage.src = `static/images/${card}.png`;
  document.querySelector(ActivePlayer['div']).appendChild(cardImage);
  hitSound.play();
  //console.log(YOU['scoreSpan'].textContent);
}
}
function blackjackDeal(){
  if(blackjackGame['turnover'] === true){
  blackjackGame['stand'] = false;
  let yourimg = document.querySelector('#your-box').querySelectorAll('img');
  let dealerimg = document.querySelector('#dealer-box').querySelectorAll('img');

  //console.log(yourimg);
  for(i=0; i< yourimg.length; i++){
    yourimg[i].remove();
  }
  for(i=0; i< dealerimg.length; i++){
    dealerimg[i].remove();
  }
  YOU['score'] = 0;
  DEALER['score'] =0;
document.querySelector('#your-black-jack-result').textContent=0;
document.querySelector('#dealer-blackjack-result').textContent=0;

document.querySelector('#your-black-jack-result').style.color = '#FFFFFF';
document.querySelector('#dealer-blackjack-result').style.color = '#FFFFFF';
document.querySelector('#blackjack-ressult').textContent = "Let's Play";
document.querySelector('#blackjack-ressult').style.color= "black";

blackjackGame['turnsover'] =true;
  }
//

}

function updatescore(card, ActivePlayer){
//if adding 11 keeps me below 21 add 11 otherwise 1
if (card === 'A'){
  if (ActivePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21){
     ActivePlayer['score'] += blackjackGame['cardsMap'][card][1];
  }else{
    ActivePlayer['score'] += blackjackGame['cardsMap'][card][0];
  }
}
  else{
     ActivePlayer['score'] += blackjackGame['cardsMap'][card];

  }

}

function showScore(ActivePlayer)
{
if(ActivePlayer['score'] > 21){
  document.querySelector(ActivePlayer['scoreSpan']).textContent = 'Burst';
    document.querySelector(ActivePlayer['scoreSpan']).style.color = 'red';
}else{
document.querySelector(ActivePlayer["scoreSpan"]).textContent=ActivePlayer['score'];
} 
}

function blackjackstand(){
  blackjackGame['stand'] = true;
  let card  = randomcard();
  showCard(card, DEALER);
  updatescore(card, DEALER);
  showScore(DEALER);

  if(DEALER['score'] > 15){
    blackjackGame['turnover'] = true;
    let winner = ComputeWinner();
    showResult(winner);

  }
}

//compute winner and return who won and update 

function ComputeWinner(){
  let winner;

  if (YOU['score'] <= 21){
    // condition higher score 
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
     console.log('you won');
     blackjackGame['wins']++;
     winner = YOU;
  
    }
    else if(YOU['score'] < DEALER['score']){
     console.log('you lost');
     blackjackGame['losses']++;
     winner = DEALER;
    }
    else if( YOU['score'] === DEALER['score']){
     console.log('yow drew');
     blackjackGame[draws]++;
    }
  }

    //condition you vurst
  else if(YOU['score'] >21 && DEALER['score'] <= 21){
    console.log('You lost');
    winner = DEALER;
    blackjackGame['losses']++;
  } else if (YOU['score'] > 21 && DEALER['score'] >21){
    console.log ('you draw');
    blackjackGame['draws']++;


  
  }
  console.log('winner is', winner);
  console.log(blackjackGame);
  return winner;
  }

  function showResult(winner){
    let message, messagecolor;
    if (blackjackGame['turnover'] === true){
      if (winner === YOU){
        message = 'You won';
        messagecolor = 'green';
        winSound.play();

      } else if(winner=== DEALER){
        message = 'you lost';
        messagecolor = 'red';
        lossSound.play();
      } else{
        messagecolor = 'you draw';
        messagecolor = 'black';
      }
      document.querySelector('#blackjack-ressult').textContent = message;
      document.querySelector('#blackjack-ressult').style.color = messagecolor;
    }
  }