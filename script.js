var i = 0;
var a = 100 / subjects.length;
const plusWith = 100 / subjects.length

var position = ["pro", "none", "contra"];
var data = [];

var partyOpinion = document.getElementById("partyOpinion");
var opinionContainer = document.getElementById("opinionContainer");
var stellingTitle = document.getElementById("stellingTitle");
var stellingDes = document.getElementById("stellingDes");

document.getElementById("progress").style.width = plusWith.toString() + "%";

stellingTitle.innerHTML = subjects[i].title;
stellingDes.innerHTML = subjects[i].statement;

console.log(subjects[i]);
subjects.forEach(e => {
  e.myOpinion = "";
  e.important = false;
});

parties.forEach(e => {
  e.points = 0;
});


document.getElementById("noOpinion").addEventListener("click", function() {
  nextStatement();
});

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

document.getElementById("important").addEventListener("change", function() {
  subjects[i].important = this.checked;
});

function next() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("stellingPage").style.display = "block";
}

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

function removePoints(){
  var opinion = subjects[i].myOpinion;

  for(var m = 0; m < parties.length - 1; m++){
    if(subjects[i].parties[m].position == opinion){
      parties[m].points -= 1;
    }
  }
  
}

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
      console.log(parties);
    }
  }
  subjects[newCount].myOpinion = opinion;
}

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

function result() {
  document.getElementById("stellingPage").style.display = "none";
  document.getElementById("importantContainer").style.display = "block";
  for (var m = 0; m < subjects[0].parties.length; m++) {
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.className = 'checkboxInput'
    
    var p = document.createElement("p");
    p.innerHTML = subjects[0].parties[m].name;
    p.className = 'partyCheckbox'

    document.getElementById("col1").appendChild(check);
    document.getElementById("col1").appendChild(p);
  }
}

function getCertainParties(){
  var input = document.getElementsByClassName('checkboxInput');
    for(var j = 0; j < parties.length; j++){
        if(parties[j].secular == false){
          input[j].checked = true;
        }
    }
}

function finalResults(){
  console.log(parties)
  document.getElementById('importantContainer').style.display = 'none';
  document.getElementById('resultContainer').style.display = 'block';

  parties.sort(function(a,b){
    return b.points - a.points;
  });

  document.getElementById('1stPlace').innerHTML += parties[0].name + ' ' + Math.floor(100 / subjects.length * parties[0].points) + '%';
  document.getElementById('2ndPlace').innerHTML += parties[1].name + ' ' + Math.floor(100 / subjects.length * parties[1].points) + '%';
  document.getElementById('3thPlace').innerHTML += parties[2].name + ' ' + Math.floor(100 / subjects.length * parties[2].points) + '%';

}
