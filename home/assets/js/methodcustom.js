function winorlose1() {
    var winorlose;

    var a = document.getElementById("mmr1").value;
    var b = document.getElementById("elo1").value;
    var c = document.getElementById("goal1").value;
    var d = ((c - a) / b);
    var e = Math.ceil(d);

    if (e > 0) {
        winorlose = "You need to <b>win</b> ";
    } else if (e < 0) {
        winorlose = "You need to <b>lose</b> ";
    } else {
        winorlose = "You <b>do not</b> need to win or lose ";
    }
    document.getElementById("winorlose1").innerHTML = winorlose;
}
(function() {
    function calculateRankGoal1(mmr1, elo1, goal1) {
        mmr1 = parseFloat(mmr1);
        elo1 = parseFloat(elo1);
        goal1 = parseFloat(goal1);

        var a = ((goal1 - mmr1) / elo1);
        var b = Math.ceil(a);
        var c = Math.abs(b);
        return c;
    }

    var custom = document.getElementById("custom");
    if (custom) {
        custom.onsubmit = function() {
            document.getElementById("result1").innerHTML = calculateRankGoal1(this.mmr1.value, this.elo1.value, this.goal1.value);
            return false;
        };
    }
}());
function matchcount1() {
    var matchcount;

    var a = document.getElementById("mmr1").value;
    var b = document.getElementById("elo1").value;
    var c = document.getElementById("goal1").value;
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
    document.getElementById("matchcount1").innerHTML = matchcount;
}

function dontwinorlose1() {
  var a = document.getElementById("winorlose1").innerHTML;

  if (a == "You <b>do not</b> need to win or lose ") {
    document.getElementById("result1").style.display = "none";
    document.getElementById("anydiv1").innerHTML = "<b>any</b>";
  } else {
    document.getElementById("result1").style.display = "";
    document.getElementById("anydiv1").innerHTML = "";
  }
}
