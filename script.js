//globale variablen
var i = 0;
var a = 100 / subjects.length;
const plusWith = 100 / subjects.length;
const bigParty = 10;

var position = ["pro", "none", "contra"];
var data = [];
var resultParties = [];

var partyOpinion = document.getElementById("partyOpinion");
var opinionContainer = document.getElementById("opinionContainer");
var stellingTitle = document.getElementById("stellingTitle");
var stellingDes = document.getElementById("stellingDes");

//berkend de progress bar
document.getElementById("progress").style.width = plusWith.toString() + "%";

//zet de eerste stelling klaar
stellingTitle.innerHTML = subjects[i].title;
stellingDes.innerHTML = subjects[i].statement;

//voegt het je eigen mening toe en de extra meetel variable toe aan het object
subjects.forEach(e => {
  e.myOpinion = "";
  e.important = false;
});

//voegt het punten systeem aan het object toe
parties.forEach(e => {
  e.points = 0;
});

//voegt een eventlistener aan de 'sla deze vraag over' knop
document.getElementById("noOpinion").addEventListener("click", function() {
  nextStatement();
});

//laat de meningen van alle partijen zien in een uitklap model
document
  .getElementById("showPartyOpinion")
  .addEventListener("click", function() {
    if (
      partyOpinion.style.display == "none" ||
      partyOpinion.style.display == ""
    ) {
      partyOpinion.style.display = "block";
      opinionContainer.style.backgroundColor = "rgb(243, 243, 243)";
      opinionContainer.style.border = "1px solid lightgrey";
    } else {
      partyOpinion.style.display = "none";
      opinionContainer.style.backgroundColor = "#ffffff";
      opinionContainer.style.border = "0px";
    }
    getPartyOpinions();
  });

//Slaat de verandering van de important op in het object
document.getElementById("important").addEventListener("change", function() {
  subjects[i].important = this.checked;
});

//Gaat naar de stellingen pagina toe
function next() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("stellingPage").style.display = "block";
}

//Gaat terug naar de vorige stelling of als je bij de eerste vraag bent terug naar de homepage
function goBack() {
  if (i == 0) {
    document.getElementById("homePage").style.display = "block";
    document.getElementById("stellingPage").style.display = "none";
  } else {
    i = i - 1;
    a = a - plusWith;
    removePoints();
    routineFunction();
  }
}

//Gaat naar de volgende stelling, als je bij de laatste stelling bent word je naar het resultaat gestuurd
function nextStatement(opinion) {
  i = i + 1;
  if (i == subjects.length - 1) {
    a = 100;
  } else if (i == subjects.length) {
    result();
  } else {
    a = a + plusWith;
  }

  countPoints(opinion);

  document.getElementById("important").checked = false;
  routineFunction();
}

//Laat alle meningen van de andere partijen per stelling zien EXTRA
function getPartyOpinions() {
  for (var k = 0; k < position.length; k++) {
    for (var j = 0; j < subjects[i].parties.length; j++) {
      if (subjects[i].parties[j].position == position[k]) {
        var container = document.createElement("div");

        var elm = document.createElement("p");
        elm.innerHTML = subjects[i].parties[j].name;

        var des = document.createElement("p");
        des.innerHTML = subjects[i].parties[j].opinion;
        des.style.display = "none";
        des.className = "description";

        var dropDown = document.createElement("span");
        dropDown.innerHTML = "+";
        dropDown.className = "w3-right dropBtn";
        dropDown.addEventListener("click", function() {
          if (this.nextSibling.nextSibling.style.display == "none") {
            this.nextSibling.nextSibling.style.display = "block";
          } else {
            this.nextSibling.nextSibling.style.display = "none";
          }
        });

        container.className = "opinion";

        container.appendChild(dropDown);
        container.appendChild(elm);
        container.appendChild(des);

        document.getElementById(position[k]).appendChild(container);
      }
    }
  }
}

//Haalt de punten er van af als je naar de vorige stelling gaat
function removePoints(){
  var opinion = subjects[i].myOpinion;

  for(var m = 0; m < parties.length - 1; m++){
    if(subjects[i].parties[m].position == opinion){
      parties[m].points -= 1;
    }
  }
  
}

//Voegt punten toe aan het object en kijkt of de stelling belangrijk is of niet in dat geval worden er twee punten bij op getelt
function countPoints(opinion){
  var newCount = i;
  newCount = newCount - 1;

  for(var m = 0; m < parties.length - 1; m++){
    if(subjects[newCount].parties[m].position == opinion){
      if(document.getElementById('important').checked == true){
        parties[m].points += 2;
      }else{
        parties[m].points += 1;
      }
    }
  }
  subjects[newCount].myOpinion = opinion;
}

//Dit is een herhalende functie en laat de volgende vraag zien en doet de progressbar verder
function routineFunction() {
  stellingTitle.innerHTML = subjects[i].title;
  stellingDes.innerHTML = subjects[i].statement;

  document.getElementById("progress").style.width = a.toString() + "%";
  partyOpinion.style.display = "none";
  opinionContainer.style.backgroundColor = "#ffffff";
  opinionContainer.style.border = "0px";

  document.getElementById("pro").innerHTML = "";
  document.getElementById("none").innerHTML = "";
  document.getElementById("contra").innerHTML = "";
}

//Gaat naar de pagina waar je kan kiezen welke pagina je wilt meetellen in het eind resultaat
function result() {
  document.getElementById("stellingPage").style.display = "none";
  document.getElementById("importantContainer").style.display = "block";
  
  parties.sort(function(a,b){
    return b.points - a.points;
  });

  for (var m = 0; m < parties.length; m++) {
    var p = document.createElement("p");
    p.innerHTML = parties[m].name + '<b> ' + parties[m].points + '</b>';
    document.getElementById("col1").appendChild(p);
  }
}

//Deze functie word aangeroepen als de gebruiken de zittende partijen selecteerd
function getCertainParties(){
  resultParties = [];
  resultParties = parties.filter(function(partie) {
    return partie.secular == true;
  });
}

//Deze functie word aangeroepen als de gebruiken alle partijen selecteerd
function getAllParties(){
  resultParties = parties;
}

function getBigParties(){
  resultParties = [];
  resultParties = parties.filter(function(partie) {
    return partie.size >= bigParty;
  })
}

//Bij deze functie worden alle resultaten geladen en de top drie gepakt
function finalResults(){
  if(resultParties.length == 0){
    resultParties = parties;
  }
  document.getElementById('importantContainer').style.display = 'none';
  document.getElementById('resultContainer').style.display = 'block';

  resultParties.sort(function(a,b){
    return b.points - a.points;
  });

  document.getElementById('1stPlace').innerHTML += resultParties[0].name;
  document.getElementById('2ndPlace').innerHTML += resultParties[1].name;
  document.getElementById('3thPlace').innerHTML += resultParties[2].name;
}