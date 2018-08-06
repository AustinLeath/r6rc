function preset() {
 document.getElementById("preset").style.display = "block";
 document.getElementById("custom").style.display = "none";
 document.getElementById('presetbtn').disabled=true;
 document.getElementById('custombtn').disabled=false;
};
function custom() {
 document.getElementById("preset").style.display = "none";
 document.getElementById("custom").style.display = "block";
 document.getElementById('presetbtn').disabled=false;
 document.getElementById('custombtn').disabled=true;
};
