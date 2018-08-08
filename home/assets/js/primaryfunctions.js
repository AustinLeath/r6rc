function enable() {
    document.getElementById("display").style.display = "";
    document.getElementById("errordialogue").style.display = "";
}
function disable() {
    document.getElementById("display").style.display = "none";
    document.getElementById("errordialogue").style.display = "none";
}
function enable1() {
    document.getElementById("display1").style.display = "";
    document.getElementById("errordialogue1").style.display = "";
}
function disable1() {
    document.getElementById("display1").style.display = "none";
    document.getElementById("errordialogue1").style.display = "none";
}
function presetreset() {
  document.getElementById("preset").reset();
}
function customreset() {
  document.getElementById("custom").reset();
}
function changetopage1() {
  if (document.getElementById('page2').style.display = "block") {
    document.getElementById('page1').style.display = "block";
    document.getElementById('page2').style.display = "none";
  }
}
function changetopage2() {
  if (document.getElementById('page1').style.display = "block") {
    document.getElementById('page1').style.display = "none";
    document.getElementById('page2').style.display = "block";
  }
}
//preset method
function checkmmrfill() {
    var finalmessage;
    x = document.getElementById("mmr").value;
    if (x < 1300) {
      document.getElementById("display").style.display = "none";
      document.getElementById("mmrerrormessage").style.display = "";
      finalmessage = "Enter player MMR";
    } else {
      document.getElementById("mmrerrormessage").style.display = "none";
      finalmessage = "MMR: OK";
    }
    document.getElementById("mmrerrormessage").innerHTML = finalmessage;
}
function checkelofill() {
    var finalmessage;
    x = document.getElementById("elo").value;
    if (x < 1) {
      document.getElementById("display").style.display = "none";
      document.getElementById("eloerrormessage").style.display = "";
      finalmessage = "Enter player ELO";
    } else {
      document.getElementById("eloerrormessage").style.display = "none";
      finalmessage = "ELO: OK";
    }
    document.getElementById("eloerrormessage").innerHTML = finalmessage;
}
function checkgoalfill() {
    var finalmessage;
    x = document.getElementById("goal").value;
    if (x == "") {
      document.getElementById("display").style.display = "none";
      document.getElementById("goalerrormessage").style.display = "";
      finalmessage = "Select a rank from the dialogue above.";
    } else {
      document.getElementById("goalerrormessage").style.display = "none";
      finalmessage = "GOAL: OK";
    }
    document.getElementById("goalerrormessage").innerHTML = finalmessage;
}
//custom method
function checkmmrfill1() {
    var finalmessage;
    x = document.getElementById("mmr1").value;
    if (x < 1300) {
      document.getElementById("display1").style.display = "none";
      document.getElementById("mmrerrormessage1").style.display = "";
      finalmessage = "Enter player MMR";
    } else {
      document.getElementById("mmrerrormessage1").style.display = "none";
      finalmessage = "MMR: OK";
    }
    document.getElementById("mmrerrormessage1").innerHTML = finalmessage;
}
function checkelofill1() {
    var finalmessage;
    x = document.getElementById("elo1").value;
    if (x < 1) {
      document.getElementById("display1").style.display = "none";
      document.getElementById("eloerrormessage1").style.display = "";
      finalmessage = "Enter player ELO";
    } else {
      document.getElementById("eloerrormessage1").style.display = "none";
      finalmessage = "ELO: OK";
    }
    document.getElementById("eloerrormessage1").innerHTML = finalmessage;
}
function checkgoalfill1() {
    var finalmessage;
    x = document.getElementById("goal1").value;
    if (x < 1300) {
      document.getElementById("display1").style.display = "none";
      document.getElementById("goalerrormessage1").style.display = "";
      finalmessage = "Select a rank from the dialogue above.";
    } else {
      document.getElementById("goalerrormessage1").style.display = "none";
      finalmessage = "GOAL: OK";
    }
    document.getElementById("goalerrormessage1").innerHTML = finalmessage;
}
