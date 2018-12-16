function winorlose() {
    var winorlose;

    var a = document.getElementById("mmr").value;
    var b = document.getElementById("elo").value;
    var c = document.getElementById("goal").value;
    var d = ((c - a) / b);
    var e = Math.ceil(d);

    if (e > 0) {
        winorlose = "You need to <b>win</b> ";
    } else if (e < 0) {
        winorlose = "You need to <b>lose</b> ";
    } else {
        winorlose = "You <b>do not</b> need to win or lose ";
    }
    document.getElementById("winorlose").innerHTML = winorlose;
}
(function() {
    function calculateRankGoal(mmr, elo, goal) {
        mmr = parseFloat(mmr);
        elo = parseFloat(elo);
        goal = parseFloat(goal);

        var a = ((goal - mmr) / elo);
        var b = Math.ceil(a);
        var c = Math.abs(b);
        return c;
    }

    var preset = document.getElementById("preset");
    if (preset) {
        preset.onsubmit = function() {
            document.getElementById("result").innerHTML = calculateRankGoal(this.mmr.value, this.elo.value, this.goal.value);
            return false;
        };
    }
}());
function matchcount() {
    var matchcount;

    var a = document.getElementById("mmr").value;
    var b = document.getElementById("elo").value;
    var c = document.getElementById("goal").value;
    var d = ((c - a) / b);
    var e = Math.ceil(d);
    var f = Math.abs(e);

    if (f == 1) {
        matchcount = " (&plusmn 1) match to reach your rank goal";
    } else if (f > 1) {
        matchcount = " (&plusmn 1) matches to reach your rank goal";
    } else {
        matchcount = " matches to reach your rank goal";
    }
  document.getElementById("matchcount").innerHTML = matchcount;
}
function dontwinorlose() {
  var a = document.getElementById("winorlose").innerHTML;

  if (a == "You <b>do not</b> need to win or lose ") {
    document.getElementById("result").style.display = "none";
    document.getElementById("anydiv").innerHTML = "<b>any</b>";
  } else {
    document.getElementById("result").style.display = "";
    document.getElementById("anydiv").innerHTML = "";
  }
}
