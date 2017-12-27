var React = require('react');
// NavLink dynamic change the style of the specific anchor tag based on if that element is active
// Link just render a anchor tag
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">Popular</NavLink>
      </li>
    </ul>
  )

}

module.exports = Nav;