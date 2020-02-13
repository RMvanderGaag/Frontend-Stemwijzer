var i = 0;
var a = 3.33;
var partyOpinion = document.getElementById('partyOpinion')
var opinionContainer = document.getElementById('opinionContainer');
var stellingTitle = document.getElementById('stellingTitle');
var stellingDes = document.getElementById('stellingDes');

document.getElementById('noOpinion').addEventListener('click', function(){
    nextStatement();
});

document.getElementById('showPartyOpinion').addEventListener('click', function() {
    if(partyOpinion.style.display == 'none' || partyOpinion.style.display == ''){
        partyOpinion.style.display = 'block';
        opinionContainer.style.backgroundColor = 'rgb(243, 243, 243)';
        opinionContainer.style.border = '1px solid lightgrey';
    }else{
        partyOpinion.style.display = 'none';
        opinionContainer.style.backgroundColor = '#ffffff';
        opinionContainer.style.border = '0px';
    }
    getPartyOpinions();
})


stellingTitle.innerHTML = subjects[i].title;
stellingDes.innerHTML = subjects[i].statement;


function next(){
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('stellingPage').style.display = 'block'
}

function goBack(){
    if(i == 0){
        document.getElementById('homePage').style.display = 'block';
        document.getElementById('stellingPage').style.display = 'none'
    }else{
        i = i - 1
        a = a - 3.33
        routineFunction();
    }
}


function nextStatement(){
    i = i + 1;
    if(i == 29){
        a = 100;
    }else{
        a = a + 3.33;
    }
    routineFunction();
}

function getPartyOpinions() {
    for(var j = 0; j < subjects[i].parties.length; j++){
        if(subjects[i].parties[j].position == 'pro'){
            var elm = document.createElement('p');
            elm.innerHTML = subjects[i].parties[j].name;
            document.getElementById('eens').appendChild(elm);
        }
        if(subjects[i].parties[j].position == 'none'){
            var elm = document.createElement('p');
            elm.innerHTML = subjects[i].parties[j].name;
            document.getElementById('none').appendChild(elm);
        }
        if(subjects[i].parties[j].position == 'contra'){
            var elm = document.createElement('p');
            elm.innerHTML = subjects[i].parties[j].name;
            document.getElementById('oneens').appendChild(elm);
        }
    }
}

function routineFunction(){
    stellingTitle.innerHTML = subjects[i].title;
    stellingDes.innerHTML = subjects[i].statement;
    document.getElementById('progress').style.width = (a.toString())+'%';
    partyOpinion.style.display = 'none';
    opinionContainer.style.backgroundColor = '#ffffff';
    opinionContainer.style.border = '0px';
}

