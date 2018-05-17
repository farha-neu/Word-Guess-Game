var gameStart = true;

var index =0;
var correctGuesses;
var wrongGuesses;
var currentWord;
var userChoice;
var hasWon;
var lives;
var wins = 0;
var losses = 0;
var count;
var bands = ["MICHAEL JACKSON","SHAKIRA","MADONNA","MICHAEL JACKSON","SHANIA","RIHANNA","NIRVANA"];

var htmlWord="";
var htmlWrongWord="";
var bgSound = new Audio("https://cs1.mp3.pm/listen/3239549/UHZZY2xhS0hXTjZqbUtmNEhrTkFhSVFZbFpSSzJPZ2ozR2Fyb2RYbmVWY0tCUEdJY29SOTNPUzcweFZGSWFCcXAvTXZpR1pLSlZPR2w2eExQOENZSkl2WTgrbnRaa255d0w2RkFaZWlXWDJFemc1K3M5REIzZUNBRll5NjMzSXk/Ludovico_Einaudi_-_I_giorni_(mp3.pm).mp3");

document.onkeyup = function(event){
    console.log(event.key);
   
    if(gameStart){       
        correctGuesses = [];
        wrongGuesses = [];
        hasWon = false;
        lives = 6;
        count = 0;
        htmlWord="";
        htmlWrongWord="";

        clearCavas();

      
        bgSound.play();

        currentWord = bands[index];

        for(var j = 0; j<currentWord.length;j++){
            if(currentWord[j]=== " "){
                count++;
                correctGuesses.push(null);
            }
            else{
                correctGuesses.push("_");
            }
            
        }
        console.log(correctGuesses);
        showCorrectGuessesDOM();

        document.querySelector("#scoreBoard").style.display="block";
        document.querySelector("#result").style.display="block";
        gameStart = false;
    }
    
    //game played
    //keyup was not for game start
    else{
        //1. user presses a key
        //2. check whether valid key pressed
        userChoice = event.key.toUpperCase();
        

        //loop until user dies or won
        if(lives > 0 || !hasWon){
            //valid input?
            if(userChoice.charCodeAt(0) >= 65 && userChoice.charCodeAt(0) <= 90 && userChoice.length===1){
                    console.log("valid");
                    //1. Repeatition of letters?
                   if(!repeatLetter(userChoice)){
                       //2. Match?
                       if(match()){
                            populateCorrectGuess();
                            playSound("correct.wav");
                            showCorrectGuessesDOM();    
                            if(count===currentWord.length){
                                hasWon = true;
                                bgSound.pause();
                                bgSound.currentTime = 0;
                                playSound("win.wav");
                                wins++;
                                showScoreBoardDOM();
                            }                   
                       }
                       //3. Mismatch?
                       else{
                            lives--;
                            wrongGuesses.push(userChoice);
                            playSound("wrong.wav");
                            showWrongGuessesDOM();
                            if(lives === 0){
                                bgSound.pause();
                                bgSound.currentTime = 0;
                                playSound("lost.wav");
                                losses++;
                                showScoreBoardDOM();
                            }
                       }                           
                   }
            }           
        }
    }
    
    function repeatLetter(){
        if(correctGuesses.indexOf(userChoice) > -1 || wrongGuesses.indexOf(userChoice) > -1){
            playSound("repeat.wav");
            return true;
        }
        return false;
    }

    function match(){
        if(currentWord.indexOf(userChoice)>-1){
           return true;
        }
    }

    function populateCorrectGuess(){
        for(var i = 0; i < currentWord.length; i++){
            if(currentWord[i] === userChoice){
                correctGuesses[i] = userChoice;
                count++;
            }
          
        }
    }

    function showCorrectGuessesDOM(){
        htmlWord = "";
        correctGuesses.forEach(function(element){
            if(element === null){
                htmlWord =htmlWord+"&nbsp;&nbsp;&nbsp;";
                // count++;
            }else{
                htmlWord = htmlWord+"&nbsp;"+element;
            }
          
           
        });
        document.querySelector("#word").innerHTML =htmlWord;
    }
  
    function showWrongGuessesDOM(){
        htmlWrongWord = "";
        wrongGuesses.forEach(function(element){
            htmlWrongWord = htmlWrongWord+" "+element;
        });
        document.querySelector("#guesses").innerHTML = lives;
        document.querySelector("#letters").innerHTML =htmlWrongWord;
    }

    function showScoreBoardDOM(){
        var correctAnswerHtml = "The correct answer is: "+currentWord;
        if(hasWon){
            var winHtml = "CONGRATULATIONS! YOU HAVE SAVED HIM :) <br>"+ correctAnswerHtml+
                          "<br>Press on any key to play again";
                            
            document.querySelector("#winMsg").innerHTML = winHtml;
            document.querySelector("#winMsg").style.display="block";
            document.querySelector("#win").innerHTML = wins;
        }
       else{
           var loseHtml = "OH NO! YOU HAVE HANGED HIM <br>"+ correctAnswerHtml+
                        "<br>Press on any key to play again";
           document.querySelector("#loseMsg").innerHTML = loseHtml;
           document.querySelector("#loseMsg").style.display="block";
           document.querySelector("#loss").innerHTML = losses;
       }
       index++;
       gameStart=true;
       if(index > bands.length-1){
          index = 0;
       }     
    }

    function playSound(name){
        var sound = new Audio("assets/audio/"+name);
        sound.play();
    }

    function clearCavas(){
        document.querySelector("#msg").style.display="none";
        document.querySelector("#winMsg").style.display="none";
        document.querySelector("#loseMsg").style.display="none";
        document.querySelector("#word").innerHTML =htmlWord;
        document.querySelector("#guesses").innerHTML = lives;
        document.querySelector("#letters").innerHTML =htmlWrongWord;
    }
}







