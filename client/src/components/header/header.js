// ************ header classNameNameName *******

import React from 'react';
import { Link,browserHistory } from 'react-router';

class Header extends React.Component {
     constructor(props){
          super(props)
   }
render() {
return (
<nav className="navbar  navbar-inverse  navbar-fixed-top">
  <div className="container">
  <button type="button" className="navbar-toggle"
  data-toggle="collapse"
  data-target=".navbar-collapse"
  >
  <span className="sr-only"> Toggle navigation</span>
  <span className="icon-bar"> </span>
  <span className="icon-bar"> </span>
  <span className="icon-bar"> </span>
  </button>
   <Link className="navbar-brand" to="/home"> Bootsnipp</Link>
       <div className="navbar-collapse collapse">
         <ul className="nav navbar-nav navbar-right">
          <li> <Link to="/users" >List</Link> </li>
          </ul>
       </div>
  </div>
</nav>
          );
     }
}

module.exports = Header;
