window.shell = require('electron').shell;
document.getElementById("twitterclick").addEventListener("click", function (e) {
  e.preventDefault();
  var remoteLink = this.getAttribute('href');
  shell.openExternal( remoteLink );
});
document.getElementById("twitterclick").addEventListener("auxclick", function (e) {
  e.preventDefault();
  var remoteLink = this.getAttribute('href');
  shell.openExternal( remoteLink );
});
document.getElementById("r6dbclick").addEventListener("click", function (e) {
  e.preventDefault();
  var remoteLink = this.getAttribute('href');
  shell.openExternal( remoteLink );
});
document.getElementById("r6dbclick").addEventListener("auxclick", function (e) {
  e.preventDefault();
  var remoteLink = this.getAttribute('href');
  shell.openExternal( remoteLink );
});

document.getElementById("mailchimp").addEventListener("click", function (e) {
  e.preventDefault();
  var remoteLink = this.getAttribute('href');
  shell.openExternal( remoteLink );
});
document.getElementById("mailchimp").addEventListener("auxclick", function (e) {
  e.preventDefault();
  var remoteLink = this.getAttribute('href');
  shell.openExternal( remoteLink );
});
