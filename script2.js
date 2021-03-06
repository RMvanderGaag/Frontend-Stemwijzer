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

parties.forEach(party => {
    party.points = 0;
});

/**
 * Het nummer van de vraag word displayed
 * @param nmbr het index nummer van de vraag 
 */
function displayStatement(nmbr){
    stellingTitle.innerHTML = (nmbr + 1).toString() + '. ' + subjects[nmbr].title;
    stellingDes.innerHTML = subjects[nmbr].statement;
}

/**
 * De Pagina met de vragen word geladen
 */
function start(){
    //Laad de pagina met de stellingen
    document.getElementById("homePage").style.display = "none";
    document.getElementById("stellingPage").style.display = "block";

    //Zet de eerste vraag klaar
    displayStatement(statementNumber);
}

/**
 * @param opinion de keuze die je hebt gemaakt (pro, none, contra)
 */
function getOpinion(opinion){
    //De mening word toegevoegd aan de property
    subjects[statementNumber].myOpinion = opinion;
    //Ook word de waarde van de checkbox geregistreerd in de property 
    subjects[statementNumber].weight = document.getElementById('important').checked
    //Nieuwe functie word uitgevoerd
    nextStatement();
}

/**
 * Nieuwe stelling word geladen, wanneer je bij de laatste vraag is word er een functie aangeroepen.
 */
function nextStatement(){
    if(statementNumber < subjects.length - 1){
        //Nieuwe stelling word geladen
        document.getElementById('important').checked = false;
        statementNumber++;
        displayStatement(statementNumber);
        checkStatement(subjects[statementNumber].myOpinion);
    }else{
        //Na de laatste vraag word er een nieuwe functie aangeroepn
       matchOpinions();
    }
}

/**
 * Als de gebruiker op het pijltje terug klikt dan word de vorige vraag geladen, als ben je bij de laatste vraag word de home pagina weer getoond 
 */
function previousStatement(){
    if(statementNumber !== 0){
        statementNumber--;
        displayStatement(statementNumber);
        checkStatement(subjects[statementNumber].myOpinion);
    }else{
        document.getElementById("homePage").style.display = "block";
        document.getElementById("stellingPage").style.display = "none";
    }
}

/** 
 *Telt bij de partijen de punten op als de partijen met elkaar overeen komen 
 */
function matchOpinions(){
    //Er word door de subjects en de partijen geloopd
    subjects.forEach(subject => {
        parties.forEach(function(party, partyIndex){
             //Daarna word er gekeen of de mening van de partijen overeenkomt met jou mening
             if(subject.myOpinion == subject.parties[partyIndex].position){
                var scoreParty = parties.find(party => party.name == subject.parties[partyIndex].name);
                //Er word gekeken of de vraag belangrijk is en daarna worden de punten opgeteld 
                if(subject.weight == false){
                    scoreParty.points += 1;
                }else{
                    scoreParty.points += 2;
                }
            }
        })
    })
    showSelectPartiePage();
}

/**
 * Als de gebruiker terug gaat naar een eerder ingevulde vraag word het antwoord wat je daar in hebt gevuld getoond
 * @param opinion de mening die je hebt ingevoerd
 */
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

/**
 * De pagina met een overzicht van de partijen in volgorde van de meeste punten word geladen
 */
function showSelectPartiePage(){
    //Nieuwe pagina word geladen
    document.getElementById("stellingPage").style.display = "none";
    document.getElementById("importantContainer").style.display = "block";

    //De partijen worden op volgorde gezet met de meeste punten
    parties.sort(function(a,b){
        return b.points - a.points;
      });
    
    //De partijen worden getoond 
    parties.forEach(party => {
        var par = document.createElement("p");
        par.innerHTML = party.long;
        document.getElementById("partyOrder").appendChild(par);
    });
}

/**
 * Deze functie word aangeroepen als de gebruiken de zittende partijen selecteerd 
 */
function getCertainParties(){
    btnFeedback('secular')
    resultParties = [];
    resultParties = parties.filter(party => {
      return party.secular == true;
    });
  }
  
/** 
 * Deze functie word aangeroepen als de gebruiken alle partijen selecteerd 
 */
function getAllParties(){
    btnFeedback('all')
    resultParties = parties;
}
  
/** 
 * Alleen de grote partijen worden geetoond
 */
function getBigParties(){
    btnFeedback('big')
    resultParties = [];
    resultParties = parties.filter(party => {
      return party.size >= bigParty;
    })
}

/** 
 * De kleur van de knop word veranderd al klik je op een van de knoppen
 * @param partyType de value van de knop 
 */
function btnFeedback(partyType){
    for(var i = 0; i < document.getElementsByClassName('filterParty').length; i++){
        document.getElementsByClassName('filterParty')[i].style.background = 'white';
    }
    document.getElementById(partyType).style.background = 'rgb(1, 180, 220)';
}

/** 
 * De Resultaat pagina word geladen 
 */
function showResultPage(){
    if(resultParties.length == 0){
        resultParties = parties;
    }
    document.getElementById('importantContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';

    //De top 3 partijen worden laten zien
    document.getElementById('1stPlace').innerHTML += resultParties[0].name;
    document.getElementById('2ndPlace').innerHTML += resultParties[1].name;
    document.getElementById('3rdPlace').innerHTML += resultParties[2].name;
}