//globale variablen
var statementNumber = 0;
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


subjects.forEach(subject => {
    subject.myOpinion = '';
    subject.weight = false;
});

parties.forEach(partie => {
    partie.points = 0;
});

function start(){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("stellingPage").style.display = "block";

    stellingTitle.innerHTML = subjects[0].title;
    stellingDes.innerHTML = subjects[0].statement;
}

function getOpinion(opinion){
    subjects[statementNumber].myOpinion = opinion;
    subjects[statementNumber].weight = document.getElementById('important').checked
    nextStatement();
}

function nextStatement(){
    if(statementNumber < subjects.length - 1){
        document.getElementById('important').checked = false;
        statementNumber++;
        stellingTitle.innerHTML = subjects[statementNumber].title;
        stellingDes.innerHTML = subjects[statementNumber].statement;
        checkStatement(subjects[statementNumber].myOpinion);
    }else{
       matchOpinions();
    }
}

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
    for(var i = 0; i < subjects.length; i++){
        for(var j = 0; j < subjects[i].parties.length; j++){
            if(subjects[i].myOpinion == subjects[i].parties[j].position){
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
    document.getElementById("stellingPage").style.display = "none";
    document.getElementById("importantContainer").style.display = "block";

    parties.sort(function(a,b){
        return b.points - a.points;
      });
    
      for (var m = 0; m < parties.length; m++) {
        var p = document.createElement("p");
        p.innerHTML = parties[m].long + '<b> ' + parties[m].points + '</b>';
        document.getElementById("col1").appendChild(p);
      }
}

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