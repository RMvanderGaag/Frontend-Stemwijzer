//globale variablen
var statementNumber = 0;
const bigParty = 10;

var position = ["pro", "none", "contra"];
var resultParties = [];

var stellingTitle = document.getElementById("stellingTitle");
var stellingDes = document.getElementById("stellingDes");

//Voegt een nieuwe property aan het object toe
subjects.forEach(subject => {
    subject.myOpinion = '';
    subject.weight = false;
});

parties.forEach(partie => {
    partie.points = 0;
});

function start(){
    //Laad de pagina met de stellingen
    document.getElementById("homePage").style.display = "none";
    document.getElementById("stellingPage").style.display = "block";

    //Zet de eerste vraag klaar
    stellingTitle.innerHTML = subjects[0].title;
    stellingDes.innerHTML = subjects[0].statement;
}


function getOpinion(opinion){
    //De mening word toegevoegd aan de property
    subjects[statementNumber].myOpinion = opinion;
    //Ook word de waarde van de checkbox geregistreerd in de property 
    subjects[statementNumber].weight = document.getElementById('important').checked
    //Nieuwe functie word uitgevoerd
    nextStatement();
}

//Nieuwe stelling word geladen, wanneer je bij de laatste vraag is word er een functie aangeroepen.
function nextStatement(){
    if(statementNumber < subjects.length - 1){
        //Nieuwe stelling word geladen
        document.getElementById('important').checked = false;
        statementNumber++;
        stellingTitle.innerHTML = subjects[statementNumber].title;
        stellingDes.innerHTML = subjects[statementNumber].statement;
        checkStatement(subjects[statementNumber].myOpinion);
    }else{
        //Na de laatste vraag word er een nieuwe functie aangeroepn
       matchOpinions();
    }
}

//Als de gebruiker op het pijltje terug klikt dan word de vorige vraag geladen, als ben je bij de laatste vraag word de home pagina weer getoond
function previousStatement(){
    if(statementNumber !== 0){
        statementNumber--;
        stellingTitle.innerHTML = subjects[statementNumber].title;
        stellingDes.innerHTML = subjects[statementNumber].statement;
        checkStatement(subjects[statementNumber].myOpinion);
    }else{
        document.getElementById("homePage").style.display = "block";
        document.getElementById("stellingPage").style.display = "none";
    }
}

function matchOpinions(){
    //Er word door de subjects en de partijen geloopt
    for(var i = 0; i < subjects.length; i++){
        for(var j = 0; j < parties.length; j++){
            //Daarna word er gekeen of de mening van de partijen overeenkomt met jou mening
            if(subjects[i].myOpinion == subjects[i].parties[j].position){
                //Er word gekeken of de vraag belangrijk is en daarna worden de punten opgeteld 
                if(subjects[i].weight == false){
                    parties[j].points += 1;
                }else{
                    parties[j].points += 2;
                }
            }
        }
    }
    showSelectPartiePage();
}

function showSelectPartiePage(){
    //Nieuwe pagina word geladen
    document.getElementById("stellingPage").style.display = "none";
    document.getElementById("importantContainer").style.display = "block";

    //De partijen worden op volgorde gezet met de meeste punten
    parties.sort(function(a,b){
        return b.points - a.points;
      });
    
    //De partijen worden getoond 
    for (var m = 0; m < parties.length; m++) {
        var p = document.createElement("p");
        p.innerHTML = parties[m].long + '<b> ' + parties[m].points + '</b>';
        document.getElementById("col1").appendChild(p);
      }
}

//Als de gebruiker terug gaat naar een eerder ingevulde vraag word het antwoord wat je daar in hebt gevuld getoond
function checkStatement(opinion){
    document.getElementById('important').checked = false;
    for(var k = 0; k < position.length; k++){
        document.getElementById(position[k]).style.background = 'none';
    }

    if(subjects[statementNumber].weight == true){
        document.getElementById('important').checked = true;
    }

    if(opinion == ''){
        return;
    }else{
        document.getElementById(opinion).style.background = 'rgb(1, 180, 220)';
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
  
//Alleen de grote partijen worden geetoond
function getBigParties(){
    resultParties = [];
    resultParties = parties.filter(function(partie) {
      return partie.size >= bigParty;
    })
}

//De Resultaat pagina word geladen
function showResultPage(){
    if(resultParties.length == 0){
        resultParties = parties;
      }
    document.getElementById('importantContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    //De top 3 partijen worden laten zien
    document.getElementById('1stPlace').innerHTML += resultParties[0].name;
    document.getElementById('2ndPlace').innerHTML += resultParties[1].name;
    document.getElementById('3thPlace').innerHTML += resultParties[2].name;
}