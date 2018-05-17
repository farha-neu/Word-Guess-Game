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
// var bands = ["MICHAEL JACKSON","SHAKIRA","MADONNA","MICHAEL JACKSON","SHANIA","RIHANNA","NIRVANA"];

var band = [
    {name: "MICHAEL JACKSON", image: "http://cdn.smehost.net/michaeljacksoncom-uslegacyprod/wp-content/uploads/2017/04/mj_stage.jpg"},
    {name: "SHAKIRA", image: "https://suntimesmedia.files.wordpress.com/2017/12/esp-mus_latin_american_music_awards-nominaciones_71368687-e1514387448532.jpg?w=763"},
    {name: "MADONNA", image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Madonna_3_by_David_Shankbone-2.jpg"},
    {name: "NIRVANA", image:"https://upload.wikimedia.org/wikipedia/commons/f/fe/Creed_%28band%29_in_2002.jpg"},
    {name: "COLD PLAY", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Coldplay_-_Global-Citizen-Festival_Hamburg_14.jpg/1280px-Coldplay_-_Global-Citizen-Festival_Hamburg_14.jpg"}, 
    {name: "SHANIA TWAIN", image: "https://upload.wikimedia.org/wikipedia/commons/0/08/ShaniaTwainJune2011_%28cropped1%29.jpg"},
    {name: "RIHANNA", image: "https://c1.staticflickr.com/8/7714/27876724745_637288766f_b.jpg"}
  ]; 


var htmlWord="";
var htmlWrongWord="";
var bgSound = new Audio("https://cs1.mp3.pm/listen/3239549/UHZZY2xhS0hXTjZqbUtmNEhrTkFhSVFZbFpSSzJPZ2ozR2Fyb2RYbmVWY0tCUEdJY29SOTNPUzcweFZGSWFCcXAvTXZpR1pLSlZPR2w2eExQOENZSkl2WTgrbnRaa255d0w2RkFaZWlXWDJFemc1K3M5REIzZUNBRll5NjMzSXk/Ludovico_Einaudi_-_I_giorni_(mp3.pm).mp3");

document.onkeyup = function(event){
    console.log(event.key);
   
    if(gameStart && event.keyCode == 32){       
        correctGuesses = [];
        wrongGuesses = [];
        hasWon = false;
        lives = 6;
        count = 0;
        htmlWord="";
        htmlWrongWord="";

        clearCavas();

      
        bgSound.play();

        // currentWord = bands[index];
        currentWord = band[index].name;
       

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
    else if(!gameStart){
        //1. user presses a key
        //2. check whether valid key pressed
        userChoice = event.key.toUpperCase();
        

        //loop until user dies or won
        if(lives > 0 || !hasWon){
            //valid input?
            if(event.keyCode >= 65 && event.keyCode <= 90){
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
        else{
            return;
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
        var img = "<img src='"+band[index].image+"' class='band-img' />";
        if(hasWon){
            var winHtml = "CONGRATULATIONS! YOU HAVE SAVED HIM :) <br>"+ correctAnswerHtml+
                          "<br>"+img+"<br>Press spacebar to play again";
                            
            document.querySelector("#winMsg").innerHTML = winHtml;
            document.querySelector("#winMsg").style.display="block";
            document.querySelector("#win").innerHTML = wins;
        }
       else{
           var loseHtml = "OH NO! YOU HAVE HANGED HIM <br>"+ correctAnswerHtml+
                        "<br>"+img+"<br>Press spacebar to play again";
           document.querySelector("#loseMsg").innerHTML = loseHtml;
           document.querySelector("#loseMsg").style.display="block";
           document.querySelector("#loss").innerHTML = losses;
       }
       index++;
       gameStart=true;
       if(index > band.length-1){
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







