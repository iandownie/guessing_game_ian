var $randomNumber=Math.round(Math.random()*100);
var $countingStart=5;
var $counting = $countingStart;
var $winSign = $('<div id="winning"><p>You guessed correctly! You win!<br>Play Again!</p></div>');
var $coolUpSign = $('<div id="winning"><p>You guessed incorrectly.<br>Guess higher!</p></div>');
var $coolDownSign = $('<div id="winning"><p>You guessed incorrectly.<br>Guess lower!</p></div>');
var $invalid= $('<div id="winning"><p>Invalid Input!<br>Try a whole number betwee 1 and 100.</p></div>');
var $concede = $('<div id="winning"><p id="hint">Quitter! <br>The answer is: </p></div>');
var $select = $("<select id='expMenu'></select>");
var $enter=0;
var $guessTracking=[];
var $guessTracking2=[];

var invalidation= function(){
  if(isNaN($(this).val())){
    $("span#notNum").show();
  }else{
    $("span#notNum").hide();
    if($(this).val()<0|$(this).val()>100){
      $("span#limit").show();
      }else{
      $("span#limit").hide();
      }
      if($(this).val()==Math.round($(this).val())){
        $("span#whole").hide();
        }else{
        $("span#whole").show();
        }
  }
}
var $loseSign = $('<div id="losing"><p>You lose, loser.</p><button id= "button5">Try another round?</button></div>');
var hiding= function(){
  $(".temp").remove();
  $(this).hide();
}
var reset=function(){
  $randomNumber=Math.round(Math.random()*100);
  $("#counter").hide();
  $counting=$countingStart;
  $("#guesses").hide();
  $guessTracking=[];
  $("#guessed").empty();
}
var guessTracker= function(){
  $guessTracking.push($("#guess").val());
  $guessTracking2=($guessTracking.length-1);
  $("#guessed").append("<li></li>");
  $("#guessed li").last().append($guessTracking[$guessTracking2]);
  $("#guesses").show();
}
var guessHoning= function(){
  if(Math.abs($randomNumber-$guessTracking[$guessTracking2])<Math.abs($randomNumber-$guessTracking[$guessTracking2-1])){
    $("#winning p").before("<p class='temp'>Getting Warmer!</p>");
  }else if(Math.abs($randomNumber-$guessTracking[$guessTracking2])>Math.abs($randomNumber-$guessTracking[$guessTracking2-1])){
    $("#winning p").before("<p class='temp'>Brrr, getting colder!</p>");
  }else if($guessTracking[$guessTracking2]==$guessTracking[$guessTracking2-1]){
    $("#winning p").before("<p class='temp'>You guessed the same number twice?!?!</p>");
  }else if(Math.abs($randomNumber-$guessTracking[$guessTracking2])==Math.abs($randomNumber-$guessTracking[$guessTracking2-1])){
    $("#winning p").before("<p class='temp'>Same distance away from the correct number, but too far!</p>");
  }
}
var buttonOne= function(){
  guessTracker();
  guessHoning();
  $counting-=1;
  $("#counter").replaceWith("<div id='counter'><p>Guess Countdown:</p></div>");
  $("#counter p").append($counting);                        
  $("#counter").show();
  if($counting>0){
  //******** Losing Message ********//
    if ($("#guess").val()==$randomNumber){
      $("section").after().append($winSign);
      $winSign.show();
      reset();
    }else if($("#guess").val()>$randomNumber){
      $("section").after().append($coolDownSign);
      $coolDownSign.show();
      
    }else if($("#guess").val()<$randomNumber){
      $("section").after().append($coolUpSign);
      $coolUpSign.show();

    }
   }else{
   //******* losing effect *******//
      $("section").after().append($loseSign);
      $loseSign.show(); 
      $loseSign.click(function(){
        $(this).hide();
        reset();
      });
    }
}

//**********Sign Template**********//

$winSign.click(function(){
  $(this).hide();
  $("#counter").hide();
  $counting=$countingStart;
});

//***********Counter**********//

$("#counter").hide();
$("#counter p").append($counting);

//***********Buttons***********//

$("#button1").click(buttonOne);
$("#guess").on("keydown", function(event){
    if($enter===13){
      $enter=0;
      $(".temp").remove();
      $("#winning").hide();
      $("losing").hide();
    }else if($enter!=13){
      $enter=event.which;
    if($enter===13){  
      buttonOne();
    }
    console.log(event.which);
  }});
$(".button2").click(reset);
$("#button3").click(function(){
  $("section").after().append($concede);
  $("#hint").append('<p class="temp"></p>');
  $(".temp").append($randomNumber);
  $concede.show();
});


//**********Sign Removal************//
$coolDownSign.click(hiding);
$coolUpSign.click(hiding);
$concede.click(hiding);

//* Experimental menu //*

$("section").after($select);
$("button").each(function(){
  var $anchor = $(this);
  var $option = $("<option></option>");
  $option.val($anchor.attr(""));
  $option.text($anchor.text());
  $select.append($option);
});


$select.change(function(){
  $("section").after().append($winSign);
  $winSign.show();
});

//* Hiding Spans *//


$("#guess").keyup(invalidation);

$("div.input").click(function(){
    $("input").removeAttr("placeholder");
}).keyup;

$("div.input").mouseout(function(){
    $("input").attr("placeholder", "Guess a number between 1 and 100.");
});

$("div span").hide();