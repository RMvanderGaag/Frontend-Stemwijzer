var i = 0;
var a = 3.33;
var position = ["pro", "none", "contra"];
var data = [];

var partyOpinion = document.getElementById("partyOpinion");
var opinionContainer = document.getElementById("opinionContainer");
var stellingTitle = document.getElementById("stellingTitle");
var stellingDes = document.getElementById("stellingDes");

stellingTitle.innerHTML = subjects[i].title;
stellingDes.innerHTML = subjects[i].statement;

subjects.forEach(e => {
  e.myOpinion = "";
  e.important = false;
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
    a = a - 3.33;
    routineFunction();
  }
}

function nextStatement(opinion) {
  i = i + 1;
  if (i == 29) {
    a = 100;
  } else if (i == 30) {
    result();
  } else {
    a = a + 3.33;
  }

  document.getElementById("important").checked = false;
  subjects[i].myOpinion = opinion;
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
    var h = document.createElement("h3");
    h.innerHTML = subjects[0].parties[m].name;
    document.getElementById("col1").appendChild(check);
    document.getElementById("col1").appendChild(h);
  }
}
