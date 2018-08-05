function enable() {
    document.getElementById("display").style.display = "";
    document.getElementById("errormessage").style.display = "";
}
function disable() {
    document.getElementById("display").style.display = "none";
    document.getElementById("errormessage").style.display = "none";
}
function enable1() {
    document.getElementById("display1").style.display = "";
    document.getElementById("errormessage1").style.display = "";
}
function disable1() {
    document.getElementById("display1").style.display = "none";
    document.getElementById("errormessage1").style.display = "none";
}
function presetreset() {
  document.getElementById("preset").reset();
}
function customreset() {
  document.getElementById("custom").reset();
}
function fillform() {
    var finalmessage;
    x = document.getElementById("goal").value;
    if (x == "") {
      document.getElementById("display").style.display = "none";
      document.getElementById("errordialogue").style.display = "";
      finalmessage = "Please select a rank from the dialogue above.";
    } else {
      document.getElementById("errordialogue").style.display = "none";
      finalmessage = "No errors to report<br>this dialogue has been activated due to an error.";
    }
    document.getElementById("errormessage").innerHTML = finalmessage;
}
function fillform1() {
    var finalmessage;
    x = document.getElementById("goal1").value;
    if (x == "") {
      document.getElementById("display1").style.display = "none";
      document.getElementById("errordialogue1").style.display = "";
      finalmessage = "Please enter a custom MMR Goal.";
    } else {
      document.getElementById("errordialogue1").style.display = "none";
      finalmessage = "No errors to report<br>this dialogue has been activated due to an error.";
    }
    document.getElementById("errormessage1").innerHTML = finalmessage;
}
function checkmmrfill() {
    var finalmessage;
    x = document.getElementById("mmr").value;
    if (x == "") {
      document.getElementById("display").style.display = "none";
      document.getElementById("errordialogue").style.display = ""
      finalmessage = "PLEASE FILL MMR";
    } else {
      document.getElementById("display").style.display = "";
      document.getElementById("errordialogue").style.display = "none"
      finalmessage = "No errors to report<br>this dialogue has been activated due to an error.";
    }
    document.getElementById("mmrerrormessage").innerhtml = finalmessage;
}
