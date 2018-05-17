
var bands = ["shakira ma","madonna","michaeljackson","shaniatwain","rihanna","coldplay"];

var totalGuesses = 12;
var remainingGuesses = totalGuesses;
var guessedLetters = [];
var win = 0;
var loss = 0;
var x = -1;
var userChoice;
var letterCorrectGuess =0;
var wrongGuesses = [];
var lives = 13;
document.onkeyup = function(event){
  
    

   // console.log("Game started!");
    var currentWord = bands[0];
    if(x === -1){
        for(var j = 0; j<currentWord.length;j++){
            console.log("_");
            guessedLetters.push("_");
        }
    }

    if(x>-1){
        userChoice = event.key;
      
        if(letterCorrectGuess<bands[0].length || lives>0){


             if(bands[0].indexOf(userChoice)>-1){
                 if(guessedLetters.indexOf(userChoice) < 0){
                    for(var i = 0; i < bands[0].length;i++){
                        if(bands[0][i] === userChoice){
                            guessedLetters[i] = userChoice;
                            letterCorrectGuess++;
                            console.log(letterCorrectGuess);
                            if(letterCorrectGuess === bands[0].length){
                                console.log(letterCorrectGuess);
                                console.log("you won");
                                win++;
                                console.log("Win:"+win);
                            }
                        }
                    }
                 }
                 else{
                    console.log("You already chose "+userChoice);
                 }
                    console.log(guessedLetters);
              }

              else{
                  if(wrongGuesses.indexOf(userChoice)<0){
                    wrongGuesses.push(userChoice);
                    console.log("Wrong guess:"+ wrongGuesses);
                    lives--;
                    console.log("Lives:"+lives);
                    if(lives === 0){
                        console.log("You lose");
                        loss++;
                        console.log("Lose:"+loss);
                    }
                  }
                  else{
                    console.log("You already chose "+userChoice);
                  }                
              }
        }
    }

    x=0;
};
