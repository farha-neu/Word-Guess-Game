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

var band = [
    {name: "WHITNEY HOUSTON", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Whitney_Houston_Welcome_Home_Heroes_1_cropped.jpg/220px-Whitney_Houston_Welcome_Home_Heroes_1_cropped.jpg"},
    {name: "MICHAEL JACKSON", image: "http://m.blog.hu/ku/kulturpart/image/2014-06-25/7935220/michaeljackson_2414920b.jpg"},
    {name: "BON JOVI", image:"http://ultimateclassicrock.com/files/2014/10/BonJovi.jpg?w=980&q=75"},
    {name: "MADONNA", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Madonna_Rebel_Heart_Tour_2015_-_Stockholm_%2823051472299%29_%28cropped_2%29.jpg/1200px-Madonna_Rebel_Heart_Tour_2015_-_Stockholm_%2823051472299%29_%28cropped_2%29.jpg"},
    {name: "METALLICA", image: "https://pmcvariety.files.wordpress.com/2017/05/metallica.jpg?w=1000&h=562&crop=1"},
    {name: "EMINEM", image: "http://www.southpawer.com/wp-content/uploads/2017/12/best-of-eminem-playlist.jpg"},
    {name: "THE CRANBERRIES", image: "http://www.elsalvadortimes.com/media/elsalvadortimes/images/2018/03/08/2018030809071378427.jpg"},
    {name: "PEARL JAM", image: "https://www.grammy.com/sites/com/files/styles/news_detail_header/public/gettyimages-688541270.jpg?itok=LU_oKUst"},
    {name: "RED HOT CHILI PEPPERS", image: "https://img.huffingtonpost.com/asset/571e20051900002d0056c1b4.jpeg?cache=st9zw21jxi&ops=crop_0_14_1800_974,scalefit_720_noupscale"},
    {name: "NIRVANA", image:"https://live-arena.com/wp-content/uploads/2018/01/nirvana-quatre-de%CC%81mo-ine%CC%81dites-refont-surface-sur-Youtube.jpg"},
    {name: "THE SMASHING PUMPKINS", image: "https://consequenceofsound.files.wordpress.com/2018/02/smashing-pumpkins1.png?w=807"}, 
    {name: "RADIOHEAD", image: "https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/radiohead_hero_688547436.jpg?itok=ZvmweXnH"},
    {name: "GREEN DAY", image: "http://www.imer.mx/reactor/wp-content/uploads/sites/40/rs-green-day-573649b5-53b3-43c5-91e6-858db92cfde0.jpg"},
    {name: "BECK", image: "https://img.wennermedia.com/featured-promo-724/beck-new-song-listen-2017-4a8aff07-1161-4374-8245-631e4a4add6d.jpg"}, 
    {name: "SUBLIME", image: "https://www.billboard.com/files/styles/article_main_image/public/stylus/105814-sublime_617_409.jpg"},
    {name: "SOUND GARDEN", image: "https://img.wennermedia.com/article-leads-horizontal/rs-173988-85847547.jpg"}
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

        //play background music
        bgSound.play();


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
        

        //loop until user loses all lives or wins
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
        document.querySelector("#initImage").style.display="none";
        document.querySelector("#theme").style.display="none";
        var correctAnswerHtml = "CORRECT WORD: "+currentWord;
        var img = "<img src='"+band[index].image+"' class='band-img' />";
        if(hasWon){
            var winHtml = "<span class='winLoseHeader'>CONGRATULATIONS!!!</span><br>"
                          +"<br>CORRECT GUESS :) "+img+"<br><p class='play'>Press spacebar to play again</p>";
                            
            document.querySelector("#winMsg").innerHTML = winHtml;
            document.querySelector("#winMsg").style.display="block";
            document.querySelector("#win").innerHTML = wins;
        }
       else{
           var loseHtml ="<span class='winLoseHeader'>OH NO :( TRY AGAIN!</span><br><br>"+ correctAnswerHtml+
                        "<br>"+img+"<br><p class='play'>Press spacebar to play again</p>";
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
        document.querySelector("#initImage").style.display="block";
        document.querySelector("#theme").style.display="block";
        document.querySelector("#msg").style.display="none";
        document.querySelector("#icon").style.display="none";
        document.querySelector("#winMsg").style.display="none";
        document.querySelector("#loseMsg").style.display="none";
        document.querySelector("#word").innerHTML =htmlWord;
        document.querySelector("#guesses").innerHTML = lives;
        document.querySelector("#letters").innerHTML =htmlWrongWord;
    }
}







