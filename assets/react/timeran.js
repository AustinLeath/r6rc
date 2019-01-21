var R6RC = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message = 'R6RC has been running for ' + seconds + ' seconds.';

    return React.DOM.p(null, message);
  }
});

// Call React.createFactory instead of directly call R6RC({...}) in React.render
var R6RCFactory = React.createFactory(R6RC);

var start = new Date().getTime();
setInterval(function() {
  ReactDOM.render(
    R6RCFactory({elapsed: new Date().getTime() - start}),
    document.getElementById('timeran')
  );
}, 50);
