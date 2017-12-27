//webpack: code bulder
//babel: code transformation. e.g. es6-> normal js, JSX-> js/html

var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App');


ReactDOM.render(
	<App />, 
	document.getElementById('app')
);