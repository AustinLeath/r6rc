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
function r6rcpage() {
  if (document.getElementById('r6rcpage').style.display = "none") {
    document.getElementById('r6rcpage').style.display = "block";
    document.getElementById('playersearchpage').style.display = "none";
    document.getElementById('contributorspage').style.display = "none";
    document.getElementById('changelogpage').style.display = "none";
  }
}
function changelogpage() {
  if (document.getElementById('changelogpage').style.display = "none") {
    document.getElementById('r6rcpage').style.display = "none";
    document.getElementById('playersearchpage').style.display = "none";
    document.getElementById('contributorspage').style.display = "none";
    document.getElementById('changelogpage').style.display = "block";
  }
}
function playersearchpage() {
  if (document.getElementById('playersearchpage').style.display = "none") {
    document.getElementById('r6rcpage').style.display = "none";
    document.getElementById('playersearchpage').style.display = "block";
    document.getElementById('contributorspage').style.display = "none";
    document.getElementById('changelogpage').style.display = "none";
  }
}
function contributorspage() {
  if (document.getElementById('contributorspage').style.display = "none") {
    document.getElementById('r6rcpage').style.display = "none";
    document.getElementById('playersearchpage').style.display = "none";
    document.getElementById('contributorspage').style.display = "block";
    document.getElementById('changelogpage').style.display = "none";
  }
}
window.addEventListener("keydown", checkKeyPressed, false);
var fullscreenmessage = false;

function checkKeyPressed(e) {
  if (e.keyCode == 122) {
    document.getElementById('exitfullscreenmessage').style.display = fullscreenmessage ? "none" : "block";
    fullscreenmessage = !fullscreenmessage;
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
    } else if ( x > 10000) {
      document.getElementById("display").style.display = "none";
      document.getElementById("mmrerrormessage").style.display = "";
      finalmessage = "Enter a valid MMR";
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
    } else if ( x > 500) {
      document.getElementById("display").style.display = "none";
      document.getElementById("eloerrormessage").style.display = "";
      finalmessage = "Enter a valid ELO";
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
    } else if ( x > 10000) {
      document.getElementById("display1").style.display = "none";
      document.getElementById("mmrerrormessage1").style.display = "";
      finalmessage = "Enter a valid MMR";
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
    } else if ( x > 500) {
      document.getElementById("display1").style.display = "none";
      document.getElementById("eloerrormessage1").style.display = "";
      finalmessage = "Enter a valid ELO";
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
    } else if ( x > 10000) {
      document.getElementById("display1").style.display = "none";
      document.getElementById("goalerrormessage1").style.display = "";
      finalmessage = "Enter a valid Goal";
    } else {
      document.getElementById("goalerrormessage1").style.display = "none";
      finalmessage = "GOAL: OK";
    }
    document.getElementById("goalerrormessage1").innerHTML = finalmessage;
}
